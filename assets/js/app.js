const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const modules = [
  {id:'start',icon:'◉',title:'Старт и карта',desc:'Куда идём, почему сначала охваты и как устроена система.',lessons:[
    ['map','Карта обучения','AI-контент → охваты → аудитория → монетизация → недвижимость'],
    ['tenk','Практическая веха 10 000','Ориентир курса, а не магическая граница алгоритма'],
    ['mindset','Мышление креатора','Скука автора ≠ усталость аудитории']
  ]},
  {id:'workspace',icon:'⚙',title:'Рабочая область',desc:'Аккаунты, Qwen, Google, генераторы и доступы.',lessons:[
    ['setup','Задание №1: подготовка','Qwen, видео- и фотогенерация'],
    ['qwen','Qwen как рабочий ассистент','Новый диалог = новый контекст'],
    ['google','Google / язык / доступ','Техническая настройка и troubleshooting']
  ]},
  {id:'viral',icon:'⚡',title:'Вирусная механика',desc:'Хук, юмор, порог невидимости и удержание.',lessons:[
    ['anatomy','Анатомия охватов','Почему шутка помогает пробивать первичный тест'],
    ['hook','Хук и Frame 0','Первый кадр уже должен вызывать вопрос'],
    ['scripts','Сильный сценарий','Хук → сетап → ожидание → панч → конец']
  ]},
  {id:'factory',icon:'▣',title:'AI-конвейер',desc:'От шутки или референса до готового ролика.',lessons:[
    ['conveyor','Полуавтоматический конвейер','Текст → Frame 0 → Video → публикация'],
    ['v40','Ferixdi Video Factory v40','Главная актуальная производственная система'],
    ['recreate','Копирование вирусной механики','Видео → Gemini → промпты → новая генерация']
  ]},
  {id:'ideas',icon:'✦',title:'Идеи и поиск',desc:'Где брать шутки, референсы и быстрорастущие креативы.',lessons:[
    ['sources','Источники сценариев','Telegram, Threads, Instagram transcript'],
    ['apify','Apify: поиск растущих роликов','TikTok + Reels + Shorts'],
    ['ownstats','Анализ собственных работ','Apify → CSV → AI Studio']
  ]},
  {id:'realism',icon:'◌',title:'Реализм',desc:'Фото, голос, смартфонная физика и отсутствие стерильности.',lessons:[
    ['photo','Photorealism Engine','Физика обычного случайного смартфонного кадра'],
    ['voice','Voice Performance','Живая речь вместо дикторской озвучки'],
    ['frame0','Frame 0 как физическое состояние','Реализм закладывается до видео']
  ]},
  {id:'characters',icon:'☺',title:'Постоянные персонажи',desc:'От теста типажей к собственному AI-вселенному.',lessons:[
    ['characters','Задание №6: персонажи','2 главных героя + наблюдатель'],
    ['refs','Порядок референсов','Image 1 / Image 2 / Image 3'],
    ['series','Сериализация','Знакомый герой + новый бытовой конфликт']
  ]},
  {id:'video',icon:'▶',title:'Видео и звук',desc:'Omni, Veo, липсинк и ролики длиннее 10 секунд.',lessons:[
    ['models','Omni / Veo','Разные режимы под разные задачи'],
    ['speech','Русская речь','Пунктуация, ударения, speaker lock'],
    ['long','Видео 10+ секунд','Конец предыдущего = начало следующего']
  ]},
  {id:'publish',icon:'↗',title:'Публикация и регулярность',desc:'Ритм, монтаж, профиль и масштабирование.',lessons:[
    ['regularity','Регулярность','3+ качественных публикации и много попыток'],
    ['capcut','Финальная подготовка','Обрезать пустое начало, 1.08 при необходимости'],
    ['profile','Профиль и закрепы','Лучшие три Reels и чистка старых слабых работ']
  ]},
  {id:'analytics',icon:'▥',title:'Аналитика',desc:'Смотреть не только на просмотры, а на повторяемость.',lessons:[
    ['metrics','Что смотреть','Удержание, реакции, профиль, клики, лиды'],
    ['scale','Повторять то, что выстрелило','Меняем одну переменную, несущую механику сохраняем'],
    ['platforms','Instagram ≠ YouTube','Один формат может вести себя по-разному']
  ]},
  {id:'monetize',icon:'₽',title:'Монетизация',desc:'Двухэтапная лестница: Syntx → Wellside.',lessons:[
    ['ladder','Две стадии','До 10К: Syntx · после: недвижимость'],
    ['syntx','Задание №8: Syntx','AI-креатив + понятная видеоинструкция'],
    ['wellside','Wellside / недвижимость','Меняем тему и точку монетизации, а не механику охватов']
  ]},
  {id:'community',icon:'◎',title:'Комьюнити и задания',desc:'Взаимный буст, дисциплина, отчёты и геймификация.',lessons:[
    ['boost','Взаимный буст','Создали → опубликовали → поддержали других'],
    ['tasks','Все задания','Путь от настройки до монетизации'],
    ['members','Участники','Актуальный список без дублей']
  ]},
  {id:'library',icon:'⌘',title:'Библиотека промптов',desc:'Актуальные системы, модули и архив версий.',lessons:[
    ['prompts','Все промпты','Копирование, скачивание и назначение'],
    ['versions','История версий','v15 → v23.1 → v32 → v40'],
    ['clean','ULTRA VIDEO CLEAN','Техническая нормализация MP4 без подделки происхождения']
  ]}
];

