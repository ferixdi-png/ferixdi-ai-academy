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
      target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
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
  video.style.background='#080A0B';

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
  const selector='.base-shot img,.partner-shot img,.editorial-poster img';
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


// v19 — final visual audit: compact, readable, equal cards, one clean base overview.
(function(){
  const q=(s,root=document)=>root.querySelector(s);
  const qa=(s,root=document)=>[...root.querySelectorAll(s)];
  const norm=s=>(s||'').replace(/\s+/g,' ').trim();

  // Replace the old learning-base mosaic with the approved overview image.
  const base=q('.program-visual.base-preview');
  if(base){
    base.innerHTML=`
      <div class="base-overview-head">
        <span>КАК УСТРОЕНА БАЗА</span>
        <small>реальные экраны обучения</small>
      </div>
      <figure class="base-overview-card">
        <img src="./media/base-overview.webp" alt="Как устроена база Ferixdi AI — реальные экраны обучения">
      </figure>`;
  }

  // Remove the old decorative "visual worlds / PHOTO 02...07" section completely.
  qa('section').forEach(section=>{
    const t=norm(section.textContent);
    if(
      t.includes('Один подход. Много визуальных миров.') ||
      (t.includes('PHOTO 02') && t.includes('PHOTO 07')) ||
      t.includes('Эти места специально оставлены под будущие генерации')
    ){
      section.remove();
    }
  });

  // Compact the three method cards and keep only the useful copy.
  const approach=q('#approach');
  if(approach){
    const cards=qa('.feature',approach);
    const copy=[
      ['01','Идея и удержание','Темы, вирусные механики и первый кадр как часть самого ролика.'],
      ['02','Сборка контента','Персонажи, промпты, движение, русская речь и единый визуальный язык.'],
      ['03','Данные и деньги','Смотрим цифры, масштабируем рабочее и связываем охват с трафиком и лидами.']
    ];
    cards.slice(0,3).forEach((card,i)=>{
      const d=copy[i]; if(!d) return;
      const n=q('span',card), h=q('h3',card), p=q('p',card);
      if(n) n.textContent=d[0];
      if(h) h.textContent=d[1];
      if(p) p.textContent=d[2];
    });
  }

  // Personal proof: keep both cards exactly the same height; disclaimer stays in the intro text.
  qa('.sold-account-note').forEach(el=>el.remove());

  // Student cases: numbering only, no verbose captions.
  qa('.case-shot-grid .case-shot').forEach((card,i)=>{
    const span=q('figcaption span',card);
    if(span){
      span.textContent=(i===6)
        ? '7 КЕЙС · ДОЛГОСРОЧНЫЙ'
        : (i+1)+' КЕЙС УЧЕНИКА';
    }
  });

  // New cases callout must stay after every existing case.
  const cases=q('#cases');
  const coming=q('.cases-coming-after');
  if(cases && coming) cases.appendChild(coming);

  // Strict 16:9 meme, no cropping.
  const meme=q('.reach-meme img');
  if(meme){
    meme.src='./media/meme-final-16x9.webp';
    meme.style.objectFit='contain';
    meme.style.objectPosition='center';
  }

  // Keep supporting text sections deliberately short.
  const audience=q('.audience-section');
  if(audience){
    const introH=q('.section-intro h2',audience);
    const introP=q('.section-intro p',audience);
    if(introH) introH.textContent='Кому подходит';
    if(introP) introP.textContent='Тем, кому нужны охваты, контент и понятный следующий шаг.';
    const rows=[
      ['AI-креатор','Собираешь форматы под охват, а не просто красивые генерации.'],
      ['Автор / блогер','Нужен конвейер контента и быстрые тесты идей.'],
      ['Маркетолог','Используешь AI как производственный инструмент.'],
      ['Предприниматель','Нужны внимание, аудитория и связка с лидом или партнёркой.']
    ];
    qa('article',audience).slice(0,4).forEach((card,i)=>{
      const d=rows[i]; if(!d) return;
      const h=q('h3',card), p=q('p',card);
      if(h) h.textContent=d[0];
      if(p) p.textContent=d[1];
    });
  }

  // Compact supporting captions.
  qa('.poster-traffic strong').forEach(el=>el.textContent='Охват → трафик → следующий шаг.');
  qa('.poster-no-secret strong').forEach(el=>el.textContent='Практика, реальные кейсы, работа по шагам.');

  const access=q('.access-section');
  if(access){
    const h=q('.access-card h2',access);
    const p=q('.access-card p',access);
    if(h) h.textContent='Закрытая база';
    if(p) p.textContent='Материалы, практика, задания и поддержка — без лишнего шума.';
  }

  // The manifesto should state the operating rule as simply as possible.
  const manifest=q('.manifest-inner');
  if(manifest){
    const h=q('h2',manifest), p=q('p',manifest);
    if(h) h.innerHTML='Взял конкретную идею.<br>В конкретном сервисе сгенерировал.<br>Опубликовал. Всё.';
    if(p) p.textContent='Работаешь на охваты. Не прыгаешь из стороны в сторону.';
  }

  document.documentElement.classList.add('final-audit-v19');
})();


