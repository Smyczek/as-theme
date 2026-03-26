<?php
/**
 * Portfolio Footer — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$copyright = esc_html( $attributes['copyright'] ?? 'Your Name' );
$tagline   = wp_kses_post( $attributes['tagline'] ?? '' );
$links     = $attributes['links'] ?? [];
$year      = date( 'Y' );
$anchor    = ! empty( $attributes['anchor'] ) ? ' id="' . esc_attr( $attributes['anchor'] ) . '"' : '';
$class     = 'footer';
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}
?>
<footer class="<?php echo esc_attr( $class ); ?>"<?php echo $anchor; ?>>
	<div class="container">
		<p>&copy; <?php echo $year . ' ' . $copyright; ?></p>
		<p><?php echo $tagline; ?></p>
		<div class="footer-links">
			<?php foreach ( $links as $link ) : ?>
				<a href="<?php echo esc_url( $link['url'] ); ?>" target="_blank" rel="noopener">
					<?php echo esc_html( $link['label'] ); ?>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</footer>
