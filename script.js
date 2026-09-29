/* ============================================
   ENVELOPE PRELOADER ANIMATION
   ============================================ */
(function() {
    const preloader = document.getElementById('preloader');
    const envelope = document.getElementById('envelope');
    const mainContent = document.getElementById('mainContent');
    let done = false;
    document.body.classList.add('locked');

    function openEnvelope() {
        if (done) return;
        done = true;
        envelope.classList.add('is-open');
        setTimeout(() => {
            preloader.classList.add('hidden');
            mainContent.classList.add('visible');
            document.body.classList.remove('locked');
            initScrollReveal();
        }, 1400);
    }

    envelope.addEventListener('click', openEnvelope);
    // Автооткрытие, если гость не нажал
    setTimeout(openEnvelope, 7000);
})();

/* ============================================
   COUNTDOWN TIMER
   ============================================ */
(function() {
    // Target date: October 3, 2026, 00:00 MSK (Europe/Moscow)
    const targetDate = new Date('2026-10-03T00:00:00+03:00');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function pad(num, size) {
        let s = String(Math.max(0, Math.floor(num)));
        while (s.length < size) s = '0' + s;
        return s;
    }

    function updateCountdown() {
        const now = new Date();
        let diff = targetDate - now;

        if (diff <= 0) {
            daysEl.textContent = '000';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);
        const seconds = Math.floor(diff / 1000);

        daysEl.textContent = pad(days, 3);
        hoursEl.textContent = pad(hours, 2);
        minutesEl.textContent = pad(minutes, 2);
        secondsEl.textContent = pad(seconds, 2);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollReveal() {
    document.body.classList.add('site-ready');
    const items = document.querySelectorAll(
        'section:not(.hero-section) h2, section:not(.hero-section) h3, section:not(.hero-section) p, ' +
        '.polaroid, .timer-block, .timeline-item, .venue-gallery img, .venue-btn, .thankyou-ribbon, ' +
        '.invite-divider, .venue-divider'
    );
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => {
        const sib = Array.from(el.parentElement.children).indexOf(el);
        el.style.transitionDelay = Math.min(sib, 6) * 90 + 'ms';
        el.classList.add('el-reveal');
        io.observe(el);
    });
}