// v19 — fix learning base image: one full readable image, no broken placeholder.
(function(){
  const base=document.querySelector('.program-visual.base-preview') || document.querySelector('.base-preview');
  if(base){
    base.innerHTML=`
      <div class="base-preview-head">
        <span>КАК УСТРОЕНА БАЗА</span>
        <small>реальные экраны обучения</small>
      </div>
      <figure class="base-overview-figure">
        <img class="base-overview-img" src="./media/base-overview.png?v=19" alt="Как устроена база Ferixdi AI">
      </figure>
    `;
  }
})();


// v19 — base overview and final cleanup.
(function(){
  const ready=()=>{
    // Replace the old multi-screenshot learning-base mosaic with the approved single overview image.
    const base=document.querySelector('.program-visual.base-preview');
    if(base){
      base.innerHTML=`
        <div class="base-preview-head">
          <span>КАК УСТРОЕНА БАЗА</span>
          <small>реальные экраны обучения</small>
        </div>
        <figure class="base-overview-final">
          <img src="./media/base-overview.png" alt="Как устроена закрытая база Ferixdi AI">
        </figure>`;
    }

    // Remove the old placeholder gallery / "visual worlds" section completely.
    [...document.querySelectorAll('section')].forEach(section=>{
      const t=(section.textContent||'').replace(/\s+/g,' ').trim();
      if(t.includes('Один подход.') && t.includes('Много визуальных миров.')) section.remove();
      if(t.includes('Эти места специально оставлены под будущие генерации')) section.remove();
    });

    // User asked to remove this transition completely.
    document.querySelectorAll('.poster-traffic').forEach(el=>el.remove());
    [...document.querySelectorAll('section,div')].forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(t==='После генерации Охват → трафик → следующий шаг.' ||
         (t.includes('После генерации') && t.includes('Охват → трафик → следующий шаг.'))){
        const sec=el.closest('section');
        if(sec) sec.remove();
      }
    });

    // Short, human wording in the closed-base block.
    const access=document.querySelector('.access-section');
    if(access){
      const p=access.querySelector('.access-card p');
      if(p) p.textContent='Все материалы чиназес.';
    }

    // Keep the meme as a true horizontal 16:9 image with no crop.
    const meme=document.querySelector('.reach-meme img');
    if(meme){
      meme.src='./media/meme-final-16x9.webp';
      meme.alt='Опять о бабах думает — Бабах на охватах';
    }
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
})();


// v19 — final visual-only audit. No copy changes: only media presentation and rendering quality.
(function(){
  // Replace the old three-shot base mosaic with the approved single overview image.
  const baseGrid=document.querySelector('.base-shot-grid');
  if(baseGrid){
    const figure=document.createElement('figure');
    figure.className='base-overview-figure';
    figure.innerHTML='<img src="./media/base-overview.png" alt="Как устроена база Ferixdi AI — реальные экраны обучения">';
    baseGrid.replaceWith(figure);
  }

  // Image rendering/performance: preserve sharpness and avoid layout jumps.
  document.querySelectorAll('img').forEach((img,i)=>{
    img.decoding='async';
    if(!img.closest('.hero-visual') && !img.closest('.reach-meme')) img.loading='lazy';
  });
  const heroImg=document.querySelector('.hero-visual img');
  if(heroImg){ heroImg.loading='eager'; heroImg.fetchPriority='high'; }

  // Keep the approved meme as a strict 16:9 asset.
  const memeImg=document.querySelector('.reach-meme img');
  if(memeImg){
    memeImg.src='./media/meme-final-16x9.webp';
    memeImg.loading='eager';
    memeImg.decoding='async';
  }
})();