const promptLibrary = [
  {name:'FERIXDI VIDEO FACTORY v40.0',file:'assets/prompts/video-factory-v40.txt',status:'АКТУАЛЬНЫЙ',tag:'Главная система',desc:'Единый роутер TEXT / VIDEO / HYBRID / SETUP / IMAGE. Постоянные персонажи, Frame 0, Omni, аудио и публикация.',interactive:true},
  {name:'Photorealism Engine',file:'assets/prompts/photorealism-engine.txt',status:'МОДУЛЬ',tag:'Фото',desc:'Большая система смартфонного фотореализма: глаза, кожа, свет, физика, окружение.'},
  {name:'VOICE PERFORMANCE',file:'assets/prompts/voice-performance.txt',status:'МОДУЛЬ',tag:'Голос',desc:'Живая человеческая речь, дыхание, просодия, акустика и связь голоса с телом.'},
  {name:'Video Recreation Pipeline v32',file:'assets/prompts/video-recreation-v32.txt',status:'СПЕЦРЕЖИМ',tag:'Копирование видео',desc:'Разбор исходного ролика и реконструкция механики для Google Flow / Omni.'},
  {name:'ULTIMATE MASTER PROMPT v32.0',file:'assets/prompts/master-v32.txt',status:'АРХИВ',tag:'15.07.2026',desc:'Переход к адаптивной Comedy OS: Joke DNA, Creative Thesis, QC и защита панчлайна.'},
  {name:'REAL HUMAN COMEDY ENGINE v23.1',file:'assets/prompts/master-v23.1.txt',status:'АРХИВ',tag:'14.07.2026',desc:'Шутка → реальная ситуация → Frame 0 → 10 секунд → финальный смех.'},
  {name:'ALL-IN-ONE VIRAL VIDEO EXECUTOR v15.0',file:'assets/prompts/master-v15.txt',status:'АРХИВ',tag:'Ранняя версия',desc:'Простой автоматический исполнитель: Frame 0, видео, липсинк и пост.'},
  {name:'ULTRA VIDEO CLEAN / EFIX',file:'assets/prompts/ultra-video-clean.txt',status:'ТЕХНИЧЕСКИЙ',tag:'MP4',desc:'Очистка необязательных метаданных и нормализация файла без фальсификации происхождения.'}
];

const media = [
  ['syntx-demo.mp4','Syntx AI: бот и партнёрский кабинет','Демонстрация мини-приложения, партнёрки, баланса и реферальной механики.'],
  ['conveyor-masterclass.mp4','Полуавтоматический конвейер AI-видео','Шутка → мастер-промпт → Frame 0 → Omni → публикация.'],
  ['viral-reference-ai-studio.mp4','Google AI Studio: работа по вирусному референсу','Разбор готового ролика и пересоздание механики.'],
  ['google-language.mp4','Как изменить язык Google-аккаунта','Короткая техническая настройка после получения аккаунта.'],
  ['video-factory-characters.mp4','Video Factory: закрепление персонажей','Как один раз закрепить героев и дальше сохранять внешность.'],
  ['prompt-forge.mp4','Кузница промптов','Практическая демонстрация работы с промптами.']
];

const members = [
  ['Ferixdi','https://www.instagram.com/feriiixdi/',''],
  ['Olga','https://www.instagram.com/o.la.doll/',''],
  ['max_comedy_humor','https://www.instagram.com/max_comedy_humor',''],
  ['dreams_come_true_777','https://www.instagram.com/dreams_come_true_777',''],
  ['funny.life.house','https://www.instagram.com/funny.life.house',''],
  ['sukaflex_','https://www.instagram.com/sukaflex_/',''],
  ['alex_smart71','https://www.instagram.com/alex_smart71/',''],
  ['gushina_photo_','https://www.instagram.com/gushina_photo_',''],
  ['good.zee_','https://www.instagram.com/good.zee_',''],
  ['sergei_promo','https://www.instagram.com/sergei_promo',''],
  ['scoof_man','https://www.instagram.com/scoof_man',''],
  ['Evgenius Creates','https://www.instagram.com/evgenius.creates/','https://www.youtube.com/@evgenius.creates']
];

function allLessons(){return modules.flatMap(m=>m.lessons.map(l=>({module:m,...{id:l[0],title:l[1],subtitle:l[2]}})))}
const lessonMap = Object.fromEntries(allLessons().map(x=>[x.id,x]));
const done = new Set(JSON.parse(localStorage.getItem('ferixdiDone')||'[]'));

function saveProgress(){localStorage.setItem('ferixdiDone',JSON.stringify([...done]));renderProgress()}
function renderProgress(){const total=allLessons().length,p=total?Math.round(done.size/total*100):0;$('#progressBar').style.width=p+'%';$('#progressPct').textContent=p+'%';$('#progressText').textContent=`${done.size} / ${total} уроков`}
function buildNav(){
  $('#nav').innerHTML = `<a class="nav-item" data-route="home"><span class="nav-icon">⌂</span><span>Главная</span></a>` + modules.map(m=>`<a class="nav-item" data-route="module/${m.id}"><span class="nav-icon">${m.icon}</span><span>${m.title}</span></a>`).join('');
  $$('.nav-item').forEach(x=>x.onclick=()=>go(x.dataset.route));
}
function go(route){location.hash='#/'+route}
function route(){return location.hash.replace(/^#\//,'')||'home'}
function render(){
  const r=route();$$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.route===r||r.startsWith('lesson/')&&lessonMap[r.split('/')[1]]?.module.id===x.dataset.route?.split('/')[1]));
  if(r==='home') return renderHome();
  if(r==='prompts') return renderPromptLibrary();
  if(r==='media') return renderMedia();
  if(r==='community') return renderCommunity();
  if(r.startsWith('module/')) return renderModule(r.split('/')[1]);
  if(r.startsWith('lesson/')) return renderLesson(r.split('/')[1]);
  renderHome();
}

