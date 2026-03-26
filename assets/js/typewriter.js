/**
 * Typewriter Effect — cycles through phrases from data-words attribute
 */
(function () {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const raw = el.getAttribute('data-words');
    const phrases = raw ? JSON.parse(raw) : [
        'Great Design & Code.',
        'Stunning Websites.',
        'Bold Branding.',
        'Smart Development.',
        'Creative Solutions.',
    ];

    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 1200;
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function tick() {
        const current = phrases[phraseIdx];
        if (!isDeleting) {
            charIdx++;
            el.textContent = current.substring(0, charIdx);
            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(tick, pauseAfterType);
            } else {
                setTimeout(tick, typeSpeed);
            }
        } else {
            charIdx--;
            el.textContent = current.substring(0, charIdx);
            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(tick, pauseAfterDelete);
            } else {
                setTimeout(tick, deleteSpeed);
            }
        }
    }
    setTimeout(tick, 800);
})();
