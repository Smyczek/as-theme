<?php
/**
 * Portfolio About — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$tag          = esc_html( $attributes['tag'] ?? 'About' );
$heading      = wp_kses_post( $attributes['heading'] ?? '' );
$paragraphs   = $attributes['paragraphs'] ?? [];
$skill_groups = $attributes['skillGroups'] ?? [];
$anchor       = ! empty( $attributes['anchor'] ) ? esc_attr( $attributes['anchor'] ) : 'about';
$class        = 'about';
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}
?>
<section class="<?php echo esc_attr( $class ); ?>" id="<?php echo $anchor; ?>">
	<div class="container">
		<div class="about-grid">
			<div>
				<span class="tag r"><?php echo $tag; ?></span>
				<h2 class="section-heading r r1"><?php echo $heading; ?></h2>
				<?php foreach ( $paragraphs as $i => $text ) : ?>
					<p class="r r<?php echo $i + 2; ?>"><?php echo wp_kses_post( $text ); ?></p>
				<?php endforeach; ?>
			</div>
			<div class="r r2">
				<div class="skills-cols">
					<?php foreach ( $skill_groups as $group ) : ?>
						<div class="skill-group">
							<h3><?php echo esc_html( $group['title'] ); ?></h3>
							<ul>
								<?php foreach ( $group['skills'] as $skill ) : ?>
									<li<?php echo ! empty( $skill['highlighted'] ) ? ' class="hl"' : ''; ?>>
										<?php echo esc_html( $skill['name'] ); ?>
									</li>
								<?php endforeach; ?>
							</ul>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
</section>
