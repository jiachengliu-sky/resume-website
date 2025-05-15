// Smooth scroll for navigation links

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Advanced Typewriter Effect
class Typewriter {
  constructor(element, phrases, options = {}) {
    this.el = element;
    this.phrases = phrases;
    this.typingSpeed = options.typingSpeed || 100;
    this.deletingSpeed = options.deletingSpeed || 60;
    this.pauseAfterTyping = options.pauseAfterTyping || 1200;
    this.pauseAfterDeleting = options.pauseAfterDeleting || 500;
    this.loop = options.loop !== undefined ? options.loop : true;
    this.cursor = options.cursor || '|';
    this.cursorBlink = options.cursorBlink !== undefined ? options.cursorBlink : true;
    this.phraseIndex = 0;
    this.letterIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    if (this.cursor) {
      this.cursorEl = document.createElement('span');
      this.cursorEl.id = 'typewriter-cursor';
      this.cursorEl.textContent = this.cursor;
      this.el.insertAdjacentElement('afterend', this.cursorEl);
      if (this.cursorBlink) {
        this.cursorEl.style.animation = 'blink-cursor 0.7s steps(1) infinite';
      }
    }
    this.type();
  }

  type() {
    const currentPhrase = this.phrases[this.phraseIndex];
    if (this.isDeleting) {
      this.letterIndex--;
      this.el.textContent = currentPhrase.substring(0, this.letterIndex);
      if (this.letterIndex === 0) {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        setTimeout(() => this.type(), this.pauseAfterDeleting);
      } else {
        setTimeout(() => this.type(), this.deletingSpeed + Math.random() * 50);
      }
    } else {
      this.letterIndex++;
      this.el.textContent = currentPhrase.substring(0, this.letterIndex);
      if (this.letterIndex === currentPhrase.length) {
        if (!this.loop && this.phraseIndex === this.phrases.length - 1) return;
        this.isDeleting = true;
        setTimeout(() => this.type(), this.pauseAfterTyping);
      } else {
        setTimeout(() => this.type(), this.typingSpeed + Math.random() * 100);
      }
    }
  }
}

// Initialize the typewriter effect on DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
  const el = document.getElementById('typewriter');
  if (el) {
    new Typewriter(el, [
      'Data-Driven Financial Analyst',
      'Real Estate Enthusiast',
      'Aspiring Strategist'
    ], {
      typingSpeed: 80,
      deletingSpeed: 50,
      pauseAfterTyping: 1500,
      pauseAfterDeleting: 600,
      loop: true,
      cursor: '|',
      cursorBlink: true
    });
  }
}); 