(function(){
  document.querySelectorAll('form[data-enquiry]').forEach(function(f){
    f.addEventListener('submit',function(e){
      if(!f.checkValidity()) return;
      e.preventDefault();
      var lines=['Hello '+(f.dataset.business||'')+',',''];
      new FormData(f).forEach(function(v,k){ v=String(v).trim(); if(v) lines.push(k+': '+v); });
      lines.push('','(sent from the website)');
      var text=lines.join('\n');
      var wa=(f.dataset.whatsapp||'').replace(/\D/g,'');
      var url = wa ? 'https://wa.me/'+wa+'?text='+encodeURIComponent(text)
                   : 'mailto:'+(f.dataset.email||'')+'?subject='+encodeURIComponent('Enquiry from website')+'&body='+encodeURIComponent(text);
      window.open(url, wa?'_blank':'_self');
      var note=f.querySelector('.enquiry__note'); if(note) note.textContent = wa ? 'WhatsApp opened in a new tab with your details.' : 'Your email app opened with your details.';
    });
  });
})();
