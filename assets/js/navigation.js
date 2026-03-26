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
