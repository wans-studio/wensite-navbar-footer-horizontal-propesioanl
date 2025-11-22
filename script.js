document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 10) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', (!expanded).toString());
    });
    navMenu.querySelectorAll('a.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    const animateCount = el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1500;
      const start = 0;
      const startTime = performance.now();
      const step = now => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * (target - start) + start);
        el.textContent = value.toString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toString();
      };
      requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (track && prevBtn && nextBtn) {
    const cards = track.querySelectorAll('.testimonial-card');
    let index = 0;
    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + cards.length) % cards.length;
      update();
    });
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % cards.length;
      update();
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          faqItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
          });
          item.classList.toggle('active');
        });
      }
    });
  }

  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      alert('Fitur pencarian akan segera hadir');
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const form = e.target;
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const phone = form.querySelector('#phone');
      const message = form.querySelector('#message');
      if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !message.value.trim()) {
        alert('Harap lengkapi semua field bertanda *');
        return;
      }
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      if (!emailValid) {
        alert('Email tidak valid');
        return;
      }
      alert('Terima kasih! Pesan Anda telah dikirim.');
      form.reset();
    });
  }
});