// v19 — final learning-base overview: use the approved composite image instead of cropped screenshots.
(function(){
  const base=document.querySelector('.program-visual.base-preview');
  if(!base) return;
  base.innerHTML='<figure class="base-overview-final"><img src="./media/base/base-overview.png" alt="Как устроена закрытая база Ferixdi AI: реальные разделы обучения 01–05"></figure>';
})();


// v21 — user copy update: hero positioning + cases intro.
(function(){
  const applyCopy=()=>{
    const hero=document.querySelector('.hero');
    if(hero){
      const h1=hero.querySelector('h1');
      if(h1) h1.textContent='Прокачай полезный навык: создавай охватные AI-видео для Instagram с низкой себестоимостью и зарабатывай на партнёрках, контенте для бизнеса и обучении других.';
    }

    const cases=document.querySelector('#cases');
    if(cases){
      const intro=cases.querySelector('.section-intro') || cases.querySelector('.cases-intro') || cases;
      const h2=intro.querySelector('h2');
      const p=intro.querySelector('p');
      if(h2) h2.textContent='Я год изучал, как работают охваты в Instagram.';
      if(p) p.textContent='Затем поделился с другими — и вот что получилось. Реальные кейсы, можешь проверить.';
    }
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyCopy,{once:true});
  }else{
    applyCopy();
  }
})();


// v23 — remove the five program tabs/content blocks, keep the learning-base image.
(function(){
  const simplifyProgram=()=>{
    const program=document.querySelector('#program');
    if(!program) return;

    const intro=program.querySelector('.section-intro');
    if(intro) intro.remove();

    const tabs=program.querySelector('.program-tabs');
    if(tabs) tabs.remove();

    const content=program.querySelector('.program-content');
    if(content) content.remove();

    const stage=program.querySelector('.program-stage');
    if(stage){
      stage.style.display='block';
      stage.style.gridTemplateColumns='1fr';
    }

    const visual=program.querySelector('.program-visual');
    if(visual){
      visual.style.width='100%';
      visual.style.maxWidth='100%';
      visual.style.margin='0 auto';
    }
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',simplifyProgram,{once:true});
  }else{
    simplifyProgram();
  }
})();


// v24 — give ready users a direct path to the paid training access.
(function(){
  const accessUrl='https://t.me/Ferixdishopbot/menu?startapp=product_295766';

  const makeAccessLink=(className,text)=>{
    const a=document.createElement('a');
    a.className=className;
    a.href=accessUrl;
    a.target='_blank';
    a.rel='noopener';
    a.textContent=text;
    return a;
  };

  const applyDirectAccess=()=>{
    // Header: keep analytics, add a direct access CTA beside it.
    const headerInner=document.querySelector('.site-header .header-inner');
    if(headerInner && !headerInner.querySelector('.direct-access-header')){
      const a=makeAccessLink('pill pill-accent direct-access-header','Доступ к обучению ↗');
      headerInner.appendChild(a);
    }

    // Price block: analytics stays first, direct purchase is the second clear option.
    document.querySelectorAll('.price-button').forEach(btn=>{
      if(btn.parentElement && !btn.parentElement.querySelector('.direct-access-price')){
        const direct=makeAccessLink('price-button direct-access-price','Сразу получить доступ ↗');
        btn.insertAdjacentElement('afterend',direct);
      }
    });

    // Closed-base block gets a direct CTA as well.
    const accessCard=document.querySelector('.access-section .access-card');
    if(accessCard && !accessCard.querySelector('.direct-access-base')){
      accessCard.appendChild(makeAccessLink('pill pill-dark direct-access-base','Получить доступ к обучению ↗'));
    }

    // Final analytics block: show both choices together.
    const analyticsBtn=document.querySelector('.analytics-final .analytics-final-button');
    if(analyticsBtn && !document.querySelector('.analytics-final .direct-access-final')){
      const direct=makeAccessLink('analytics-final-button direct-access-final','Сразу в обучение ↗');
      analyticsBtn.insertAdjacentElement('afterend',direct);
    }


  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyDirectAccess,{once:true});
  }else{
    applyDirectAccess();
  }
})();


// v26 — remove the post-results harmony quote block, keep the meme.
(function(){
  const cleanupHarmony=()=>{
    document.querySelectorAll('.harmony-quote').forEach(el=>el.remove());

  };
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',cleanupHarmony,{once:true});
  }else{
    cleanupHarmony();
  }
})();


