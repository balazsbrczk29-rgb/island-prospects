"""Writes factory/out/Bahamas_Website_Prospects_with_previews.xlsx: the original sheet plus
preview URL, state, site check, pitch line and findings for every business.
Usage: python3 factory/tools/export_xlsx.py   (needs: pip install openpyxl --break-system-packages)"""
import json, os, glob
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill
root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
cfg = json.load(open(os.path.join(root, 'factory/config.json')))
P = json.load(open(os.path.join(root, 'factory/data/prospects.json')))
S = {}
for f in glob.glob(os.path.join(root, 'factory/status/*.json')):
    s = json.load(open(f)); S[s['slug']] = s
wb = Workbook(); ws = wb.active; ws.title = 'Previews'
cols = ['#', 'Business', 'Size', 'Sector', 'Location', 'Tier', 'Batch', 'State', 'Preview URL', 'Preview + notes', 'Current site', 'Site check (2026-11-04)', 'Pitch line', 'What we found', 'Primary CTA', 'Notes for Balazs', 'Original pitch angle']
ws.append(cols)
for c in ws[1]: c.font = Font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='1F5F5B')
for p in sorted(P, key=lambda x: x['id']):
    s = S.get(p['slug'], {}); state = s.get('state', 'pending')
    url = cfg['pages_base'] + p['slug'] + '/' if state == 'built' else ''
    ws.append([p['id'], p['name'], p['size'], p['sector'], p['location'], p['tier'], p['batch'], state, url, (url + '?notes=1') if url else '',
               p.get('current_site') or p.get('listed_site_text'), p.get('site_check_2026_11_04'), s.get('pitch_line', ''),
               '\n'.join(s.get('current_site_findings', [])), s.get('primary_cta', ''), s.get('notes', ''), p.get('sheet_pitch_angle')])
    r = ws.max_row
    for ci in (9, 10):
        c = ws.cell(r, ci)
        if c.value: c.hyperlink = c.value; c.font = Font(color='1F5F5B', underline='single')
widths = [5, 38, 8, 22, 24, 6, 7, 9, 48, 20, 28, 40, 50, 60, 26, 40, 50]
for i, w in enumerate(widths, 1): ws.column_dimensions[ws.cell(1, i).column_letter].width = w
for row in ws.iter_rows(min_row=2):
    for c in row: c.alignment = Alignment(wrap_text=True, vertical='top')
ws.freeze_panes = 'C2'; ws.auto_filter.ref = ws.dimensions
os.makedirs(os.path.join(root, 'factory/out'), exist_ok=True)
out = os.path.join(root, 'factory/out/Bahamas_Website_Prospects_with_previews.xlsx'); wb.save(out)
print('wrote', out, '| built:', sum(1 for s in S.values() if s.get('state') == 'built'), '| skipped:', sum(1 for s in S.values() if s.get('state') == 'skipped'))
