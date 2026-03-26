<?php
/**
 * Title: Portfolio
 * Slug: as-theme/portfolio
 * Categories: as-theme-sections
 */
$img = get_theme_file_uri( 'assets/img/' );
$eye = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
?>
<!-- wp:html -->
<section class="portfolio" id="work">
    <div class="container">
        <span class="tag r">Portfolio</span>
        <h2 class="section-heading r r1">More Work</h2>
        <div class="port-grid">
            <a href="#" class="port-card r r1">
                <div class="port-thumb has-screenshot pt-1">
                    <img src="<?php echo esc_url( $img . 'industrial-full.webp' ); ?>" alt="Industrial Design" loading="lazy">
                    <span class="port-eye"><?php echo $eye; ?></span>
                </div>
                <div class="port-info">
                    <div class="port-tag">Web Design</div>
                    <div class="port-name">Industrial &mdash; Landing Page</div>
                    <div class="port-sub">Dark industrial aesthetic with bold typography</div>
                </div>
            </a>
            <a href="#" class="port-card r r2">
                <div class="port-thumb has-screenshot pt-2">
                    <img src="<?php echo esc_url( $img . 'architecture-full.webp' ); ?>" alt="Architecture Design" loading="lazy">
                    <span class="port-eye"><?php echo $eye; ?></span>
                </div>
                <div class="port-info">
                    <div class="port-tag">Web Design</div>
                    <div class="port-name">Architecture &mdash; Studio Website</div>
                    <div class="port-sub">Elegant architecture firm landing page</div>
                </div>
            </a>
            <a href="#" class="port-card r r3">
                <div class="port-thumb has-screenshot pt-3">
                    <img src="<?php echo esc_url( $img . 'pulse-full.webp' ); ?>" alt="Pulse SaaS Design" loading="lazy">
                    <span class="port-eye"><?php echo $eye; ?></span>
                </div>
                <div class="port-info">
                    <div class="port-tag">SaaS</div>
                    <div class="port-name">Pulse &mdash; SaaS Dashboard</div>
                    <div class="port-sub">Modern SaaS platform with analytics UI</div>
                </div>
            </a>
            <a href="#" class="port-card r r1">
                <div class="port-thumb has-screenshot pt-4">
                    <img src="<?php echo esc_url( $img . 'sport-full.webp' ); ?>" alt="Sport Design" loading="lazy">
                    <span class="port-eye"><?php echo $eye; ?></span>
                </div>
                <div class="port-info">
                    <div class="port-tag">Web Design</div>
                    <div class="port-name">Sport &mdash; Athletic Brand</div>
                    <div class="port-sub">Dynamic sports brand landing page</div>
                </div>
            </a>
            <a href="#" class="port-card r r2">
                <div class="port-thumb has-screenshot pt-5">
                    <img src="<?php echo esc_url( $img . 'travel-full.webp' ); ?>" alt="Travel Design" loading="lazy">
                    <span class="port-eye"><?php echo $eye; ?></span>
                </div>
                <div class="port-info">
                    <div class="port-tag">Web Design</div>
                    <div class="port-name">Travel &mdash; Booking Platform</div>
                    <div class="port-sub">Immersive travel experience landing page</div>
                </div>
            </a>
            <a href="#" class="port-card r r3">
                <div class="port-thumb has-screenshot pt-6">
                    <img src="<?php echo esc_url( $img . 'food-full.webp' ); ?>" alt="Restaurant Design" loading="lazy">
                    <span class="port-eye"><?php echo $eye; ?></span>
                </div>
                <div class="port-info">
                    <div class="port-tag">Web Design</div>
                    <div class="port-name">Restaurant &mdash; Fine Dining</div>
                    <div class="port-sub">Elegant restaurant website with rich visuals</div>
                </div>
            </a>
        </div>
        <div class="port-more r">
            <a href="https://www.upwork.com/freelancers/~01fd2163ff2438e0a6" target="_blank" rel="noopener" class="btn btn-outline">See all work on Upwork &#8599;</a>
        </div>
    </div>
</section>
<!-- /wp:html -->