// v27 — hard-remove obsolete post-results quote copy.
(function(){
  const removeObsoleteQuote=()=>{
    document.querySelectorAll('.harmony-quote').forEach(el=>el.remove());
    [...document.querySelectorAll('section,div,blockquote')].forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(
        t==='После всех цифр' ||
        t.includes('Мне уже этот алгоритм абсолютно понятен') ||
        (t.includes('После всех цифр') && t.includes('гармонии'))
      ){
        const target=el.closest('.harmony-quote') || el;
        if(target && target!==document.body) target.remove();
      }
    });
  };
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',removeObsoleteQuote,{once:true});
  }else{
    removeObsoleteQuote();
  }
})();


// v28 — native looping video slots: hero + training trigger.
(function(){
  const HERO_VIDEO='./media/hero-loop-v28.mp4';
  const ACCESS_VIDEO='./media/access-loop-v28.mp4';

  const makeLoopVideo=(src,className,poster)=>{
    const v=document.createElement('video');
    v.className=className;
    v.autoplay=true;
    v.muted=true;
    v.loop=true;
    v.playsInline=true;
    v.preload='auto';
    v.disablePictureInPicture=true;
    v.setAttribute('muted','');
    v.setAttribute('playsinline','');
    v.setAttribute('webkit-playsinline','');
    v.setAttribute('aria-hidden','true');
    if(poster) v.poster=poster;

    const source=document.createElement('source');
    source.src=src;
    source.type='video/mp4';
    v.appendChild(source);
    return v;
  };

  const exists=async src=>{
    try{
      const r=await fetch(src,{method:'HEAD',cache:'no-store'});
      return r.ok;
    }catch(e){
      return false;
    }
  };

  const installHero=async()=>{
    if(!(await exists(HERO_VIDEO))) return;
    const visual=document.querySelector('.hero-visual');
    if(!visual || visual.querySelector('.hero-loop-video')) return;
    const oldImg=visual.querySelector('img');
    const poster=oldImg ? oldImg.currentSrc || oldImg.src : '';
    const video=makeLoopVideo(HERO_VIDEO,'hero-loop-video',poster);
    visual.replaceChildren(video);
    video.play().catch(()=>{});
  };

  const installAccess=async()=>{
    if(!(await exists(ACCESS_VIDEO))) return;
    const section=document.querySelector('.final-price');
    const grid=section && section.querySelector('.final-price-grid');
    const card=grid && grid.querySelector('.price-card');
    if(!grid || !card || grid.querySelector('.training-trigger-loop')) return;

    const stack=document.createElement('div');
    stack.className='training-trigger-stack';
    const media=document.createElement('div');
    media.className='training-trigger-loop';
    media.appendChild(makeLoopVideo(ACCESS_VIDEO,'training-trigger-video',''));
    card.replaceWith(stack);
    stack.append(media,card);
    media.querySelector('video').play().catch(()=>{});
  };

  const boot=()=>{
    installHero();
    installAccess();
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  }else{
    boot();
  }
})();


// v31 — place new proof visuals in the right narrative positions.
(function(){
  const makeFigure=(className,src,alt,caption)=>{
    const figure=document.createElement('figure');
    figure.className=className;

    const img=document.createElement('img');
    img.src=src;
    img.alt=alt;
    img.loading='lazy';
    img.decoding='async';
    figure.appendChild(img);

    if(caption){
      const figcaption=document.createElement('figcaption');
      figcaption.textContent=caption;
      figure.appendChild(figcaption);
    }
    return figure;
  };

  const mountProofImages=()=>{
    // New account: show that million-view reels already exist on the current account.
    const personal=document.querySelector('.personal-proof');
    if(personal && !personal.querySelector('.new-account-million-proof')){
      const grid=personal.querySelector('.personal-proof-grid') || personal.querySelector('.personal-proof-head');
      const figure=makeFigure(
        'new-account-million-proof',
        './media/new-account-million.webp',
        'Новый Instagram-аккаунт: ролики с 1,5 млн и 1 млн просмотров',
        'Новый аккаунт. Уже есть ролики на 1+ млн просмотров.'
      );
      if(grid) grid.insertAdjacentElement('afterend',figure);
      else personal.appendChild(figure);
    }

    // Partner program: real example of aggregator affiliate accruals.
    const monetization=document.querySelector('.monetization-section');
    if(monetization && !monetization.querySelector('.partner-earnings-proof')){
      const paths=monetization.querySelector('.money-paths') || monetization.querySelector('.money-manifest');
      const figure=makeFigure(
        'partner-earnings-proof',
        './media/partner-earnings.webp',
        'Пример начислений по партнёрской программе агрегатора',
        'Пример начислений по партнёрской программе агрегатора.'
      );
      if(paths) paths.insertAdjacentElement('afterend',figure);
      else monetization.appendChild(figure);
    }

    // Final visual: keep the wide racing image as the last visual before footer.
    const footer=document.querySelector('footer');
    if(footer && !document.querySelector('.site-finale-visual')){
      const section=document.createElement('section');
      section.className='site-finale-visual';
      section.innerHTML=`
        <div class="shell">
          <figure class="site-finale-frame">
            <img src="./media/final-race.webp" alt="Финальный визуальный кадр" loading="lazy" decoding="async">
          </figure>
        </div>
      `;
      footer.parentNode.insertBefore(section,footer);
    }
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',mountProofImages,{once:true});
  }else{
    mountProofImages();
  }
})();

