<?php
/**
 * Hero Section — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$heading_before   = $attributes['headingBefore'] ?? "Let's Grow Your\nBusiness Through";
$typewriter_words = $attributes['typewriterWords'] ?? [ 'Web Design', 'Branding', 'Shopify', 'WordPress', 'UI/UX' ];
$subtitle         = esc_html( $attributes['subtitle'] ?? '' );
$email_ph         = esc_attr( $attributes['emailPlaceholder'] ?? 'Enter your email to get started...' );
$btn_text         = esc_html( $attributes['buttonText'] ?? "Let's Talk" );
$hint_text        = esc_html( $attributes['hintText'] ?? '' );
$photo_id         = $attributes['photoId'] ?? 0;
$photo_url        = $attributes['photoUrl'] ?? '';
$scroll_target    = esc_attr( $attributes['scrollTarget'] ?? '#platforms' );

// Use theme asset as fallback photo
if ( empty( $photo_url ) ) {
	$photo_url = get_theme_file_uri( 'assets/img/adam.webp' );
}

// Build srcset if we have an attachment ID
$hero_srcset = '';
$hero_sizes  = '';
if ( $photo_id ) {
	$srcset = wp_get_attachment_image_srcset( $photo_id, 'full' );
	$sizes  = wp_get_attachment_image_sizes( $photo_id, 'full' );
	if ( $srcset ) {
		$hero_srcset = ' srcset="' . esc_attr( $srcset ) . '"';
		$hero_sizes  = ' sizes="' . esc_attr( $sizes ) . '"';
	}
}

// Build heading with line breaks
$heading_lines = explode( "\n", $heading_before );
$heading_html  = '';
foreach ( $heading_lines as $line ) {
	$heading_html .= esc_html( $line ) . '<br>';
}

// Encode typewriter words for JS
$words_json = wp_json_encode( array_values( $typewriter_words ) );

$class = 'hero';
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}
?>
<section class="<?php echo esc_attr( $class ); ?>">
	<div class="hero-lines">
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
	</div>
	<div class="hero-bg-photo">
		<img src="<?php echo esc_url( $photo_url ); ?>"<?php echo $hero_srcset . $hero_sizes; ?> alt="Adam Skrzypczak" class="hero-photo-img" fetchpriority="high">
	</div>
	<div class="container">
		<div class="hero-content">
			<h1 class="r"><?php echo $heading_html; ?><span class="typewriter" id="typewriter" data-words="<?php echo esc_attr( $words_json ); ?>"></span></h1>
			<p class="hero-sub r r1"><?php echo $subtitle; ?></p>
			<form class="hero-form r r2" onsubmit="return handleHeroForm(event)">
				<input type="email" id="heroEmail" placeholder="<?php echo $email_ph; ?>" required>
				<button type="submit"><?php echo $btn_text; ?></button>
			</form>
			<p class="hero-hint r r3"><?php echo $hint_text; ?></p>
		</div>
	</div>
	<div class="hero-notch">
		<svg viewBox="0 0 305.73 74.13" preserveAspectRatio="none" class="hero-notch-svg">
			<path d="M152.87,0C89.1,0,87.12,74.13,0,74.13h305.73C218.61,74.13,216.63,0,152.87,0Z" fill="currentColor"/>
		</svg>
		<a href="<?php echo $scroll_target; ?>" class="scroll-indicator r r4" aria-label="Scroll down">
			<div class="scroll-mouse"></div>
		</a>
	</div>
</section>
</script>
