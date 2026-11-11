const people=["Riya", "Sam", "Noor", "Mevrouw de Graaf"],devices=["Telefoon", "Laptop", "Tablet", "Computer"],apps=["Instagram", "WhatsApp", "Quizlet", "Roblox"];
const table=document.getElementById('table');let highest=10;
for(const card of table.querySelectorAll('.gamecard')){
 const initial={x:parseFloat(card.style.left),y:parseFloat(card.style.top)};card.dataset.initial=JSON.stringify(initial);
 card.querySelector('.flipbtn').addEventListener('click',e=>{e.stopPropagation();card.classList.toggle('flipped')});
 card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.classList.toggle('flipped')}});
 card.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;if(e.button!==0)return;const rect=table.getBoundingClientRect();const startX=e.clientX,startY=e.clientY,x=parseFloat(card.style.left),y=parseFloat(card.style.top);card.style.zIndex=++highest;card.classList.add('dragging');card.setPointerCapture(e.pointerId);
 const move=ev=>{const dx=ev.clientX-startX,dy=ev.clientY-startY;card.style.left=Math.max(0,Math.min(table.clientWidth-card.offsetWidth,x+dx))+'px';card.style.top=Math.max(0,Math.min(table.clientHeight-card.offsetHeight,y+dy))+'px'};
 const end=()=>{card.classList.remove('dragging');card.removeEventListener('pointermove',move);card.removeEventListener('pointerup',end);card.removeEventListener('pointercancel',end)};
 card.addEventListener('pointermove',move);card.addEventListener('pointerup',end);card.addEventListener('pointercancel',end);
 });
}
document.getElementById('reset').onclick=()=>{if(!confirm('Alle kaarten terugleggen op hun beginpositie?'))return;table.querySelectorAll('.gamecard').forEach(c=>{const p=JSON.parse(c.dataset.initial);c.style.left=p.x+'px';c.style.top=p.y+'px';c.classList.remove('flipped')})};
function openModal(id){document.querySelectorAll('.modal').forEach(m=>m.classList.remove('open'));document.getElementById(id).classList.add('open')}
function closeModal(){document.querySelectorAll('.modal').forEach(m=>m.classList.remove('open'))}
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.open)));
document.querySelectorAll('.close,.closeaction').forEach(b=>b.addEventListener('click',closeModal));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal()}));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
// L-vormig rooster: personen x apparaten, personen x apps, apps x apparaten.
const grid=document.createElement('table');grid.className='logic';const matrix={};
function row(cells){const tr=document.createElement('tr');cells.forEach(c=>tr.append(c));grid.append(tr)}
function th(t,cls='',span=1){const el=document.createElement('th');el.textContent=t;el.className=cls;el.colSpan=span;return el}
function cell(a,b){const td=document.createElement('td');const bt=document.createElement('button');bt.type='button';bt.dataset.v='';bt.setAttribute('aria-label',a+' en '+b+': onbekend');bt.onclick=()=>{const v=bt.dataset.v;bt.dataset.v=v===''?'no':v==='no'?'yes':'';bt.textContent=bt.dataset.v==='no'?'×':bt.dataset.v==='yes'?'✓':'';bt.setAttribute('aria-label',a+' en '+b+': '+(bt.dataset.v||'onbekend'))};td.append(bt);return td}
row([th(''),th('','',4),th('','',4)]);
row([th(''),...devices.map(n=>th(n)),...apps.map(n=>th(n))]);
for(const p of people)row([th(p,'rowhead'),...devices.map(d=>cell(p,d)),...apps.map(a=>cell(p,a))]);
for(const d of devices){
 const empty=Array.from({length:4},()=>{const td=document.createElement('td');td.className='emptycorner';return td});
 row([th(d,'rowhead'),...apps.map(a=>cell(a,d)),...empty]);
}
document.getElementById('gridholder').append(grid);document.getElementById('cleargrid').onclick=()=>{if(confirm('Alle kruisjes en vinkjes wissen?'))grid.querySelectorAll('td button').forEach(b=>{b.dataset.v='';b.textContent=''})};
for(const [id,items] of [['ansperson',people],['ansdevice',devices],['ansapp',apps]]){const s=document.getElementById(id);s.add(new Option('Kies…',''));items.forEach(x=>s.add(new Option(x,x)))}
document.getElementById('checkanswer').onclick=()=>{const p=document.getElementById('ansperson').value,d=document.getElementById('ansdevice').value,a=document.getElementById('ansapp').value;document.getElementById('result').textContent=!p||!d||!a?'Vul eerst alle drie de antwoorden in.':p==='Riya'&&d==='Telefoon'&&a==='Instagram'?'Goed onderzocht! Je hebt de geheime foto opgelost.':'Nog niet helemaal. Kijk opnieuw naar het bewijs en de kaarten.'};

const vocabTerms=[['stiekem', 'secretly'], ['het apparaat', 'the device'], ['de telefoon', 'the phone'], ['de foto plaatsen', 'to post a photo'], ['het bericht', 'the message'], ['ontvangen', 'to receive'], ['de bioscoop', 'the cinema'], ['het bureau', 'the desk'], ['de docent', 'the teacher'], ['de woordjes', 'the vocabulary words'], ['uit je hoofd leren', 'to memorise'], ['vergeten', 'to forget'], ['het verhaal', 'the story'], ['de vind-ik-leuk', 'the like'], ['de reactie', 'the comment'], ['verbeteren', 'to improve'], ['de verjaardag', 'the birthday'], ['het kluisje', 'the locker'], ['de schoolregel', 'the school rule'], ['het bewijs', 'the evidence'], ['de verdachte', 'the suspect']];
const vocabBox=document.getElementById('vocabitems');
function renderVocabulary(filter=''){
 vocabBox.replaceChildren();let count=0;
 for(const [nl,en] of vocabTerms){if(!(nl+' '+en).toLowerCase().includes(filter.toLowerCase()))continue;
  const item=document.createElement('div');item.className='vocabentry';
  const a=document.createElement('strong');a.textContent=nl;
  const b=document.createElement('span');b.textContent=en;
  item.append(a,b);vocabBox.append(item);count++;
 }
 if(!count){const empty=document.createElement('p');empty.textContent='Geen woorden gevonden.';vocabBox.append(empty)}
}
document.getElementById('vocabsearch').addEventListener('input',e=>renderVocabulary(e.target.value));renderVocabulary();
;
(function(){
 const notify=()=>{const active=!!document.querySelector('.modal.open');parent.postMessage({type:'nietpluis-modal',open:active},'*');};
 const obs=new MutationObserver(notify);
 document.querySelectorAll('.modal').forEach(el=>obs.observe(el,{attributes:true,attributeFilter:['class']}));
 window.addEventListener('keydown',e=>{if(e.key==='Escape'){const modal=document.querySelector('.modal.open');if(modal){const close=modal.querySelector('.close');if(close)close.click();}}});
 notify();
})();
;
(function(){
 let last=0;
 function updateHeight(){
  const h=Math.ceil(Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,document.documentElement.offsetHeight,document.body.offsetHeight));
  if(h>0 && Math.abs(h-last)>1){last=h;parent.postMessage({type:'nietpluis-board-height',height:h},'*');}
 }
 window.addEventListener('load',updateHeight);
 window.addEventListener('resize',updateHeight);
 if('ResizeObserver' in window){new ResizeObserver(updateHeight).observe(document.body);}
 document.fonts?.ready?.then(updateHeight);
 updateHeight();
})();
