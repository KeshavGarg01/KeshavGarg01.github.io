/* ─── PROGRESS BAR ─── */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  document.getElementById('progress-bar').style.width = (scrollTop / docHeight * 100) + '%';
});

/* ─── NAV SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── STICKY CTA ─── */
const stickyCta = document.getElementById('sticky-cta');
window.addEventListener('scroll', () => {
  stickyCta.classList.toggle('visible', window.scrollY > 400);
});

/* ─── TYPEWRITER ─── */
const words = ['future.', 'strengths.', 'career path.', 'passions.', 'potential.'];
let wi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = words[wi];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 110);
}
setTimeout(type, 1400);

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── STEPS STAGGER ─── */
[1, 2, 3].forEach((n, i) => {
  const el = document.getElementById('step-' + n);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add('visible'), i * 200); }
    });
  }, { threshold: 0.2 });
  obs.observe(el);
});

/* ─── COUNT-UP ─── */
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target);
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + (target >= 98 ? '%' : '+');
      if (count >= target) clearInterval(timer);
    }, 28);
    countObs.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => countObs.observe(el));

/* ─── AUDIENCE TOGGLE ─── */
const audData = {
  student: [
    { icon: '🎯', title: 'Find your direction', desc: "Confused between Science, Commerce and Arts? We break it down based on who you actually are — not what your relatives suggest." },
    { icon: '🔍', title: 'Discover your strengths', desc: "5 assessments tell you what you're naturally good at, how you think, and what kind of work energises you." },
    { icon: '🚀', title: 'Build your profile', desc: "From Class 5 onwards — build a profile of skills, activities and achievements that stands out in college applications." },
  ],
  parent: [
    { icon: '🧭', title: 'Stop guessing', desc: "Get a professional, science-backed answer to 'what should my child study' — not an opinion, a data-driven direction." },
    { icon: '🤝', title: 'Be the support, not the pressure', desc: "We help you understand your child's unique wiring so you can guide without imposing." },
    { icon: '📈', title: 'Long-term plan', desc: "Walk away with a 12-month development roadmap — aligned to your child's strengths, interests, and future goals." },
  ]
};

function setAudience(type) {
  document.getElementById('card-student').classList.toggle('active', type === 'student');
  document.getElementById('card-parent').classList.toggle('active', type === 'parent');
  const content = document.getElementById('audience-content');
  const grid = document.getElementById('aud-grid');
  content.classList.remove('visible');
  setTimeout(() => {
    grid.innerHTML = audData[type].map(p => `
        <div class="aud-point">
          <div class="aud-point-icon">${p.icon}</div>
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
        </div>
      `).join('');
    content.classList.add('visible');
  }, 200);
}

/* ─── SERVICES DATA ─── */
const servicesData = [
  { icon: '🧭', title: 'Career Counselling', desc: 'One-on-one sessions to explore interests, strengths, and suitable career paths. From Class 10 right through to Class 12.', tag: 'Core Service' },
  { icon: '📋', title: 'Profile Building', desc: 'Systematic documentation of a student\'s achievements, activities, and skills — for college applications and personal clarity. ', tag: 'Class 5–12' },
  { icon: '🔬', title: 'Psychometric Assessments', desc: 'MBTI, RIASEC, Multiple Intelligence, EQ and Learning Style — interpreted by a certified professional, not a machine.', tag: 'Science-backed' },
  { icon: '🌱', title: 'Holistic Development', desc: 'Confidence, communication, time management, and emotional resilience — skills that outlast any career choice.', tag: 'Class 5–8' },
  { icon: '🎓', title: 'Stream Selection', desc: 'The Class 10 decision decoded. Science, Commerce, Arts, Vocational — mapped to the student\'s actual strengths and goals.', tag: 'Class 9–10' },
  { icon: '🗺️', title: 'College & Entrance Roadmap', desc: 'Which colleges to target, which entrances to prepare for, and a timeline that doesn\'t leave everything to the last minute.', tag: 'Class 11–12' },
];

const sg = document.getElementById('services-grid');
servicesData.forEach((s, i) => {
  sg.innerHTML += `
      <div class="service-card reveal reveal-delay-${(i % 3) + 1}">
        <div class="service-icon">${s.icon}</div>
        <div class="service-title">${s.title}</div>
        <div class="service-desc">${s.desc}</div>
        <span class="service-tag">${s.tag}</span>
      </div>`;
});
document.querySelectorAll('.service-card.reveal').forEach(el => revealObserver.observe(el));

