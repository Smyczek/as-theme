/**
 * Scroll Reveal — IntersectionObserver adds class .v to .r elements
 */
(function () {
    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('v');
                    obs.unobserve(e.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );
    document.querySelectorAll('.r').forEach((el) => obs.observe(el));
})();
