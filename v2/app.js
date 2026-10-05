document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const panel=document.getElementById(btn.dataset.tab);
    if(panel) panel.classList.add('active');
  });
});

document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    item.classList.toggle('open');
  });
});

const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{threshold:.08});

document.querySelectorAll('.section-intro,.feature-grid,.program-stage,.founder-section,.result-grid,.case-carousel,.audience-grid,.access-section,.faq,.final-inner').forEach(el=>{
  el.classList.add('reveal');
  io.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// v14 — real video in the 100+ mln proof card.
// The original upload is stored as base64 chunks on GitHub Pages and rebuilt lazily
// only when the results card is near the viewport.
const ferixdiVideoChunks = Array.from({length:19},(_,i)=>
  './media/video-parts/p'+String(i).padStart(2,'0')+'.txt'
);

async function loadFerixdiProofVideo(){
  const card=document.querySelector('.feed-card-clean');
  if(!card || card.dataset.videoReady==='1') return;
  card.dataset.videoReady='1';

  const oldImg=card.querySelector('img');
  const video=document.createElement('video');
  video.autoplay=true;
  video.muted=true;
  video.loop=true;
  video.playsInline=true;
  video.preload='auto';
  video.setAttribute('aria-label','Реальное видео с лентой и охватами');
  video.style.background='#050505';

  if(oldImg) oldImg.replaceWith(video);
  else card.prepend(video);

  try{
    const encoded=await Promise.all(
      ferixdiVideoChunks.map(url=>fetch(url,{cache:'force-cache'}).then(r=>{
        if(!r.ok) throw new Error('chunk '+url+' '+r.status);
        return r.text();
      }))
    );

    const decoded=encoded.map(s=>{
      const clean=s.trim();
      const bin=atob(clean);
      const out=new Uint8Array(bin.length);
      for(let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i);
      return out;
    });

    const blob=new Blob(decoded,{type:'video/mp4'});
    const objectUrl=URL.createObjectURL(blob);
    video.src=objectUrl;
    video.addEventListener('loadeddata',()=>video.play().catch(()=>{}),{once:true});
    window.addEventListener('pagehide',()=>URL.revokeObjectURL(objectUrl),{once:true});
  }catch(err){
    console.error('Ferixdi proof video failed to load',err);
    card.dataset.videoReady='0';
  }
}

const proofCard=document.querySelector('.feed-card-clean');
if(proofCard){
  const proofVideoIO=new IntersectionObserver(entries=>{
    if(entries.some(e=>e.isIntersecting)){
      proofVideoIO.disconnect();
      loadFerixdiProofVideo();
    }
  },{rootMargin:'500px 0px',threshold:0.01});
  proofVideoIO.observe(proofCard);
}
