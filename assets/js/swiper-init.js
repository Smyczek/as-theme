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
