(function(){
  var el=document.getElementById('concept-notes'); if(!el) return;
  var d; try{ d=JSON.parse(el.textContent); }catch(e){ return; }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function list(a){ return '<ul>'+(a||[]).map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>'; }
  var wrap=document.createElement('div'); wrap.className='concept-notes'; wrap.setAttribute('role','dialog'); wrap.setAttribute('aria-modal','true'); wrap.setAttribute('aria-label','Concept notes');
  wrap.innerHTML='<div class="concept-notes__panel"><button type="button" class="concept-notes__close" aria-label="Close">&times;</button>'+
    '<h2>Concept for '+esc(d.business)+'</h2>'+
    '<p class="concept-notes__meta">'+(d.current_site?('Current site: '+esc(d.current_site)):'No working website found today')+'</p>'+
    '<h3>What we found</h3>'+list(d.findings)+
    '<h3>What this concept does</h3>'+list(d.improvements)+
    '<div class="concept-notes__foot">Prepared by '+esc(d.agency)+(d.contact?(' · '+esc(d.contact)):'')+'. All business details shown were taken from public sources and should be confirmed with the owner.</div></div>';
  document.body.appendChild(wrap);
  var last;
  function open(){ last=document.activeElement; wrap.classList.add('is-open'); wrap.querySelector('.concept-notes__close').focus(); }
  function close(){ wrap.classList.remove('is-open'); if(last) last.focus(); }
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-concept-open]')){ e.preventDefault(); open(); }
    else if(e.target.closest('.concept-notes__close')||e.target===wrap){ close(); }
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&wrap.classList.contains('is-open')) close(); });
  if(/[?&]notes=1/.test(location.search)) open();
})();
