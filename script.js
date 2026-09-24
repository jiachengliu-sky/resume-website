// Keep the full role readable when animation is disabled or JavaScript is unavailable.
const role = document.getElementById('typewriter');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const phrases = ['Data-Driven Analyst', 'Innovation Early Adopter', 'Wealth Management Strategist'];
let timer;

function startTypewriter() {
  clearTimeout(timer);
  let phraseIndex = 0;
  let letterIndex = phrases[0].length;
  let deleting = true;
  role.textContent = phrases[0];
  if (motionPreference.matches) return;

  function tick() {
    const phrase = phrases[phraseIndex];
    letterIndex += deleting ? -1 : 1;
    role.textContent = phrase.slice(0, letterIndex);
    let delay = deleting ? 45 : 85;
    if (deleting && letterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    } else if (!deleting && letterIndex === phrase.length) {
      deleting = true;
      delay = 1800;
    }
    timer = setTimeout(tick, delay);
  }
  timer = setTimeout(tick, 1800);
}

if (role) {
  startTypewriter();
  motionPreference.addEventListener('change', startTypewriter);
}
