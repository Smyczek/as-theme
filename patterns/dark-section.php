<?php
/**
 * Title: Dark Section
 * Slug: as-theme/dark-section
 * Categories: as-theme-sections
 */
$img = get_theme_file_uri( 'assets/img/' );
?>
<!-- wp:html -->
<section class="dark-section" id="platforms">
    <div class="dark-glow"></div>
    <div class="dark-glow-2"></div>
    <div class="container">
        <p class="dark-label r">Find Me On</p>
        <div class="logos-row r r1">
            <a href="https://www.upwork.com/freelancers/~01fd2163ff2438e0a6" target="_blank" rel="noopener" class="logo-item" title="Upwork">
                <img src="<?php echo esc_url( $img . 'upwork-logo.svg' ); ?>" alt="Upwork">
            </a>
            <a href="https://en.99designs.de/profiles/webdoone" target="_blank" rel="noopener" class="logo-item" title="99designs">
                <img src="<?php echo esc_url( $img . '99designs-logo.svg' ); ?>" alt="99designs">
            </a>
            <a href="https://dribbble.com/smyczek" target="_blank" rel="noopener" class="logo-item" title="Dribbble">
                <img src="<?php echo esc_url( $img . 'dribbble-logo.svg' ); ?>" alt="Dribbble">
            </a>
            <a href="https://www.linkedin.com/in/adamskrzypczak/" target="_blank" rel="noopener" class="logo-item" title="LinkedIn">
                <img src="<?php echo esc_url( $img . 'LinkedIn_logo.svg' ); ?>" alt="LinkedIn">
            </a>
        </div>

        <div class="dark-stats r r2">
            <div class="dark-stat">
                <div class="dark-stat-num"><span class="acc">$</span><span class="count-up" data-target="50000" data-format="comma">0</span><span class="acc">+</span></div>
                <div class="dark-stat-label">Earned on Upwork</div>
            </div>
            <div class="dark-stat">
                <div class="dark-stat-num"><span class="count-up" data-target="104">0</span></div>
                <div class="dark-stat-label">Projects Delivered</div>
            </div>
            <div class="dark-stat">
                <div class="dark-stat-num"><span class="count-up" data-target="100">0</span><span class="acc">%</span></div>
                <div class="dark-stat-label">Job Success Rate</div>
            </div>
            <div class="dark-stat">
                <div class="dark-stat-num"><span class="count-up" data-target="15">0</span><span class="acc">+</span></div>
                <div class="dark-stat-label">Years Experience</div>
            </div>
        </div>

        <div class="dark-divider"></div>
        <p class="dark-label r r3">Tools &amp; Technologies</p>
        <div class="logos-row tools-row r r4">
            <span class="logo-item" title="Figma">
                <svg viewBox="0 0 38 57" width="19" height="28"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="currentColor"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="currentColor"/><path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="currentColor"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="currentColor"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="currentColor"/></svg>
            </span>
            <span class="logo-item" title="Adobe">
                <svg viewBox="0 0 24 24" width="28" height="28"><path d="M0 0h11.13L24 24H0zm24 0H12.87L0 24h24zM9.17 18h5.66L12 10.74 9.17 18z" fill="currentColor" fill-rule="evenodd"/></svg>
            </span>
            <span class="logo-item" title="WordPress">
                <svg viewBox="0 0 122.52 122.523" width="28" height="28"><path d="M8.708 61.26c0 20.803 12.089 38.779 29.619 47.299L13.258 39.872a52.354 52.354 0 0 0-4.55 21.388zM96.74 58.608c0-6.495-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.497 0 14.006-.668 14.006-.668 2.833-.167 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501L48.2 93.547l11.501-34.493-8.188-22.434c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.679.668 13.843.668 5.496 0 14.006-.668 14.006-.668 2.834-.167 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989z" fill="currentColor"/><path d="M62.184 65.857l-15.768 45.819a52.516 52.516 0 0 0 14.846 2.142c6.12 0 11.989-1.058 17.452-2.983a4.463 4.463 0 0 1-.364-.699L62.184 65.857zM107.376 36.046c.226 1.674.354 3.471.354 5.404 0 5.333-.996 11.328-3.996 18.824l-16.053 46.413c15.624-9.111 26.133-26.038 26.133-45.427.001-9.137-2.333-17.729-6.438-25.214z" fill="currentColor"/><path d="M61.262 0C27.483 0 0 27.481 0 61.26c0 33.783 27.483 61.263 61.262 61.263 33.778 0 61.265-27.48 61.265-61.263C122.526 27.481 95.04 0 61.262 0zm0 119.715c-32.23 0-58.453-26.223-58.453-58.455 0-32.23 26.222-58.451 58.453-58.451 32.229 0 58.45 26.221 58.45 58.451 0 32.232-26.221 58.455-58.45 58.455z" fill="currentColor"/></svg>
            </span>
            <span class="logo-item" title="Shopify">
                <svg viewBox="0 0 24 24" width="24" height="28"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.74c-.018-.126-.114-.21-.21-.21s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.054-.121-.074l-.914 21.132zm-1.478-17.384l-.764 2.358s-.859-.389-1.823-.389c-1.467 0-1.541.921-1.541 1.152 0 1.27 3.299 1.755 3.299 4.727 0 2.339-1.483 3.844-3.483 3.844-2.401 0-3.624-1.494-3.624-1.494l.644-2.121s1.263 1.082 2.328 1.082c.694 0 .979-.549.979-.949 0-1.655-2.709-1.728-2.709-4.449 0-2.289 1.641-4.504 4.952-4.504 1.278 0 1.742.743 1.742.743zm-2.276-5.803s.248-.07.66-.07c1.226 0 1.86.958 1.86.958l1.664-.402s-.94-2.466-3.4-2.466c-2.061 0-3.988 2.099-3.988 2.099l2.036.598s.413-.717 1.168-.717zM10.227 7.857s-1.16-.854-2.55-.854c-2.097 0-4.423 2.311-4.423 5.107 0 1.957.937 3.138 2.487 3.138 1.21 0 2.203-.938 2.203-.938l-.12.804h2.354L12.024 3.07l-2.656.512.858 4.275z" fill="currentColor"/></svg>
            </span>
            <span class="logo-item logo-stroke" title="React">
                <svg viewBox="-11.5 -10.232 23 20.463" width="36" height="28" fill="none" stroke="currentColor" stroke-width="1"><circle r="2.05" fill="currentColor" stroke="none"/><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></svg>
            </span>
            <span class="logo-item" title="Django">
                <svg viewBox="0 0 100 28" width="90" height="28">
                    <text x="0" y="22" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="700" font-style="italic" fill="currentColor" letter-spacing="-0.5">Django</text>
                </svg>
            </span>
            <span class="logo-item" title="Python">
                <svg viewBox="0 0 24 24" width="28" height="28"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l5.01.02h5.61zm-2.1 1.65a.89.89 0 0 0-.87.87c0 .48.39.87.87.87s.87-.39.87-.87a.89.89 0 0 0-.87-.87zm5.89 7.17v3.4l-.01.42-.05.39-.09.35-.13.31-.17.28-.21.24-.25.2-.28.17-.31.13-.34.1-.37.06-.39.03h-5.06l-.78.06-.7.15-.6.24-.52.32-.44.39-.37.45-.3.51-.24.55-.17.58-.12.59-.07.58-.03.55v3.07l-.02.24-.06.22-.11.19-.15.16-.19.12-.22.1-.24.06-.26.03-.27.01H5.48l-.33-.01-.3-.04-.27-.08-.24-.12-.21-.16-.18-.2-.16-.24-.13-.28-.11-.32-.09-.37-.07-.41-.06-.46-.04-.5-.03-.55-.01-.59v-.63l.01-.57.03-.52.05-.46.06-.41.09-.36.11-.31.13-.27.16-.22.18-.19.21-.15.24-.12.27-.09.3-.07.33-.04h5.6l.85-.08.73-.2.62-.32.52-.42.42-.52.32-.62.22-.72.12-.82.05-.91v-3.22h4.19l.5.03.47.08.43.13.4.19.36.24.32.3.28.35.23.41.19.46.15.52.11.57.07.63.04.68.01.73z" fill="currentColor"/><path d="M9.77 16.03a.89.89 0 0 0-.87.87c0 .48.39.87.87.87s.87-.39.87-.87a.89.89 0 0 0-.87-.87z" fill="currentColor"/></svg>
            </span>
            <span class="logo-item" title="Webflow">
                <svg viewBox="0 0 24 24" width="34" height="28"><path d="M17.802 8.56s-1.946 6.092-2.15 6.771c-.05-.406-1.14-6.771-1.14-6.771C12.91 4.19 9.382 3.985 7.778 6.178c0 0-3.14 4.223-3.478 4.68.002-.385-.574-6.298-.574-6.298C3.39.854.128.14 0 .129v15.89c1.603-3.611 4.457-9.85 4.484-9.907.15.782 1.626 9.898 1.626 9.898 1.582-3.607 3.393-7.106 5.2-7.16-.14 1.582 1.87 7.135 1.87 7.135 1.564-3.6 4.226-9.856 4.226-9.856C19.846 2.447 24-.112 24 0c-2.625 0-6.198 8.56-6.198 8.56z" fill="currentColor"/></svg>
            </span>
            <span class="logo-item" title="JavaScript">
                <svg viewBox="0 0 24 24" width="28" height="28"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="currentColor"/></svg>
            </span>
        </div>
    </div>
</section>
<!-- /wp:html -->
