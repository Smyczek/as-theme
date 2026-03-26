<?php
/**
 * Portfolio Contact — server-side render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused).
 * @var WP_Block $block      Block instance.
 */

$tag            = esc_html( $attributes['tag'] ?? 'Contact' );
$heading        = wp_kses_post( $attributes['heading'] ?? '' );
$description    = wp_kses_post( $attributes['description'] ?? '' );
$links          = $attributes['links'] ?? [];
$form_fields    = $attributes['formFields'] ?? [];
$submit_text    = esc_html( $attributes['submitText'] ?? 'Send Message' );
$success_msg    = esc_html( $attributes['successMessage'] ?? 'Message sent!' );
$success_detail = esc_html( $attributes['successDetail'] ?? '' );
$anchor         = ! empty( $attributes['anchor'] ) ? esc_attr( $attributes['anchor'] ) : 'contact';
$class          = 'contact-section';
if ( ! empty( $attributes['className'] ) ) {
	$class .= ' ' . esc_attr( $attributes['className'] );
}
?>
<section class="<?php echo esc_attr( $class ); ?>" id="<?php echo $anchor; ?>">
	<div class="container">
		<div class="contact-grid">
			<div class="contact-info">
				<span class="tag r"><?php echo $tag; ?></span>
				<h2 class="r r1"><?php echo $heading; ?></h2>
				<p class="r r2"><?php echo $description; ?></p>
				<div class="contact-links r r3">
					<?php foreach ( $links as $link ) : ?>
						<a href="<?php echo esc_url( $link['url'] ); ?>" target="_blank" rel="noopener">
							<?php echo esc_html( $link['label'] ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
			<div class="r r2">
				<form class="contact-form" id="contactForm">
					<?php
					$i = 0;
					while ( $i < count( $form_fields ) ) :
						$field = $form_fields[ $i ];
						if ( ! empty( $field['half'] ) && isset( $form_fields[ $i + 1 ] ) && ! empty( $form_fields[ $i + 1 ]['half'] ) ) :
					?>
						<div class="form-row">
							<?php echo as_theme_render_form_field( $form_fields[ $i ] ); ?>
							<?php echo as_theme_render_form_field( $form_fields[ $i + 1 ] ); ?>
						</div>
					<?php
							$i += 2;
						else :
							echo as_theme_render_form_field( $field );
							$i++;
						endif;
					endwhile;
					?>
					<div style="position:absolute;left:-9999px;" aria-hidden="true">
						<input type="text" name="website_url" tabindex="-1" autocomplete="off">
					</div>
					<button type="submit" class="form-submit"><?php echo $submit_text; ?></button>
				</form>
				<div class="form-success" id="formSuccess">
					<p><?php echo $success_msg; ?></p>
					<small><?php echo $success_detail; ?></small>
				</div>
			</div>
		</div>
	</div>
</section>
<?php

function as_theme_render_form_field( $field ) {
	$name        = esc_attr( $field['name'] ?? '' );
	$label       = esc_html( $field['label'] ?? '' );
	$type        = esc_attr( $field['type'] ?? 'text' );
	$placeholder = esc_attr( $field['placeholder'] ?? '' );
	$required    = ! empty( $field['required'] ) ? ' required' : '';
	$id          = 'f' . $name;

	$html = '<div class="form-group">';
	$html .= '<label for="' . $id . '">' . $label . '</label>';

	if ( $type === 'textarea' ) {
		$html .= '<textarea id="' . $id . '" name="' . $name . '" placeholder="' . $placeholder . '"' . $required . '></textarea>';
	} else {
		$html .= '<input type="' . $type . '" id="' . $id . '" name="' . $name . '" placeholder="' . $placeholder . '"' . $required . '>';
	}

	$html .= '</div>';
	return $html;
}
