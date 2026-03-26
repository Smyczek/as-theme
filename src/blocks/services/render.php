<?php
/**
 * Portfolio Services — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$tag     = esc_html( $attributes['tag'] ?? 'Services' );
$heading = wp_kses_post( $attributes['heading'] ?? '' );
$cards   = $attributes['cards'] ?? [];
$anchor  = ! empty( $attributes['anchor'] ) ? esc_attr( $attributes['anchor'] ) : 'services';
$class   = 'services';
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}

// Lucide icons are rendered via data-lucide attribute and initialized by lucide-init.js
?>
<section class="<?php echo esc_attr( $class ); ?>" id="<?php echo $anchor; ?>">
	<div class="container">
		<span class="tag r"><?php echo $tag; ?></span>
		<h2 class="section-heading r r1"><?php echo $heading; ?></h2>
		<div class="svc-grid">
			<?php foreach ( $cards as $i => $card ) :
				$delay_class = 'r r' . ( $i + 1 );
				$icon_name   = esc_attr( $card['icon'] ?? 'palette' );
				$is_external = ! empty( $card['external'] );
				$target      = $is_external ? ' target="_blank" rel="noopener"' : '';
			?>
				<div class="svc-card <?php echo esc_attr( $delay_class ); ?>">
					<div class="svc-icon"><i data-lucide="<?php echo $icon_name; ?>"></i></div>
					<h3><?php echo esc_html( $card['title'] ); ?></h3>
					<ul>
						<?php foreach ( $card['items'] as $item ) : ?>
							<li><?php echo esc_html( $item ); ?></li>
						<?php endforeach; ?>
					</ul>
					<div class="svc-price"><?php echo esc_html( $card['price'] ); ?></div>
					<a href="<?php echo esc_url( $card['linkUrl'] ); ?>"<?php echo $target; ?> class="svc-link">
						<?php echo esc_html( $card['linkText'] ); ?> &rarr;
					</a>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
