
window.addEventListener('load', ()=>{

const tl = gsap.timeline();
tl.fromTo('.section__title--hero',{color:"#F25D27", y:-1000, scale: 2},{delay:1, color:"#FCF7FF", y:0, scale: 1, duration:1})
   .from('.section__subtitle--hero', {y:1000, scale: 2, duration:1})
   .from('#hero_button', {y:-1500, rotate: 720, duration:3, ease: 'bounce'})
 })

const menuBtn = document.getElementById('menu-icon'); // label checkbox
const menuToggle = document.getElementById('menu-btn'); // checkbox
const navItems = document.getElementById('nav-links'); // ul
const navLinks = document.querySelectorAll('.nav-link'); //li
const navLenght = navLinks.length;

// ===================================================================================================
// === Revisa en que link se hizo click, busca el link que tenia la clase active para removerla   ====
// === y luego agregarle al link donde se hizo click la clase active                              ====
// ===================================================================================================

navLinks.forEach(link => {
   link.addEventListener('click', function(){
      navItems.querySelector('.active').classList.remove('active');
      link.classList.add('active');
      menuToggle.checked = false;
   })
});

//Change navigation style on scroll
window.addEventListener('scroll', event => { 
    let nav = document.querySelector('.main-header'); 
    (window.scrollY >= 60) ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
});
