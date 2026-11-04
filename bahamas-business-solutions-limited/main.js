document.documentElement.classList.add('js-anim');
window.addEventListener('DOMContentLoaded',function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rise=document.querySelectorAll('.rise'),sheet=document.querySelector('.sheet'),scan=document.querySelector('.scan');
  if(reduce||!window.gsap){rise.forEach(function(el){el.style.opacity=1;el.style.transform='none'});if(sheet)sheet.style.transform='none';return;}
  var tl=gsap.timeline({delay:.15});
  if(sheet) tl.to(sheet,{y:0,yPercent:0,duration:1.4,ease:'power2.out'});
  if(scan) tl.fromTo(scan,{top:'0%',opacity:1},{top:'100%',opacity:0,duration:1,ease:'power1.inOut'},'-=.2');
  tl.to(rise,{opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.08},'-=1.4');
});
