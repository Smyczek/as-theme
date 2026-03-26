<?php
/**
 * Site Header — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$logo_text = esc_html( $attributes['logoText'] ?? 'AS' );
$nav_links = $attributes['navLinks'] ?? [];
$cta_text  = esc_html( $attributes['ctaText'] ?? 'Hire me' );
$cta_url   = esc_url( $attributes['ctaUrl'] ?? '#' );
?>
<nav class="nav">
	<div class="nav-inner">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav-logo"><span><?php echo $logo_text; ?></span></a>
		<ul class="nav-links">
			<?php foreach ( $nav_links as $link ) :
				$label = esc_html( $link['label'] ?? '' );
				$url   = esc_url( $link['url'] ?? '#' );
			?>
				<li><a href="<?php echo $url; ?>"><?php echo $label; ?></a></li>
			<?php endforeach; ?>
			<li><a href="<?php echo $cta_url; ?>" target="_blank" rel="noopener" class="nav-hire"><?php echo $cta_text; ?></a></li>
		</ul>
		<button class="hamburger" id="hamburger" aria-label="Menu">
			<span></span><span></span><span></span>
		</button>
	</div>
</nav>
<div class="mob-menu" id="mobMenu">
	<?php foreach ( $nav_links as $link ) :
		$label = esc_html( $link['label'] ?? '' );
		$url   = esc_url( $link['url'] ?? '#' );
	?>
		<a href="<?php echo $url; ?>" onclick="closeMob()"><?php echo $label; ?></a>
	<?php endforeach; ?>
	<a href="<?php echo $cta_url; ?>" target="_blank" rel="noopener" style="color:var(--accent)" onclick="closeMob()"><?php echo $cta_text; ?></a>
</div>
