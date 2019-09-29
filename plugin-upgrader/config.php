<?php
define('woowbot_LICENSING_PLUGIN_SLUG', 'woowbot-woocommerce-chatbot-pro/qcld-woowbot.php');
define('woowbot_LICENSING_PLUGIN_NAME', 'woowbot-woocommerce-chatbot-pro');
define('woowbot_LICENSING__DIR', plugin_dir_path(__DIR__));

define('woowbot_LICENSING_REMOTE_PATH', 'https://www.ultrawebmedia.com/li/plugins/woowbot/update.php');
define('woowbot_LICENSING_PRODUCT_DEV_URL', 'https://quantumcloud.com/products/');

//start new-update-for-codecanyon
define('woowbot_ENVATO_PLUGIN_ID', 21426656);
//end new-update-for-codecanyon

function get_woowbot_licensing_plugin_data(){
	include_once(ABSPATH.'wp-admin/includes/plugin.php');
	return get_plugin_data(woowbot_LICENSING__DIR.'/qcld-woowbot.php', false);
}

//License Options
function get_woowbot_licensing_key(){
	return get_option('qcld_woowbot_enter_license_key');
}

function get_woowbot_envato_key(){
	return get_option('qcld_woowbot_enter_envato_key');
}

function get_woowbot_licensing_buy_from(){
	return get_option('qcld_woowbot_buy_from_where');
}


//Update Transients
function get_woowbot_update_transient(){
	return get_transient('qcld_update_woowbot');
}

function set_woowbot_update_transient($plugin_object){
	return set_transient( 'qcld_update_woowbot', serialize($plugin_object), 1 * DAY_IN_SECONDS  );
}

function delete_woowbot_update_transient(){
	return delete_transient( 'qcld_update_woowbot' );
}


//Renewal Transients
function get_woowbot_renew_transient(){
	return get_transient('qcld_renew_woowbot_subscription');
}

function set_woowbot_renew_transient($plugin_object){
	return set_transient( 'qcld_renew_woowbot_subscription', serialize($plugin_object), 1 * DAY_IN_SECONDS  );
}

function delete_woowbot_renew_transient(){
	return delete_transient( 'qcld_renew_woowbot_subscription' );
}


//Invalid License Options
function get_woowbot_invalid_license(){
	return get_option('woowbot_invalid_license');
}

function set_woowbot_invalid_license(){
	return update_option('woowbot_invalid_license', 1);
}

function delete_woowbot_invalid_license(){
	return delete_option('woowbot_invalid_license');
}
function woowbot_get_licensing_url(){
	return admin_url('admin.php?page=woowbot_license_page');
}

//Valid License
function get_woowbot_valid_license(){
	return get_option('woowbot_valid_license');
}
function set_woowbot_valid_license(){
	return update_option('woowbot_valid_license', 1);
}
function delete_woowbot_valid_license(){
	return delete_option('woowbot_valid_license');
}

//staging or live 
function get_woowbot_site_type(){
	return get_option('qcld_woowbot_site_type');
}



//start new-update-for-codecanyon
function get_woowbot_license_purchase_code(){
	return get_option('qcld_woowbot_enter_license_or_purchase_key');
}

function get_woowbot_enter_license_notice_dismiss_transient(){
	return get_transient('get_woowbot_enter_license_notice_dismiss_transient');
}

function set_woowbot_enter_license_notice_dismiss_transient(){
	return set_transient('get_woowbot_enter_license_notice_dismiss_transient', 1, DAY_IN_SECONDS);
}

function get_woowbot_invalid_license_notice_dismiss_transient(){
	return get_transient('get_woowbot_invalid_license_notice_dismiss_transient');
}

function set_woowbot_invalid_license_notice_dismiss_transient(){
	return set_transient('get_woowbot_invalid_license_notice_dismiss_transient', 1, DAY_IN_SECONDS);
}
//end new-update-for-codecanyon