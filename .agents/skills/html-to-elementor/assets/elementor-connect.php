<?php
/**
 * Plugin Name: Elementor Connect (HTML-to-Elementor helper)
 * Description: Minimal authenticated REST endpoint to create Elementor pages from template JSON. Pair with the html-to-elementor Claude skill.
 * Version: 1.1.0
 * Author: Darrel Wilson
 *
 * Endpoint: POST /wp-json/elementor-connect/v1/pages
 * Auth:     WordPress Application Passwords (user must be able to edit_pages)
 * Body:     { "title": "...", "status": "draft", "content": [...],
 *             "page_settings": {...}, "import_images": true }
 *
 * With "import_images": true, external image URLs found in the template
 * (any Elementor media value: {url, id}) are sideloaded into the Media
 * Library and the template is rewritten to use the local attachment.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'elementor-connect/v1', '/pages', array(
		'methods'             => 'POST',
		'permission_callback' => function () {
			return current_user_can( 'edit_pages' );
		},
		'callback'            => 'elementor_connect_create_page',
		'args'                => array(
			'title'         => array( 'type' => 'string', 'required' => true ),
			'status'        => array( 'type' => 'string', 'default' => 'draft' ),
			'content'       => array( 'required' => true ), // Elementor content array
			'page_settings' => array( 'default' => array() ),
			'import_images' => array( 'type' => 'boolean', 'default' => false ),
		),
	) );
} );

function elementor_connect_create_page( WP_REST_Request $request ) {
	if ( ! defined( 'ELEMENTOR_VERSION' ) ) {
		return new WP_Error( 'no_elementor', 'Elementor is not active on this site.', array( 'status' => 400 ) );
	}

	$title         = sanitize_text_field( $request['title'] );
	$status        = in_array( $request['status'], array( 'draft', 'pending', 'publish', 'private' ), true )
		? $request['status'] : 'draft';
	$content       = $request['content'];
	$page_settings = $request['page_settings'];

	if ( ! is_array( $content ) ) {
		return new WP_Error( 'bad_content', 'content must be the Elementor elements array.', array( 'status' => 400 ) );
	}

	$page_id = wp_insert_post( array(
		'post_title'  => $title,
		'post_type'   => 'page',
		'post_status' => $status,
	), true );

	if ( is_wp_error( $page_id ) ) {
		return $page_id;
	}

	$image_report = array( 'imported' => 0, 'failed' => array() );
	if ( $request['import_images'] ) {
		$content = elementor_connect_sideload_images( $content, $page_id, $image_report );
	}

	// Elementor reads _elementor_data as a JSON *string* of the elements array.
	// wp_slash protects the JSON from wp_unslash inside update_post_meta.
	update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $content ) ) );
	update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );
	update_post_meta( $page_id, '_elementor_template_type', 'wp-page' );
	update_post_meta( $page_id, '_elementor_version', ELEMENTOR_VERSION );

	if ( is_array( $page_settings ) && ! empty( $page_settings ) ) {
		if ( isset( $page_settings['template'] ) ) {
			update_post_meta( $page_id, '_wp_page_template', sanitize_text_field( $page_settings['template'] ) );
		}
		update_post_meta( $page_id, '_elementor_page_settings', map_deep( $page_settings, 'sanitize_text_field' ) );
	}

	// Clear Elementor's cached CSS so the new page renders styled.
	if ( class_exists( '\Elementor\Plugin' ) ) {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	}

	return array(
		'id'          => $page_id,
		'edit_url'    => admin_url( 'post.php?post=' . $page_id . '&action=elementor' ),
		'preview_url' => get_preview_post_link( $page_id ),
		'images'      => $image_report,
	);
}

/**
 * Recursively find Elementor media values ({url, id}) pointing at external
 * images, sideload them into the Media Library, and rewrite url/id.
 * Repeated URLs are only downloaded once. Failures leave the original URL.
 */
function elementor_connect_sideload_images( $data, $page_id, &$report, &$cache = array() ) {
	if ( ! is_array( $data ) ) {
		return $data;
	}
	$site_host = wp_parse_url( home_url(), PHP_URL_HOST );
	$is_media  = isset( $data['url'] ) && array_key_exists( 'id', $data )
		&& is_string( $data['url'] )
		&& preg_match( '/\.(jpe?g|png|gif|webp|avif)(\?.*)?$/i', $data['url'] );

	if ( $is_media ) {
		$url  = $data['url'];
		$host = wp_parse_url( $url, PHP_URL_HOST );
		if ( $host && $host !== $site_host ) { // external only
			if ( ! isset( $cache[ $url ] ) ) {
				require_once ABSPATH . 'wp-admin/includes/media.php';
				require_once ABSPATH . 'wp-admin/includes/file.php';
				require_once ABSPATH . 'wp-admin/includes/image.php';
				$att = media_sideload_image( $url, $page_id, null, 'id' );
				$cache[ $url ] = is_wp_error( $att ) ? $att : (int) $att;
			}
			if ( is_wp_error( $cache[ $url ] ) ) {
				$report['failed'][] = array( 'url' => $url, 'error' => $cache[ $url ]->get_error_message() );
			} else {
				$data['id']  = $cache[ $url ];
				$data['url'] = wp_get_attachment_url( $cache[ $url ] );
				$report['imported']++;
			}
		}
		return $data;
	}

	foreach ( $data as $key => $value ) {
		if ( is_array( $value ) ) {
			$data[ $key ] = elementor_connect_sideload_images( $value, $page_id, $report, $cache );
		}
	}
	return $data;
}
