// مفتاح التخزين
const PROPS_KEY = 'properties_v2';

// داتا اختبارية (يمكن التعديل أو الحذف لاحقًا)
const seed = [
  { id:'p1', img:'images/prop1.jpg', title:'شقة فاخرة في القاهرة', city:'القاهرة', price:1200000, priceText:'1,200,000 جنيه', type:'sale', desc:'شقة قرب الخدمات.' },
  { id:'p2', img:'images/prop2.jpg', title:'فيلا مودرن بالاسكندرية', city:'الإسكندرية', price:3000000, priceText:'3,000,000 جنيه', type:'sale', desc:'فيلا بمساحة واسعة.' },
  { id:'p3', img:'images/prop3.jpg', title:'شقة للإيجار بالجيزة', city:'الجيزة', price:6000, priceText:'6,000 جنيه / شهر', type:'rent', desc:'شقة مفروشة.' },
  { id:'p4', img:'images/prop4.jpg', title:'مكتب للإيجار في القاهرة', city:'القاهرة', price:12000, priceText:'12,000 جنيه / شهر', type:'rent', desc:'موقع تجاري مميز.' }
];

function init(){
  const existing = JSON.parse(localStorage.getItem(PROPS_KEY) || 'null');
  if(!existing){ localStorage.setItem(PROPS_KEY, JSON.stringify(seed)); }
  render(getAll());
  bindEvents();
}

function getAll(){ return JSON.parse(localStorage.getItem(PROPS_KEY) || '[]'); }

function render(list){
  const container = document.getElementById('propertyList');
  if(!container) return;
  container.innerHTML = '';
  if(list.length===0){
    container.innerHTML = '<div style="padding:20px;background:white;border-radius:10px;">لا توجد نتائج</div>';
    return;
  }
  list.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'property-card';
    el.innerHTML = `
      <div class="card-media" style="background-image: url('${p.img || ''}');"></div>
      <div class="card-body">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div class="property-title">${escape(p.title)}</div>
            <div class="line">${escape(p.city)} • ${p.type === 'sale' ? 'بيع' : 'إيجار'}</div>
          </div>
          <div class="badge">${p.type === 'sale' ? 'للبيع' : 'للإيجار'}</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <div class="line">${escape(p.desc || '')}</div>
          <div class="price">${p.priceText}</div>
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

function escape(s){ return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

function search(){
  const q = (document.getElementById('fQuery')?.value || '').trim().toLowerCase();
  const type = document.getElementById('fType')?.value || 'all';
  const cat = document.getElementById('fCategory')?.value || 'all';
  let list = getAll();
  if(q){
    list = list.filter(p => (p.title||'').toLowerCase().includes(q) || (p.city||'').toLowerCase().includes(q) || (p.priceText||'').toLowerCase().includes(q) || (p.desc||'').toLowerCase().includes(q));
  }
  if(type !== 'all') list = list.filter(x=>x.type===type);
  if(cat !== 'all') list = list.filter(x=> (x.category||'') === cat || (cat==='apartment' && x.title.toLowerCase().includes('شقة')) );
  render(list);
}

function bindEvents(){
  document.getElementById('heroSearch')?.addEventListener('click', search);
  document.getElementById('fQuery')?.addEventListener('keydown', (e)=>{ if(e.key==='Enter') search(); });
}

window.addEventListener('DOMContentLoaded', init);
