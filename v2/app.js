document.querySelectorAll('.faq-q').forEach((btn)=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    item.classList.toggle('open');
    btn.setAttribute('aria-expanded',item.classList.contains('open')?'true':'false');
  });
});
const io=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target);}
  });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach((el)=>io.observe(el));
document.querySelectorAll('a[href^="#"]').forEach((link)=>{
  link.addEventListener('click',(e)=>{
    const id=link.getAttribute('href');
    const el=document.querySelector(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});