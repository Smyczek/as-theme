/**
 * Navigation — hamburger toggle + smooth scroll
 */
(function () {
    // Hamburger menu
    var hamburger = document.getElementById('hamburger');
    var mobMenu = document.getElementById('mobMenu');
    if (hamburger && mobMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('on');
            mobMenu.classList.toggle('open');
            document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var h = this.getAttribute('href');
            if (h === '#') return;
            e.preventDefault();
            var target = document.querySelector(h);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
})();

// Close mobile menu (called from inline onclick)
function closeMob() {
    var hamburger = document.getElementById('hamburger');
    var mobMenu = document.getElementById('mobMenu');
    if (hamburger) hamburger.classList.remove('on');
    if (mobMenu) mobMenu.classList.remove('open');
    document.body.style.overflow = '';
}
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
/**
 * Hero Form — redirects email to contact form
 */
function handleHeroForm(e) {
    e.preventDefault();
    var email = document.getElementById('heroEmail');
    var femail = document.getElementById('femail');
    if (email && femail) {
        femail.value = email.value;
    }
    var contact = document.querySelector('#contact');
    if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function () {
            var fname = document.getElementById('fname');
            if (fname) fname.focus();
        }, 600);
    }
    return false;
}
/**
 * Contact Form — AJAX submission via WP REST API
 */
(function () {
    var form = document.getElementById('contactForm');
    if (!form || typeof asThemeContact === 'undefined') return;

    var submitBtn = form.querySelector('.form-submit');
    var originalText = submitBtn ? submitBtn.textContent : 'Send';

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Disable button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        var data = {
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            budget: form.querySelector('[name="budget"]') ? form.querySelector('[name="budget"]').value : '',
            message: form.querySelector('[name="message"]').value,
            website_url: form.querySelector('[name="website_url"]') ? form.querySelector('[name="website_url"]').value : '',
        };

        fetch(asThemeContact.restUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': asThemeContact.nonce,
            },
            body: JSON.stringify(data),
        })
        .then(function (response) {
            return response.json().then(function (json) {
                return { ok: response.ok, data: json };
            });
        })
        .then(function (result) {
            if (result.ok && result.data.success) {
                form.style.display = 'none';
                var success = document.getElementById('formSuccess');
                if (success) success.classList.add('show');
            } else {
                var msg = result.data.message || 'Something went wrong. Please try again.';
                alert(msg);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        })
        .catch(function () {
            alert('Network error. Please check your connection and try again.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    });
})();
/**
 * Swiper — testimonials carousel
 */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper === 'undefined') return;
    var el = document.querySelector('.test-swiper');
    if (!el) return;

    new Swiper('.test-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoHeight: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 600,
        navigation: {
            prevEl: '.test-prev',
            nextEl: '.test-next',
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
        },
    });
});
/**
 * Initialize Lucide icons
 */
(function () {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
})();
