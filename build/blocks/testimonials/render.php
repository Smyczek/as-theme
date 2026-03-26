<?php
/**
 * Testimonials — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$tag          = esc_html( $attributes['tag'] ?? 'Testimonials' );
$heading      = esc_html( $attributes['heading'] ?? 'What Clients Say' );
$testimonials = $attributes['testimonials'] ?? [];
$proof_items  = $attributes['proofItems'] ?? [];
$anchor       = ! empty( $attributes['anchor'] ) ? esc_attr( $attributes['anchor'] ) : '';

$class = 'testimonials';
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}

// Lucide icons are rendered via data-lucide attribute and initialized by lucide-init.js
?>
<section class="<?php echo esc_attr( $class ); ?>"<?php echo $anchor ? ' id="' . $anchor . '"' : ''; ?>>
	<div class="container">
		<div class="test-top-row r">
			<div>
				<span class="tag"><?php echo $tag; ?></span>
				<h2 class="section-heading" style="margin-bottom:0"><?php echo $heading; ?></h2>
			</div>
			<div class="test-arrows">
				<button class="test-arrow test-prev" aria-label="Previous testimonial"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg></button>
				<button class="test-arrow test-next" aria-label="Next testimonial"><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg></button>
			</div>
		</div>
		<div class="swiper test-swiper r r1">
			<div class="swiper-wrapper">
				<?php foreach ( $testimonials as $t ) :
					$text   = esc_html( $t['text'] ?? '' );
					$author = esc_html( $t['author'] ?? '' );
					$url    = esc_url( $t['url'] ?? '#' );
					$stars  = intval( $t['stars'] ?? 5 );
				?>
				<div class="swiper-slide">
					<a href="<?php echo $url; ?>" target="_blank" rel="noopener" class="test-card">
						<div class="test-mark">&ldquo;</div>
						<p class="test-text"><?php echo $text; ?></p>
						<div class="test-author"><?php echo $author; ?></div>
						<div class="test-stars"><?php echo str_repeat( '&#9733;', $stars ); ?></div>
					</a>
				</div>
				<?php endforeach; ?>
			</div>
		</div>
		<?php if ( ! empty( $proof_items ) ) : ?>
		<div class="proof-row r">
			<?php foreach ( $proof_items as $p ) :
				$label = esc_html( $p['label'] ?? '' );
				$icon  = esc_attr( $p['icon'] ?? '' );
			?>
			<div class="proof-item">
				<div class="proof-icon"><i data-lucide="<?php echo $icon; ?>"></i></div>
				<div class="proof-label"><?php echo $label; ?></div>
			</div>
			<?php endforeach; ?>
		</div>
		<?php endif; ?>
	</div>
</section>
