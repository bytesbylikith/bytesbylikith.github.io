/* particles.js library (Vincent Garreau) - inlined for hero background */
/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 100,
          line_linked:{
            opacity: 1
          }
        },
        bubble:{
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse:{
          distance: 200,
          duration: 0.4
        },
        push:{
          particles_nb: 4
        },
        remove:{
          particles_nb: 2
        }
      },
      mouse:{}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors:{}
    },
    tmp: {}
  };

  var pJS = this.pJS;

  /* params settings */
  if(params){
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
  };

  pJS.fn.retinaInit = function(){

    if(pJS.retina_detect && window.devicePixelRatio > 1){
      pJS.canvas.pxratio = window.devicePixelRatio; 
      pJS.tmp.retina = true;
    } 
    else{
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;

  };

  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function(){
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function(){

    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if(pJS && pJS.interactivity.events.resize){

      window.addEventListener('resize', function(){

          pJS.canvas.w = pJS.canvas.el.offsetWidth;
          pJS.canvas.h = pJS.canvas.el.offsetHeight;

          /* resize canvas */
          if(pJS.tmp.retina){
            pJS.canvas.w *= pJS.canvas.pxratio;
            pJS.canvas.h *= pJS.canvas.pxratio;
          }

          pJS.canvas.el.width = pJS.canvas.w;
          pJS.canvas.el.height = pJS.canvas.h;

          /* repaint canvas on anim disabled */
          if(!pJS.particles.move.enable){
            pJS.fn.particlesEmpty();
            pJS.fn.particlesCreate();
            pJS.fn.particlesDraw();
            pJS.fn.vendors.densityAutoParticles();
          }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  pJS.fn.canvasPaint = function(){
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function(){
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  /* (rest of particles.js library is inlined above) */

  /* ---------- pJS - start ------------ */


  pJS.fn.vendors.eventsListeners();

  pJS.fn.vendors.start();
  
  
};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];

window.particlesJS = function(tag_id, params){

  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  if(!tag_id){
    tag_id = 'particles-js';
  }

  var pJS_tag = document.getElementById(tag_id),
      pJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  if(exist_canvas.length){
    while(exist_canvas.length > 0){
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  var canvas_el = document.createElement('canvas');
  canvas_el.className = pJS_canvas_class;
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);
  if(canvas != null){
    pJSDom.push(new pJS(tag_id, params));
  }

};

window.particlesJS.load = function(tag_id, path_config_json, callback){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if(callback) callback();
      }else{
        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();

};

// end of inlined particles.js

// script.js - interactions for the portfolio

// Smooth scroll for nav links and buttons
document.addEventListener('DOMContentLoaded', ()=>{
  // set year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav if present
        const navUl = document.querySelector('nav ul');
        if(window.innerWidth <= 640 && navUl){navUl.style.display='none'}
      }
    });
  });

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  if(toggle){
    toggle.addEventListener('click', ()=>{
      const ul = document.querySelector('nav ul');
      if(!ul) return;
      ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
      ul.style.flexDirection = window.innerWidth <= 640 ? 'column' : 'row';
    });
  }

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
      }
    })
  },{threshold:0.12});
  reveals.forEach(r=>obs.observe(r));

  // contact form basic validation & fake send
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const status = document.getElementById('form-status');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        status.textContent = 'Please fill out all fields.';
        status.style.color = 'rgba(255,59,59,0.95)';
        return;
      }
      // simulate send
      status.textContent = 'Sending...';
      status.style.color = 'var(--muted)';
      setTimeout(()=>{
    status.textContent = 'Message sent. Thank you — I will get back to you soon.';
  status.style.color = 'var(--accent-red)';
        form.reset();
      }, 900);
    });
  }

  // initialize particles.js driven hero background
  setupParticles();
  // set up IntersectionObserver for animations
  const animObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('active');
      }
    });
  }, {threshold: 0.2});
  document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-up').forEach(el=>animObserver.observe(el));

  // navbar scroll darken
  const navbar = document.querySelector('.navbar');
  function onScroll(){
    if(window.scrollY > 24) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll);

  // update aria-expanded on nav toggle when clicked (accessibility)
  const navToggle = document.querySelector('.nav-toggle');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // continuous scroll-driven text movement
  const scrollAnimEls = Array.from(document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-up'));
  // ensure will-change for performance
  scrollAnimEls.forEach(el=> el.style.willChange = 'transform, opacity');

  let latestScroll = window.scrollY;
  let ticking = false;

  function onScrollTick(){
    latestScroll = window.scrollY;
    if(!ticking){
      window.requestAnimationFrame(updateScrollAnimations);
      ticking = true;
    }
  }

  function clamp01(v){ return Math.max(-1, Math.min(1, v)); }

  function updateScrollAnimations(){
    const vh = window.innerHeight || document.documentElement.clientHeight;
    scrollAnimEls.forEach(el=>{
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height/2;
      // normalized where 0=center, -1 top outside, +1 bottom outside
      const normalized = clamp01((elCenter - vh/2) / (vh/2));

      if(el.classList.contains('slide-in-left')){
        const tx = (-normalized) * 80; // move from left when entering
        el.style.transform = `translateX(${tx}px)`;
        el.style.opacity = String(1 - Math.min(0.85, Math.abs(normalized)));
      } else if(el.classList.contains('slide-in-right')){
        const tx = (normalized) * 80; // move from right when entering
        el.style.transform = `translateX(${tx}px)`;
        el.style.opacity = String(1 - Math.min(0.85, Math.abs(normalized)));
      } else if(el.classList.contains('fade-up')){
        const ty = (normalized) * 40; // move vertically based on position
        el.style.transform = `translateY(${ty}px)`;
        el.style.opacity = String(1 - Math.min(0.9, Math.abs(normalized)));
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', onScrollTick, {passive:true});
  // run once to initialize positions
  updateScrollAnimations();
});

function initHeroCanvas(){
  const canvas = document.getElementById('hero-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;

  let t = 0;
  const particles = [];
  const P = 60;
  // generate mostly red/gray particles by choosing hue around red and some neutral low-saturation ones
  for(let i=0;i<P;i++){
    const isRed = Math.random() > 0.25; // most particles red-tinted
    const hue = isRed ? (350 + Math.random()*30) % 360 : 0; // red-ish or neutral
    const sat = isRed ? (70 + Math.random()*20) : (10 + Math.random()*20);
    particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.6, vx:(Math.random()-0.5)*0.2, vy:(Math.random()-0.5)*0.2, hue, sat})
  }

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);

  function draw(){
    t+=0.005;
    // moving gradient background
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0, `rgba(5,8,20,${0.8 + 0.05*Math.sin(t*2)})`);
    g.addColorStop(0.5, `rgba(10,16,44,${0.6 + 0.06*Math.cos(t)})`);
    g.addColorStop(1, `rgba(2,5,12,${0.9 - 0.03*Math.sin(t*1.5)})`);
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    // draw soft glowing particles
    for(let p of particles){
  p.x += p.vx + 0.6*Math.sin((t + p.hue)*0.3)*0.02;
  p.y += p.vy + 0.6*Math.cos((t + p.hue)*0.2)*0.02;
      if(p.x < -50) p.x = w+50; if(p.x > w+50) p.x=-50;
      if(p.y < -50) p.y = h+50; if(p.y > h+50) p.y=-50;

      const rad = p.r;
  const hue = p.hue;
  const sat = p.sat || 60;
  const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,rad*16);
  grd.addColorStop(0, `hsla(${hue},${sat}%,68%,0.18)`);
  grd.addColorStop(0.2, `hsla(${hue},${Math.max(10,sat-10)}%,58%,0.08)`);
  grd.addColorStop(1, `hsla(${hue},${Math.max(5,sat-30)}%,38%,0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.x,p.y,rad*16,0,Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
}




/* Setup particles.js in the hero background using site colors */
function setupParticles(){
  const heroBg = document.querySelector('.hero-bg');
  if(!heroBg) return;

  // ensure a container exists
  let container = document.getElementById('particles-js');
  if(!container){
    container = document.createElement('div');
    container.id = 'particles-js';
    container.style.position = 'absolute';
    container.style.inset = '0';
    container.style.zIndex = '1';
    heroBg.insertBefore(container, heroBg.firstChild);
  }

  // read CSS accent color (fallbacks) - prefer a red accent for the dots
  const root = getComputedStyle(document.documentElement);
  const accentRed = (root.getPropertyValue('--accent-red') || '').trim() || '#ff3b3b';
  const muted = root.getPropertyValue('--muted') || '#9aa4b2';

  // small red dots with subtle linking
  const params = {
    particles: {
      number: { value: 70, density: { enable: true, value_area: 700 } },
      color: { value: [accentRed, '#fff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.9, random: true, anim: { enable: false } },
      size: { value: 3.2, random: true, anim: { enable: false } },
      line_linked: { enable: true, distance: 110, color: accentRed, opacity: 0.06, width: 1 },
      move: { enable: true, speed: 1.6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.25 } }, push: { particles_nb: 3 } }
    },
    retina_detect: true
  };

  try{
    // debug: indicate attempt to initialize particles
    console.debug('[setupParticles] initializing particles with params', { count: params.particles.number.value });
    // initialize particles in the container
    if(typeof window.particlesJS === 'function'){
      window.particlesJS('particles-js', params);
    } else {
      console.debug('[setupParticles] window.particlesJS not found — skipping particlesJS init');
    }
    // find the particles.js instance we just created
    const pjsInstanceObj = (window.pJSDom || []).slice().reverse().find(obj=>obj && obj.pJS && obj.pJS.canvas && obj.pJS.canvas.el && obj.pJS.canvas.el.parentElement && obj.pJS.canvas.el.parentElement.id === 'particles-js');
    const pjs = pjsInstanceObj ? pjsInstanceObj.pJS : null;
    if(pjs){
      console.debug('[setupParticles] particles.js instance found, attaching pointer nudge');
      // subtle mouse-follow behavior: nudge particle velocities toward cursor
      let lastMouse = { x: null, y: null };
      let rect = container.getBoundingClientRect();
      const onResize = () => { rect = container.getBoundingClientRect(); };
      window.addEventListener('resize', onResize, {passive:true});

      function handlePointerMove(clientX, clientY){
        const cx = clientX - rect.left;
        const cy = clientY - rect.top;
        // normalized -1..1 relative to center
        const nx = ((cx - rect.width/2) / (rect.width/2));
        const ny = ((cy - rect.height/2) / (rect.height/2));
        lastMouse.x = nx; lastMouse.y = ny;
      }

      container.addEventListener('mousemove', (e)=>{ handlePointerMove(e.clientX, e.clientY); }, {passive:true});
      container.addEventListener('touchmove', (e)=>{ if(e.touches && e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
      container.addEventListener('mouseleave', ()=>{ lastMouse.x = null; lastMouse.y = null; }, {passive:true});

  // rAF loop to nudge velocities gently based on lastMouse
      (function nudgeLoop(){
        try{
          if(lastMouse.x !== null && lastMouse.y !== null && pjs.particles && pjs.particles.array){
            const nx = lastMouse.x, ny = lastMouse.y;
            // small influence factor
            const influence = 0.06;
            for(let i=0;i<pjs.particles.array.length;i++){
              const part = pjs.particles.array[i];
              if(!part) continue;
              // apply nudge scaled by particle size (smaller particles move a bit faster)
              const scale = Math.max(0.6, 1 - (part.radius/40));
              // gently steer velocities toward the mouse direction
              part.vx += nx * influence * scale;
              part.vy += ny * influence * scale;
              // clamp velocities so they don't explode
              const maxV = 2.2;
              part.vx = Math.max(-maxV, Math.min(maxV, part.vx));
              part.vy = Math.max(-maxV, Math.min(maxV, part.vy));
            }
          }
        }catch(err){ /* ignore per-frame errors */ }
        requestAnimationFrame(nudgeLoop);
      })();
    }
  }catch(err){
    // if particles.js couldn't initialize, fall back to original canvas effect
    console.warn('particles.js init failed, falling back to canvas:', err);
    initHeroCanvas();
  }
}

// trigger CTA entry animation on hero
function triggerHeroCTA(){
  const ctas = document.querySelectorAll('.hero-cta-animated .btn');
  if(!ctas || ctas.length===0) return;
  // staggered entrance
  ctas.forEach((b, i)=>{
    setTimeout(()=> b.classList.add('entered'), 250 + i*140);
  });
}

// run CTA animation once DOM is ready
document.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(triggerHeroCTA, 520);
});