// Make late-inserted proof images accessible through the existing lightbox.
document.addEventListener('DOMContentLoaded',()=>{
  const box=document.querySelector('.media-lightbox');
  if(!box) return;
  const full=box.querySelector('img');
  document.querySelectorAll('.base-overview-final img,.new-account-million-proof img,.partner-earnings-proof img').forEach(img=>{
    img.tabIndex=0;
    img.title='Нажми, чтобы открыть в полном размере';
    const open=()=>{
      full.src=img.currentSrc||img.src;
      full.alt=img.alt;
      box.classList.add('open');
      document.body.style.overflow='hidden';
    };
    img.addEventListener('click',open);
    img.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}
    });
  });
},{once:true});

// Final art-direction: preserve copy/media; improve composition and native navigation.
document.addEventListener('DOMContentLoaded',()=>{
  const statement=document.querySelector('.manifest h2');
  if(statement){
    const lines=statement.innerHTML.split(/<br\s*\/?>(?:\s*)/i);
    statement.replaceChildren(...lines.map(line=>{
      const span=document.createElement('span');span.className='manifest-line';span.innerHTML=line;return span;
    }));
  }
  const heading=document.querySelector('#approach h2');
  if(heading){
    const copy=heading.textContent, split=copy.indexOf('публикация');
    if(split>0){heading.replaceChildren(...[copy.slice(0,split),copy.slice(split)].map(text=>{
      const span=document.createElement('span');span.className='process-heading-line';span.textContent=text;return span;
    }));}
  }
  const usernames=['culebros.ai','feriiixdi','sukaflex_','dreams_come_true_777','o.la.doll','max_metr2','funny.life.house','alex_smart71','artem.ai_reels'];
  document.querySelectorAll('.profile-shot,.case-shot').forEach(card=>{
    const img=card.querySelector('img');
    const username=usernames.find(name=>img?.alt.startsWith('@'+name+' '));
    if(!username) return;
    card.classList.add('instagram-case');
    const link=document.createElement('a');
    link.className='instagram-case-link';link.href='https://www.instagram.com/'+username+'/';
    link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','Открыть Instagram @'+username);
    card.appendChild(link);
  });
  // Reserve intrinsic media dimensions before lazy files arrive (no content changes).
  const dimensions={
    'base-overview.png':[1672,941],'sharp/culebros.webp':[1788,534],'sharp/feriiixdi.webp':[1899,558],
    'new-account-million.webp':[1536,1024],'meme-final-16x9.webp':[1600,900],
    'sharp/sukaflex.webp':[1998,501],'sharp/dreams.webp':[2061,687],'sharp/oladoll.webp':[1815,618],
    'sharp/maxmetr.webp':[1710,507],'sharp/funny.webp':[1752,606],'sharp/alexsmart.webp':[1800,618],
    'sharp/artem.webp':[1821,735],'sharp/partner.webp':[2110,960],'partner-earnings.webp':[1473,1068],'final-race.webp':[1672,941]
  };
  document.querySelectorAll('img').forEach(img=>{
    const size=dimensions[(img.getAttribute('src')||'').replace('./media/','').split('?')[0]];
    if(size){img.width=size[0];img.height=size[1];}
  });
  const capability=matchMedia('(hover: hover) and (pointer: fine) and (min-width: 861px)');
  const root=document.documentElement;
  const cursor=document.createElement('div');cursor.className='ferixdi-cursor';cursor.setAttribute('aria-hidden','true');
  const label=document.createElement('span');label.textContent='OPEN ↗';cursor.appendChild(label);document.body.appendChild(cursor);
  let x=0,y=0,frame=0,visible=false;
  const interactive='a[href],button:not(:disabled),[role="button"],img[tabindex="0"]';
  const draw=()=>{
    frame=0;if(!visible||!capability.matches)return;
    cursor.style.transform=`translate3d(${x-36}px,${y-36}px,0)`;
    cursor.classList.toggle('is-open',!!document.elementFromPoint(x,y)?.closest(interactive));
    cursor.classList.add('is-visible');root.classList.add('ferixdi-pointer');
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw);};
  const reset=()=>{
    visible=false;cancelAnimationFrame(frame);frame=0;
    cursor.classList.remove('is-visible','is-open');root.classList.remove('ferixdi-pointer');
  };
  document.addEventListener('pointermove',event=>{
    if(!capability.matches||event.pointerType!=='mouse'){reset();return;}
    x=event.clientX;y=event.clientY;visible=true;schedule();
  },{passive:true});
  document.addEventListener('pointerout',event=>{if(!event.relatedTarget)reset();},{passive:true});
  document.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse')reset();},{passive:true});
  document.addEventListener('keydown',event=>{if(event.key==='Tab')reset();});
  document.addEventListener('scroll',()=>{if(visible)schedule();},{passive:true,capture:true});
  window.addEventListener('blur',reset);window.addEventListener('pagehide',reset);window.addEventListener('pageshow',reset);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
  capability.addEventListener('change',reset);
},{once:true});

