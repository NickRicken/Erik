/* SEASON BANNER */
function closeSeasonBanner(){
  var banner = document.getElementById('seasonBanner');
  if(banner) banner.style.display = 'none';
  try{ localStorage.setItem('seasonBannerClosed', '1'); }catch(e){}
}
document.addEventListener('DOMContentLoaded', function(){
  try{
    if(localStorage.getItem('seasonBannerClosed') === '1'){
      var b = document.getElementById('seasonBanner');
      if(b) b.style.display = 'none';
    }
  }catch(e){}

  /* DESC TOGGLE — скрываем кнопку "Показать полностью", если текст и так укладывается в 10 строк */
  document.querySelectorAll('.desc-toggle').forEach(function(btn){
    var desc = btn.previousElementSibling;
    if(!desc) return;
    if(desc.scrollHeight <= desc.clientHeight + 2){
      btn.style.display = 'none';
    }
  });
});

function toggleDesc(btn){
  var desc = btn.previousElementSibling;
  if(!desc) return;
  var expanded = desc.classList.toggle('expanded');
  btn.textContent = expanded ? 'Скрыть' : 'Показать полностью';
}

window.addEventListener('scroll', function(){
    var nav = document.getElementById('nav');
    if(window.scrollY > 40){ nav.classList.add('nav-scrolled'); }
    else { nav.classList.remove('nav-scrolled'); }
  });
  function toggleMobileNav(){
    var burger = document.getElementById('burgerBtn');
    var menu = document.getElementById('mobileNav');
    var isOpen = menu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    if(isOpen){
      document.getElementById('nav').classList.add('nav-scrolled');
    } else if(window.scrollY <= 40){
      document.getElementById('nav').classList.remove('nav-scrolled');
    }
  }
  function closeMobileNav(){
    document.getElementById('mobileNav').classList.remove('open');
    document.getElementById('burgerBtn').classList.remove('open');
    if(window.scrollY <= 40){ document.getElementById('nav').classList.remove('nav-scrolled'); }
  }
  function openModal(name){
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalSuccess').style.display = 'none';
    document.getElementById('modalOverlay').classList.add('open');
    document.querySelectorAll('.modal-box textarea.autogrow').forEach(autoGrowTextarea);
    var sel = document.getElementById('modalModelSelect');
    var hasOption = Array.from(sel.options).some(function(o){ return o.value === name; });
    sel.value = hasOption ? name : 'Ещё не выбрал(а)';
  }
  function closeModal(){
    document.getElementById('modalOverlay').classList.remove('open');
  }
  function modalSubmit(e){
    e.preventDefault();
    document.getElementById('modalSuccess').style.display = 'block';
    return false;
  }
  function fakeSubmit(e){
    e.preventDefault();
    document.getElementById('formSuccess').style.display = 'block';
    return false;
  }

  /* LIGHTBOX */
  var lbCaptions = ["Orsha Black Water, 2026","Orsha Black Water, 2026","Весенняя Тверица, 2026","Весенняя Тверица, 2026","Причал Юг, Дагестан","Причал Юг, Дагестан","Круговая гонка, Вуокса","Мастерская","Мастерская","Мастерская","Тверской гребной марафон, 2025","Тренировка, Кронштадт"];
  var lbIndex = 0;
  var lbTrack = null;

  function lbPhotoUrl(idx){
    var tile = document.querySelector('.mq-tile[data-idx="' + idx + '"]');
    var img = tile ? tile.querySelector('img') : null;
    return img ? 'url("' + img.src + '")' : '';
  }
  function lbRender(){
    document.getElementById('lbImg').style.backgroundImage = lbPhotoUrl(lbIndex);
    document.getElementById('lbCap').textContent = lbCaptions[lbIndex];
  }
  function openLightbox(idx){
    lbIndex = parseInt(idx, 10);
    lbRender();
    document.getElementById('lightbox').classList.add('open');
    lbTrack = document.querySelector('.mq-track');
    if(lbTrack) lbTrack.style.animationPlayState = 'paused';
  }
  function closeLightbox(){
    document.getElementById('lightbox').classList.remove('open');
    if(lbTrack) lbTrack.style.animationPlayState = 'running';
  }
  function lbNext(){
    lbIndex = (lbIndex + 1) % lbCaptions.length;
    lbRender();
  }
  function lbPrev(){
    lbIndex = (lbIndex - 1 + lbCaptions.length) % lbCaptions.length;
    lbRender();
  }
  document.addEventListener('keydown', function(e){
    if(!document.getElementById('lightbox').classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') lbNext();
    if(e.key === 'ArrowLeft') lbPrev();
  });

  /* AUTOGROW TEXTAREAS — hug content up to ~10 lines, then internal scroll */
  function autoGrowTextarea(el){
    el.style.height = 'auto';
    var max = 242, min = 46;
    el.style.height = Math.min(Math.max(el.scrollHeight, min), max) + 'px';
  }
  document.querySelectorAll('textarea.autogrow').forEach(function(t){
    t.addEventListener('input', function(){ autoGrowTextarea(t); });
    autoGrowTextarea(t);
  });
