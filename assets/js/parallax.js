/**
 * Parallax — hero photo moves on scroll
 */
(function () {
    const heroImg = document.querySelector('.hero-photo-img');
    if (!heroImg) return;

    let ticking = false;
    window.addEventListener(
        'scroll',
        function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    const scrolled = window.pageYOffset;
                    const hero = document.querySelector('.hero');
                    if (hero) {
                        const heroBottom = hero.offsetTop + hero.offsetHeight;
                        if (scrolled < heroBottom) {
                            heroImg.style.transform = 'translateY(' + scrolled * 0.22 + 'px)';
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        },
        { passive: true }
    );
})();
