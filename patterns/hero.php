<?php
/**
 * Title: Hero
 * Slug: as-theme/hero
 * Categories: as-theme-sections
 */
?>
<!-- wp:html -->
<section class="hero">
    <div class="hero-lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
    <div class="hero-bg-photo">
        <img src="<?php echo esc_url( get_theme_file_uri( 'assets/img/adam.webp' ) ); ?>" alt="Adam Skrzypczak" class="hero-photo-img">
    </div>
    <div class="container">
        <div class="hero-content">
            <h1 class="r">Let's Grow Your<br>Business Through<br><span class="typewriter" id="typewriter"></span></h1>
            <p class="hero-sub r r1">I craft brands, Shopify stores, and WordPress sites that actually convert. Tell me about your project.</p>
            <form class="hero-form r r2" onsubmit="return handleHeroForm(event)">
                <input type="email" id="heroEmail" placeholder="Enter your email to get started..." required>
                <button type="submit">Let's Talk</button>
            </form>
            <p class="hero-hint r r3">Free consultation &middot; No commitment &middot; Reply within 24h</p>
        </div>
    </div>
    <div class="hero-notch">
        <svg viewBox="0 0 305.73 74.13" preserveAspectRatio="none" class="hero-notch-svg">
            <path d="M152.87,0C89.1,0,87.12,74.13,0,74.13h305.73C218.61,74.13,216.63,0,152.87,0Z" fill="currentColor"/>
        </svg>
        <a href="#platforms" class="scroll-indicator r r4">
            <div class="scroll-mouse"></div>
        </a>
    </div>
</section>
<!-- /wp:html -->
