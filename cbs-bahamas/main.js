document.documentElement.classList.add('js-anim');
window.addEventListener('DOMContentLoaded',function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rise=document.querySelectorAll('.rise');
  if(reduce||!window.gsap){rise.forEach(function(el){el.style.opacity=1;el.style.transform='none'});document.querySelectorAll('.slat').forEach(function(s){s.style.transform='none'});return;}
  gsap.to(rise,{opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.08});
  if(window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    var slats=document.querySelectorAll('.slat');
    if(slats.length) gsap.fromTo(slats,{scaleY:.12},{scaleY:1,ease:'none',stagger:.04,scrollTrigger:{trigger:'.shutter',start:'top 75%',end:'bottom 45%',scrub:true}});
    var c=document.querySelector('[data-count]');
    if(c){var o={v:1900};gsap.to(o,{v:1973,duration:1.4,ease:'power2.out',scrollTrigger:{trigger:c,start:'top 90%'},onUpdate:function(){c.textContent=Math.round(o.v)}});}
  }else{document.querySelectorAll('.slat').forEach(function(s){s.style.transform='none'})}
});
