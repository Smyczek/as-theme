<?php
/**
 * Featured Project — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$tag          = esc_html( $attributes['tag'] ?? 'Featured Project' );
$title        = esc_html( $attributes['title'] ?? 'Murmlo' );
$quote        = esc_html( $attributes['quote'] ?? '' );
$desc         = wp_kses_post( $attributes['description'] ?? '' );
$tags         = $attributes['tags'] ?? [];
$btn_text     = esc_html( $attributes['buttonText'] ?? 'Visit Murmlo' );
$btn_url      = esc_url( $attributes['buttonUrl'] ?? '#' );
$availability = esc_html( $attributes['availability'] ?? '' );
$image_id     = $attributes['imageId'] ?? 0;
$image_url    = $attributes['imageUrl'] ?? '';
$anchor       = ! empty( $attributes['anchor'] ) ? esc_attr( $attributes['anchor'] ) : 'murmlo';
$theme        = $attributes['theme'] ?? 'dark';
$reversed     = ! empty( $attributes['reversed'] );

$class = 'murmlo';
if ( $theme === 'light' ) {
	$class .= ' murmlo--light';
}
if ( $reversed ) {
	$class .= ' murmlo--reversed';
}
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}
?>
<section class="<?php echo esc_attr( $class ); ?>" id="<?php echo $anchor; ?>">
	<div class="container">
		<div class="murmlo-card r">
			<div class="murmlo-inner">
				<div class="murmlo-text">
					<span class="tag"><?php echo $tag; ?></span>
					<h2><?php echo $title; ?></h2>
					<p class="murmlo-quote"><?php echo $quote; ?></p>
					<p class="murmlo-desc"><?php echo $desc; ?></p>
					<div class="murmlo-tags">
						<?php foreach ( $tags as $t ) : ?>
							<span><?php echo esc_html( $t ); ?></span>
						<?php endforeach; ?>
					</div>
					<div class="murmlo-btns">
						<a href="<?php echo $btn_url; ?>" target="_blank" rel="noopener" class="btn btn-primary"><?php echo $btn_text; ?> &rarr;</a>
					</div>
					<p class="murmlo-avail"><?php echo $availability; ?></p>
				</div>
				<div class="murmlo-visual">
					<?php if ( $image_url ) : ?>
						<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $title ); ?>" style="width:100%;height:100%;object-fit:cover;" />
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</section>
