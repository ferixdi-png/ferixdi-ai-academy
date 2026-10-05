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


// v15 — final editorial pass: smaller scale, clear story, 16:9 meme, analytics-first CTA.
(function(){
  const analyticsUrl='https://t.me/ferixdi_ai/1863';

  function setText(el,value){ if(el) el.textContent=value; }

  // HERO: one idea, one real photo, one set of numbers.
  const hero=document.querySelector('.hero');
  if(hero){
    setText(hero.querySelector('h1'),'ВНИМАНИЕ = ЗОЛОТО В ВЕК AI-ТЕХНОЛОГИЙ');
    setText(hero.querySelector('.hero-lead'),'Последние 3 месяца мы системно раскачиваем несколько Instagram-аккаунтов через AI-Reels. Цель простая: охваты → трафик → заявки → ПАРТНЁРКИ.');

    const visual=hero.querySelector('.hero-visual');
    if(visual){
      visual.innerHTML='<img class="hero-duck-img" src="./media/hero-duck.webp" alt="Ferixdi AI — Дмитрий с гусём">';
    }

    const stats=hero.querySelectorAll('.hero-stats > div');
    const data=[
      ['90 дней','период анализа'],
      ['7 кейсов','реальная выборка'],
      ['1228 Reels','создано и опубликовано'],
      ['≈79 млн','просмотров за 90 дней']
    ];
    stats.forEach((node,i)=>{
      if(!data[i]) return;
      const b=node.querySelector('b');
      const span=node.querySelector('span');
      setText(b,data[i][0]); setText(span,data[i][1]);
    });
  }

  // Remove old floating infobusiness-style badges: REAL DATA / FORMAT etc.
  document.querySelectorAll('.floating-card').forEach(el=>el.remove());
  [...document.querySelectorAll('body *')].forEach(el=>{
    if(el.children.length) return;
    const t=(el.textContent||'').trim().replace(/\s+/g,' ').toUpperCase();
    if(t==='REAL DATA' || t==='FORMAT') el.style.display='none';
  });

  // Results: current 90-day analytics instead of a vague giant number.
  const proof=document.querySelector('.proof-panel-clean');
  if(proof){
    setText(proof.querySelector('.proof-main-clean > span'),'90 ДНЕЙ / 7 КЕЙСОВ');
    setText(proof.querySelector('.proof-main-clean > strong'),'≈79 МЛН');
    setText(proof.querySelector('.proof-main-clean > p'),'1228 Reels в текущей выборке. Смотрим, что реально даёт охват, затем ведём внимание в трафик, заявки и партнёрки.');
  }

  // Force real high-quality screenshots from repo assets and simplify captions.
  const profiles=[...document.querySelectorAll('.personal-proof-grid .profile-shot')];
  const profileData=[
    ['./media/sharp/culebros.webp','69K','СТАРЫЙ КЕЙС · АККАУНТ ПРОДАН'],
    ['./media/sharp/feriiixdi.webp','15,7K','МОЙ НОВЫЙ АККАУНТ']
  ];
  profiles.forEach((card,i)=>{
    const d=profileData[i]; if(!d) return;
    const img=card.querySelector('img'); if(img) img.src=d[0];
    setText(card.querySelector('figcaption b'),d[1]);
    setText(card.querySelector('figcaption span'),d[2]);
    if(i===0 && !card.querySelector('.sold-account-note')){
      const note=document.createElement('div');
      note.className='sold-account-note';
      note.textContent='Аккаунт продан после кейса. Текущий владелец не имеет отношения к обучению Ferixdi AI.';
      card.appendChild(note);
    }
  });
  const personalHead=document.querySelector('.personal-proof-head');
  if(personalHead){
    setText(personalHead.querySelector('h3'),'СТАРЫЙ АККАУНТ ПРОДАН. НОВЫЙ — МОЙ ТЕКУЩИЙ.');
    personalHead.querySelector('p').innerHTML='Старый AI-аккаунт — мой кейс роста, после результата я его <b>продал</b>. Текущий владелец аккаунта не связан с обучением Ferixdi AI. Новый Instagram по недвижимости — мой текущий аккаунт.';
  }

  const cases=[...document.querySelectorAll('.case-shot-grid .case-shot')];
  const caseData=[
    ['./media/sharp/sukaflex.webp','34,2K','1 КЕЙС УЧЕНИКА'],
    ['./media/sharp/dreams.webp','28,7K','2 КЕЙС УЧЕНИКА'],
    ['./media/sharp/oladoll.webp','26,6K','3 КЕЙС УЧЕНИКА'],
    ['./media/sharp/maxmetr.webp','10K','4 КЕЙС УЧЕНИКА'],
    ['./media/sharp/funny.webp','7,4K','5 КЕЙС УЧЕНИКА'],
    ['./media/sharp/alexsmart.webp','7,1K','6 КЕЙС УЧЕНИКА']
  ];
  cases.forEach((card,i)=>{
    const d=caseData[i]; if(!d) return;
    const img=card.querySelector('img'); if(img) img.src=d[0];
    setText(card.querySelector('figcaption b'),d[1]);
    setText(card.querySelector('figcaption span'),d[2]);
  });

  const legacy=document.querySelector('.legacy-case-shot');
  if(legacy){
    const img=legacy.querySelector('img'); if(img) img.src='./media/sharp/artem.webp';
    setText(legacy.querySelector('.legacy-label span'),'ОТДЕЛЬНЫЙ ДОЛГОСРОЧНЫЙ КЕЙС');
  }
  const partner=document.querySelector('.partner-shot img');
  if(partner) partner.src='./media/sharp/partner.webp';

  // Meme must be a real 16:9 asset and must never crop its text.
  const meme=document.querySelector('.reach-meme img');
  if(meme){
    meme.src='./media/meme-16x9.webp';
    meme.alt='Опять о бабах думает — Бабах на охватах';
  }

  // Price CTA no longer jumps straight into a sale. First: analytics.
  document.querySelectorAll('.price-button').forEach(a=>{
    a.href=analyticsUrl;
    a.target='_blank';
    a.rel='noopener';
    a.textContent='Сначала читать аналитику ↗';
  });
  document.querySelectorAll('.price-note').forEach(n=>{
    n.textContent='Сначала посмотри реальные цифры за 90 дней. После разбора уже решай, идти ли в группу.';
  });

  // Add the final, non-sales analytics destination once.
  if(!document.querySelector('.analytics-final')){
    const anchor=document.querySelector('.final-price') || document.querySelector('footer') || document.body.lastElementChild;
    const section=document.createElement('section');
    section.className='analytics-final';
    section.innerHTML=`
      <div class="shell analytics-final-inner">
        <div class="analytics-final-copy">
          <span>НЕ ПРОДАЖА. СНАЧАЛА ДАННЫЕ.</span>
          <h2>АНАЛИТИКА РАСКАЧКИ REELS ПОД ОХВАТЫ И ПАРТНЁРКИ ЗА 90 ДНЕЙ.</h2>
          <p>7 кейсов · 1228 Reels · около 79 млн просмотров. Читай разбор, смотри цифры и только потом залетай к нам в группу.</p>
        </div>
        <a class="analytics-final-button" href="${analyticsUrl}" target="_blank" rel="noopener">Читать аналитику ↗</a>
      </div>`;
    if(anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',section);
    else document.body.appendChild(section);
  }
})();


// v18 — final compact site pass: all requested corrections in one place.
(function(){
  const analyticsUrl='https://t.me/ferixdi_ai/1863';
  const setText=(el,txt)=>{ if(el) el.textContent=txt; };

  // Manifest: one concrete workflow, no jumping between services.
  const manifest=document.querySelector('.manifest-inner');
  if(manifest){
    setText(manifest.querySelector('span'),'Один рабочий процесс');
    const h=manifest.querySelector('h2');
    if(h) h.innerHTML='Взял конкретную идею.<br>В конкретном сервисе сгенерировал.<br>Опубликовал. Всё.';
    setText(manifest.querySelector('p'),'Работаешь на охваты. Не прыгаешь из стороны в сторону.');
  }

  // Approach: compact and practical.
  const approach=document.querySelector('#approach');
  if(approach){
    const h=approach.querySelector('.section-intro h2');
    const p=approach.querySelector('.section-intro p');
    setText(h,'Одна идея → один ролик → публикация → данные.');
    setText(p,'Без бесконечных сервисов и красивых генераций ради генераций. Берём рабочую механику, выпускаем сериями и смотрим охваты.');
  }

  // The attached screenshots belong in "Как устроена база".
  const baseHead=document.querySelector('.base-preview-head span');
  if(baseHead) baseHead.textContent='КАК УСТРОЕНА БАЗА';
  const baseSmall=document.querySelector('.base-preview-head small');
  if(baseSmall) baseSmall.textContent='реальные экраны обучения';

  // Personal accounts: simple story before the screenshots.
  const ph=document.querySelector('.personal-proof-head');
  if(ph){
    setText(ph.querySelector('h3'),'Вот мой старый аккаунт. Вот мой новый аккаунт.');
    setText(ph.querySelector('p'),'Дальше — кейсы учеников. Без лишних подписей: сами аккаунты и цифры.');
  }

  // Cases: all blocks must be the same size, including the old Artem case.
  const grid=document.querySelector('.case-shot-grid');
  const legacy=document.querySelector('.legacy-case-shot');
  if(grid && legacy){
    const oldImg=legacy.querySelector('img');
    const card=document.createElement('figure');
    card.className='case-shot case-shot-artem';
    card.innerHTML='<img src="./media/sharp/artem.webp" alt="@artem.ai_reels — 56,8 тыс. подписчиков"><figcaption><b>56,8K</b><span>7 КЕЙС · ДОЛГОСРОЧНЫЙ</span></figcaption>';
    grid.appendChild(card);
    legacy.remove();
  }

  // Keep the "new cases" message only after every existing case.
  const coming=document.querySelector('.cases-coming-after');
  if(coming){
    const casesSection=document.querySelector('#cases');
    if(casesSection) casesSection.appendChild(coming);
  }

  // Strict 16:9 meme, entire image visible.
  const meme=document.querySelector('.reach-meme img');
  if(meme){
    meme.src='./media/meme-final-16x9.webp';
    meme.alt='Опять о бабах думает — Бабах на охватах';
  }

  // Compact captions that were taking too much space.
  const traffic=document.querySelector('.poster-traffic .poster-inline-caption strong');
  if(traffic) traffic.textContent='Охват → трафик → следующий шаг.';
  const noSecret=document.querySelector('.poster-no-secret .poster-inline-caption strong');
  if(noSecret) noSecret.textContent='Практика, реальные кейсы, работа по шагам.';

  // Audience: keep the meaning, remove needless vertical volume.
  const audience=document.querySelector('.audience-section');
  if(audience){
    setText(audience.querySelector('.section-intro h2'),'Кому подходит');
    setText(audience.querySelector('.section-intro p'),'Креатору, автору, маркетологу или предпринимателю, которому нужны охваты и трафик.');
  }

  // Closed base: short, not a giant sales block.
  const access=document.querySelector('.access-section');
  if(access){
    setText(access.querySelector('.access-card h2'),'Закрытая база');
    setText(access.querySelector('.access-card p'),'Материалы, практика, задания и поддержка в одном месте.');
  }

  // Analytics first, then the group.
  document.querySelectorAll('.price-button').forEach(a=>{
    a.href=analyticsUrl;
    a.target='_blank';
    a.rel='noopener';
    a.textContent='Сначала читать аналитику ↗';
  });
  document.querySelectorAll('.price-note').forEach(n=>{
    n.textContent='7 кейсов · 1228 Reels · около 79 млн просмотров за 90 дней. После разбора уже решай, идти ли в группу.';
  });

  // Hide any obsolete photo placeholders if a previous cached markup still contains them.
  document.querySelectorAll('.placeholder').forEach(el=>{
    if((el.textContent||'').includes('PHOTO 02') ||
       (el.textContent||'').includes('PHOTO 03') ||
       (el.textContent||'').includes('PHOTO 04') ||
       (el.textContent||'').includes('PHOTO 05') ||
       (el.textContent||'').includes('PHOTO 06') ||
       (el.textContent||'').includes('PHOTO 07')) el.remove();
  });
})();


// v20 — screenshot lightbox: keep cards compact while screenshots stay readable at full resolution.
(function(){
  const selector='.base-shot img,.profile-shot img,.case-shot img,.partner-shot img,.editorial-poster img';
  const images=[...document.querySelectorAll(selector)];
  if(!images.length) return;

  let box=document.querySelector('.media-lightbox');
  if(!box){
    box=document.createElement('div');
    box.className='media-lightbox';
    box.setAttribute('role','dialog');
    box.setAttribute('aria-modal','true');
    box.setAttribute('aria-label','Просмотр изображения');
    box.innerHTML='<button class="media-lightbox-close" aria-label="Закрыть">×</button><img alt="">';
    document.body.appendChild(box);
  }
  const full=box.querySelector('img');
  const close=()=>{ box.classList.remove('open'); document.body.style.overflow=''; full.removeAttribute('src'); };
  const open=(img)=>{
    full.src=img.currentSrc||img.src;
    full.alt=img.alt||'Изображение';
    box.classList.add('open');
    document.body.style.overflow='hidden';
  };

  images.forEach(img=>{
    img.tabIndex=0;
    img.setAttribute('title','Нажми, чтобы открыть в полном размере');
    img.addEventListener('click',()=>open(img));
    img.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();open(img);} });
  });
  box.addEventListener('click',e=>{ if(e.target===box || e.target.classList.contains('media-lightbox-close')) close(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&box.classList.contains('open')) close(); });
})();
