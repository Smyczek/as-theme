<?php
/**
 * Portfolio Grid — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$tag      = esc_html( $attributes['tag'] ?? 'Portfolio' );
$heading  = esc_html( $attributes['heading'] ?? 'More Work' );
$projects = $attributes['projects'] ?? [];
$cta_text = esc_html( $attributes['ctaText'] ?? '' );
$cta_url  = esc_url( $attributes['ctaUrl'] ?? '#' );
$anchor   = ! empty( $attributes['anchor'] ) ? esc_attr( $attributes['anchor'] ) : 'work';
$img_base = get_theme_file_uri( 'assets/img/' );

// Fallback image filenames for default projects
$fallback_images = [
	'industrial-full.webp',
	'architecture-full.webp',
	'pulse-full.webp',
	'sport-full.webp',
	'travel-full.webp',
	'food-full.webp',
];

$eye_svg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

$class = 'portfolio';
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}
?>
<section class="<?php echo esc_attr( $class ); ?>" id="<?php echo $anchor; ?>">
	<div class="container">
		<span class="tag r"><?php echo $tag; ?></span>
		<h2 class="section-heading r r1"><?php echo $heading; ?></h2>
		<div class="port-grid">
			<?php foreach ( $projects as $i => $project ) :
				$image_url = $project['imageUrl'] ?? '';
				$gradient  = esc_attr( $project['gradient'] ?? 'pt-1' );
				$name      = esc_html( $project['name'] ?? '' );
				$category  = esc_html( $project['category'] ?? '' );
				$desc      = esc_html( $project['description'] ?? '' );
				$url       = esc_url( $project['url'] ?? '#' );
				$delay     = 'r r' . ( ( $i % 3 ) + 1 );

				// Use fallback theme image if no custom image set
				if ( empty( $image_url ) && isset( $fallback_images[ $i ] ) ) {
					$image_url = $img_base . $fallback_images[ $i ];
				}

				$has_image = ! empty( $image_url );
			?>
			<a href="<?php echo $url; ?>" target="_blank" rel="noopener" class="port-card <?php echo esc_attr( $delay ); ?>">
				<div class="port-thumb <?php echo $has_image ? 'has-screenshot' : ''; ?> <?php echo $gradient; ?>">
					<?php if ( $has_image ) : ?>
						<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo $name; ?>" loading="lazy">
					<?php else : ?>
						<?php echo $name; ?>
					<?php endif; ?>
					<span class="port-eye"><?php echo $eye_svg; ?></span>
				</div>
				<div class="port-info">
					<div class="port-tag"><?php echo $category; ?></div>
					<div class="port-name"><?php echo $name; ?></div>
					<div class="port-sub"><?php echo $desc; ?></div>
				</div>
			</a>
			<?php endforeach; ?>
		</div>
		<?php if ( ! empty( $cta_text ) ) : ?>
		<div class="port-more r">
			<a href="<?php echo $cta_url; ?>" target="_blank" rel="noopener" class="btn btn-outline"><?php echo $cta_text; ?> &#8599;&#xFE0E;</a>
		</div>
		<?php endif; ?>
	</div>
</section>
