<?php
/**
 * Product indexing, caching & searching features concept is taken from open source 'Advanced Woo Search' Wp plugin by ILLID.
 */
//include_once( 'includes/class-woowbot-cache.php' );
include_once( 'includes/class-woowbot-table.php' );
include_once( 'includes/class-woowbot-search.php' );

function qcld_woobo_search_site() {
	
	$keyword = sanitize_text_field($_POST['keyword']);

	$results = new WP_Query( array(
		'post_type'     => array( 'post', 'page' ),
		'post_status'   => 'publish',
		'posts_per_page'=> 10,
		's'             => stripslashes( $keyword ),
	) );

	$msg = (get_option('qlcd_woo_chatbot_we_have_found')!=''?get_option('qlcd_woo_chatbot_we_have_found'):'We have found #result results for #keyword');
	

	$response = array();
	$response['status'] = 'fail';
	
	if ( !empty( $results->posts ) ) {
		$response['status'] = 'success';
		$response['html'] = '<div class="woob-search-result">';
		$response['html'] .= str_replace(array('#result', '#keyword'),array(esc_html(count($results->posts)), esc_html($_POST['keyword'])),$msg);
		foreach ( $results->posts as $result ) {
			$response['html'] .= '<a href="'.esc_url($result->guid).'" target="_blank">'.esc_html($result->post_title).'</a>';
		}
		$response['html'] .='</div>';
	}else{
		$texts = unserialize(get_option('qlcd_woo_chatbot_no_result'));
		$response['html'] = $texts[array_rand($texts)];
	}
	wp_reset_query();
	echo json_encode($response);

	die();
}

add_action( 'wp_ajax_woobo_search_site',        'qcld_woobo_search_site' );
add_action( 'wp_ajax_nopriv_woobo_search_site', 'qcld_woobo_search_site' );

function qcld_woo_chatbot_email_subscription() {
	
	global $wpdb;
	$table    = $wpdb->prefix.'woobot_subscription';
	
	$name = sanitize_text_field($_POST['name']);
	$email = sanitize_email($_POST['email']);
	$url = esc_url_raw($_POST['url']);
	$user_agent = sanitize_text_field($_SERVER['HTTP_USER_AGENT']);
	
	$response = array();
	$response['status'] = 'fail';
	
	$email_exists = $wpdb->get_row("select * from $table where 1 and email = '".$email."'");
	if(empty($email_exists)){
	
		$wpdb->insert(
			$table,
			array(
				'date'  => date('Y-m-d H:i:s'),
				'name'   => $name,
				'email'   => $email,
				'url'   => $url,
				'user_agent' => $user_agent
			)
		);
		$response['status'] = 'success';

		do_action( 'qcld_mailing_list_subscription_success', $name, $email );
		
		$texts = unserialize(get_option('qlcd_woo_email_subscription_success'));
		$response['msg'] = $texts[array_rand($texts)];
	
	}else{
		$texts = unserialize(get_option('qlcd_woo_email_already_subscribe'));
		$response['msg'] = $texts[array_rand($texts)];
	}
	
	echo json_encode($response);

	die();
}

add_action( 'wp_ajax_qcld_woo_chatbot_email_subscription',        'qcld_woo_chatbot_email_subscription' );
add_action( 'wp_ajax_nopriv_qcld_woo_chatbot_email_subscription', 'qcld_woo_chatbot_email_subscription' );


function qcld_woo_chatbot_email_unsubscription() {
	
	global $wpdb;
	$table    = $wpdb->prefix.'woobot_subscription';
	$email = sanitize_email($_POST['email']);
	$response = array();
	$response['status'] = 'fail';
	$email_exists = $wpdb->get_row("select * from $table where 1 and email = '".$email."'");
	if(empty($email_exists)){
		$response['status'] = 'fail';
	}else{
		do_action('qcld_mailing_list_unsubscription_by_user', $email);
		$wpdb->delete(
            $table,
            array( 'email' => $email ),
            array( '%s' )
		);
		$response['status'] = 'success';
	}
	echo json_encode($response);
	die();
}

add_action( 'wp_ajax_qcld_woo_chatbot_email_unsubscription',        'qcld_woo_chatbot_email_unsubscription' );
add_action( 'wp_ajax_nopriv_qcld_woo_chatbot_email_unsubscription', 'qcld_woo_chatbot_email_unsubscription' );

