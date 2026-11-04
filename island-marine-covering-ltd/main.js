document.documentElement.classList.add('js-anim');
window.addEventListener('DOMContentLoaded',function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rise=document.querySelectorAll('.rise'),aw=document.querySelector('.awning'),st=document.querySelector('[data-stitch]');
  if(reduce||!window.gsap){rise.forEach(function(el){el.style.opacity=1;el.style.transform='none'});if(aw)aw.style.transform='none';return;}
  var tl=gsap.timeline();
  if(aw) tl.to(aw,{scaleY:1,duration:1.2,ease:'power3.out'});
  if(st){var L=1200;st.style.strokeDasharray='6 6';gsap.set(st,{attr:{'stroke-dashoffset':0}});tl.fromTo(st,{opacity:0},{opacity:1,duration:.4},'-=.3');}
  tl.to(rise,{opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.08},'-=.9');
});
