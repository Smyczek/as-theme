<?php
/**
 * Featured Project — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$tag          = esc_html( $attributes['tag'] ?? 'Featured Project' );
$title        = esc_html( $attributes['title'] ?? 'Project Name' );
$quote        = esc_html( $attributes['quote'] ?? '' );
$desc         = wp_kses_post( $attributes['description'] ?? '' );
$tags         = $attributes['tags'] ?? [];
$btn_text     = esc_html( $attributes['buttonText'] ?? 'View Project' );
$btn_url      = esc_url( $attributes['buttonUrl'] ?? '#' );
$availability = esc_html( $attributes['availability'] ?? '' );
$image_id     = $attributes['imageId'] ?? 0;
$image_url    = $attributes['imageUrl'] ?? '';
$focal        = $attributes['imageFocalPoint'] ?? [ 'x' => 0.5, 'y' => 0.5 ];
$anchor       = ! empty( $attributes['anchor'] ) ? esc_attr( $attributes['anchor'] ) : 'murmlo';
$theme        = $attributes['theme'] ?? 'dark';
$reversed     = ! empty( $attributes['reversed'] );
$bg_color         = $attributes['bgColor'] ?? '';
$accent_color     = $attributes['accentColor'] ?? '';
$hover_color      = $attributes['hoverColor'] ?? '';
$text_color       = $attributes['textColor'] ?? '';
$btn_text_color   = $attributes['buttonTextColor'] ?? '';

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

// Build inline CSS variables for custom colors
$style_vars = '';
if ( $bg_color ) {
	$style_vars .= '--fp-bg:' . esc_attr( $bg_color ) . ';';
}
if ( $accent_color ) {
	$style_vars .= '--fp-accent:' . esc_attr( $accent_color ) . ';';
}
if ( $hover_color ) {
	$style_vars .= '--fp-hover:' . esc_attr( $hover_color ) . ';';
}

$section_style = $style_vars ? ' style="' . $style_vars . '"' : '';

// Image object-position from focal point
$obj_position = round( $focal['x'] * 100 ) . '% ' . round( $focal['y'] * 100 ) . '%';
?>
<section class="<?php echo esc_attr( $class ); ?>" id="<?php echo $anchor; ?>"<?php echo $section_style; ?>>
	<div class="container">
		<div class="murmlo-card r"<?php echo $bg_color ? ' style="background:' . esc_attr( $bg_color ) . '"' : ''; ?>>
			<div class="murmlo-inner">
				<div class="murmlo-text">
					<span class="tag"<?php echo $accent_color ? ' style="color:' . esc_attr( $accent_color ) . '"' : ''; ?>><?php echo $tag; ?></span>
					<h2<?php echo $text_color ? ' style="color:' . esc_attr( $text_color ) . '"' : ''; ?>><?php echo $title; ?></h2>
					<p class="murmlo-quote"<?php echo $text_color ? ' style="color:' . esc_attr( $text_color ) . ';opacity:0.6"' : ''; ?>><?php echo $quote; ?></p>
					<p class="murmlo-desc"<?php echo $text_color ? ' style="color:' . esc_attr( $text_color ) . ';opacity:0.7"' : ''; ?>><?php echo $desc; ?></p>
					<div class="murmlo-tags">
						<?php foreach ( $tags as $t ) : ?>
							<span><?php echo esc_html( $t ); ?></span>
						<?php endforeach; ?>
					</div>
					<div class="murmlo-btns">
						<?php
						$btn_styles = '';
						if ( $accent_color ) {
							$btn_styles .= 'background:' . esc_attr( $accent_color ) . ';';
						}
						if ( $btn_text_color ) {
							$btn_styles .= 'color:' . esc_attr( $btn_text_color ) . ';';
						}
						$hover_bg = $hover_color ?: ( $accent_color ?: '' );
						$default_bg = $accent_color ?: '';
						?>
						<a href="<?php echo $btn_url; ?>" target="_blank" rel="noopener" class="btn btn-primary"
							<?php echo $btn_styles ? ' style="' . $btn_styles . '"' : ''; ?>
							<?php if ( $hover_color || $accent_color ) : ?>
								onmouseover="this.style.background='<?php echo esc_attr( $hover_bg ); ?>';this.style.boxShadow='0 4px 16px <?php echo esc_attr( $hover_bg ); ?>40';this.style.transform='translateY(-1px)'"
								onmouseout="this.style.background='<?php echo esc_attr( $default_bg ); ?>';this.style.boxShadow='none';this.style.transform='none'"
							<?php endif; ?>
						><?php echo $btn_text; ?> &rarr;</a>
					</div>
					<?php if ( $availability ) : ?>
						<p class="murmlo-avail"><?php echo $availability; ?></p>
					<?php endif; ?>
				</div>
				<div class="murmlo-visual">
					<?php if ( $image_url ) : ?>
						<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $title ); ?>" style="width:100%;height:100%;object-fit:cover;object-position:<?php echo esc_attr( $obj_position ); ?>;" />
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</section>