/* ─── TESTIMONIALS ─── */
const testiData = [
  { text: "My daughter was torn between Science and Humanities for 2 years. After one session, she had clarity. Now she's preparing for NID with full confidence.", name: "Priya M.", detail: "Parent · Class 10", color: "#e74c3c", initial: "P" },
  { text: "Honestly thought career counselling was just for confused students. Turns out it's for every student. The assessment report was eye-opening for me too.", name: "Rohan K.", detail: "Student · Class 11", color: "#1B6CA8", initial: "R" },
  { text: "We were pushing our son towards engineering. The counsellor showed us why that was the wrong fit — with data. We changed direction. Best decision we made.", name: "Anil S.", detail: "Parent · Class 9", color: "#2ecc71", initial: "A" },
  { text: "I always knew I liked creative stuff but never knew it could be a career. Now I'm building a portfolio for architecture. I feel like I finally know where I'm going.", name: "Shreya T.", detail: "Student · Class 12", color: "#9b59b6", initial: "S" },
  { text: "The holistic development sessions for my Class 7 son made such a visible difference. He's more confident, more articulate. Didn't expect that from a career counsellor.", name: "Meera G.", detail: "Parent · Class 7", color: "#f39c12", initial: "M" },
];

const ts = document.getElementById('testi-scroll');
testiData.forEach((t, i) => {
  ts.innerHTML += `
      <div class="testi-bubble reveal reveal-delay-${i % 3 + 1}">
        <div class="wa-card">
          <div class="wa-text">"${t.text}"</div>
          <div class="wa-meta">
            <div class="wa-avatar" style="background:${t.color}">${t.initial}</div>
            <div>
              <div class="wa-name">${t.name}</div>
              <div class="wa-detail">${t.detail}</div>
            </div>
            <div class="wa-stars">★★★★★</div>
          </div>
        </div>
      </div>`;
});

document.querySelectorAll('.testi-bubble.reveal').forEach(el => revealObserver.observe(el));

function scrollTesti(dir) {
  const el = document.getElementById('testi-scroll');
  el.scrollBy({ left: dir * 340, behavior: 'smooth' });
}

/* ─── FAQ ─── */
const faqs = [
  { q: "Will one session actually help? (Honest answer below)", a: "The free discovery call alone gives most students and parents 2–3 clear action steps. The real depth happens after the assessments. But yes — even one conversation shifts perspective." },
  { q: "My child is in Class 6. Isn't it too early?", a: "Class 5–8 is the best time to start. Not for career decisions — for building self-awareness, confidence, and habits. The earlier students understand their strengths, the less anxious they are by Class 10." },
  { q: "How is this different from a school counsellor?", a: "School counsellors are excellent but stretched thin — one counsellor to 500 students. Here you get a globally certified counsellor, 1:1 sessions, and time dedicated entirely to your child." },
  { q: "Is this only for students doing well academically?", a: "Not at all. In fact, some of the best outcomes come from students who struggle academically because they're in the wrong stream or learning environment. Assessments often explain why." },
  { q: "What happens after the free call?", a: "We share a simple overview of what an assessment + report session would look like. No pressure, no sales pitch. You decide if and when you want to move forward." },
  { q: "Do you do group sessions or only 1:1?", a: "Primarily 1:1 for counselling and assessments. Group sessions are available for school workshops and orientation programmes. Contact us to discuss." },
];

const fl = document.getElementById('faq-list');
faqs.forEach((f, i) => {
  fl.innerHTML += `
      <div class="faq-item reveal">
        <div class="faq-q" onclick="toggleFaq(this)">
          <span class="faq-q-text">${f.q}</span>
          <div class="faq-icon">+</div>
        </div>
        <div class="faq-a">${f.a}</div>
      </div>`;
});
document.querySelectorAll('.faq-item.reveal').forEach(el => revealObserver.observe(el));

function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ─── FORM SUBMIT (Web3Forms) ─── */
const WEB3FORMS_ACCESS_KEY = '97d9504c-5172-42fe-bdd2-f9d91e8494be'; // ← Replace with your actual key

async function submitForm() {
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const city = document.getElementById('f-city').value.trim();
  const cls = document.getElementById('f-class').value;
  const concern = document.getElementById('f-concern').value;
  const honeypotEl = document.getElementById('f-honeypot');

  // Spam bot check — real users never fill the hidden field
  if (honeypotEl && honeypotEl.value) return;

  if (!name || !phone || !cls) {
    alert("Please fill in your name, WhatsApp number, and your child's class 😊");
    return;
  }

  // Show loading state
  const btn = document.querySelector('.form-submit');
  const originalText = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: '📞 New Callback Request — Career Momentum',
        from_name: 'Career Momentum Website',
        name: name,
        phone: phone,
        city: city || 'Not provided',
        class: cls,
        concern: concern || 'Not specified',
      }),
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('booking-form').classList.add('submitted');
      document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (error) {
    alert('Something went wrong. Please try again or reach out to us on WhatsApp.');
    btn.textContent = originalText;
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

/* ─── MOBILE NAV ─── */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('mobile-open');
  navbar.classList.toggle('menu-active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    navbar.classList.remove('menu-active');
    hamburger.classList.remove('active');
  });
});

/* ─── DYNAMIC COPYRIGHT YEAR ─── */
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();