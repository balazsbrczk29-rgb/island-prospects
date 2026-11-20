// RECIPE: booking / enquiry flow that turns choices into a ready-to-send WhatsApp or email message.
// Concept sites cannot take real bookings or payments, so the honest best is: the visitor picks what they want
// (dates, guests, room/boat/tour/service, extras), sees a clear summary, and sends it in one tap through the
// business's REAL channel (a sourced WhatsApp number or email). With only a phone number, show the summary to
// read out and a large Call button. With a real booking engine URL, link to it after the summary.
// Style it in the site's own language (a reply card, a ticket, a work order, a charter sheet): never a SaaS form.
//
// Usage:
// <Enquiry business="Hope Town Inn" whatsapp="12423660003" email={null} phone="+12423660003"
//   fields={[ { id:'dates', kind:'dates', label:'Your dates' }, { id:'guests', kind:'number', label:'Guests', min:1, max:8 },
//             { id:'room', kind:'choice', label:'Room', options:['Garden room','Harbour suite'] }, { id:'note', kind:'text', label:'Anything else' } ]} />
import { useMemo, useState } from 'react'

type Field =
  | { id: string; kind: 'dates'; label: string }
  | { id: string; kind: 'number'; label: string; min?: number; max?: number }
  | { id: string; kind: 'choice'; label: string; options: string[] }
  | { id: string; kind: 'text'; label: string; placeholder?: string }

export default function Enquiry({ business, fields, whatsapp, email, phone, bookingUrl, className = '' }: {
  business: string; fields: Field[]; whatsapp?: string | null; email?: string | null; phone?: string | null; bookingUrl?: string | null; className?: string
}) {
  const [v, setV] = useState<Record<string, string>>({})
  const set = (k: string, val: string) => setV(s => ({ ...s, [k]: val }))
  const summary = useMemo(() => fields.map(f => {
    if (f.kind === 'dates') return v[f.id + '_from'] ? `${f.label}: ${v[f.id + '_from']} to ${v[f.id + '_to'] || '?'}` : ''
    return v[f.id] ? `${f.label}: ${v[f.id]}` : ''
  }).filter(Boolean).join('\n'), [v, fields])
  const msg = `Hello ${business}, I'd like to ask about:\n${summary}`
  const ready = summary.length > 0

  return (
    <form className={className} onSubmit={e => e.preventDefault()} aria-label={`Enquiry to ${business}`}>
      {fields.map(f => (
        <fieldset key={f.id} style={{ border: 0, padding: 0, margin: '0 0 1.25rem' }}>
          <legend>{f.label}</legend>
          {f.kind === 'dates' && <div style={{ display: 'flex', gap: '.75rem' }}>
            <label>From <input type="date" value={v[f.id + '_from'] || ''} onChange={e => set(f.id + '_from', e.target.value)} /></label>
            <label>To <input type="date" value={v[f.id + '_to'] || ''} min={v[f.id + '_from']} onChange={e => set(f.id + '_to', e.target.value)} /></label>
          </div>}
          {f.kind === 'number' && <input type="number" aria-label={f.label} min={f.min ?? 1} max={f.max ?? 20} value={v[f.id] || ''} onChange={e => set(f.id, e.target.value)} />}
          {f.kind === 'choice' && <div role="radiogroup" aria-label={f.label} style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
            {f.options.map(o => <label key={o} data-selected={v[f.id] === o || undefined}><input type="radio" name={f.id} value={o} checked={v[f.id] === o} onChange={() => set(f.id, o)} /> {o}</label>)}
          </div>}
          {f.kind === 'text' && <textarea aria-label={f.label} placeholder={f.placeholder} rows={3} value={v[f.id] || ''} onChange={e => set(f.id, e.target.value)} />}
        </fieldset>
      ))}
      <output aria-live="polite" style={{ display: 'block', whiteSpace: 'pre-line' }}>{ready ? summary : 'Your choices appear here.'}</output>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', marginTop: '1rem' }}>
        {whatsapp && <a aria-disabled={!ready} href={ready ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}` : undefined} target="_blank" rel="noopener">Send on WhatsApp</a>}
        {email && <a aria-disabled={!ready} href={ready ? `mailto:${email}?subject=${encodeURIComponent('Enquiry from the website')}&body=${encodeURIComponent(msg)}` : undefined}>Send by email</a>}
        {!whatsapp && !email && phone && <a href={`tel:${phone}`}>Call {business}</a>}
        {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener">Check live availability</a>}
      </div>
    </form>
  )
}
