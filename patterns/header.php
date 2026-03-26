<?php
/**
 * Title: Header
 * Slug: as-theme/header
 * Categories: as-theme-sections
 * Block Types: core/template-part/header
 */
?>
<!-- wp:html -->
<nav class="nav">
    <div class="nav-inner">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav-logo"><span>AS</span></a>
        <ul class="nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#murmlo">Murmlo</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="https://www.upwork.com/freelancers/~01fd2163ff2438e0a6" target="_blank" rel="noopener" class="nav-hire">Hire me</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
        </button>
    </div>
</nav>
<div class="mob-menu" id="mobMenu">
    <a href="#work" onclick="closeMob()">Work</a>
    <a href="#about" onclick="closeMob()">About</a>
    <a href="#murmlo" onclick="closeMob()">Murmlo</a>
    <a href="#contact" onclick="closeMob()">Contact</a>
    <a href="https://www.upwork.com/freelancers/~01fd2163ff2438e0a6" target="_blank" rel="noopener" style="color:var(--accent)">Hire me</a>
</div>
<!-- /wp:html -->
