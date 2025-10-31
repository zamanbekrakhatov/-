// Mobile burger
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger && burger.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
});

// IntersectionObserver for fade-in
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});

document.querySelectorAll('.fade-in, .slide-left').forEach(el => io.observe(el));

// Simple reviews auto-scroll (horizontal)
const reviews = document.querySelector('.reviews');
if(reviews){
  let pos = 0;
  setInterval(()=> {
    pos += 320;
    if(pos > reviews.scrollWidth - reviews.clientWidth) pos = 0;
    reviews.scrollTo({left: pos, behavior:'smooth'});
  }, 4000);
}

// Counters in results
document.querySelectorAll('.result-card .big').forEach(node => {
  const target = +node.getAttribute('data-target') || 0;
  let count = 0;
  const step = Math.max(1, Math.floor(target / 120));
  const updater = () => {
    count += step;
    if(count < target){
      node.textContent = count;
      requestAnimationFrame(updater);
    } else {
      node.textContent = target + ( (target>=100 && node.parentElement.style.background.includes('ff8a4b')) ? '%' : '' );
    }
  };
  // wait until visible
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ updater(); obs.disconnect(); }
    });
  }, {threshold:0.2});
  obs.observe(node);
});

// Contact form handler (demo)
document.getElementById('sendBtn').addEventListener('click', (e) => {
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  if(!name || !phone || !email){
    alert('Барлық міндетті өрістерді толтырыңыз: Аты, Телефон, Email');
    return;
  }
  alert(`Рақмет, ${name}! Сіздің хабарламаңыз қабылданды. Біз жақын арада хабарласамыз.`);
  // Очистка полей
  document.getElementById('fname').value='';
  document.getElementById('phone').value='';
  document.getElementById('email').value='';
  document.getElementById('msg').value='';
});

// Smooth anchor offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (ev)=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      ev.preventDefault();
      const el = document.querySelector(href);
      if(el){
        const y = el.getBoundingClientRect().top + window.scrollY - 80; // nav height
        window.scrollTo({top:y,behavior:'smooth'});
      }
      // hide mobile menu after click
      if(window.innerWidth < 981) mobileMenu.style.display='none';
    }
  });
});
