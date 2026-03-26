<?php
/**
 * Dark Section — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$platforms_label = esc_html( $attributes['platformsLabel'] ?? 'Find Me On' );
$platforms       = $attributes['platforms'] ?? [];
$stats           = $attributes['stats'] ?? [];
$tools_label     = esc_html( $attributes['toolsLabel'] ?? 'Tools & Technologies' );
$tools           = $attributes['tools'] ?? [];
$marquee_speed   = intval( $attributes['marqueeSpeed'] ?? 30 );
$anchor          = ! empty( $attributes['anchor'] ) ? esc_attr( $attributes['anchor'] ) : 'platforms';
$img_base        = get_theme_file_uri( 'assets/img/' );

// Fallback platform images
$platform_fallbacks = [
	'Upwork'    => 'upwork-logo.svg',
	'99designs' => '99designs-logo.svg',
	'Dribbble'  => 'dribbble-logo.svg',
	'LinkedIn'  => 'LinkedIn_logo.svg',
];

$class = 'dark-section';
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}
?>
<section class="<?php echo esc_attr( $class ); ?>" id="<?php echo $anchor; ?>">
	<div class="dark-glow"></div>
	<div class="dark-glow-2"></div>
	<div class="container">
		<p class="dark-label r"><?php echo $platforms_label; ?></p>
		<div class="logos-row r r1">
			<?php foreach ( $platforms as $p ) :
				$title     = esc_attr( $p['title'] ?? '' );
				$url       = esc_url( $p['url'] ?? '#' );
				$image_url = $p['imageUrl'] ?? '';
				if ( empty( $image_url ) && isset( $platform_fallbacks[ $p['title'] ] ) ) {
					$image_url = $img_base . $platform_fallbacks[ $p['title'] ];
				}
			?>
			<a href="<?php echo $url; ?>" target="_blank" rel="noopener" class="logo-item" title="<?php echo $title; ?>" aria-label="<?php echo $title; ?>">
				<?php if ( $image_url ) : ?>
					<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo $title; ?>">
				<?php else : ?>
					<span><?php echo esc_html( $p['title'] ); ?></span>
				<?php endif; ?>
			</a>
			<?php endforeach; ?>
		</div>

		<div class="dark-stats r r2">
			<?php foreach ( $stats as $s ) :
				$prefix = esc_html( $s['prefix'] ?? '' );
				$value  = intval( $s['value'] ?? 0 );
				$suffix = esc_html( $s['suffix'] ?? '' );
				$format = $s['format'] ?? '';
				$label  = esc_html( $s['label'] ?? '' );
			?>
			<div class="dark-stat">
				<div class="dark-stat-num">
					<?php if ( $prefix ) : ?><span class="acc"><?php echo $prefix; ?></span><?php endif; ?>
					<span class="count-up" data-target="<?php echo $value; ?>"<?php echo $format ? ' data-format="' . esc_attr( $format ) . '"' : ''; ?>>0</span>
					<?php if ( $suffix ) : ?><span class="acc"><?php echo $suffix; ?></span><?php endif; ?>
				</div>
				<div class="dark-stat-label"><?php echo $label; ?></div>
			</div>
			<?php endforeach; ?>
		</div>

		<div class="dark-divider"></div>
		<p class="dark-label r r3"><?php echo $tools_label; ?></p>
	</div>

	<?php if ( ! empty( $tools ) ) : ?>
	<div class="marquee-wrapper r r4">
		<div class="marquee-track" style="--marquee-speed: <?php echo $marquee_speed; ?>s;">
			<?php for ( $dup = 0; $dup < 2; $dup++ ) : ?>
			<div class="marquee-content">
				<?php foreach ( $tools as $t ) :
					$title     = esc_attr( $t['title'] ?? '' );
					$image_url = $t['imageUrl'] ?? '';
				?>
				<span class="marquee-item" title="<?php echo $title; ?>">
					<?php if ( $image_url ) : ?>
						<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo $title; ?>">
					<?php else : ?>
						<span><?php echo esc_html( $t['title'] ); ?></span>
					<?php endif; ?>
				</span>
				<?php endforeach; ?>
			</div>
			<?php endfor; ?>
		</div>
	</div>
	<?php endif; ?>
</section>
