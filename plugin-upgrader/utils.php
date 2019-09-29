<?php

function qcld_woowbot_activate_au()
{
	$plugin_slug = woowbot_LICENSING_PLUGIN_SLUG;
	$get_plugin_data = get_woowbot_licensing_plugin_data();

	$plugin_current_version = $get_plugin_data['Version'];
	$plugin_remote_path =  woowbot_LICENSING_REMOTE_PATH;
	$license_key = get_woowbot_licensing_key();
	$buy_from = get_woowbot_licensing_buy_from();
	
	if( $buy_from == 'quantumcloud' ){
		$upgrader_instance = new QCLD_woowbot_AutoUpdate ( $plugin_current_version, $plugin_remote_path, $plugin_slug, '', $license_key );
	}
}
add_action( 'init', 'qcld_woowbot_activate_au' );


function qcld_woowbot_upgrade_completed( $upgrader_object, $options ) {
	// The path to our plugin's main file
	$plugin_slug = woowbot_LICENSING_PLUGIN_SLUG;
	// If an update has taken place and the updated type is plugins and the plugins element exists
	if( $options['action'] == 'update' && $options['type'] == 'plugin' && isset( $options['plugins'] ) ) {
		// Iterate through the plugins being updated and check if ours is there
		foreach( $options['plugins'] as $plugin ) {
			if( $plugin == $plugin_slug ) {
				delete_woowbot_update_transient();
				delete_woowbot_renew_transient();
			}
		}
	}
}
add_action( 'upgrader_process_complete', 'qcld_woowbot_upgrade_completed', 10, 2 );

add_action('admin_enqueue_scripts', 'qcld_woowbot_licensing_scripts');

function qcld_woowbot_licensing_scripts(){
	wp_enqueue_style('qcld_woowbot_licensing_style', plugin_dir_url( __FILE__ ).'/assets/css/style.css');

	//start new-update-for-codecanyon
	wp_enqueue_script('qcld_woowbot_licensing_script', plugin_dir_url( __FILE__ ).'/assets/js/script.js', array('jquery'), false, true );

	wp_localize_script( 'qcld_woowbot_licensing_script', 'woowbot_licensing_admin_ajax', array(
			'ajax_url' => admin_url( 'admin-ajax.php' ), 
			'nonce' => wp_create_nonce( "woowbot_licensing_admin_nonce" )
		)
	);
	//end new-update-for-codecanyon
}