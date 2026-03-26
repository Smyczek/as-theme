/**
 * Count-Up Animation — animates numbers with easeOutExpo
 */
(function () {
    const countObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    const counters = e.target.querySelectorAll('.count-up');
                    counters.forEach((counter) => {
                        const target = parseInt(counter.dataset.target);
                        const format = counter.dataset.format;
                        const duration = 2000;
                        const start = performance.now();

                        function easeOutExpo(t) {
                            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                        }

                        function update(now) {
                            const elapsed = now - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = easeOutExpo(progress);
                            const current = Math.round(eased * target);

                            if (format === 'comma') {
                                counter.textContent = current.toLocaleString('en-US');
                            } else {
                                counter.textContent = current;
                            }

                            if (progress < 1) {
                                requestAnimationFrame(update);
                            }
                        }
                        requestAnimationFrame(update);
                    });
                    countObs.unobserve(e.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    const statsEl = document.querySelector('.dark-stats');
    if (statsEl) countObs.observe(statsEl);
})();
