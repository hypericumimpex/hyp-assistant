<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/*
* @package Dialogflow API V2 by QuantumCloud 
* @Since 9.1.2
*/


class Qcld_woowbot_dfv2
{
    public function __construct(){
        
        add_action('init', array($this, 'api'));
    }
    public function api(){

        if(isset($_GET['action']) && $_GET['action']=='qcld_dfv2_api'){
            $session_id = 'asd2342sde';
            $language = get_option('qlcd_woo_chatbot_dialogflow_agent_language');
            //project ID
            $project_ID = get_option('qlcd_woo_chatbot_dialogflow_project_id');
            // Service Account Key json file
            $JsonFileContents = get_option('qlcd_woo_chatbot_dialogflow_project_key');
            if($project_ID==''){
                echo json_encode(array('error'=>'Project ID is empty'));exit;
            }
            if($JsonFileContents==''){
                echo json_encode(array('error'=>'Key is empty'));exit;
            }
            if(!isset($_POST['dfquery']) || $_POST['dfquery']==''){
                echo json_encode(array('error'=>'Query text is not added!'));exit;
            }
            $query = sanitize_text_field($_POST['dfquery']);
            if(isset($_POST['sessionid']) && $_POST['sessionid']!=''){
                $session_id = sanitize_text_field($_POST['sessionid']);
            }
            

            if(file_exists(ABSPATH.QCLD_wooCHATBOT_GC_DIRNAME.'/autoload.php')){

                require(ABSPATH.QCLD_wooCHATBOT_GC_DIRNAME.'/autoload.php');

                $client = new \Google_Client();
                $client->useApplicationDefaultCredentials();
                $client->setScopes (['https://www.googleapis.com/auth/dialogflow']);
                // Convert to array 
                $array = json_decode($JsonFileContents, true);
                $client->setAuthConfig($array);
    
                try {
                    $httpClient = $client->authorize();
                    $apiUrl = "https://dialogflow.googleapis.com/v2/projects/{$project_ID}/agent/sessions/{$session_id}:detectIntent";
    
                    $response = $httpClient->request('POST', $apiUrl, [
                        'json' => ['queryInput' => ['text' => ['text' => $query, 'languageCode' => $language]],
                            'queryParams' => ['timeZone' => '']]
                    ]);
                    
                    $contents = $response->getBody()->getContents();
                    echo $contents;exit;
    
                }catch(Exception $e) {
                    echo json_encode(array('error'=>$e->getMessage()));exit;
                }

            }else{
                echo json_encode(array('error'=>'API client not found'));exit;
            }

        }

    }
}
new Qcld_woowbot_dfv2();