document.documentElement.classList.add('js-anim');
window.addEventListener('DOMContentLoaded',function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rise=document.querySelectorAll('.rise');
  if(reduce||!window.gsap){rise.forEach(function(el){el.style.opacity=1;el.style.transform='none'});return;}
  gsap.to(rise,{opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.08,delay:.1});
  var r=document.querySelector('[data-reveal]');
  if(r){gsap.fromTo(r,{attr:{y:400,height:0}},{attr:{y:0,height:400},duration:1.6,ease:'power4.out',delay:.5});}
  if(window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    var g=document.querySelector('[data-grid]');
    if(g) gsap.fromTo(g,{y:-10},{y:10,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  }
});