function renderHome(){
  $('#view').innerHTML=`
  <div class="hero"><div class="eyebrow">FERIXDI AI ECOSYSTEM · PRACTICAL COURSE</div><h1>Охваты на AI.<br>От первого ролика до системы.</h1><p>Практическая база по созданию коротких AI-видео, разгонам аккаунтов, аналитике, постоянным персонажам и двухэтапной монетизации.</p><div class="hero-actions"><button class="btn" onclick="go('module/start')">Начать обучение</button><button class="btn secondary" onclick="go('prompts')">Библиотека промптов</button><button class="btn secondary" onclick="go('media')">Видео и скриншоты</button></div></div>
  <div class="kpis"><div class="kpi"><strong>${modules.length}</strong><span>разделов системы</span></div><div class="kpi"><strong>${allLessons().length}</strong><span>уроков и практических блоков</span></div><div class="kpi"><strong>10K</strong><span>практический переход к следующей стадии</span></div><div class="kpi"><strong>v40</strong><span>текущая главная Video Factory</span></div></div>
  <div class="section-head"><div><h2>Карта обучения</h2><p>Идём от внимания и производства к аналитике и монетизации.</p></div></div>
  <div class="grid">${modules.map((m,i)=>`<div class="card" onclick="go('module/${m.id}')" style="cursor:pointer"><div class="card-meta"><span class="badge accent">${String(i+1).padStart(2,'0')}</span><span class="badge">${m.lessons.length} урока</span></div><h3>${m.icon} ${m.title}</h3><p>${m.desc}</p></div>`).join('')}</div>
  <div class="section-head"><div><h2>Главная траектория</h2><p>Не смешиваем этапы: сначала внимание, потом конверсия.</p></div></div>
  <div class="timeline"><div class="timeline-item"><div class="timeline-left">Этап 1</div><div class="timeline-body"><h3>Разгон формата</h3><p class="muted">Регулярность, сильный юмор, тест типажей, поиск повторяемой механики.</p></div></div><div class="timeline-item"><div class="timeline-left">До ~10К</div><div class="timeline-body"><h3>Syntx</h3><p class="muted">Монетизация интереса к AI-инструментам через понятные видеоинструкции и партнёрную ссылку.</p></div></div><div class="timeline-item"><div class="timeline-left">После ~10К</div><div class="timeline-body"><h3>Wellside / недвижимость</h3><p class="muted">Постепенная смена тематики без уничтожения рабочей механики охватов.</p></div></div></div>`;
}
function renderModule(id){const m=modules.find(x=>x.id===id);if(!m)return renderHome();$('#view').innerHTML=`<div class="article"><div class="eyebrow">РАЗДЕЛ</div><h1>${m.icon} ${m.title}</h1><p>${m.desc}</p></div><div class="section-head"><div><h2>Уроки</h2><p>Отмечай пройденное — прогресс сохраняется на этом устройстве.</p></div></div><div class="lesson-list">${m.lessons.map((l,i)=>lessonRow(m,l,i)).join('')}</div>`;bindLessonChecks()}
function lessonRow(m,l,i){const d=done.has(l[0]);return `<div class="lesson-row"><button class="lesson-check ${d?'done':''}" data-check="${l[0]}">✓</button><div><h4>${String(i+1).padStart(2,'0')}. ${l[1]}</h4><small>${l[2]}</small></div><div class="lesson-actions"><button class="btn secondary small" onclick="go('lesson/${l[0]}')">Открыть</button></div></div>`}
function bindLessonChecks(){$$('[data-check]').forEach(b=>b.onclick=()=>{done.has(b.dataset.check)?done.delete(b.dataset.check):done.add(b.dataset.check);saveProgress();render()})}