function qcld_woo_chatbot_send_query() {

	$name = trim(sanitize_text_field($_POST['name']));
	$email = sanitize_email($_POST['email']);
	$data = $_POST['data'];

    $subject = 'Query details from WPWBot by Client';
    //Extract Domain
    $url = get_site_url();
    $url = parse_url($url);
    $domain = $url['host'];
    
    $admin_email = get_option('admin_email');
    $toEmail = get_option('qlcd_woo_chatbot_admin_email') != '' ? get_option('qlcd_woo_chatbot_admin_email') : $admin_email;
    $fromEmail = "wordpress@" . $domain;
    //Starting messaging and status.
    $response['status'] = 'fail';
    $response['message'] = esc_html(str_replace('\\', '',get_option('qlcd_woo_chatbot_email_fail')));

	//build email body
	$bodyContent = "";
	$bodyContent .= '<p><strong>' . esc_html__('Query Details', 'wpchatbot') . ':</strong></p><hr>';
	
	$bodyContent .= '<p>' . esc_html__('Name', 'wpchatbot') . ' : ' . esc_html($name) . '</p>';
	$bodyContent .= '<p>' . esc_html__('Email', 'wpchatbot') . ' : ' . esc_html($email) . '</p>';
	foreach($data as $key=>$val){
		if(!is_array($val)){
			$bodyContent .= '<p>'.esc_html($key).': ' . esc_html($val) . '</p>';
		}else{
			foreach($val as $k=>$v){
				$bodyContent .= '<p>'.esc_html($k).': ' . esc_html($v) . '</p>';
			}
			
		}
		
	}
		
	$bodyContent .= '<p>' . esc_html__('Mail Generated on', 'wpchatbot') . ': ' . date('F j, Y, g:i a') . '</p>';
	$to = $toEmail;
	$body = $bodyContent;

	$headers = array();
	$headers[] = 'Content-Type: text/html; charset=UTF-8';
	$headers[] = 'From: ' . esc_html($name) . ' <' . esc_html($fromEmail) . '>';

	$result = wp_mail($to, $subject, $body, $headers);
	if ($result) {
		$response['status'] = 'success';
		$response['message'] = esc_html(str_replace('\\', '',get_option('qlcd_woo_chatbot_email_sent')));
	}
    
    ob_clean();
    echo json_encode($response);
    die();

}

add_action( 'wp_ajax_qcld_woo_chatbot_send_query',        'qcld_woo_chatbot_send_query' );
add_action( 'wp_ajax_nopriv_qcld_woo_chatbot_send_query', 'qcld_woo_chatbot_send_query' );

function qcld_woobd_download_send_headers($filename) {
    // disable caching
    $now = gmdate("D, d M Y H:i:s");
    header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
    header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
    header("Last-Modified: {$now} GMT");

    // force download  
    header("Content-Type: application/force-download");

    // disposition / encoding on response body
    header("Content-Disposition: attachment;filename={$filename}");
    header("Content-Transfer-Encoding: binary");
}
function qcld_woobd_array2csv(array &$array)
{
   if (count($array) == 0) {
     return null;
   }

   ob_start();

   $df = fopen("php://output", 'w');

   $titles = array('Name', 'Email');

   fputcsv($df, $titles);

   foreach ($array as $row) {
      fputcsv($df, $row);
   }

   fclose($df);

   return ob_get_clean();
}
add_action( 'admin_post_woobprint.csv', 'qcld_woo_export_email_csv' );
function qcld_woo_export_email_csv(){
	global $wpdb;
	$table    = $wpdb->prefix.'woobot_subscription';
	
    if ( ! current_user_can( 'manage_options' ) )
        return;

	$emails = $wpdb->get_results("select * from $table where 1");
	$childArray = array();
	foreach($emails as $email){
		$innerArray = array();
		$innerArray[0] = $email->name;
		$innerArray[1] = $email->email;
		array_push($childArray, $innerArray);
	}
	qcld_woobd_download_send_headers("woo_email_lists_" . date("Y-m-d") . ".csv");

	$result = qcld_woobd_array2csv($childArray);

	print $result;
}

function qcld_wow_chatbot_conversation_save() {
	
	check_ajax_referer( 'qcsecretwoowbotnonceval123qc', 'security' );
	global $wpdb;

	$tableuser    = $wpdb->prefix.'wowbot_user';
	$tableconversation    = $wpdb->prefix.'wowbot_Conversation';
	
	$conversation = qc_wowbot_input_validation($_POST['conversation']);
	$email = sanitize_email($_POST['email']);
	$name = sanitize_text_field($_POST['name']);
	$session_id = sanitize_text_field($_POST['session_id']);

	
	
	$response = array();
	$response['status'] = 'success';
	
	$user_exists = $wpdb->get_row("select * from $tableuser where 1 and session_id = '".$session_id."'");
	if(empty($user_exists)){
	
		$wpdb->insert(
			$tableuser,
			array(
				'date'  => date('Y-m-d H:i:s'),
				'name'   => $name,
				'email'   => $email,
				'session_id'   => $session_id
			)
		);

		$user_id = $wpdb->insert_id;
		$wpdb->insert(
			$tableconversation,
			array(
				'user_id'   => $user_id,
				'conversation'   => $conversation
			)
		);

	}else{

		$user_id = $user_exists->id;
		$wpdb->update(
			$tableuser,
			array(
				'date'  => date('Y-m-d H:i:s'),
				'name'=>$name,
				'email' => $email,
			),
			array('id'=>$user_id),
			array(
				'%s',
				'%s',
				'%s',
			),
			array('%d')
		);

		$wpdb->update(
			$tableconversation,
			array(
				'conversation' => $conversation,
			),
			array('user_id'=>$user_id),
			array(
				'%s',
			),
			array('%d')
		);
		
	}


	echo json_encode($response);

	die();
}

add_action( 'wp_ajax_qcld_wow_chatbot_conversation_save',        'qcld_wow_chatbot_conversation_save' );
add_action( 'wp_ajax_nopriv_qcld_wow_chatbot_conversation_save', 'qcld_wow_chatbot_conversation_save' );

function qc_wowbot_input_validation($data) {
	$data = html_entity_decode($data);
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
  }