// Storytelling pass: bridge real adjacent chapters without altering existing copy.
document.addEventListener('DOMContentLoaded',()=>{
  const offer=document.querySelector('.final-price');if(offer)offer.id='training-access';
  const bridge=(parent,text,href)=>{
    if(!parent)return;
    const a=document.createElement('a');a.className='story-bridge';a.href=href;
    const copy=document.createElement('span');copy.className='story-bridge-copy';copy.textContent=text;
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 20 28');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M10 1v24M3 18l7 7 7-7');svg.appendChild(path);
    a.append(copy,svg);parent.appendChild(a);
  };
  bridge(document.querySelector('#program .shell'),'Механика понятна. Теперь — результаты на реальных аккаунтах.','#results');
  bridge(document.querySelector('.reach-harmony-grid'),'Что получилось у учеников?','#cases');
  bridge(document.querySelector('#cases'),'Охваты видны. Сколько стоит выпускать такой контент?','#economics');
  bridge(document.querySelector('#economics .shell'),'Себестоимость посчитали. Теперь — куда ведёт охват.','#monetization');
  bridge(document.querySelector('.poster-break-inner'),'Сколько стоит доступ к этой системе?','#training-access');
  // Two pixels of progress, with one scheduled paint per scroll frame and no idle loop.
  const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.appendChild(progress);
  let frame=0;
  const paint=()=>{
    frame=0;const extent=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    progress.style.transform=`scaleX(${extent>0?Math.min(1,Math.max(0,window.scrollY/extent)):0})`;
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  new ResizeObserver(schedule).observe(document.body);paint();
},{once:true});

// Editorial context: additive only; all existing nodes retain their order and copy.
document.addEventListener('DOMContentLoaded',()=>{
  const insert=(selector,key,lead,accent)=>{
    const target=document.querySelector(selector);
    if(!target||document.querySelector('[data-editorial="'+key+'"]'))return;
    const note=document.createElement('aside');
    note.className='editorial-context editorial-'+key;note.dataset.editorial=key;
    const p=document.createElement('p');
    p.append(document.createTextNode(lead+' '));
    const strong=document.createElement('strong');strong.textContent=accent;p.append(strong);
    note.append(p);target.before(note);
  };
  insert('.hero-stats','visibility','Можно быть сильным в своём деле.','Но пока тебя не видят, об этом знают только свои.');
  insert('.manifest','system','Промпты сохранены. Подписки оплачены.','А какую идею делать завтра?');
  insert('#economics .section-intro','attempts','Если каждая попытка — полдня работы,','на следующую идею уже не остаётся сил.');
  insert('#monetization .section-intro','attention','Ролик посмотрели. И пролистнули.','Что должно произойти между просмотром и заявкой?');
},{once:true});
