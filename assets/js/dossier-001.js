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
const popupIds=new Set(['bewijs','rooster','antwoord','woordenlijst']);
window.addEventListener('message',event=>{
 const cardFrame=Array.from(document.querySelectorAll('[data-card-back]')).find(item=>item.contentWindow===event.source);
 if(cardFrame&&event.data?.type==='nietpluis-card-flip'){
  cardFrame.closest('.gamecard')?.classList.toggle('flipped');
  return;
 }
 const frame=Array.from(document.querySelectorAll('.popup-frame-sheet iframe')).find(item=>item.contentWindow===event.source);
 if(!frame||!event.data)return;
 if(event.data.type==='nietpluis-popup-close'){closeModal();return}
 if(event.data.type==='nietpluis-popup-open'&&popupIds.has(event.data.id))openModal(event.data.id);
});
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.open)));
document.querySelectorAll('.close,.closeaction').forEach(b=>b.addEventListener('click',closeModal));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal()}));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

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
