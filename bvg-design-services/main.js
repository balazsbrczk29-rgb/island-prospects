document.documentElement.classList.add('js-anim');
window.addEventListener('DOMContentLoaded',function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rise=document.querySelectorAll('.rise');
  if(reduce||!window.gsap){rise.forEach(function(el){el.style.opacity=1;el.style.transform='none'});}
  else{gsap.to(rise,{opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.08});}
  var fig=document.querySelector('[data-timeslider]'); if(!fig) return;
  var range=fig.querySelector('[data-range]'),out=fig.querySelector('[data-year]'),layer=fig.querySelector('[data-new]'),handle=fig.querySelector('[data-handle]');
  function set(v){var p=(v-1996)/30*100;layer.style.clipPath='inset(0 0 0 '+p+'%)';handle.style.left=p+'%';out.textContent=v;}
  range.addEventListener('input',function(){set(+range.value)});
  set(+range.value);
  if(!reduce){var o={v:1996};var t=setTimeout(function(){
    if(window.gsap){gsap.to(o,{v:2026,duration:2.4,ease:'power2.inOut',onUpdate:function(){range.value=Math.round(o.v);set(Math.round(o.v))}});}
  },700);range.addEventListener('pointerdown',function(){clearTimeout(t);if(window.gsap)gsap.killTweensOf(o)});}
});