function renderLesson(id){const x=lessonMap[id];if(!x)return renderHome(); const body=lessonContent(id); $('#view').innerHTML=`<div class="article"><div class="eyebrow">${x.module.title}</div><h1>${x.title}</h1><p>${x.subtitle}</p>${body}<div class="hero-actions"><button class="btn ${done.has(id)?'secondary':''}" id="completeBtn">${done.has(id)?'✓ Пройдено':'Отметить как пройденное'}</button><button class="btn secondary" onclick="go('module/${x.module.id}')">Назад к разделу</button></div></div>`;$('#completeBtn').onclick=()=>{done.has(id)?done.delete(id):done.add(id);saveProgress();render()}}
function lessonContent(id){
 const c={
 map:`<div class="callout"><div class="quote">AI-контент → охваты → аудитория → монетизация → недвижимость</div></div><p>Главная бизнес-цель системы — недвижимость как дополнительный источник дохода. Но обучение не начинает с продажи. Сначала строится фундамент: охваты, аудитория, доверие, узнаваемость и регулярный производственный процесс.</p><h2>Почему именно так</h2><p>Холодный аккаунт сначала должен доказать, что умеет удерживать внимание. Поэтому первые этапы посвящены не продаже квартир, а созданию понятного массового контента, тесту механик и накоплению данных.</p>`,
 tenk:`<div class="callout"><strong>10 000 подписчиков — практический ориентир Ferixdi, а не официальный «магический порог» платформ.</strong></div><p>До этой отметки курс делает упор на разгон формата и монетизацию интереса к AI через Syntx. После формирования стартовой аудитории начинается постепенное перепозиционирование в недвижимость через Wellside.</p>`,
 mindset:`<div class="quote">Скука автора ≠ усталость аудитории.</div><p>Одна из главных ловушек креатора — менять рабочий формат только потому, что самому надоело его повторять. Аудитория могла только начать узнавать механику, а алгоритм — только накопить устойчивый сигнал.</p><h2>Правило эксперимента</h2><p>Эксперимент — это сдвиг внутри работающей конструкции: другая интонация, объект, локация, визуальный акцент или ритм. Несущая механика меняется только тогда, когда данные показывают, что она перестала работать.</p>`,
 setup:`<h2>Задание №1 — подготовить рабочую область</h2><div class="steps"><div class="step"><div><strong>Qwen</strong><p>Открой <a href="https://chat.qwen.ai/" target="_blank">chat.qwen.ai</a>. Он используется как доступный текстовый ассистент для идей и промптов.</p></div></div><div class="step"><div><strong>Видео</strong><p>Подготовь доступ к Google AI Pro или Ultra. Для покупки в материалах курса используется один поставщик: <a href="https://plati.market/itm/gemini-ai-ultra-pro-7-30-183-private-account/5050049" target="_blank">Plati.market</a>.</p></div></div><div class="step"><div><strong>Фото</strong><p>Проверь генерацию стартовых кадров через GPT Image или другой доступный генератор.</p></div></div></div><div class="callout">Когда всё готово, результат задания отправляется в личные сообщения <a href="https://t.me/ferixdiii" target="_blank">@ferixdiii</a>.</div>`,
 qwen:`<p>В вводном уроке Qwen используется как основной доступный текстовый помощник.</p><div class="callout"><strong>Железное правило из урока:</strong> новая задача → новый диалог. Старый контекст может тянуть за собой ненужные детали и ухудшать предсказуемость результата.</div><button class="btn secondary" onclick="go('media')">Смотреть видеоурок</button>`,
 google:`<p>После получения Google-аккаунта может понадобиться сменить язык интерфейса. В медиа-библиотеке есть отдельная демонстрация.</p><h2>Если Flow / AI Studio не открывается</h2><p>В материалах сообщества использовались VPN и приватные браузеры. Конкретный сервис может работать нестабильно, поэтому этот блок нужно воспринимать как troubleshooting, а не вечную гарантию доступности.</p><div class="mini-links"><a href="https://labs.google/fx/tools/flow" target="_blank">Google Flow</a><a href="https://aistudio.google.com" target="_blank">AI Studio</a></div>`,
 anatomy:`<p>В статье Ferixdi вводится понятие «порог невидимости»: первая небольшая выдача, на которой ролик должен показать достаточно сильную реакцию, чтобы получить расширение охвата.</p><div class="callout"><strong>Важно:</strong> цифры и формулировки статьи — авторская модель объяснения, а не официальная спецификация Instagram или YouTube.</div><h2>Главный практический вывод</h2><p>Качественный свет и дорогая картинка сами по себе не создают пересылаемость. Для массового короткого формата ключом часто становится узнаваемый бытовой конфликт, быстрый юмор и желание отправить ролик знакомому.</p><a class="btn secondary" href="assets/docs/anatomy-reach.html" target="_blank">Открыть полную статью</a>`,
 hook:`<div class="quote">Первый кадр — уже хук. Первый звук — уже начало сцены.</div><p>Frame 0 должен работать ещё до движения. Локация, персонажи, действие и визуальный конфликт должны вызывать вопрос: «Что здесь происходит?»</p><p>Если статичный первый кадр без звука не вызывает желания увидеть продолжение — его стоит переделать до генерации видео.</p>`,
 scripts:`<div class="callout"><strong>Формула:</strong> ХУК → СЕТАП → ОЖИДАНИЕ → ПАНЧ → КОНЕЦ.</div><p>Основу юмора лучше брать из реальных человеческих шуток, бытовых наблюдений и уже понятных механик. AI сильнее в визуализации, сцене, локации, контрасте и масштабировании.</p><h2>Один ролик = одна главная шутка</h2><p>Одна ситуация, один визуальный крючок, один панч. После сильной финальной реплики разговор не продолжается.</p>`,
 conveyor:`<p>Базовая производственная цепочка курса:</p><div class="callout"><div class="quote">Идея / шутка → мастер-промпт → Frame 0 → видео → финальная обработка → публикация</div></div><h2>Сначала процесс, потом ниша</h2><p>На раннем этапе разрешено работать со случайными персонажами и простыми шутками. Цель — научиться быстро проходить весь конвейер, а уже потом закреплять героев и переносить механику в недвижимость.</p><button class="btn secondary" onclick="go('media')">Открыть видео «Полуавтоматический конвейер»</button>`,
 v40:`<div class="callout"><strong>Текущая центральная система:</strong> FERIXDI VIDEO FACTORY v40.0.</div><p>Она объединяет ранее разрозненные ветки и сама маршрутизирует вход: текст, исходное видео, видео + новый текст, закрепление персонажей или готовый Frame 0.</p><h2>Режимы</h2><ul><li>SETUP — закрепить постоянных персонажей.</li><li>TEXT — создать новую сцену из текста.</li><li>VIDEO — разобрать и пересоздать механику исходного видео.</li><li>HYBRID — сохранить визуальную механику и заменить текст.</li><li>IMAGE — продолжить уже готовый Frame 0.</li></ul><button class="btn" onclick="openPrompt('assets/prompts/video-factory-v40.txt',true)">Открыть v40</button>`,
 recreate:`<p>Второй способ производства — идти не от текстовой шутки, а от уже работающего видеореференса.</p><div class="steps"><div class="step"><div>Скачать исходный ролик.</div></div><div class="step"><div>Загрузить его в Gemini / AI Studio вместе с мастер-промптом.</div></div><div class="step"><div>Получить анализ механики и промпты.</div></div><div class="step"><div>Собрать новый Frame 0 и оживить его в видео-модели.</div></div></div><p>Для максимально подробного случая используется forensic-подход / TWIN TEST: keyframe grid, identity cards, micro-timeline и reconstruction prompt.</p>`,
 sources:`<h2>Где брать основу</h2><ul><li>Telegram-каналы с короткими шутками и диалогами.</li><li>Threads: «семейный юмор», «неловкая ситуация», «история с работы» и т. п.</li><li>Instagram: готовую речь можно извлечь через <a href="https://stt.ai/transcribe/instagram/?lang=ru" target="_blank">STT.ai</a>.</li><li>Вирусные видео: скачать и анализировать механику в AI Studio.</li></ul><div class="callout">Не выдавай придуманную AI-шутку за «реальный опубликованный анекдот». Если заявляется реальный источник — нужна ссылка.</div>`,
 apify:`<p>Apify позволяет без кода собирать свежие ролики из TikTok, Instagram и YouTube через готовые scrapers.</p><div class="steps"><div class="step"><div>Запросы <code>#ai</code> и <code>#ии</code>, 500–1000 свежих роликов.</div></div><div class="step"><div>Экспортировать URL, Date, Views, Likes, Comments, Shares, Duration, Author в CSV/XLSX.</div></div><div class="step"><div>Рассчитать возраст и views/hour, вывести ТОП быстрорастущих.</div></div></div><div class="callout"><strong>Самый точный приём:</strong> два парсинга одной и той же выборки через несколько часов. Тогда видно реальный прирост, а не только среднюю скорость с момента публикации.</div><a class="btn secondary" href="https://apify.com" target="_blank">Открыть Apify</a>`,
 ownstats:`<p>Отдельная аналитика — не внешние тренды, а собственный аккаунт.</p><div class="callout">Apify → CSV → Google AI Studio → темы, хуки, форматы, выбросы, слабые ролики и 10 новых идей на основе своих успешных работ.</div><p>Лучше загружать CSV в ту же ветку AI Studio, где уже ведётся работа с контентом.</p><a class="btn secondary" href="assets/docs/apify-own-analysis.pdf" target="_blank">Открыть PDF-инструкцию</a>`,
 photo:`<p>Большой Photorealism Engine рассматривает реализм не как «максимум деталей», а как физическую согласованность камеры, кожи, глаз, света, материалов и окружения.</p><div class="quote">Цель не maximum beauty. Цель — natural photographic credibility.</div><p>Этот блок можно использовать как отдельную надстройку к фотопромпту.</p><button class="btn" onclick="openPrompt('assets/prompts/photorealism-engine.txt')">Открыть промпт</button>`,
 voice:`<p>VOICE PERFORMANCE нужен на стадии видеогенерации. Он задаёт не красивый голос, а ощущение реального человека, который говорит конкретному собеседнику, думает, дышит и реагирует в момент речи.</p><h2>Приоритет</h2><p>Если идеальная дикция конфликтует с естественностью — сохраняется естественность без потери понятности.</p><button class="btn" onclick="openPrompt('assets/prompts/voice-performance.txt')">Открыть Voice Performance</button>`,
 frame0:`<p>Реализм изображения закладывается до анимации. В стартовом кадре уже должны быть лицо, кожа, свет, оптика, композиция и физическое положение объектов.</p><p>В видеопромпте лучше концентрироваться на движении, мимике, камере, речи, паузах и липсинке, а не повторять огромный блок про кожу.</p>`,
 characters:`<p>После начального теста разных типажей наступает этап закрепления постоянных персонажей.</p><div class="callout"><strong>Основной состав:</strong> главный персонаж №1 · главный персонаж №2 · наблюдатель №3.</div><p>Главные герои несут диалог или конфликт. Наблюдатель располагается дальше и усиливает сцену естественной реакцией.</p>`,
 refs:`<div class="quote">Image 1 = герой №1 · Image 2 = герой №2 · Image 3 = наблюдатель</div><p>Этот порядок не меняется между сценами. В мастер-промпт референсы загружаются один раз для фиксации ролей. При фактической генерации нового изображения референсы прикладываются заново.</p>`,
 series:`<p>Постоянный персонаж — это не обязанность повторять один и тот же сюжет. Стабильны лицо, характер и узнаваемая динамика, а ситуации и конфликты меняются.</p><div class="callout"><strong>Формула:</strong> знакомый герой + бытовой конфликт + контраст характеров + неожиданный панчлайн + причина отправить другу.</div>`,
 models:`<p>В материалах курса Omni используется как основной удобный генератор коротких роликов с русской речью, а Veo Fast — как альтернативный режим для экспериментов. Наблюдения по «свободе» конкретных моделей относятся к практике автора и могут меняться с обновлениями платформ.</p>`,
 speech:`<h2>Практические правила русской речи</h2><ul><li>Убирать тире и лишние знаки из lip-sync версии.</li><li>Если один человек произносит длинную реплику, точки иногда могут провоцировать смену голоса.</li><li>Ударение можно подсказать заглавной буквой: кАтер, договОр.</li><li>При необходимости растянуть гласную: оочень.</li><li>Если слово продолжает ломаться — заменить на более простое.</li></ul>`,
 long:`<div class="quote">Конец предыдущего видео = начало следующего.</div><p>Для роликов длиннее 10 секунд речь делится на отдельные части, а визуальная непрерывность строится через последний кадр предыдущего фрагмента.</p><div class="steps"><div class="step"><div>В CapCut встать на самый последний кадр.</div></div><div class="step"><div>Меню над предпросмотром → «Экспортировать стоп-кадр».</div></div><div class="step"><div>Загрузить стоп-кадр в Omni как стартовый кадр следующей части.</div></div></div><div class="media-grid"><div class="media-card"><img src="assets/media/omni-10plus-capcut.jpg"><div class="media-body"><h4>Шаг 1 — экспорт стоп-кадра</h4></div></div><div class="media-card"><img src="assets/media/omni-10plus-flow.jpg"><div class="media-body"><h4>Шаг 2 — старт следующего фрагмента</h4></div></div></div>`,
 regularity:`<p>Регулярность в этой системе нужна не как «магическая награда алгоритма», а как способ быстрее собрать данные, увеличить число качественных попыток и найти повторяемую механику.</p><div class="callout"><strong>Практический минимум курса:</strong> от 3 роликов в день, если качество и процесс это позволяют. Больше — не самоцель.</div><p>Не делать вывод по одному или двум роликам. Стабильность видна на серии.</p><a class="btn secondary" href="assets/docs/regularity.html" target="_blank">Полная статья о регулярности</a>`,
 capcut:`<div class="quote">Первый кадр — уже хук. Первый звук — уже начало сцены.</div><p>AI-генерация часто добавляет небольшую пустую паузу до первой реплики. Перед публикацией её нужно убрать.</p><img src="assets/media/capcut-start-trim.jpg" style="width:100%;border-radius:16px;border:1px solid var(--line)"><h2>Дополнительно</h2><p>По опыту автора, скорость около 1.08 иногда делает AI-речь живее. Это не обязательное правило: применять только если ролик действительно ощущается затянутым.</p>`,
 profile:`<p>Закрепи во вкладке Reels три ролика с лучшими показателями просмотров и вовлечённости — это витрина аккаунта.</p><h2>Чистка профиля</h2><p>Практика курса: старые ролики, которые давно перестали расти, можно пересмотреть на предмет удаления, если они остаются ниже 2 000 просмотров или не набрали хотя бы 30 лайков. Свежие ролики не трогать.</p>`,
 metrics:`<p>Просмотры — не единственная метрика. Для роста формата полезно смотреть удержание, досмотры, пересмотры, отправки, комментарии, переходы в профиль, клики, лиды.</p><p>Для недвижимости цепочка длиннее: охват → визит в профиль → переход на персональную страницу → заявка → квалификация → сделка.</p>`,
 scale:`<div class="quote">Выстрелило → повтори механику, а не копию файла.</div><p>Стабильный формат меняется контролируемо. Меняй одну переменную за раз: локацию, объект, характер конфликта, тип героя или визуальный акцент. Так проще понять, что именно влияет на результат.</p>`,
 platforms:`<p>Внутри курса зафиксировано практическое наблюдение: ролик, который хорошо работает в Instagram, может слабее вести себя на YouTube и наоборот.</p><p>Не считать это универсальным законом. Смысл — анализировать площадки отдельно и не делать вывод только по одной.</p>`,
 ladder:`<div class="timeline"><div class="timeline-item"><div class="timeline-left">Фаза 1</div><div class="timeline-body"><h3>До ~10K — Syntx</h3><p>Монетизируем интерес аудитории к AI-инструментам.</p></div></div><div class="timeline-item"><div class="timeline-left">Фаза 2</div><div class="timeline-body"><h3>После ~10K — Wellside</h3><p>Постепенно переводим рабочую механику охватов в тематику недвижимости.</p></div></div></div>`,
 syntx:`<p>Главная задача — не просто дать ссылку, а провести человека по понятному пути.</p><div class="callout"><strong>Схема:</strong> AI-креатив → запись экрана + голос → 3 понятных действия → переход в бот.</div><p>Каждый 3–5 креатив можно дополнять такой связкой. Инструкция 15–25 секунд, минимум воды.</p><div class="mini-links"><a href="https://t.me/syntxaibot?start=aff_6913446846" target="_blank">Syntx bot</a><a href="https://t.me/annasyntx" target="_blank">Промокод / доступ @annasyntx</a><a href="https://online-video-cutter.com/ru/screen-recorder" target="_blank">Запись экрана</a><a href="https://www.minimax.io/audio" target="_blank">MiniMax Audio</a></div><button class="btn secondary" onclick="go('media')">Смотреть демонстрацию</button>`,
 wellside:`<div class="callout"><strong>Главное:</strong> меняем тему и точку монетизации, а не то, что уже даёт охваты.</div><p>Переход делается постепенно. Первые 20–30 роликов — перепозиционирование: сохраняются темп, юмор и механика, но бытовые конфликты смещаются в сторону квартир, ремонта, аренды, ипотеки, соседей и покупок.</p><h2>Воронка</h2><p>Ролик → профиль → персональная страница Wellside → заявка → CRM → работа брокера.</p><div class="mini-links"><a href="https://t.me/wellside_partners_bot?start=bobjnvpbkb" target="_blank">Регистрация Wellside</a><a href="assets/docs/wellside-monetization.pdf" target="_blank">Мануал PDF</a><a href="assets/docs/hashtags-wellside.pdf" target="_blank">Хэштеги PDF</a></div>`,
 boost:`<p>Каждый участник один раз присылает @ferixdiii ссылки на Instagram и YouTube. Затем работает цикл взаимной поддержки.</p><div class="quote">Создали → опубликовали → поддержали других.</div><p>Поддержка должна быть содержательной реакцией на конкретный ролик, а не формальным набором эмодзи.</p><div class="mini-links"><a href="https://t.me/c/4379032875/67" target="_blank">Ветка взаимного буста</a><a href="https://t.me/ferixdiii" target="_blank">Отправить аккаунты</a></div>`,
 tasks:`${taskHtml()}`,
 members:`<p>Актуальный список без дублей. Для добавления или обновления ссылки — <a href="https://t.me/ferixdiii" target="_blank">@ferixdiii</a>.</p>${memberHtml()}`,
 prompts:`${promptGridHtml()}`,
 versions:`<div class="timeline"><div class="timeline-item"><div class="timeline-left">v15</div><div class="timeline-body"><h3>Простой исполнитель</h3><p>Frame 0 → видео → липсинк → пост.</p></div></div><div class="timeline-item"><div class="timeline-left">v23.1</div><div class="timeline-body"><h3>Real Human Comedy Engine</h3><p>Тайминг, Frame 0, движение, финальный смех.</p></div></div><div class="timeline-item"><div class="timeline-left">v32</div><div class="timeline-body"><h3>Adaptive Comedy OS</h3><p>Joke DNA, Creative Thesis, Frame 0 QC, защита панчлайна и ремонт.</p></div></div><div class="timeline-item"><div class="timeline-left">v40</div><div class="timeline-body"><h3>Unified Video Factory</h3><p>Управляющий слой, который объединяет TEXT, VIDEO, HYBRID и постоянных персонажей.</p></div></div></div><a class="btn secondary" href="assets/docs/v23-to-v32.pdf" target="_blank">Разбор 66 изменений v23.1 → v32</a>`,
 clean:`<p>ULTRA VIDEO CLEAN — технический регламент подготовки обычного совместимого MP4.</p><div class="callout"><strong>Базовый приоритет:</strong> Stream Copy → минимальное перекодирование → полное перекодирование только при необходимости.</div><p>Удаляются только необязательные контейнерные metadata. Не нужно подделывать iPhone, GPS, модель камеры, ISO или дату съёмки.</p><p>Корректная формулировка результата: «файл технически очищен от необязательных метаданных и приведён к обычному совместимому MP4» — без обещаний об обходе детекторов.</p><button class="btn" onclick="openPrompt('assets/prompts/ultra-video-clean.txt')">Открыть EFIX</button>`
 };return c[id]||'<p>Материал будет отображён в составе этого раздела.</p>'}

