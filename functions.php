<?php
/**
 * Adam Skrzypczak Portfolio Theme — functions.php
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'AS_THEME_VERSION', '1.4.0' );

/**
 * GitHub auto-update checker
 */
require get_template_directory() . '/vendor/plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$as_theme_update_checker = PucFactory::buildUpdateChecker(
	'https://github.com/Smyczek/as-theme/',
	get_template_directory() . '/style.css',
	'as-theme'
);
$as_theme_update_checker->setBranch( 'main' );

/**
 * Theme setup
 */
function as_theme_setup() {
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'post-thumbnails' );
	add_post_type_support( 'page', 'excerpt' );
	add_editor_style( 'assets/css/custom.css' );
}
add_action( 'after_setup_theme', 'as_theme_setup' );

/**
 * Preload critical fonts.
 */
function as_theme_preload_fonts() {
	$fonts = [
		'assets/fonts/Inter-Variable.woff2',
		'assets/fonts/DMMono-Regular.woff2',
	];
	foreach ( $fonts as $font ) {
		echo '<link rel="preload" href="' . esc_url( get_theme_file_uri( $font ) ) . '" as="font" type="font/woff2" crossorigin>' . "\n";
	}
}
add_action( 'wp_head', 'as_theme_preload_fonts', 1 );

/**
 * Remove unnecessary WP frontend scripts/styles for performance.
 */
function as_theme_dequeue_unnecessary() {
	// Remove WP emoji scripts
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	// Remove global styles inline CSS if not needed
	wp_dequeue_style( 'classic-theme-styles' );
	// Remove jQuery migrate
	if ( ! is_admin() ) {
		wp_deregister_script( 'jquery' );
	}
}
add_action( 'wp_enqueue_scripts', 'as_theme_dequeue_unnecessary', 100 );

/**
 * Output meta description from page excerpt.
 */
function as_theme_meta_description() {
	if ( is_singular() && $excerpt = get_the_excerpt() ) {
		$description = esc_attr( wp_strip_all_tags( $excerpt ) );
		echo '<meta name="description" content="' . $description . '">' . "\n";
	}
}
add_action( 'wp_head', 'as_theme_meta_description', 1 );

/**
 * Register pattern categories
 */
function as_theme_register_pattern_categories() {
	register_block_pattern_category( 'as-theme-sections', [
		'label' => __( 'Portfolio Sections', 'as-theme' ),
	] );
}
add_action( 'init', 'as_theme_register_pattern_categories' );

/**
 * Register custom Gutenberg blocks
 */
function as_theme_register_blocks() {
	$blocks_dir = get_theme_file_path( 'build/blocks' );
	if ( ! is_dir( $blocks_dir ) ) {
		return;
	}
	$blocks = array_filter( glob( $blocks_dir . '/*' ), 'is_dir' );
	foreach ( $blocks as $block ) {
		register_block_type( $block );
	}
}
add_action( 'init', 'as_theme_register_blocks' );

/**
 * Register custom block category
 */
function as_theme_block_categories( $categories ) {
	array_unshift( $categories, [
		'slug'  => 'as-theme-sections',
		'title' => __( 'Portfolio Sections', 'as-theme' ),
	] );
	return $categories;
}
add_filter( 'block_categories_all', 'as_theme_block_categories' );

/**
 * Enqueue frontend styles
 */
function as_theme_enqueue_styles() {
	wp_enqueue_style(
		'as-theme-custom',
		get_theme_file_uri( 'assets/css/custom.css' ),
		[],
		AS_THEME_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'as_theme_enqueue_styles' );

/**
 * Enqueue frontend scripts (front page only)
 */
function as_theme_enqueue_scripts() {
	if ( ! is_front_page() ) {
		return;
	}

	// Swiper JS (local, CSS included in custom.css)
	wp_enqueue_script( 'swiper', get_theme_file_uri( 'assets/js/swiper.min.js' ), [], '11', true );

	// Lucide Icons (local)
	wp_enqueue_script( 'lucide', get_theme_file_uri( 'assets/js/lucide.min.js' ), [], '0.460', true );

	// Single bundled theme script (navigation, scroll-reveal, count-up, typewriter, parallax, hero-form, contact-form, swiper-init, lucide-init)
	wp_enqueue_script(
		'as-theme-theme-bundle',
		get_theme_file_uri( 'assets/js/theme-bundle.js' ),
		[ 'swiper', 'lucide' ],
		AS_THEME_VERSION,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'as_theme_enqueue_scripts' );

/**
 * Localize script — pass REST URL and nonce to contact-form.js
 */
function as_theme_localize_scripts() {
	if ( ! is_front_page() ) {
		return;
	}
	wp_localize_script( 'as-theme-theme-bundle', 'asThemeContact', [
		'restUrl' => esc_url_raw( rest_url( 'as-theme/v1/contact' ) ),
		'nonce'   => wp_create_nonce( 'wp_rest' ),
	] );
}
add_action( 'wp_enqueue_scripts', 'as_theme_localize_scripts', 20 );

/**
 * Register contact form REST API endpoint
 */
function as_theme_register_contact_endpoint() {
	register_rest_route( 'as-theme/v1', '/contact', [
		'methods'             => 'POST',
		'callback'            => 'as_theme_handle_contact',
		'permission_callback' => '__return_true',
	] );
}
add_action( 'rest_api_init', 'as_theme_register_contact_endpoint' );

/**
 * Handle contact form submission
 */
function as_theme_handle_contact( WP_REST_Request $request ) {
	// Honeypot check — if filled, it's a bot
	$honeypot = $request->get_param( 'website_url' );
	if ( ! empty( $honeypot ) ) {
		// Pretend success to not alert the bot
		return new WP_REST_Response( [ 'success' => true ], 200 );
	}

	// Rate limiting — simple transient-based (1 submission per 30 seconds per IP)
	$ip_key = 'contact_' . md5( $_SERVER['REMOTE_ADDR'] ?? 'unknown' );
	if ( get_transient( $ip_key ) ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'Please wait before sending another message.',
		], 429 );
	}

	$name    = sanitize_text_field( $request->get_param( 'name' ) );
	$email   = sanitize_email( $request->get_param( 'email' ) );
	$budget  = sanitize_text_field( $request->get_param( 'budget' ) );
	$message = sanitize_textarea_field( $request->get_param( 'message' ) );

	// Validation
	if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'Please fill in all required fields.',
		], 400 );
	}

	if ( ! is_email( $email ) ) {
		return new WP_REST_Response( [
			'success' => false,
			'message' => 'Please enter a valid email address.',
		], 400 );
	}

	// Build email
	$to      = get_option( 'admin_email' );
	$subject = sprintf( '[Portfolio] New message from %s', $name );
	$body    = sprintf(
		"Name: %s\nEmail: %s\nBudget: %s\n\nMessage:\n%s",
		$name,
		$email,
		$budget ?: 'Not specified',
		$message
	);
	$headers = [
		'Content-Type: text/plain; charset=UTF-8',
		sprintf( 'Reply-To: %s <%s>', $name, $email ),
	];

	$sent = wp_mail( $to, $subject, $body, $headers );

	// Set rate limit
	set_transient( $ip_key, true, 30 );

	if ( $sent ) {
		return new WP_REST_Response( [ 'success' => true ], 200 );
	}

	return new WP_REST_Response( [
		'success' => false,
		'message' => 'Failed to send message. Please try again or email directly.',
	], 500 );
}

/**
 * Allow SVG uploads
 */
function as_theme_mime_types( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	$mimes['webp'] = 'image/webp';
	return $mimes;
}
add_filter( 'upload_mimes', 'as_theme_mime_types' );