function taskHtml(){return [
['1','Подготовка рабочей области','Qwen, доступ к видео/фото генерации. Отправить «Готово» @ferixdiii.'],
['2','Создать полуавтоматический конвейер','Минимум 10 источников, 5 шуток, 5 Frame 0, 5 роликов.'],
['3','Начать разгон формата','Публиковать в Reels + Shorts. Сделали → опубликовали → посмотрели реакцию → следующий.'],
['4','Выработать регулярность','Отчёт @ferixdiii: как часто создаёте, когда публикуете, готовы ли поддерживать участников.'],
['5','Копирование залетевших форматов','Создать по AI Studio Master Prompt 3 ролика, опубликовать и отправить ссылки.'],
['6','Постоянные персонажи','Референсы героев + один ролик с ними по Video Factory.'],
['7','Закрепить ТОП-3 Reels','Три лучшие работы по просмотрам и вовлечённости.'],
['8','Syntx-креатив + инструкция','Запись экрана и голоса 15–25 сек, встроенная после сильного AI-креатива.']
].map(x=>`<div class="task"><div class="task-num">ЗАДАНИЕ №${x[0]}</div><h3>${x[1]}</h3><p class="muted">${x[2]}</p></div>`).join('')}
function memberHtml(){return `<div class="community-grid">${members.map(m=>`<div class="person"><strong>${m[0]}</strong><a href="${m[1]}" target="_blank">Instagram ↗</a>${m[2]?` · <a href="${m[2]}" target="_blank">YouTube ↗</a>`:''}</div>`).join('')}</div>`}
function promptGridHtml(){return `<div class="prompt-grid">${promptLibrary.map((p,i)=>`<div class="prompt-card"><div class="card-meta"><span class="badge ${i===0?'accent':'purple'}">${p.status}</span><span class="badge">${p.tag}</span></div><h3>${p.name}</h3><p class="desc">${p.desc}</p><div class="hero-actions"><button class="btn small" onclick="openPrompt('${p.file}',${p.interactive||false})">Открыть</button><a class="btn secondary small" href="${p.file}" download>Скачать TXT</a></div></div>`).join('')}</div>`}
function renderPromptLibrary(){$('#view').innerHTML=`<div class="article"><div class="eyebrow">БИБЛИОТЕКА</div><h1>Промпты и системы</h1><p>Актуальный вход — Video Factory v40. Старые версии сохранены как история и отдельные инструменты.</p></div><div class="section-head"><div><h2>Все системы</h2><p>Оригиналы сохранены отдельными файлами.</p></div></div>${promptGridHtml()}`}
function renderMedia(){$('#view').innerHTML=`<div class="article"><div class="eyebrow">МЕДИА</div><h1>Видео и скриншоты</h1><p>Практические демонстрации встроены прямо в обучение.</p></div><div class="media-grid">${media.map(m=>`<div class="media-card"><video controls preload="metadata" src="assets/media/${m[0]}"></video><div class="media-body"><h4>${m[1]}</h4><p class="muted">${m[2]}</p></div></div>`).join('')}<div class="media-card"><img src="assets/media/capcut-start-trim.jpg"><div class="media-body"><h4>Обрезка пустого начала</h4><p class="muted">Первый звук должен начинать сцену сразу.</p></div></div></div>`}
function renderCommunity(){$('#view').innerHTML=`<div class="article"><div class="eyebrow">COMMUNITY</div><h1>Взаимный буст</h1><p>Поддержка работает только когда каждый не ждёт реакций, а сам регулярно помогает другим.</p></div>${memberHtml()}<div class="callout">Хотите добавить себя или обновить ссылку? Напишите <a href="https://t.me/ferixdiii" target="_blank">@ferixdiii</a>.</div>`}

async function openPrompt(file,interactive=false){
 const txt=await fetch(file).then(r=>r.text());
 const safe=txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 $('#modalBody').innerHTML=`<div class="eyebrow">PROMPT VIEWER</div><h2>${file.split('/').pop()}</h2><div class="toolbar"><button class="btn small" id="copyPrompt">Скопировать целиком</button><a class="btn secondary small" href="${file}" download>Скачать TXT</a>${interactive?'<span class="badge accent">Наведи на строку — увидишь её роль</span>':''}</div><div class="prompt-viewer">${safe.split('\n').map((l,i)=>`<div class="prompt-line" data-raw="${encodeURIComponent(l)}"><span class="ln">${i+1}</span><code>${l||' '}</code></div>`).join('')}</div><div class="line-tip" id="lineTip"></div>`;
 $('#modal').classList.add('open');$('#modal').setAttribute('aria-hidden','false');
 $('#copyPrompt').onclick=()=>navigator.clipboard.writeText(txt).then(()=>{$('#copyPrompt').textContent='Скопировано ✓';setTimeout(()=>$('#copyPrompt').textContent='Скопировать целиком',1200)});
 if(interactive){const tip=$('#lineTip');$$('.prompt-line').forEach(el=>{el.onmousemove=e=>{const raw=decodeURIComponent(el.dataset.raw);tip.textContent=explainLine(raw);tip.style.display='block';tip.style.left=Math.min(e.clientX+14,innerWidth-380)+'px';tip.style.top=Math.min(e.clientY+14,innerHeight-120)+'px'};el.onmouseleave=()=>tip.style.display='none'})}
}
function explainLine(l){const s=l.toLowerCase();if(!l.trim())return'Разделитель: визуально отделяет логические блоки системы.';if(s.includes('mode')||s.includes('режим'))return'Маршрутизация: помогает системе понять, какой сценарий работы включить.';if(s.includes('character')||s.includes('персонаж')||s.includes('identity'))return'Консистентность персонажей: фиксирует роль, внешность или правила сохранения личности.';if(s.includes('frame 0')||s.includes('frame0'))return'Frame 0: задаёт физическое начальное состояние будущего видео.';if(s.includes('dialog')||s.includes('реплик')||s.includes('speech')||s.includes('says in russian'))return'Речь: защищает точный текст, говорящего и синхронизацию губ.';if(s.includes('camera')||s.includes('камера'))return'Камера: ограничивает лишнее движение и удерживает выбранную визуальную механику.';if(s.includes('realism')||s.includes('реалист'))return'Реализм: снижает постановочность и противоречия между человеком, камерой и окружением.';if(s.includes('audio')||s.includes('звук')||s.includes('voice'))return'Аудио: управляет голосом, акустикой и синхронностью звуковых событий.';if(s.includes('laughter')||s.includes('смех'))return'Финальная реакция: определяет характер, момент и длительность смеха после панчлайна.';if(s.includes('negative')||s.includes('запрещ')||s.includes('do not')||s.includes('no '))return'Ограничение: защищает генерацию от типичной ошибки или нежелательного поведения модели.';if(s.includes('priority')||s.includes('приоритет'))return'Иерархия: решает конфликт между несколькими инструкциями.';if(s.startsWith('#'))return'Заголовок блока: группирует инструкции по одной производственной функции.';return'Рабочая строка: уточняет поведение системы и уменьшает пространство для случайной интерпретации.'}

function search(q){q=q.trim().toLowerCase();if(!q)return render();const hits=allLessons().filter(x=>(x.title+' '+x.subtitle+' '+x.module.title).toLowerCase().includes(q));const ph=promptLibrary.filter(p=>(p.name+' '+p.desc+' '+p.tag).toLowerCase().includes(q));$('#view').innerHTML=`<div class="article"><div class="eyebrow">ПОИСК</div><h1>Результаты: «${q.replace(/[<>]/g,'')}»</h1></div><div class="search-results">${hits.map(h=>`<div class="search-hit" onclick="go('lesson/${h.id}')"><strong>${h.title}</strong><div class="muted small">${h.module.title} · ${h.subtitle}</div></div>`).join('')}${ph.map(p=>`<div class="search-hit" onclick="openPrompt('${p.file}',${p.interactive||false})"><strong>${p.name}</strong><div class="muted small">${p.desc}</div></div>`).join('')}${!hits.length&&!ph.length?'<div class="card">Ничего не найдено.</div>':''}</div>`}

window.go=go;window.openPrompt=openPrompt;
window.addEventListener('hashchange',render);
$('#searchInput').addEventListener('input',e=>search(e.target.value));
$('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');
$('#themeBtn').onclick=()=>document.documentElement.classList.toggle('light');
$$('[data-close]').forEach(x=>x.onclick=()=>{$('#modal').classList.remove('open');$('#modal').setAttribute('aria-hidden','true')});
buildNav();renderProgress();render();