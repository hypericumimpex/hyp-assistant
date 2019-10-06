/*
 * Project:      WoowBot jQuery Plugin
 * Description:  WoowBot AI based Chatting functionality are handled .
 * Author:       QuantumCloud
 * Version:      1.0
 */
(function($) {

    /*
     * Global variable as object will beused to handle
     * woowbot chatting initialize, tree change transfer,
     * changing tree steps and cookies etc.
     */
    var globalwoow={
        initialize:0,
        settings:{},
        wildCard:0,
        wildcards:'',
        wildcardsHelp:['start','product','catalog','support','order','reset','email subscription', 'livechat'],
        productStep:'asking',
        orderStep:'welcome',
        supportStep:'welcome',
        bargainStep:'welcome', // bargin welcome message
        bargainId:0, // bargin product id
        bargainVId:0, // bargin product variation id
        bargainPrice:0, // bargin price
        bargainLoop:0, // bargin price
        hasNameCookie:$.cookie("shopperw"),
        shopperUserName:'',
        shopperEmail:'',
        shopperMessage:'',
        emptymsghandler:0,
        repeatQueryEmpty:'',
        woowIsWorking:0,
        ai_step:0,
        df_status_lock:0,
        sbs_search_flag:0,

    };
    /*
     * Woowbot welcome section coverd
     * greeting for new and already visited shopper
     * based the memory after asking thier name.
     */

    var woowWelcome={
        greeting:function () {
			
			
			if(!localStorage.getItem('wowsessionid')){

                var number = Math.random() // 0.9394456857981651
                number.toString(36); // '0.xtis06h6'
                var id = number.toString(36).substr(2); // 'xtis06h6'
                localStorage.setItem('wowsessionid', id);
                console.log(localStorage.getItem('wowsessionid'));
            }
			
			
			 //Very begining greeting.
			if(globalwoow.settings.obj.skip_woo_greetings==1){
				if(globalwoow.settings.obj.re_target_handler==0){
				var botJoinMsg="<strong>"+globalwoow.settings.obj.agent+" </strong> "+woowKits.randomMsg(globalwoow.settings.obj.agent_join);
				woowMsg.single(botJoinMsg);
				}

				$.cookie("shopperw", globalwoow.settings.obj.shopper_demo_name, { expires : 365 });
				localStorage.setItem('shopperw',globalwoow.settings.obj.shopper_demo_name);
				globalwoow.hasNameCookie=globalwoow.settings.obj.shopper_demo_name;
				globalwoow.ai_step=1;
				globalwoow.wildCard=0;
				localStorage.setItem("wildCard",  globalwoow.wildCard);
				localStorage.setItem("aiStep", globalwoow.ai_step);
				
				setTimeout(function(){
					var firstMsg=woowKits.randomMsg(globalwoow.settings.obj.hi_there)+' '+woowKits.randomMsg(globalwoow.settings.obj.welcome)+" <strong>"+globalwoow.settings.obj.host+"!</strong> ";
					var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
					woowMsg.single(firstMsg);
					
					setTimeout(function(){
						
						woowMsg.double_nobg(serviceOffer, globalwoow.wildcards);
					}, globalwoow.settings.preLoadingTime);
					
				}, globalwoow.settings.preLoadingTime);
				
			}else{
			
				if(globalwoow.settings.obj.re_target_handler==0){
					var botJoinMsg="<strong>"+globalwoow.settings.obj.agent+" </strong> "+woowKits.randomMsg(globalwoow.settings.obj.agent_join);
					woowMsg.single(botJoinMsg);
				}
				//Showing greeting for name in cookie or fresh shopper.
				setTimeout(function(){
					var firstMsg=woowKits.randomMsg(globalwoow.settings.obj.hi_there)+' '+woowKits.randomMsg(globalwoow.settings.obj.welcome)+" <strong>"+globalwoow.settings.obj.host+"!</strong> ";
					var secondMsg=woowKits.randomMsg(globalwoow.settings.obj.asking_name);
					woowMsg.double(firstMsg,secondMsg);
				}, globalwoow.settings.preLoadingTime);
        	}
		}
		
		
    };
    //Append the message to the message container based on the requirement.
    var woowMsg={
        single:function (msg) {
            globalwoow.woowIsWorking=1;
            $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
            //Scroll to the last message
            woowKits.scrollTo();
            setTimeout(function(){
				var matches = msg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
                matches = woowKits.removeDups(matches);
                jQuery.each(matches, function(i, match){
                    if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !msg.match(/<img/)){
                        msg = msg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
                    }

                })
                $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(msg);
                //If has youtube link then show video
                woowKits.videohandler();
                //scroll to the last message
                woowKits.scrollTo();
                //Enable the editor
                woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
                //keeping in history
                woowKits.woowHistorySave();
            }, globalwoow.settings.preLoadingTime);

        },
		
		single2:function (msg) {
            globalwoow.woowIsWorking=1;
            $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
            //Scroll to the last message
            woowKits.scrollTo();
            setTimeout(function(){
				var matches = msg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
                matches = woowKits.removeDups(matches);
                jQuery.each(matches, function(i, match){
                    if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !msg.match(/<img/)){
                        msg = msg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
                    }

                })
                $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(msg);
                //If has youtube link then show video
				$(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').removeClass('woo-chatbot-paragraph');
                woowKits.videohandler();
                //scroll to the last message
                woowKits.scrollTo();
                //Enable the editor
                woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
                //keeping in history
                woowKits.woowHistorySave();
            }, globalwoow.settings.preLoadingTime);

        },
		
		

        single_nobg:function (msg) {
            globalwoow.woowIsWorking=1;
            $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
            //Scroll to the last message
            woowKits.scrollTo();
            setTimeout(function(){
				
				var matches = msg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
                matches = woowKits.removeDups(matches);
                jQuery.each(matches, function(i, match){
                    if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !msg.match(/<img/)){
                        msg = msg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
                    }

                })
				
                $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').parent().addClass('woo-chatbot-msg-flat').html(msg);
				 $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').parent().append(msg);
                $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').remove();
                //scroll to the last message
				woowKits.videohandler();
                woowKits.scrollTo();
                //Enable the editor
                woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
                //Keeping the chat history in localStorage
                woowKits.woowHistorySave();
                // disabled editor
                // woowKits.disableEditor('Please choose an option.');
            }, globalwoow.settings.preLoadingTime);
        },

        double:function (fristMsg,secondMsg) {
            globalwoow.woowIsWorking=1;
            $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
            //Scroll to the last message
            woowKits.scrollTo();
            setTimeout(function(){
				var matches = fristMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
                matches = woowKits.removeDups(matches);
                jQuery.each(matches, function(i, match){
                    if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !fristMsg.match(/<img/)){
                        fristMsg = fristMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
                    }

                })
                $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(fristMsg);
                //Second Message with interval
				woowKits.videohandler();
                $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
                //Scroll to the last message
                woowKits.scrollTo();
                setTimeout(function(){
					var matches = secondMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
					matches = woowKits.removeDups(matches);
					jQuery.each(matches, function(i, match){
						if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !secondMsg.match(/<img/)){
							secondMsg = secondMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
						}

					})
                    $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(secondMsg);
                    //Scroll to the last message
					woowKits.videohandler();
                    woowKits.scrollTo();
                    //Enable the editor
                    woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
                    //keeping in history
                    woowKits.woowHistorySave();
                }, globalwoow.settings.preLoadingTime);

            }, globalwoow.settings.preLoadingTime);

        },
		
		triple:function (fristMsg,secondMsg, thirdMsg) {
            globalwoow.woowIsWorking=1;
            $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
            //Scroll to the last message
            woowKits.scrollTo();
            setTimeout(function(){
				var matches = fristMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
					matches = woowKits.removeDups(matches);
					jQuery.each(matches, function(i, match){
						if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !fristMsg.match(/<img/)){
							fristMsg = fristMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
						}

					})
                $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(fristMsg);
                //Second Message with interval
				woowKits.videohandler();
                $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
                //Scroll to the last message
                woowKits.scrollTo();
                setTimeout(function(){
					var matches = secondMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
					matches = woowKits.removeDups(matches);
					jQuery.each(matches, function(i, match){
						if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !secondMsg.match(/<img/)){
							secondMsg = secondMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
						}

					})
                    $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(secondMsg);
					woowKits.videohandler();
					$(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
                    //Scroll to the last message
                    woowKits.scrollTo();
                    //Enable the editor
					
					setTimeout(function(){
						var matches = thirdMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
						matches = woowKits.removeDups(matches);
						jQuery.each(matches, function(i, match){
							if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !thirdMsg.match(/<img/)){
								thirdMsg = thirdMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
							}

						})
						$(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(thirdMsg);
						//Scroll to the last message
						woowKits.videohandler();
						woowKits.scrollTo();
						
						woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
						//keeping in history
						woowKits.woowHistorySave();
						
						
					}, globalwoow.settings.preLoadingTime);
					
                    
                }, globalwoow.settings.preLoadingTime);

            }, globalwoow.settings.preLoadingTime);

        },
		
        double_nobg:function (fristMsg,secondMsg) {
            globalwoow.woowIsWorking=1;
            $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
            //Scroll to the last message
            woowKits.scrollTo();
            setTimeout(function(){
				var matches = fristMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
					matches = woowKits.removeDups(matches);
					jQuery.each(matches, function(i, match){
						if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !fristMsg.match(/<img/)){
							fristMsg = fristMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
						}

					})
                $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(fristMsg);
                //Second Message with interval
				woowKits.videohandler();
                $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
                //Scroll to the last message
                woowKits.scrollTo();
                setTimeout(function(){
					var matches = secondMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
					matches = woowKits.removeDups(matches);
					jQuery.each(matches, function(i, match){
						if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !secondMsg.match(/<img/)){
							secondMsg = secondMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
						}

					})
                    if(globalwoow.wildCard>0){
                        $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').parent().addClass('woo-chatbot-msg-flat').html(secondMsg).append('<span class="qcld-chatbot-wildcard qcld_back_to_start"  data-wildcart="back">' + woowKits.randomMsg(globalwoow.settings.obj.back_to_start) + '</span>');
                    }else{
                        $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').parent().addClass('woo-chatbot-msg-flat').html(secondMsg);
                    }
					woowKits.videohandler();
                    //scroll to the last message
                    woowKits.scrollTo();
                    //Enable the editor
                    if(globalwoow.wildCard==3 && globalwoow.supportStep=='welcome'){
                        woowKits.disableEditor(woowKits.randomMsg(globalwoow.settings.obj.wildcard_support));
                    }else{
                        woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
                    }
                    //keeping in history
                    woowKits.woowHistorySave();
                    // disabled editor
                    // woowKits.disableEditor('Please choose an option.');
                }, globalwoow.settings.preLoadingTime);

            }, globalwoow.settings.preLoadingTime);

        },
		
		triple_nobg:function (fristMsg,secondMsg, thirdMsg) {
            globalwoow.woowIsWorking=1;
            $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
            //Scroll to the last message
            woowKits.scrollTo();
            setTimeout(function(){
				var matches = fristMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
					matches = woowKits.removeDups(matches);
					jQuery.each(matches, function(i, match){
						if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !fristMsg.match(/<img/)){
							fristMsg = fristMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
						}

					})
                $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(fristMsg);
                //Second Message with interval
				woowKits.videohandler();
                $(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
                //Scroll to the last message
                woowKits.scrollTo();
				
				setTimeout(function(){
					var matches = secondMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
					matches = woowKits.removeDups(matches);
					jQuery.each(matches, function(i, match){
						if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !secondMsg.match(/<img/)){
							secondMsg = secondMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
						}

					})
					$(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(secondMsg);
					//Second Message with interval
					woowKits.videohandler();
					$(globalwoow.settings.messageContainer).append(woowKits.botPreloader());
					//Scroll to the last message
					woowKits.scrollTo();
					
					setTimeout(function(){
						var matches = thirdMsg.match(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg|tiff))/i);
					matches = woowKits.removeDups(matches);
					jQuery.each(matches, function(i, match){
						if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(match) && !thirdMsg.match(/<img/)){
							thirdMsg = thirdMsg.replace(match, "<img src='"+match+"' class='wpbot_auto_image' />");
						}

					})
						if(globalwoow.wildCard>0 && globalwoow.wildCard != 9){
							$(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').parent().addClass('woo-chatbot-msg-flat').html(thirdMsg).append('<span class="qcld-chatbot-wildcard qcld_back_to_start"  data-wildcart="back">' + woowKits.randomMsg(globalwoow.settings.obj.back_to_start) + '</span>');
						}else{
							$(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').parent().addClass('woo-chatbot-msg-flat').html(thirdMsg);
						}
						//scroll to the last message
						woowKits.videohandler();
						woowKits.scrollTo();
						//Enable the editor
						if(globalwoow.wildCard==3 && globalwoow.supportStep=='welcome'){
							woowKits.disableEditor(woowKits.randomMsg(globalwoow.settings.obj.wildcard_support));
						}else{
							woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
						}
						//keeping in history
						woowKits.woowHistorySave();
						// disabled editor
						// woowKits.disableEditor('Please choose an option.');
					}, globalwoow.settings.preLoadingTime);
					
					
				}, globalwoow.settings.preLoadingTime);
				
                

            }, globalwoow.settings.preLoadingTime);

        },
        shopper:function (shopperMsg) {
            $(globalwoow.settings.messageContainer).append(woowKits.shopperMsgDom(shopperMsg));
            //scroll to the last message
            woowKits.scrollTo();
            //keeping in history
            woowKits.woowHistorySave();
        },
        shopper_choice:function (shopperChoice) {
            $(globalwoow.settings.messageLastChild).fadeOut(globalwoow.settings.preLoadingTime);
            $(globalwoow.settings.messageContainer).append(woowKits.shopperMsgDom(shopperChoice));
            //scroll to the last message
            woowKits.scrollTo();
            //keeping in history
            woowKits.woowHistorySave();
        }

    };

    //Every tiny tools are implemented  in woowKits as object literal.
    var woowKits={
		removeDups: function(names) {
            let unique = {};
            
            if(Array.isArray(names)){
                names.forEach(function(i) {
                if(!unique[i]) {
                    unique[i] = true;
                }
                });
                return Object.keys(unique);
            }else{
                return names;
            }
          },
        enableEditor:function(placeHolder){
            if(globalwoow.settings.editor_handler==0){
                $("#woo-chatbot-editor").attr('disabled',false).focus();
                $("#woo-chatbot-editor").attr('placeholder',placeHolder);
                $("#woo-chatbot-send-message").attr('disabled',false);
            }
        },
        disableEditor:function (placeHolder) {
            if(globalwoow.settings.editor_handler==0){
                $("#woo-chatbot-editor").attr('placeholder',placeHolder);
                $("#woo-chatbot-editor").attr('disabled',true);
                $("#woo-chatbot-send-message").attr('disabled',true);
            }
            //Remove extra pre loader.
            if($('.woo-chatbot-messages-container').find('.woo-chatbot-comment-loader').length>0){
                $('.woo-chatbot-messages-container').find('.woo-chatbot-comment-loader').parent().parent().hide();
            }
        },
		htmlEntities:function(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        },
        woowHistorySave:function () {
			
            //setTimeout(function () {
            globalwoow.woowIsWorking=0;
            var woowHistory= $(globalwoow.settings.messageWrapper).html();
            localStorage.setItem("woowHitory", woowHistory);
            //},globalwoow.settings.wildcardsShowTime);
			
			
			if(localStorage.getItem('wowsessionid')){

                if(!localStorage.getItem('shopperemail')){
                    var useremail = '';
                }else{
                    var useremail = localStorage.getItem('shopperemail');
                }

                if(globalwoow.hasNameCookie){
                    var shopper=globalwoow.hasNameCookie;
                } else{
                    var shopper=globalwoow.settings.obj.shopper_demo_name;
                }
				
                var data = {'action':'qcld_wow_chatbot_conversation_save','session_id': localStorage.getItem('wowsessionid'),'name':shopper,'email':useremail, 'conversation':woowKits.htmlEntities(woowHistory), 'security':globalwoow.settings.obj.ajax_nonce};

                woowKits.ajax(data).done(function (response) {
                    console.log(response);
                })
				
            }
			
        },

        randomMsg:function(arrMsg){
            var index=Math.floor(Math.random() * arrMsg.length);
			return arrMsg[index].replace("%%username%%", '<strong>'+globalwoow.hasNameCookie+'</strong>');
            
        },
        ajax:function (data) {
            return jQuery.post(globalwoow.settings.obj.ajax_url, data);

        },
		dailogAIOAction:function(text){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                return  jQuery.ajax({
                    type : "POST",
                    url :"https://api.dialogflow.com/v1/query?v=20170712",
                    contentType : "application/json; charset=utf-8",
                    dataType : "json",
                    headers : {
                        "Authorization" : "Bearer "+globalwoow.settings.obj.ai_df_token
                    },
                    
                    data: JSON.stringify( {
                        query: text,
                        
                        lang : globalwoow.settings.obj.df_agent_lan,
                        sessionId: localStorage.getItem('wowsessionid')?localStorage.getItem('wowsessionid'):'woowBot_df_2018071'
                    } )
                });
            }else{
                return jQuery.post(globalwoow.settings.obj.v2_client_url, {
                    'dfquery': text,
                    'sessionid': localStorage.getItem('wowsessionid')?localStorage.getItem('wowsessionid'):'woowBot_df_2018071'
                });
            }
            
        },
        responseIsOk(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                if(response.status.code==200){
                    return true;
                }else{
                    return false;
                }
            }else{
                if(typeof response.responseId !== "undefined"){
                    return true;
                }else{
                    return false;
                }
            }
        },
        getIntentName(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                return response.result.metadata.intentName;
            }else{
                return response.queryResult.intent.displayName;
            }
        },
        getParameters(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                return response.result.parameters;
            }else{
                return response.queryResult.parameters;
            }
            
        },
        getFulfillmentText(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                return response.result.fulfillment.messages;
            }else{
                return response.queryResult.fulfillmentText;
            }
            
        },
        getFulfillmentSpeech(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                return response.result.fulfillment.speech;
            }else{
                return response.queryResult.fulfillmentText;
            }
            
        },
        getScore(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                return response.result.score;
            }else{
                return response.queryResult.intentDetectionConfidence;
            }
            
        },
        getAction(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                return response.result.action;
            }else{
                if(typeof response.queryResult.action !=="undefined"){
                    return response.queryResult.action;
                }else{
                    return '';
                }
                
            }
            
        },
        queryText(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                return response.result.resolvedQuery;
            }else{
                return response.queryResult.queryText;
            }
        },
        isActionComplete(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                if(!response.result.actionIncomplete){
                    return true;
                }else{
                    return false;
                }
            }else{

                return response.queryResult.allRequiredParamsPresent;

            }
            
        },
        isConversationEnd(response){
            if(globalwoow.settings.obj.df_api_version=='v1'){
                if(typeof(response.result.metadata.endConversation)!=="undefined" && response.result.metadata.endConversation){
                    return true;
                }else{
                    return false;
                }
            }else{

                if(typeof response.queryResult.diagnosticInfo !=="undefined"){
                    if(typeof response.queryResult.diagnosticInfo.end_conversation !== "undefined"){
                        return response.queryResult.diagnosticInfo.end_conversation;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }

            }
            
        },
        sugestCat:function () {
            var productSuggest=woowKits.randomMsg(globalwoow.settings.obj.product_suggest);
            var data={'action':'qcld_woo_chatbot_category'};
            var result=woowKits.ajax(data);
            result.done(function( response ) {
                woowMsg.double_nobg(productSuggest,response);
                if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                    globalwoow.wildCard=0;
                    globalwoow.ai_step=1;
                    localStorage.setItem("wildCard",  globalwoow.wildCard);
                    localStorage.setItem("aiStep", globalwoow.ai_step);
                }
            });
        },
        subCats:function (parentId) {
            var subCatMsg=woowKits.randomMsg(globalwoow.settings.obj.product_suggest);
            var data={'action':'qcld_woo_chatbot_sub_category','parent_id':parentId};
            var result=woowKits.ajax(data);
            result.done(function( response ) {
                woowMsg.double_nobg(subCatMsg,response);
            });
        },
        suggestEmail:function (emailFor) {
            var sugMsg=woowKits.randomMsg(globalwoow.settings.obj.support_option_again);
            var sugOptions= emailFor+globalwoow.wildcards;
            woowMsg.double_nobg(sugMsg,sugOptions);

        }
        ,
        videohandler:function () {
            $(globalwoow.settings.messageLastChild+' .woo-chatbot-paragraph').html(function(i, html) {
                return html.replace(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="250" height="180" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
            });
        },
        scrollTo:function () {
            $(globalwoow.settings.botContainer).animate({ scrollTop: $(globalwoow.settings.messageWrapper).prop("scrollHeight")}, 'slow').parent().find('.slimScrollBar').css({'top':$(globalwoow.settings.botContainer).height()+'px'});;
        },
        botPreloader:function () {
            var msgContent='<li class="woo-chatbot-msg">' +
                '<div class="woo-chatbot-avatar">'+
                '<img src="'+globalwoow.settings.obj.agent_image_path+'" alt="">'+
                '</div>'+
                '<div class="woo-chatbot-agent">'+ globalwoow.settings.obj.agent+'</div>'
                +'<div class="woo-chatbot-paragraph"><img class="woo-chatbot-comment-loader" src="'+globalwoow.settings.obj.image_path+'comment.gif" alt="Typing..." /></div></li>';
            return msgContent;
        },
        shopperMsgDom:function (msg) {
            if(globalwoow.hasNameCookie){
                var shopper=globalwoow.hasNameCookie;
            } else{
                var shopper=globalwoow.settings.obj.shopper_demo_name;
            }
            var msgContent='<li class="woo-chat-user-msg">' +
                '<div class="woo-chatbot-avatar">'+
                '<img src="'+globalwoow.settings.obj.image_path+'client.png" alt="">'+
                '</div>'+
                '<div class="woo-chatbot-agent">'+shopper +'</div>'
                +'<div class="woo-chatbot-paragraph">'+msg+'</div></li>';
            return msgContent;
        },
        addToCart:function () { //added by Raju, QC
            var data = {'action':'qcld_woo_chatbot_show_cart'}
            this.ajax(data).done(function (response) {
                //if cart show on message board
                if($('#woo-chatbot-shortcode-template-container').length == 0) {
                    //$(globalwoow.settings.messageWrapper).html(response.html);
                    $('#woo-chatbot-cart-numbers').html(response.items);
                    $('.woo-chatbot-ball-cart-items').html(response.items);
                    //woowKits.disableEditor(woowKits.randomMsg(globalwoow.settings.obj.shopping_cart));
					
                }else{  //Cart show on shortcode
                    $('.woo-chatbot-cart-shortcode-container').html(response.html);

                }
                //Add scroll to the cart shortcode
                if($('#woo-chatbot-shortcode-template-container').length > 0  && $('.chatbot-shortcode-template-02').length==0) {
                    $('.woo-chatbot-cart-body').slimScroll({height: '200px', start: 'bottom'});
                }
            });
        },
        showCart:function () {
            var data = {'action':'qcld_woo_chatbot_show_cart'}
            this.ajax(data).done(function (response) {
                //if cart show on message board
                if($('#woo-chatbot-shortcode-template-container').length == 0) {
                    $(globalwoow.settings.messageWrapper).html(response.html);
                    $('#woo-chatbot-cart-numbers').html(response.items);
                    $('.woo-chatbot-ball-cart-items').html(response.items);
                    woowKits.disableEditor(woowKits.randomMsg(globalwoow.settings.obj.shopping_cart));
                }else{  //Cart show on shortcode
                    $('.woo-chatbot-cart-shortcode-container').html(response.html);

                }
                //Add scroll to the cart shortcode
                if($('#woo-chatbot-shortcode-template-container').length > 0  && $('.chatbot-shortcode-template-02').length==0) {
                    $('.woo-chatbot-cart-body').slimScroll({height: '200px', start: 'bottom'});
                }
            });
        },
        toTitlecase:function (msg) {
            return msg.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        },
        filterStopWords:function(msg){
            var spcialStopWords=",;,/,\\,[,],{,},(,),&,*,.,+ ,?,^,$,=,!,<,>,|,:,-";
            var userMsg="";
            //Removing Special Characts from last position.
            var msgLastChar=msg.slice(-1);
            if(spcialStopWords.indexOf(msgLastChar) >= 0 ){
                userMsg=msg.slice(0, -1);
            }else{
                userMsg=msg;
            }
            var stopWords=globalwoow.settings.obj.stop_words+spcialStopWords;
            var stopWordsArr=stopWords.split(',');
            var msgArr=userMsg.split(' ');
            var filtermsgArr = msgArr.filter(function myCallBack(el){
                return stopWordsArr.indexOf(el.toLowerCase()) < 0;
            });
            filterMsg=filtermsgArr.join(' ');
            return filterMsg;
        },
        htmlTagsScape:function(userString) {
            var tagsToReplace = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;'
            };
            return userString.replace(/[&<>]/g, function(tag) {
                return tagsToReplace[tag] || tag;
            });
        },
        cardResponse:function (title, subtitle, imageUrl, buttons, text, postback) {
           var card = '<div class="woobot_card_wraper">'; 
			if(imageUrl!=''){
				card +='<img src="'+imageUrl+'" />';								
			}
			
			card += '<div class="woo-chatbot-card-title">' + title + '</div>';
            card += '<div class="woo-chatbot-card-subtitle">' + subtitle + '</div>';
            var index = 0;
            for (index; index<buttons.length; index++) {
                card += '<span type="button" class="woo-chatbot-card-button" card-target="' + buttons[index].postback + '">' + buttons[index].text +  '</span>';
            }
            
			card +="</div>";
			return card;
        },
        quickRepliesResponse:function (title, replies) {
            var quickRes = '<div class="woo-chatbot-quick-replies-title">' + title + '</div>';

            var index = 0;
            for (index; index<replies.length; index++) {
                quickRes += '<input type="button" class="woo-chatbot-quick-reply"  value="' + replies[index] +  '"/>';
            }
            return quickRes;
        },
        imageResponse:function(imageUrl) {
            if (imageUrl!= "")  {
                var ImgRes = '<img src="' + imageUrl + '"/>';
                return ImgRes;
            }
        },
        woowOpenWindow:function (url, title, w, h) {
            // Fixes dual-screen position                         Most browsers      Firefox
            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
            var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;
            var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            // Puts focus on the newWindow
            if (window.focus) {
                newWindow.focus();
            }
        }
    }
    /*
     * Woowbot Trees are basically product,order and support
     * product tree : asking,showing & shopping part will be covered.
     * order tree : showing order list and email to admin option.
     * support tree : List of support query-answer including text & video and email to admin option.
     */
    var woowTree={

        greeting:function (msg) {
            /**
             * When Enable DialogFlow then  or else
             */
            if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                //When intialize 1 and don't have cookies then keep  the name of shooper in in cookie
                if(globalwoow.initialize==1 && !localStorage.getItem('shopperw')  && globalwoow.wildCard==0 && globalwoow.ai_step==0 ){
					
							
						var main_text = msg;
						msg=woowKits.toTitlecase(msg);
						
						var dfReturns=woowKits.dailogAIOAction(msg);
						
						dfReturns.done(function( response ) {
							
							
							if(globalwoow.settings.obj.df_api_version=='v2'){
                                response = $.parseJSON(response);
                            }
							
							if(woowKits.responseIsOk(response)){
								var intent = woowKits.getIntentName(response);
								
								if(intent=="get name"){
									
									given_name = woowKits.getParameters(response).given_name;
									last_name = woowKits.getParameters(response).last_name;
									fullname = given_name+' '+last_name;
									if(fullname.length<2){
										fullname = msg
									}
									$.cookie("shopperw", fullname, { expires : 365 });
									localStorage.setItem('shopperw',fullname);
									globalwoow.hasNameCookie=fullname;
									//Greeting with name and suggesting the wildcard.
									var NameGreeting=woowKits.randomMsg(globalwoow.settings.obj.i_am) +" <strong>"+globalwoow.settings.obj.agent+"</strong>! "+woowKits.randomMsg(globalwoow.settings.obj.name_greeting);
									
									
									if(globalwoow.settings.obj.ask_email_woo_greetings==1){
										var emailsharetext = woowKits.randomMsg(globalwoow.settings.obj.asking_emailaddress);
										//woowMsg.double(NameGreeting, emailsharetext);
										
										if(globalwoow.settings.obj.enable_gdpr){
											
											woowMsg.triple(NameGreeting, emailsharetext, globalwoow.settings.obj.gdpr_text);
										}else{
											woowMsg.double(NameGreeting, emailsharetext);
										}
										
										
									}else{
										var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
										//After completing two steps messaging showing wildcards.
										woowMsg.double(NameGreeting,serviceOffer);
										globalwoow.ai_step=1;
										globalwoow.wildCard=0;
										localStorage.setItem("wildCard",  globalwoow.wildCard);
										localStorage.setItem("aiStep", globalwoow.ai_step);
									}
									
								}else if(intent=='Default Fallback Intent'){
									
									var filterMsg=woowKits.filterStopWords(msg);
									if(filterMsg!=''){
										
										var NameGreeting=woowKits.randomMsg(globalwoow.settings.obj.i_am) +" <strong>"+globalwoow.settings.obj.agent+"</strong>! "+woowKits.randomMsg(globalwoow.settings.obj.name_greeting);
										
										$.cookie("shopperw", filterMsg, { expires : 365 });
										localStorage.setItem('shopperw',filterMsg);
										globalwoow.hasNameCookie=filterMsg;
										globalwoow.ai_step=1;
										globalwoow.wildCard=0;
										localStorage.setItem("wildCard",  globalwoow.wildCard);
										localStorage.setItem("aiStep", globalwoow.ai_step);
										//woowMsg.single(globalwoow.settings.obj.shopper_call_you+' '+globalwoow.settings.obj.shopper_demo_name);
										
										var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
										woowMsg.double(NameGreeting,serviceOffer);
										
									}else{
										
										$.cookie("shopperw", globalwoow.settings.obj.shopper_demo_name, { expires : 365 });
										localStorage.setItem('shopperw',globalwoow.settings.obj.shopper_demo_name);
										globalwoow.hasNameCookie=globalwoow.settings.obj.shopper_demo_name;
										globalwoow.ai_step=1;
										globalwoow.wildCard=0;
										localStorage.setItem("wildCard",  globalwoow.wildCard);
										localStorage.setItem("aiStep", globalwoow.ai_step);
										woowMsg.single(globalwoow.settings.obj.shopper_call_you+' '+globalwoow.settings.obj.shopper_demo_name);
										setTimeout(function(){
											var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
											woowMsg.single(serviceOffer);
										},globalwoow.settings.preLoadingTime)
										
									}
									
									
									
								}else{
									
									if(woowKits.getFulfillmentSpeech(response)!=''){
										
										var secondMsg=woowKits.randomMsg(globalwoow.settings.obj.asking_name);
										woowMsg.double(woowKits.getFulfillmentSpeech(response),secondMsg);
										
									}else{
										
										var filterMsg=woowKits.filterStopWords(msg);
										if(filterMsg!=''){
											
											var NameGreeting=woowKits.randomMsg(globalwoow.settings.obj.i_am) +" <strong>"+globalwoow.settings.obj.agent+"</strong>! "+woowKits.randomMsg(globalwoow.settings.obj.name_greeting);
											
											$.cookie("shopperw", filterMsg, { expires : 365 });
											localStorage.setItem('shopperw',filterMsg);
											globalwoow.hasNameCookie=filterMsg;
											globalwoow.ai_step=1;
											globalwoow.wildCard=0;
											localStorage.setItem("wildCard",  globalwoow.wildCard);
											localStorage.setItem("aiStep", globalwoow.ai_step);
											//woowMsg.single(globalwoow.settings.obj.shopper_call_you+' '+globalwoow.settings.obj.shopper_demo_name);
											
											var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
											woowMsg.double(NameGreeting,serviceOffer);
											
										}else{
											
											$.cookie("shopperw", globalwoow.settings.obj.shopper_demo_name, { expires : 365 });
											localStorage.setItem('shopperw',globalwoow.settings.obj.shopper_demo_name);
											globalwoow.hasNameCookie=globalwoow.settings.obj.shopper_demo_name;
											globalwoow.ai_step=1;
											globalwoow.wildCard=0;
											localStorage.setItem("wildCard",  globalwoow.wildCard);
											localStorage.setItem("aiStep", globalwoow.ai_step);
											woowMsg.single(globalwoow.settings.obj.shopper_call_you+' '+globalwoow.settings.obj.shopper_demo_name);
											setTimeout(function(){
												var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
												woowMsg.single(serviceOffer);
											},globalwoow.settings.preLoadingTime)
											
										}
										
									}
									
								}
							}
						})
						
                }
				
                //When returning shopper then greeting with name and wildcards.
                else if(localStorage.getItem('shopperw')  && globalwoow.wildCard==0 && globalwoow.ai_step==0){
					if(globalwoow.settings.obj.ask_email_woo_greetings==1){
						var dfReturns=woowKits.dailogAIOAction(msg);
						dfReturns.done(function( response ) {
							
							if(globalwoow.settings.obj.df_api_version=='v2'){
                                response = $.parseJSON(response);
                            }
							
							if(woowKits.responseIsOk(response)){
								var intent = woowKits.getIntentName(response);
								if(intent=="get email"){
									var email = woowKits.getParameters(response).email;
									$.cookie("shopperemail", email, { expires : 365 });
									localStorage.setItem('shopperemail',email);
									if(email!=''){
										var data = {'action':'qcld_woo_chatbot_email_subscription','name':globalwoow.hasNameCookie,'email':email, 'url':window.location.href};

										woowKits.ajax(data).done(function (response) {
											//response.
										})
									}
									var emailgreetings = woowKits.randomMsg(globalwoow.settings.obj.got_email);
									var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
									//After completing two steps messaging showing wildcards.
									woowMsg.double(emailgreetings,serviceOffer);
									globalwoow.ai_step=1;
									globalwoow.wildCard=0;
									localStorage.setItem("wildCard",  globalwoow.wildCard);
									localStorage.setItem("aiStep", globalwoow.ai_step);
									
                                }
                                else{

                                    
                                    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                                    if( re.test(msg)!=true){
                                        //After asking service show the wildcards.
                                        var noemailtext = woowKits.randomMsg(globalwoow.settings.obj.email_ignore);;
                                        var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
                                        globalwoow.ai_step=1;
                                        globalwoow.wildCard=0;
                                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                                        localStorage.setItem("aiStep", globalwoow.ai_step);
                                        woowMsg.double(noemailtext, serviceOffer);
                                    }else{

                                        var email = msg;
                                        $.cookie("shopperemail", email, { expires : 365 });
                                        localStorage.setItem('shopperemail',email);
                                        if(email!=''){
                                            var data = {'action':'qcld_woo_chatbot_email_subscription','name':globalwoow.hasNameCookie,'email':email, 'url':window.location.href};
    
                                            woowKits.ajax(data).done(function (response) {
                                                //response.
                                            })
                                        }
                                        var emailgreetings = woowKits.randomMsg(globalwoow.settings.obj.got_email);
                                        var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
                                        //After completing two steps messaging showing wildcards.
                                        woowMsg.double(emailgreetings,serviceOffer);
                                        globalwoow.ai_step=1;
                                        globalwoow.wildCard=0;
                                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                                        localStorage.setItem("aiStep", globalwoow.ai_step);

                                    }
								}
							}
						})
					}else{                   
				   
						//After asking service show the wildcards.
						var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
						globalwoow.ai_step=1;
						globalwoow.wildCard=0;
						localStorage.setItem("wildCard",  globalwoow.wildCard);
						localStorage.setItem("aiStep", globalwoow.ai_step);
						woowMsg.single(serviceOffer);
					}
                }
                //When user asking needs then DialogFlow will given intent after NLP steps.
                else if(globalwoow.wildCard==0 && globalwoow.ai_step==1){
                    var dfReturns=woowKits.dailogAIOAction(msg);
                    dfReturns.done(function( response ) {
						
						if(globalwoow.settings.obj.df_api_version=='v2'){
                            response = $.parseJSON(response);
                        }
						
                        //console.log('Ai result',JSON.stringify(response));
                        if(woowKits.responseIsOk(response)){
                            //For custom intent and step by step search
                            var userIntent=woowKits.getIntentName(response);
                            var intentNamesIndex=globalwoow.settings.obj.custom_intent_names.indexOf(userIntent);
                            var intentSysKey=globalwoow.settings.obj.custom_intent_kewords[intentNamesIndex];
                            if(intentSysKey==msg && $.inArray(userIntent, globalwoow.settings.obj.custom_intent_names) !== -1 && globalwoow.settings.obj.custom_search_enable==1){
                                globalwoow.sbs_search_flag=1
                            }
                            if( $.inArray(userIntent, globalwoow.settings.obj.custom_intent_names) !== -1 && globalwoow.settings.obj.custom_search_enable==1 && globalwoow.sbs_search_flag==1){

                                if(!woowKits.isActionComplete(response)){
                                    var sMgs=woowKits.getFulfillmentSpeech(response);
                                    woowMsg.single(sMgs);
                                }else{
                                    var parameters=woowKits.getParameters(response);
                                    var sMgs=woowKits.getFulfillmentSpeech(response);
                                    var data = { 'action':'qcld_woo_chatbot_step_by_step_search','params':parameters};
                                    woowKits.ajax(data).done(function( response ) {
                                        globalwoow.sbs_search_flag=0;
                                        //woowMsg.single(sMgs);
                                        if(response.product_num >0){
                                            woowMsg.double(sMgs,response.html);
                                        }else{
                                            woowMsg.single(woowKits.randomMsg(globalwoow.settings.obj.product_fail));
                                        }

                                    });
                                }
                            }else if(userIntent=='start'){
                                globalwoow.wildCard=0;
                                var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
                                woowMsg.double_nobg(serviceOffer,globalwoow.wildcards);
                            }else if(userIntent=='help'){
                                $(globalwoow.settings.messageWrapper).html(localStorage.getItem("woowHitory"));
                                //Showing help message
                                setTimeout(function () {
                                    woowKits.scrollTo();
                                    var helpWelcome = woowKits.randomMsg(globalwoow.settings.obj.help_welcome);
                                    var helpMsg = woowKits.randomMsg(globalwoow.settings.obj.help_msg);
                                    woowMsg.double(helpWelcome,helpMsg);
                                    //dialogflow
                                    if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                                        globalwoow.wildCard=0;
                                        globalwoow.ai_step=1;
                                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                                        localStorage.setItem("aiStep", globalwoow.ai_step);
                                    }
                                },globalwoow.settings.preLoadingTime);
                            }else if(userIntent=='reset'){
                                var restWarning=woowKits.randomMsg(globalwoow.settings.obj.reset);
                                var confirmBtn='<span class="qcld-chatbot-reset-btn" reset-data="yes" >'+globalwoow.settings.obj.yes+'</span> <span> '+globalwoow.settings.obj.or+' </span><span class="qcld-chatbot-reset-btn"  reset-data="no">'+globalwoow.settings.obj.no+'</span>';
                                woowMsg.double_nobg(restWarning,confirmBtn);
                            }else if(userIntent=='product' && globalwoow.settings.obj.disable_product_search!=1){
                                var searchQuery=woowKits.filterStopWords(response.result.resolvedQuery);
                                globalwoow.wildCard=1;
                                globalwoow.productStep='search'
                                woowAction.bot(searchQuery);
                                //keeping value in localstorage
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("productStep", globalwoow.productStep);
                            }else if(userIntent=='catalog' && globalwoow.settings.obj.disable_catalog!=1){
                                woowAction.bot(globalwoow.settings.obj.sys_key_catalog.toLowerCase());
                            }else if(userIntent=='featured' && globalwoow.settings.obj.disable_featured_product!=1){
                                globalwoow.wildCard=1;
                                globalwoow.productStep='featured'
                                woowAction.bot('from wildcard product');
                                //keeping value in localstorage
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("productStep", globalwoow.productStep);
                            }else  if(userIntent=='sale' && globalwoow.settings.obj.disable_sale_product!=1){
                                globalwoow.wildCard=1;
                                globalwoow.productStep='sale'
                                woowAction.bot('from wildcard product');
                                //keeping value in localstorage
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("productStep", globalwoow.productStep);
                            }else if(userIntent=='order' && globalwoow.settings.obj.disable_order_status!=1){
                                globalwoow.wildCard=2;
                                globalwoow.orderStep='welcome';
                                woowAction.bot('from wildcard order');
                                //keeping value in localstorage
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("orderStep", globalwoow.orderStep);
                            }else if(userIntent=='support'){
                                globalwoow.wildCard=3;
                                globalwoow.supportStep='welcome';
                                woowAction.bot('from wildcard support');
                                //keeping value in localstorage
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("supportStep", globalwoow.supportStep);

                            }/*else if(userIntent=='searchfromregion'){
								var searchQuery=woowKits.filterStopWords(response.result.fulfillment.speech);
                                globalwoow.wildCard=1;
                                globalwoow.productStep='search'
                                woowAction.bot(searchQuery);
                                //keeping value in localstorage
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("productStep", globalwoow.productStep);
								
							}*/else if(userIntent=='get name'){
								
								given_name = woowKits.getParameters(response).given_name;
								last_name = woowKits.getParameters(response).last_name;
								fullname = given_name+' '+last_name;
								
								$.cookie("shopperw", fullname, { expires : 365 });
								localStorage.setItem('shopperw',fullname);
								globalwoow.hasNameCookie=fullname;
								//Greeting with name and suggesting the wildcard.
								var NameGreeting=woowKits.randomMsg(globalwoow.settings.obj.i_am) +" <strong>"+globalwoow.settings.obj.agent+"</strong>! "+woowKits.randomMsg(globalwoow.settings.obj.name_greeting)+", <strong>"+fullname+"</strong>!";
								var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
								//After completing two steps messaging showing wildcards.
								woowMsg.double(NameGreeting,serviceOffer);
								globalwoow.ai_step=1;
								globalwoow.wildCard=0;
								localStorage.setItem("wildCard",  globalwoow.wildCard);
								localStorage.setItem("aiStep", globalwoow.ai_step);
								
							}
                            else if(woowKits.getScore(response)!=0){ // checking is responding from dialogflow.
                                if(woowKits.getAction(response)=="" || "input.welcome"==woowKits.getAction(response)){
                                    if(woowKits.getFulfillmentSpeech(response)!="" && globalwoow.settings.obj.custom_intent_enable==1 && $.inArray(userIntent, globalwoow.settings.obj.custom_intent_names)==-1 ){
                                        //DialogFlow all defualt message will be printed.
                                        var DFMsg=woowKits.getFulfillmentSpeech(response);
                                        woowMsg.single(DFMsg);
                                    }else if(globalwoow.settings.obj.rich_response_enable==1 && globalwoow.settings.obj.custom_intent_enable==1 ){
                                        //DialogFlow all defualt message will be printed.
                                        var DFMsg="";
										if(globalwpw.settings.obj.df_api_version=='v1'){
											var messages = response.result.fulfillment.messages;
											var numMessages = messages.length;
											var index = 0;
											for (index; index<numMessages; index++) {
												var message = messages[index];
												switch (message.type) {
													case 0: // For text response
														DFMsg+=message.speech;
														break;
													case 1: // For card part
														DFMsg+=woowKits.cardResponse(message.title, message.subtitle, message.imageUrl, message.buttons, message.text, message.postback);
														break;
													case 2: // For quick replies
														DFMsg+=woowKits.quickRepliesResponse(message.title, message.replies);
														break;
													case 3: // For image response
														DFMsg+=woowKits.imageResponse(message.imageUrl);
														break;
													case 3: // custom payload

														break;
													default:
												}
											}
										}else{
											var messages = response.queryResult.fulfillmentMessages;
											var numMessages = messages.length;
											var index = 0;
											for (index; index<numMessages; index++) {
												var message = messages[index];

												if(typeof message.quickReplies !=="undefined"){
													
													DFMsg+=woowKits.quickRepliesResponse(message.quickReplies.title, message.quickReplies.quickReplies);

												}
												//handleing default response
												else if(typeof message.text !=="undefined"){
													if(typeof message.text.text !=="undefined" && message.text.text.length>0){
														DFMsg+= message.text.text[0];
														
													}
												}
												else if(typeof message.card !=="undefined"){
													DFMsg+=woowKits.cardResponse(message.card.title, message.card.subtitle, message.card.imageUri, message.buttons, '', '');
												}
												
												
											}
										}

                                        woowMsg.single(DFMsg);
                                    }else if(globalwoow.settings.obj.disable_product_search!=1){
                                        //Default is considered as product searching in the system if its not smalltalk && no respone message from DF
                                        var searchQuery=woowKits.filterStopWords(woowKits.queryText(response));
                                        globalwoow.wildCard=1;
                                        globalwoow.productStep='search'
                                        woowAction.bot(searchQuery);
                                        //keeping value in localstorage
                                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                                        localStorage.setItem("productStep", globalwoow.productStep);
                                    }else{
                                        var dfDefaultMsg=globalwoow.settings.obj.df_defualt_reply;
                                        woowMsg.single(dfDefaultMsg);
                                    }
                                } else if(woowKits.getAction(response)!=""){
                                    //Working for smalltalk
                                    var sTalkAction=woowKits.getAction(response);
                                    if(sTalkAction!='' && sTalkAction.indexOf('smalltalk') != -1 ){
										var sMgs=woowKits.getFulfillmentSpeech(response);
										
										woowMsg.single(sMgs);
									}else{
										
                                        var searchQuery=woowKits.filterStopWords(woowKits.queryText(response));
                                        globalwoow.wildCard=1;
                                        globalwoow.productStep='search'
                                        woowAction.bot(searchQuery);
                                        //keeping value in localstorage
                                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                                        localStorage.setItem("productStep", globalwoow.productStep);
										
										/*var sMgs=response.result.fulfillment.speech;
                                        woowMsg.single(sMgs);*/
                                    }
                                }

                            }else{
                                var searchQuery=woowKits.filterStopWords(woowKits.queryText(response));
                                globalwoow.wildCard=1;
                                globalwoow.productStep='search'
                                woowAction.bot(searchQuery);
                                //keeping value in localstorage
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("productStep", globalwoow.productStep);
                            }
                        }else{
                            //if bad request or limit cross then
                            globalwoow.df_status_lock=1;
                            var dfDefaultMsg=globalwoow.settings.obj.df_defualt_reply;
                            woowMsg.double_nobg(dfDefaultMsg,globalwoow.wildcards);
                        }
                    }).fail(function (error) {
                        var dfDefaultMsg=globalwoow.settings.obj.df_defualt_reply;
                        woowMsg.double_nobg(dfDefaultMsg,globalwoow.wildcards);
                    });
                }
            }else{
                //When intialize 1 and don't have cookies then keep  the name of shooper in in cookie
                if(globalwoow.initialize==1 && !localStorage.getItem('shopperw')  && globalwoow.wildCard==0){
                    msg=woowKits.toTitlecase(woowKits.filterStopWords(msg));
                    $.cookie("shopperw", msg, { expires : 365 });
                    localStorage.setItem('shopperw',msg);
                    globalwoow.hasNameCookie=msg;
                    //Greeting with name and suggesting the wildcard.
                    var NameGreeting=woowKits.randomMsg(globalwoow.settings.obj.i_am) +" <strong>"+globalwoow.settings.obj.agent+"</strong>! "+woowKits.randomMsg(globalwoow.settings.obj.name_greeting)+", <strong>"+msg+"</strong>!";
                    var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
                    //After completing two steps messaging showing wildcards.
                    woowMsg.double(NameGreeting,serviceOffer);
                    setTimeout(function(){
                        if(globalwoow.wildcards!=""){
                            woowMsg.single_nobg(globalwoow.wildcards);
                        }
                        globalwoow.wildCard=1;
                        globalwoow.productStep='search';
                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                        localStorage.setItem("productStep",  globalwoow.productStep);
                    },parseInt(globalwoow.settings.preLoadingTime*2.1));
                }
                //When returning shopper then greeting with name and wildcards.
                else if(localStorage.getItem('shopperw')  && globalwoow.wildCard==0){
                    //After asking service show the wildcards.
                    var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
                    woowMsg.double_nobg(serviceOffer,globalwoow.wildcards);
                    globalwoow.wildCard=1;
                    globalwoow.productStep='search';
                    localStorage.setItem("wildCard",  globalwoow.wildCard);
                    localStorage.setItem("productStep",  globalwoow.productStep);
                }
            }
        },

        product:function (msg) {
            if(globalwoow.wildCard==1 && globalwoow.productStep=='asking'){
                var askingProduct=woowKits.randomMsg(globalwoow.settings.obj.product_asking);
                woowMsg.single(askingProduct);
                globalwoow.productStep='search';
            } else if(globalwoow.wildCard==1 && globalwoow.productStep=='search'){
				msg = woowKits.filterStopWords(msg);
				if(msg!=''){
					var data = {'action':'qcld_woo_chatbot_keyword', 'keyword':msg};
					//Products by string search ajax handler.
					woowKits.ajax(data).done(function( response ) {
						if(response.product_num==0){
							var productFail=woowKits.randomMsg(globalwoow.settings.obj.product_fail)+" <strong>"+msg+"</strong>!";
							//var productSuggest=woowKits.randomMsg(globalwoow.settings.obj.product_suggest);
							woowMsg.single(productFail);
							if(globalwoow.settings.obj.is_extended_search){
								setTimeout(function(){
									var data = {'action':'qcld_woo_chatbot_keyword_extended', 'keyword':msg};
									woowKits.ajax(data).done(function( response ) {
										var json=$.parseJSON(response);
										if(json.status=='success'){
											woowMsg.single2(json.html);
										}else{
											if(json.html!='' && json.html!==null){
												woowMsg.single(json.html);
											}
											setTimeout(function(){
												woowKits.sugestCat();
											},parseInt(globalwoow.settings.preLoadingTime*2.1));
										}
									})
								},parseInt(globalwoow.settings.preLoadingTime*2.1));
								
							}else{
								//Suggesting category.
								setTimeout(function(){
									woowKits.sugestCat();
								},parseInt(globalwoow.settings.preLoadingTime*2.1));
							}								
							

						}else {
							
							var productSucces= woowKits.randomMsg(globalwoow.settings.obj.product_success)+" <strong>"+msg+"</strong>!";
							woowMsg.double_nobg(productSucces,response.html);
							if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
								
								globalwoow.wildCard=0;
								globalwoow.ai_step=1;
								localStorage.setItem("wildCard",  globalwoow.wildCard);
								localStorage.setItem("aiStep", globalwoow.ai_step);
								
									if(globalwoow.settings.obj.is_extended_search){
										setTimeout(function(){
											var data = {'action':'qcld_woo_chatbot_keyword_extended', 'keyword':msg};
											woowKits.ajax(data).done(function( response ) {
												var json=$.parseJSON(response);
												if(json.status=='success'){
													
													woowMsg.single2(json.html);
													
												}
											})
										},parseInt(globalwoow.settings.preLoadingTime*2.1));
									}
								
								
							}else{
								
								//Infinite asking to break dead end.
								if(globalwoow.settings.obj.is_extended_search){
									setTimeout(function(){
										var data = {'action':'qcld_woo_chatbot_keyword_extended', 'keyword':msg};
										woowKits.ajax(data).done(function( response ) {
											var json=$.parseJSON(response);
											if(json.status=='success'){
												
												woowMsg.single2(json.html);
												
											}else{
												wpwMsg.single(json.html);
												setTimeout(function(){
													woowKits.sugestCat();
												},parseInt(globalwoow.settings.preLoadingTime*2.1));
											}
										})
									},parseInt(globalwoow.settings.preLoadingTime*2.1));
								}else{
									if(response.per_page >= response.product_num){
										setTimeout(function () {
											var searchAgain = woowKits.randomMsg(globalwoow.settings.obj.product_infinite);
											woowMsg.single(searchAgain);
											//keeping value in localstorage
											globalwoow.productStep='search';
											localStorage.setItem("productStep",  globalwoow.productStep);
										},globalwoow.settings.wildcardsShowTime);
									}
								}
								
							}
						}
						

					});
				}else{
					var askingProduct=woowKits.randomMsg(globalwoow.settings.obj.product_asking);
					woowMsg.single(askingProduct);
				}

            }else if(globalwoow.wildCard==1 && globalwoow.productStep=='category'){
                var msg=msg.split("#");
                var categoryTitle=msg[0];
                var categoryId=msg[1];
                var data = { 'action':'qcld_woo_chatbot_category_products','category':categoryId};
                //Product by category ajax handler.
                woowKits.ajax(data).done(function (response) {
                    if(response.product_num==0){
                        //Since product does not found then show message and suggesting infinity search
                        var productFail = woowKits.randomMsg(globalwoow.settings.obj.product_fail)+" <strong>"+categoryTitle+"</strong>!";
                        var searchAgain = woowKits.randomMsg(globalwoow.settings.obj.product_infinite);
                        woowMsg.double(productFail,searchAgain);
                        globalwoow.productStep='search';
                        //keeping value in localstorage
                        localStorage.setItem("productStep",  globalwoow.productStep);

                    } else{
                        //Now show chat message to choose the product.
                        var productSuccess = woowKits.randomMsg(globalwoow.settings.obj.product_success)+" <strong>"+categoryTitle+"</strong>!";
                        var products=response.html;
                        woowMsg.double_nobg(productSuccess,products);
                        //Infinite asking to break dead end.
                        if(response.per_page >= response.product_num){
                            setTimeout(function () {
                                var searchAgain = woowKits.randomMsg(globalwoow.settings.obj.product_infinite);
                                woowMsg.single(searchAgain);
                                globalwoow.productStep='search';
                                //keeping value in localstorage
                                localStorage.setItem("productStep",  globalwoow.productStep);
                            },globalwoow.settings.wildcardsShowTime);
                        }
                    }
                })
            }else if(globalwoow.wildCard==1 && globalwoow.productStep=='featured'){
                var data = {'action':'qcld_woo_chatbot_featured_products'};
                //Products by string search ajax handler.
                woowKits.ajax(data).done(function( response ) {
                    if(response.product_num==0){
                        var productFail=woowKits.randomMsg(globalwoow.settings.obj.product_fail)+" <strong>Featured Products</strong>!";
                        //var productSuggest=woowKits.randomMsg(globalwoow.settings.obj.product_suggest);
                        woowMsg.single(productFail);

                        //Suggesting category.
                        setTimeout(function(){
                            woowKits.sugestCat();
                        },parseInt(globalwoow.settings.preLoadingTime*2.1));

                    }else {
                        var productSucces= woowKits.randomMsg(globalwoow.settings.obj.product_success)+" <strong>Featured Products</strong>!";
                        woowMsg.double_nobg(productSucces,response.html);
                        //Infinite asking to break dead end.
                        if(response.per_page >= response.product_num){
                            setTimeout(function () {
                                var searchAgain = woowKits.randomMsg(globalwoow.settings.obj.product_infinite);
                                woowMsg.single(searchAgain);
                                //For Dialogflow or else
                                if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                                    globalwoow.wildCard=0;
                                    globalwoow.ai_step=1;
                                    localStorage.setItem("wildCard",  globalwoow.wildCard);
                                    localStorage.setItem("aiStep", globalwoow.ai_step);
                                }else{
                                    //keeping value in localstorage
                                    globalwoow.productStep='search';
                                    localStorage.setItem("wildCard",  globalwoow.wildCard);
                                    localStorage.setItem("productStep",  globalwoow.productStep);
                                }
                            },globalwoow.settings.wildcardsShowTime);
                        }else{
                            //For Dialogflow or else
                            if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                                globalwoow.wildCard=0;
                                globalwoow.ai_step=1;
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("aiStep", globalwoow.ai_step);
                            }
                        }

                    }
                });

            }else if(globalwoow.wildCard==1 && globalwoow.productStep=='sale'){
                var data = {'action':'qcld_woo_chatbot_sale_products'};
                //Products by string search ajax handler.
                woowKits.ajax(data).done(function( response ) {
                    if(response.product_num==0){
                        var productFail=woowKits.randomMsg(globalwoow.settings.obj.product_fail)+'<strong>'+woowKits.randomMsg(globalwoow.settings.obj.sale_products)+'</strong>!';
                        //var productSuggest=woowKits.randomMsg(globalwoow.settings.obj.product_suggest);
                        woowMsg.single(productFail);

                        //Suggesting category.
                        setTimeout(function(){
                            woowKits.sugestCat();
                        },parseInt(globalwoow.settings.preLoadingTime*2.1));

                    }else {
                        var productSucces= woowKits.randomMsg(globalwoow.settings.obj.product_success)+' <strong>'+woowKits.randomMsg(globalwoow.settings.obj.sale_products)+'</strong>!';
                        woowMsg.double_nobg(productSucces,response.html);
                        //Infinite asking to break dead end.
                        if(response.per_page >= response.product_num){
                            setTimeout(function () {
                                var searchAgain = woowKits.randomMsg(globalwoow.settings.obj.product_infinite);
                                woowMsg.single(searchAgain);
                                //For Dialogflow or else
                                if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                                    globalwoow.wildCard=0;
                                    globalwoow.ai_step=1;
                                    localStorage.setItem("wildCard",  globalwoow.wildCard);
                                    localStorage.setItem("aiStep", globalwoow.ai_step);
                                }else{
                                    //keeping value in localstorage
                                    globalwoow.productStep='search';
                                    localStorage.setItem("productStep",  globalwoow.productStep);
                                }
                            },globalwoow.settings.wildcardsShowTime);
                        }else{
                            //For Dialogflow or else
                            if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                                globalwoow.wildCard=0;
                                globalwoow.ai_step=1;
                                localStorage.setItem("wildCard",  globalwoow.wildCard);
                                localStorage.setItem("aiStep", globalwoow.ai_step);
                            }
                        }

                    }
                });
            }
        },

        order:function (msg) {
            //If user already logged In then
            if(globalwoow.settings.obj.order_login==1){
                var orderWelcome=globalwoow.settings.obj.order_welcome;
                var data = {'action': 'qcld_woo_chatbot_loged_in_user_orders'};
                //Orders for logged in user ajax handler.
                woowKits.ajax(data).done(function (response) {
                    if(response.order_num>0){
                        var orderSucMsg=response.message;
                        var orderSucHtml=response.html;
                        woowMsg.double_nobg(orderSucMsg,orderSucHtml);
                        //Calling the email to admin part
                        setTimeout(function(){
                            var orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                            var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.order_email_support)+'</span>';
                            woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
                        },globalwoow.settings.wildcardsShowTime);
                    }else{
                        var orderFailMsg=response.message;
                        var orderFailHtml=response.html;
                        woowMsg.double(orderFailMsg,orderFailHtml);
                        //Calling the email to admin part
                        setTimeout(function(){
                            var orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                            var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.order_email_support)+'</span>';
                            woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
                        },globalwoow.settings.wildcardsShowTime);
                    }
                });
            }
            //If user is not logged In then
            else{
                if( globalwoow.wildCard==2 && globalwoow.orderStep=='welcome'){
                    var orderWelcome=woowKits.randomMsg(globalwoow.settings.obj.order_welcome);
                    var userNameAsking=woowKits.randomMsg(globalwoow.settings.obj.order_username_asking);
					
                    woowMsg.double(orderWelcome,userNameAsking);
                    //updating the order steps
                    globalwoow.orderStep='user';
                    //keeping value in localstorage
                    localStorage.setItem("orderStep",  globalwoow.orderStep);

                } else if( globalwoow.wildCard==2 && globalwoow.orderStep=='user'){
                    globalwoow.shopperUserName=msg;
                    var data = {'action': 'qcld_woo_chatbot_check_user', 'user_name': globalwoow.shopperUserName };
                    //Username checking ajax handler.
                    woowKits.ajax(data).done(function (response) {
                        if(response.status=='success'){
                            var successMgs=response.message;
                            var sucessHtml=response.html;
                            woowMsg.double(successMgs,sucessHtml);
                            globalwoow.orderStep='password';
                            //keeping value in localstorage
                            localStorage.setItem("orderStep",  globalwoow.orderStep);

                        } else{
                            var failMsg=response.message;
                            woowMsg.single(failMsg);
                            globalwoow.orderStep='user';
                            //keeping value in localstorage
                            localStorage.setItem("orderStep",  globalwoow.orderStep);
                        }
                    });
                }else if( globalwoow.wildCard==2 && globalwoow.orderStep=='password'){
                    var data = {'action': 'qcld_woo_chatbot_login_user','user_name': globalwoow.shopperUserName,'user_pass': msg,'security': globalwoow.settings.obj.order_nonce};
                    //user loginajax handler.
                    woowKits.ajax(data).done(function (response) {
                        if(response.status=='success') {
                            if (response.order_num > 0) {
                                var loginSucMsg=response.message;
                                var orderHtml=response.html;
                                woowMsg.double_nobg(loginSucMsg,orderHtml);
                                //Now keep the user as login in by updating obj
                                globalwoow.settings.obj.order_login=1;
                                //Calling the email to admin part
                                setTimeout(function(){
                                    var orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                                    var orEmailSuggest='<span class="qcld-chatbot-suggest-email">'+woowKits.randomMsg(globalwoow.settings.obj.order_email_support)+'</span>';
                                    woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
                                },globalwoow.settings.wildcardsShowTime);

                            } else {
                                var loginFailcMsg=response.message;
                                var orderNoHtml=response.html;
                                woowMsg.double(loginFailcMsg,orderNoHtml);
                                //Now keep the user as login in by updating obj
                                globalwoow.settings.obj.order_login=1;
                                //Calling the email to admin part
                                setTimeout(function(){
                                    var orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                                    var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.order_email_support)+'</span>';
                                    woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
                                },globalwoow.settings.wildcardsShowTime);
                            }
                        }else{
                            var loginFail= response.message;
                            woowMsg.single(loginFail);
                            globalwoow.orderStep=='password';
                            //keeping value in localstorage
                            localStorage.setItem("orderStep",  globalwoow.orderStep);
                        }
                    });
                }
            }
        },

		unsubscription:function(msg){
			
			
			
            if(globalwoow.wildCard==8 && globalwoow.unsubscriptionStep=='welcome'){

                var restWarning=woowKits.randomMsg(globalwoow.settings.obj.do_you_want_to_unsubscribe);
                var confirmBtn='<span class="qcld-chat-common qcld_unsubscribe_confirm" unsubscription="yes" >'+globalwoow.settings.obj.yes+'</span> <span> '+globalwoow.settings.obj.or+' </span><span class="qcld-chat-common qcld_unsubscribe_confirm"  unsubscription="no">'+globalwoow.settings.obj.no+'</span>';
                woowMsg.double_nobg(restWarning,confirmBtn);

            }else if(globalwoow.wildCard==8 && globalwoow.unsubscriptionStep=='getemail'){

                if(typeof(globalwoow.hasNameCookie)=='undefined'|| globalwoow.hasNameCookie==''){
					var shopperName=  globalwoow.settings.obj.shopper_demo_name;
				}else{
					var shopperName=globalwoow.hasNameCookie;
				}
				
				var askEmail=globalwoow.settings.obj.hello+' '+shopperName+'! '+ woowKits.randomMsg(globalwoow.settings.obj.asking_email);
				woowMsg.single(askEmail);
				globalwoow.unsubscriptionStep = 'collectemailunsubscribe';

            }else if(globalwoow.wildCard==8 && globalwoow.unsubscriptionStep=='collectemailunsubscribe'){

                var validate = "";
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if( re.test(msg)!=true){
                    validate = validate+woowKits.randomMsg(globalwoow.settings.obj.invalid_email) ;
                }

                if(validate == ""){

                    var data = {'action':'qcld_woo_chatbot_email_unsubscription','email':msg};
                    woowKits.ajax(data).done(function (response) {
                        var json=$.parseJSON(response);
                        if(json.status=='success'){
                            woowMsg.single(woowKits.randomMsg(globalwoow.settings.obj.you_have_successfully_unsubscribe));
                            setTimeout(function(){
                                var orPhoneSuggest = '';
								if(globalwoow.settings.obj.call_sup=="") {
									orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
								}
								var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.support_email)+'</span>';
								woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
								globalwoow.wildCard=0;
							},globalwoow.settings.preLoadingTime);
                        }else{
                            var restWarning=woowKits.randomMsg(globalwoow.settings.obj.we_do_not_have_your_email);
                            var confirmBtn='<span class="qcld-chat-common qcld_unsubscribe_again" >Try again?</span>';
                            woowMsg.double_nobg(restWarning,confirmBtn);
                        }
                    })
                    //wpwMsg.single('Collected valid email and trying to unsubscribe');

                }else{
                    globalwoow.unsubscriptionStep = 'collectemailunsubscribe';
                    woowMsg.single(validate);
                }


            }
        },
		
		
		subscription:function(msg){
			
			if(globalwoow.wildCard==6 && globalwoow.subscriptionStep=='welcome'){
				var restWarning=woowKits.randomMsg(globalwoow.settings.obj.do_you_want_to_subscribe);
				var confirmBtn='<span class="qcld-chat-common qcld_subscribe_confirm" subscription="yes" >'+globalwoow.settings.obj.yes+'</span> <span> '+globalwoow.settings.obj.or+' </span><span class="qcld-chat-common qcld_subscribe_confirm"  subscription="no">'+globalwoow.settings.obj.no+'</span>';
				//woowMsg.double_nobg(restWarning,confirmBtn);
			
				if(globalwoow.settings.obj.enable_gdpr){
                    woowMsg.triple_nobg(restWarning, globalwoow.settings.obj.gdpr_text, confirmBtn);
                }else{
                    woowMsg.double_nobg(restWarning,confirmBtn);
                }
			
			
			}
			else if(globalwoow.wildCard==6 && globalwoow.subscriptionStep=='getname'){
				
				console.log("ask email");
				
				if(typeof(globalwoow.hasNameCookie)=='undefined'|| globalwoow.hasNameCookie==''){
					var shopperName=  globalwoow.settings.obj.shopper_demo_name;
				}else{
					var shopperName=globalwoow.hasNameCookie;
				}
				
				var askEmail='Hello '+shopperName+'! '+ woowKits.randomMsg(globalwoow.settings.obj.asking_email);
				woowMsg.single(askEmail);
				globalwoow.subscriptionStep = 'getemail';
				
			}
			else if(globalwoow.wildCard==6 && globalwoow.subscriptionStep=='getemail'){
				
				console.log("get email");
				
				globalwoow.shopperEmail=msg;
                var validate = "";
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if( re.test(globalwoow.shopperEmail)!=true){
                    validate = validate+woowKits.randomMsg(globalwoow.settings.obj.invalid_email) ;
                }
                if(validate == ""){
                    if(typeof(globalwoow.hasNameCookie)=='undefined'|| globalwoow.hasNameCookie==''){
						var shopperName=  globalwoow.settings.obj.shopper_demo_name;
					}else{
						var shopperName=globalwoow.hasNameCookie;
					}
					
					var data = {'action':'qcld_woo_chatbot_email_subscription','name':shopperName,'email':globalwoow.shopperEmail, 'url':window.location.href};

					woowKits.ajax(data).done(function (response) {
						var json=$.parseJSON(response);
						
						if(json.status=='success'){
							var sucMsg=json.msg;
							woowMsg.single(sucMsg);

							setTimeout(function(){
								if(globalwoow.settings.obj.call_sup=="") {
									orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
								}
								var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.support_email)+'</span>';
								woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
								globalwoow.wildCard=0;
							},globalwoow.settings.preLoadingTime);
						}else{
							var failMsg=json.msg;
							woowMsg.single(failMsg);
							setTimeout(function(){
								woowAction.bot(globalwoow.settings.obj.sys_key_help.toLowerCase());
							},globalwoow.settings.preLoadingTime)
							
						}
					});
					

                }else{
					globalwoow.subscriptionStep = 'getemail';
                    woowMsg.single(validate);
                    
                }
				
			}
		},

        support:function (msg) {
            if(globalwoow.wildCard==3 && globalwoow.supportStep=='welcome'){
                var welcomeMsg= woowKits.randomMsg(globalwoow.settings.obj.support_welcome);
                var orPhoneSuggest = '';
                if(globalwoow.settings.obj.support_query.length>0){
                    var supportsItems = '';
                    var messenger = '';
                    if(globalwoow.settings.obj.enable_messenger==1) {
                        messenger += '<span class="qcld-chatbot-wildcard"  data-wildcart="messenger">'+woowKits.randomMsg(globalwoow.settings.obj.messenger_label)+'</span>';
                    }
                    if(globalwoow.settings.obj.enable_whats==1) {
                        messenger += '<span class="qcld-chatbot-wildcard"  data-wildcart="whatsapp">'+woowKits.randomMsg(globalwoow.settings.obj.whats_label)+'</span>';
                    }
                    if(globalwoow.settings.obj.disable_feedback=='') {
                        messenger+= '<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.feedback_label)+'</span>';
                    }

                    $.each(globalwoow.settings.obj.support_query, function (i, obj) {
                        supportsItems += '<span class="qcld-chatbot-support-items"  data-query-index="' + i + '">' + obj + '</span>';
                    });
                    var orEmailSuggest = '<span class="qcld-chatbot-suggest-email" >' + woowKits.randomMsg(globalwoow.settings.obj.support_email) + '</span>';
                    if(globalwoow.settings.obj.call_sup=="") {
                        orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                    }
                    var queryOrEmail=supportsItems+orEmailSuggest+orPhoneSuggest+messenger;
                }else {
                    if(globalwoow.settings.obj.call_sup=="") {
                        orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                    }
                    var queryOrEmail='<span class="qcld-chatbot-suggest-email" >' + woowKits.randomMsg(globalwoow.settings.obj.support_email) + '</span>'+orPhoneSuggest;

                }

                woowMsg.double_nobg(welcomeMsg,queryOrEmail);
            } else if(globalwoow.wildCard==3 && globalwoow.supportStep=='email'){

                globalwoow.shopperEmail=msg;
                var validate = "";
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if( re.test(globalwoow.shopperEmail)!=true){
                    validate = validate+woowKits.randomMsg(globalwoow.settings.obj.invalid_email) ;
                }
                if(validate == ""){
                    var askingMsg=woowKits.randomMsg(globalwoow.settings.obj.asking_msg);
                    woowMsg.single(askingMsg);
                    globalwoow.supportStep='message';
                    //keeping value in localstorage
                    localStorage.setItem("supportStep",  globalwoow.supportStep);

                }else{
                    woowMsg.single(validate);
                    globalwoow.supportStep='email';
                    //keeping value in localstorage
                    localStorage.setItem("supportStep",  globalwoow.supportStep);
                }
            }else if(globalwoow.wildCard==3 && globalwoow.supportStep=='message'){

                var data = {'action':'qcld_woo_chatbot_support_email','name':localStorage.getItem('shopperw'),'email':globalwoow.shopperEmail,'message':msg};
                woowKits.ajax(data).done(function (response) {
                    var json=$.parseJSON(response);
                    var orPhoneSuggest='';
                    if(json.status=='success'){
                        var sucMsg=json.message;
                        woowMsg.single(sucMsg);
                        //Asking email after showing answer.
                        setTimeout(function(){
                            if(globalwoow.settings.obj.call_sup=="") {
                                orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                            }
                            var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.support_email)+'</span>';
                            woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
                            globalwoow.wildCard=0;
                        },globalwoow.settings.preLoadingTime);
                    }else{
                        var failMsg=json.message;
                        woowMsg.single(failMsg);
                        //Asking email after showing answer.
                        setTimeout(function(){
                            if(globalwoow.settings.obj.call_sup=="") {
                                orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                            }
                            var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.support_email)+'</span>';
                            woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
                            globalwoow.wildCard=0;
                        },globalwoow.settings.preLoadingTime);
                    }
                });

            }else if(globalwoow.wildCard==3 && globalwoow.supportStep=='phone'){
                var data = {'action':'qcld_woo_chatbot_support_phone','name':localStorage.getItem('shopperw'),'phone':msg};
                woowKits.ajax(data).done(function (response) {
                    var json=$.parseJSON(response);
                    var orPhoneSuggest='';
                    if(json.status=='success'){
                        var sucMsg=json.message;
                        woowMsg.single(sucMsg);
                        //Asking email after showing answer.
                        setTimeout(function(){
                            if(globalwoow.settings.obj.call_sup=="") {
                                orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                            }
                            var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.support_email)+'</span>';
                            woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
                            globalwoow.wildCard=0;
                        },globalwoow.settings.preLoadingTime);
                    }else{
                        var failMsg=json.message;
                        woowMsg.single(failMsg);
                        //Asking email after showing answer.
                        setTimeout(function(){
                            if(globalwoow.settings.obj.call_sup=="") {
                                orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                            }
                            var orEmailSuggest='<span class="qcld-chatbot-suggest-email" >'+woowKits.randomMsg(globalwoow.settings.obj.support_email)+'</span>';
                            woowKits.suggestEmail(orEmailSuggest+orPhoneSuggest);
                            globalwoow.wildCard=0;
                        },globalwoow.settings.preLoadingTime);
                    }
                });

            }

        },
		bargain:function(msg){

            if(globalwoow.wildCard==9 && globalwoow.bargainStep == 'welcome' && globalwoow.bargainId != ''){

                var data = {
                    'action':'qcld_woo_bargin_product',
                    'qcld_woo_map_product_id':globalwoow.bargainId,
                    'qcld_woo_map_variation_id':globalwoow.bargainVId,
                    'security': globalwoow.settings.obj.map_get_ajax_nonce

                };
                woowKits.ajax(data).done(function (response) {

                    var restWarning = response.html;
                    var confirmBtn  = globalwoow.settings.obj.your_offer_price;
                    woowMsg.double(restWarning,confirmBtn);

                    globalwoow.bargainStep = 'bargain';
                    globalwoow.bargainLoop  = 0;
                    globalwoow.bargainPrice = '';
                    globalwoow.bargainId = globalwoow.bargainId;
                    globalwoow.bargainVId = globalwoow.bargainVId;
                    localStorage.setItem("wildCard",  globalwoow.bargainStep);
                    localStorage.setItem("bargainLoop",  globalwoow.bargainLoop);
                    localStorage.setItem("bargainPrice",  globalwoow.bargainPrice);
                    localStorage.setItem("bargainId",  globalwoow.bargainId);
                    localStorage.setItem("bargainVId",  globalwoow.bargainVId);

                });


            }else if(globalwoow.wildCard==9 && globalwoow.bargainStep == 'bargain' && msg !== ""){
                
                    // setTimeout(function(){
                    var string = msg;
					
					var spliting = string.match(/\d+/g);
					
					if(spliting===null){
						woowMsg.single(globalwoow.settings.obj.your_offer_price_again);

					}else{
						
					
						var msg = string.match(/\d+/g).map(Number);

						var data = {'action':'qcld_woo_bargin_product_price',
                                'qcld_woo_map_product_id':globalwoow.bargainId,
                                'qcld_woo_map_variation_id':globalwoow.bargainVId, 
                                'price': parseInt(msg),
                                'security': globalwoow.settings.obj.map_get_ajax_nonce
                        };
						woowKits.ajax(data).done(function (response) {
							
							globalwoow.bargainStep  = 'bargain';
							globalwoow.bargainPrice = response.sale_price;
							localStorage.setItem("bargainStep",  globalwoow.bargainStep);
							localStorage.setItem("bargainPrice",  globalwoow.bargainPrice);

							if(response.confirm == 'success'){
								// If user provide price below minimum price
								if( globalwoow.bargainLoop == 1){
									var your_low_price_alert  = globalwoow.settings.obj.your_low_price_alert;
									var confirmBtn1  = your_low_price_alert.replace("{offer price}", parseInt(msg) + globalwoow.settings.obj.currency_symbol);
									var your_too_low_price_alert  = globalwoow.settings.obj.your_too_low_price_alert;
									var restWarning  = your_too_low_price_alert.replace("{minimum amount}", globalwoow.bargainPrice + globalwoow.settings.obj.currency_symbol);

									var confirmBtn='<span class="qcld-modal-bargin-confirm-add-to-cart" confirm-data="yes" >'+globalwoow.settings.obj.yes+'</span> <span> '+globalwoow.settings.obj.or+' </span><span class="qcld-chatbot-bargin-confirm-btn"  confirm-data="no">'+globalwoow.settings.obj.no+'</span>';
									woowMsg.triple_nobg(confirmBtn1,restWarning,confirmBtn);

									globalwoow.bargainLoop  = 0;
									localStorage.setItem("wildCard",  globalwoow.bargainLoop);

								}else{
									var restWarning= response.html;
									woowMsg.single(response.html);

									globalwoow.bargainLoop  = 1;
									localStorage.setItem("wildCard",  globalwoow.bargainLoop);
								}


							}else if(response.confirm == 'agree'){
								// if user provide resonable price.
								var restWarning= response.html;
								woowMsg.single(restWarning);
								setTimeout(function(){
									var data = {'action':'qcld_woo_bargin_product_confirm',
                                    'qcld_woo_map_product_id':globalwoow.bargainId, 
                                    'price': globalwoow.bargainPrice,
                                    'security': globalwoow.settings.obj.map_get_ajax_nonce
                                };
									woowKits.ajax(data).done(function (response) {


                                        var confirmBtn='<span class="qcld-modal-bargin-confirm-add-to-cart" confirm-data="yes" >'+globalwoow.settings.obj.yes+'</span> <span> '+globalwoow.settings.obj.or+' </span><span class="qcld-chatbot-bargin-confirm-btn"  confirm-data="no">'+globalwoow.settings.obj.no+'</span>';
                                    

                                            //woowMsg.single(response.html);
											woowMsg.double_nobg(response.html, confirmBtn);
											globalwoow.wildCard = 9;
											globalwoow.bargainStep  = 'bargain';
											globalwoow.bargainPrice =  globalwoow.bargainPrice;
											localStorage.setItem("wildCard",  globalwoow.wildCard);
											localStorage.setItem("wildCard",  globalwoow.bargainStep);
											localStorage.setItem("wildCard",  globalwoow.bargainPrice);
									});

								},globalwoow.settings.preLoadingTime);

							}else if(response.confirm == 'default'){

								woowMsg.double_nobg(response.html, '');

							}else{
								woowMsg.single(response.html);
							}
							
						});
					}
               // },globalwoow.settings.preLoadingTime);

            }else if(globalwoow.wildCard==9 && globalwoow.bargainStep == 'confirm'){

                setTimeout(function(){

                    var data = {'action':'qcld_woo_bargin_product_confirm',
                            'qcld_woo_map_product_id':globalwoow.bargainId, 
                            'price': globalwoow.bargainPrice,
                            'security': globalwoow.settings.obj.map_get_ajax_nonce
                        };
                    woowKits.ajax(data).done(function (response) {

                        // map_acceptable_price
                        var restWarning = response.html;
                        var map_acceptable_price  = globalwoow.settings.obj.map_acceptable_price;
                        //var confirmBtn1  = map_acceptable_price.replace("{offer price}", globalwoow.bargainPrice + globalwoow.settings.obj.currency_symbol);
                        var confirmBtn1  = map_acceptable_price;
                        //var confirmBtn1  = '<p>Great! I am creating a one time discount coupon valid for you only.</p>';
                        woowMsg.double(confirmBtn1,restWarning);

                        globalwoow.wildCard = 0;
                        globalwoow.bargainStep  = 'welcome';
                        globalwoow.bargainPrice = '';
                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                        localStorage.setItem("bargainStep",  globalwoow.bargainStep);
                        localStorage.setItem("bargainPrice",  globalwoow.bargainPrice);
                        

                    });

                },globalwoow.settings.preLoadingTime);

            }else if(globalwoow.wildCard==9 && globalwoow.bargainStep == 'add_to_cart'){

                setTimeout(function(){

                    if(globalwoow.bargainVId != ''){

                        var data = {'action':'qcld_woo_bargin_product_variation_add_to_cart',
                                'product_id':globalwoow.bargainId,
                                'variation_id':globalwoow.bargainVId, 
                                'price': globalwoow.bargainPrice,
                                'security': globalwoow.settings.obj.map_get_ajax_nonce
                            };

                    }else{

                       var data = {
                        'action':'qcld_woo_bargin_product_add_to_cart',
                        'product_id':globalwoow.bargainId, 
                        'price': globalwoow.bargainPrice,
                        'security': globalwoow.settings.obj.map_get_ajax_nonce
                        };
                    }


                    woowKits.ajax(data).done(function (response) {

                        // map_acceptable_price
                        var restWarning = response.html;

                        var confirmBtn='<div class="woo-chatbot-product-bargain-btn"><a href="'+globalwoow.settings.obj.map_get_checkout_url +'" class="qcld-modal-bargin-confirm-btn-checkout"> '+globalwoow.settings.obj.map_checkout_now_button_text+' </a></div>';

                        //woowMsg.single(restWarning);

                        woowMsg.double_nobg(restWarning, confirmBtn);


                        globalwoow.wildCard = 0;
                        globalwoow.bargainStep  = 'welcome';
                        globalwoow.bargainVId = '';
                        globalwoow.bargainPrice = '';
                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                        localStorage.setItem("bargainStep",  globalwoow.bargainStep);
                        localStorage.setItem("bargainVId",  globalwoow.bargainVId);
                        localStorage.setItem("bargainPrice",  globalwoow.bargainPrice);
                        

                    });

                },globalwoow.settings.preLoadingTime);

            }else if(globalwoow.wildCard==9 && globalwoow.bargainStep == 'disagree' && globalwoow.bargainLoop == 0){

                    //  map_talk_to_boss msg
                    var map_talk_to_boss  = globalwoow.settings.obj.map_talk_to_boss;
                    var confirmBtn  = map_talk_to_boss;
                    woowMsg.single(confirmBtn);
                    globalwoow.bargainLoop = 1;
                    localStorage.setItem("bargainLoop",  globalwoow.bargainLoop);
    

            }else if(globalwoow.wildCard==9 && globalwoow.bargainStep == 'disagree' && globalwoow.bargainLoop == 1){

				var string = msg;
				var spliting = string.match(/\d+/g);
					
				if(spliting===null){
					woowMsg.single(globalwoow.settings.obj.your_offer_price_again);

				}else{
					// map_get_email_address
					var map_get_email_address  = globalwoow.settings.obj.map_get_email_address;
					var confirmBtn  = map_get_email_address;
					woowMsg.single(confirmBtn);  

				   // var string = msg;
					globalwoow.bargainPrice = msg.match(/\d+/g).map(Number);
					//globalwoow.bargainPrice = msg;
					//localStorage.setItem("wildCard",  globalwoow.bargainPrice);
					localStorage.setItem("finalprice",  globalwoow.bargainPrice);

					

					globalwoow.bargainLoop = 2;
					localStorage.setItem("bargainLoop",  globalwoow.bargainLoop);
				}
            }else if(globalwoow.wildCard==9 && globalwoow.bargainStep == 'disagree' && globalwoow.bargainLoop == 2){

                // map_get_email_address
                var map_thanks_test  = globalwoow.settings.obj.map_thanks_test;
                var confirmBtn  = map_thanks_test;

                setTimeout(function(){
                    
                    woowMsg.single(confirmBtn); 

                    var data = {'action':'qcld_woo_bargin_send_query',
                                'qcld_woo_map_product_id':globalwoow.bargainId, 
                                'price':  localStorage.getItem("finalprice"), 
                                'email': msg,
                                'security': globalwoow.settings.obj.map_get_ajax_nonce
                            };
                    
                    woowKits.ajax(data).done(function (response) {
                        //console.log(response);
                       // woowMsg.single(confirmBtn);  

                    });

                },globalwoow.settings.preLoadingTime);

                globalwoow.bargainLoop = 0;
                localStorage.setItem("bargainLoop",  globalwoow.bargainLoop);
                globalwoow.wildCard = 0;
                globalwoow.bargainStep  = 'welcome';
                globalwoow.bargainPrice = '';
                localStorage.setItem("wildCard",  globalwoow.wildCard);
                localStorage.setItem("bargainStep",  globalwoow.bargainStep);
                localStorage.setItem("bargainPrice",  globalwoow.bargainPrice);

            }


		}
    };
    /*
     * Woowbot Actions are divided into two part
     * shopper will response after initialize message,
     * then based on shopper activities shopper will act.
     */
    var woowAction={
        bot:function(msg){
			
            // Disable the Editor
            woowKits.disableEditor(globalwoow.settings.obj.agent+' '+woowKits.randomMsg(globalwoow.settings.obj.is_typing));
            msg=msg.toLowerCase();
            if(globalwoow.wildcardsHelp.indexOf(msg)>-1){
                if(msg==globalwoow.settings.obj.sys_key_help.toLowerCase()){
                    globalwoow.wildCard=0;
                    var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.wildcard_msg);
                    woowMsg.double_nobg(serviceOffer,globalwoow.wildcards);
                }
                if(msg==globalwoow.settings.obj.sys_key_product.toLowerCase()){
                    globalwoow.wildCard=1;
                    globalwoow.productStep='asking';
                    woowTree.product(msg);
                }
                if(msg==globalwoow.settings.obj.sys_key_catalog.toLowerCase()){
                    globalwoow.wildCard=1;
                    globalwoow.productStep='search';
                    woowKits.sugestCat();
                }

                if(msg==globalwoow.settings.obj.sys_key_order.toLowerCase()){
                    globalwoow.wildCard=2;
                    globalwoow.orderStep='welcome';
                    woowTree.order(msg);
                }
                if(msg==globalwoow.settings.obj.sys_key_support.toLowerCase()){
                    globalwoow.wildCard=3;
                    globalwoow.supportStep='welcome';
                    woowTree.support(msg);
                }
				
				
				if(msg==globalwoow.settings.obj.email_subscription.toLowerCase()){
                    globalwoow.wildCard=6;
                    globalwoow.subscriptionStep='welcome';
                    woowTree.subscription(msg);
                }
				
				if(msg==globalwoow.settings.obj.unsubscribe.toLowerCase()){
                    globalwoow.wildCard=8;
                    globalwoow.unsubscriptionStep='welcome';
                    woowTree.unsubscription(msg);
                }
				
				
				if(msg==globalwoow.settings.obj.sys_key_livechat.toLowerCase()){
					woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
					if(globalwoow.settings.obj.is_livechat_active==1){
						if(globalwoow.settings.obj.disable_livechat_operator_offline==1){
							if(globalwoow.settings.obj.is_operator_online==1){
								
								jQuery('.woo-saas-live-chat').height(jQuery('#woo-chatbot-board-container').height());
								jQuery('.wbcaBody').height((jQuery('#woo-chatbot-board-container').height()-35));
								jQuery('#wbca_chat_body').height((jQuery('#woo-chatbot-board-container').height()-85));
								
								if($('#wbca_signup_fullname').length>0){
									if(localStorage.getItem('shopperw')!==null){
										$('#wbca_signup_fullname').val(localStorage.getItem('shopperw'));
									}
									if(localStorage.getItem('shopperemail')!==null){
										$('#wbca_signup_email').val(localStorage.getItem('shopperemail'));
									}
								}
								$("#woo-chatbot-board-container").removeClass('active-chat-board');
								$('.woo-chatbot-container').hide();
								$('.woo-saas-live-chat').show();
							}
						}else{
							jQuery('.woo-saas-live-chat').height(jQuery('#woo-chatbot-board-container').height());
							jQuery('.wbcaBody').height((jQuery('#woo-chatbot-board-container').height()-35));
							jQuery('#wbca_chat_body').height((jQuery('#woo-chatbot-board-container').height()-85));
							if($('#wbca_signup_fullname').length>0){
								if(localStorage.getItem('shopperw')!==null){
									$('#wbca_signup_fullname').val(localStorage.getItem('shopperw'));
								}
								if(localStorage.getItem('shopperemail')!==null){
									$('#wbca_signup_email').val(localStorage.getItem('shopperemail'));
								}
							}							
							$("#woo-chatbot-board-container").removeClass('active-chat-board');
							$('.woo-chatbot-container').hide();
							$('.woo-saas-live-chat').show();
						}
					}
					
                }
				
				
                if(msg==globalwoow.settings.obj.sys_key_reset.toLowerCase()){
					console.log('adfasdfsadfasdf');
                    var restWarning=woowKits.randomMsg(globalwoow.settings.obj.reset);
                    var confirmBtn='<span class="qcld-chatbot-reset-btn" reset-data="yes" >'+globalwoow.settings.obj.yes+'</span> <span> '+globalwoow.settings.obj.or+' </span><span class="qcld-chatbot-reset-btn"  reset-data="no">'+globalwoow.settings.obj.no+'</span>';
                    woowMsg.double_nobg(restWarning,confirmBtn);
                }

            }else{
				
				
                /*
                 *   Greeting part
                 *   bot action
                 */
                if(globalwoow.wildCard==0){
                    woowTree.greeting(msg);
                }

                /*
                 *   Product part
                 *   bot action
                 */
                if(globalwoow.wildCard==1){
					
                    woowTree.product(msg);
                }

                /*
                 *   order status part
                 *   bot action
                 */
                if(globalwoow.wildCard==2){
                    woowTree.order(msg);
                }

                /*
                 *   support part
                 *   bot action
                 */
                if(globalwoow.wildCard==3){
                    woowTree.support(msg);
                }
				
				if(globalwoow.wildCard==6){
                    woowTree.subscription(msg);
                }
				
				if(globalwoow.wildCard==8){
                    woowTree.unsubscription(msg);
                }
				if(globalwoow.wildCard==9){
                    woowTree.bargain(msg);
                }

            }
        },
        shopper:function (msg) {
            woowMsg.shopper(msg);
            if(globalwoow.wildCard==3) {
                this.bot(msg);
            }else if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.wildCard==0 && globalwoow.ai_step==1 && globalwoow.df_status_lock==0){
                this.bot(msg);
            } else{
                //Filtering the user given messages by stopwords
				
                //var filterMsg=woowKits.filterStopWords(msg);
                var filterMsg=msg;
                //handle empty filterMsg as repeat the message.
				/*
				if(filterMsg==""){
					var res = msg.match(/ben/gi);
					if(typeof(res.length)!=='undefined' && res.length > 1){
						filterMsg = res[0];
					}
				}
				*/
				//console.log(filterMsg);
                if(filterMsg=="")  {
                    
					if(globalwoow.settings.obj.ask_email_woo_greetings==1){
						this.bot(msg);
					}else{
						
						if(globalwoow.emptymsghandler==0){
							globalwoow.repeatQueryEmpty=woowKits.randomMsg(globalwoow.settings.obj.empty_filter_msg)+ ' "' +$(globalwoow.settings.messageLastBot).text()+'"';
							globalwoow.emptymsghandler++;
						}
						woowMsg.single(globalwoow.repeatQueryEmpty);
					}
                }else {
                    globalwoow.emptymsghandler=0;
                    this.bot(filterMsg);
                }

            }

        }
    };

        //search load more
        $(document).on('click', '.wp-chatbot-loadmore', function(e){
            e.preventDefault();
            var obj = $(this);

            var keyword = obj.attr('data-keyword');
            var post_type = obj.attr('data-post_type');
            var page = obj.attr('data-page');
            obj.text('Loading...');
            var data = {'action':'wpbo_search_site_pagination','name':globalwoow.hasNameCookie,'keyword':keyword, 'type': post_type, 'page': page};
            woowKits.ajax(data).done(function (res) {
                var json=$.parseJSON(res);
                if(json.status=='success'){
                    $('span[data-wildcart="back"]').remove();
                    
                    woowMsg.single_nobg(json.html+'<span class="qcld-chatbot-wildcard qcld_back_to_start"  data-wildcart="back">' + woowKits.randomMsg(globalwoow.settings.obj.back_to_start) + '</span>');
                    obj.remove();
                }else{                    
					woowMsg.single(json.html);
					setTimeout(function(){
						var serviceOffer=woowKits.randomMsg(globalwoow.settings.obj.support_option_again);
						woowMsg.double_nobg(serviceOffer,globalwoow.wildcards);
					},globalwoow.settings.preLoadingTime)

                }
                globalwoow.wildCard=0;
            });


        })
	
	//bargain initiate function
	$(document).on('click', '.woo_minimum_accept_price-bargin', function(e){
        var product_id = $(this).attr('product_id');
        var variation_id = '';

        var variable_check = $('.woo_minimum_accept_price-bargin').parent().parent().find('.variation_id');

        if($( variable_check ).hasClass( "variation_id" )){

            var variation_id = $('.variation_id').val();

            if( variation_id == '0' || variation_id == '' ) {
                alert('Please select some product options before adding this product to your cart.');
                return false;
            }

        }
        
        globalwoow.wildCard = 9;
        globalwoow.bargainStep = 'welcome';
        globalwoow.bargainId = product_id;
		globalwoow.bargainVId = variation_id;
        globalwoow.bargainPrice = '';
        localStorage.setItem("wildCard",  globalwoow.wildCard);
        localStorage.setItem("wildCard",  globalwoow.bargainStep);
        localStorage.setItem("wildCard",  globalwoow.bargainId);
        localStorage.setItem("wildCard",  globalwoow.bargainPrice);
        localStorage.setItem("bargainVId",  globalwoow.bargainVId);
		
		if(!localStorage.getItem('shopperw')){
			$.cookie("shopperw", "Guest", { expires : 365 });
			localStorage.setItem('shopperw',"Guest");
		}
		globalwoow.ai_step==1;
		
		
		if($('.active-chat-board').length>0){
			woowTree.bargain();
       
		}else{
			$('#woo-chatbot-ball').trigger('click');
			
			setTimeout(function(){
				woowTree.bargain('');
			}, globalwoow.settings.preLoadingTime)
				
			
		}
		
	});

    // bargain confirm ...
    $(document).on('click','.qcld-chatbot-bargin-confirm-btn',function (e) {
        e.preventDefault();
        var shopperChoice=$(this).text();
        woowMsg.shopper_choice(shopperChoice);
        var actionType=$(this).attr('confirm-data');
        if(actionType=='yes'){

            globalwoow.bargainStep = 'confirm';
            localStorage.setItem("wildCard",  globalwoow.bargainStep);
            woowTree.bargain();
        } else if(actionType=='no'){
            globalwoow.bargainStep = 'disagree';
            localStorage.setItem("wildCard",  globalwoow.bargainStep);
            globalwoow.bargainLoop = 0;
            localStorage.setItem("wildCard",  globalwoow.bargainLoop);
            woowTree.bargain();
        }
    });

    $(document).on('click','.qcld-modal-bargin-confirm-add-to-cart',function (e) {
        e.preventDefault();
        var shopperChoice=$(this).text();
        woowMsg.shopper_choice(shopperChoice);

        globalwoow.bargainId = localStorage.getItem('bargainId');
        globalwoow.bargainVId = localStorage.getItem('bargainVId');
        globalwoow.bargainPrice = localStorage.getItem('bargainPrice');
        console.log(globalwoow.bargainId);
        console.log(globalwoow.bargainPrice);
        console.log(globalwoow.bargainVId);

        globalwoow.bargainStep = 'add_to_cart';
        localStorage.setItem("bargainStep",  globalwoow.bargainStep);
        woowTree.bargain();

    });
	
	
    
    $(document).on('click','.qcld-modal-bargin-bot-confirm-exit-intent',function (e) {
        e.preventDefault();
        var shopperChoice=$(this).text();
        woowMsg.shopper_choice(shopperChoice);

        var actionType=$(this).attr('confirm-data');
        if(actionType=='yes'){
            $('.woo_minimum_accept_price-bargin').click();
        }
    });
	
	$(document).on('click','.qcld-chatbot-custom-intent',function (e) {
		var shopperChoice=$(this).attr('data-text');
		$('#woo-chatbot-editor').val(shopperChoice);
		$('#woo-chatbot-send-message').trigger( "click" );
	});
	
    /*
     * WoowBot Plugin Creation without selector and
     * woowbot and shoppers all activities will be handled.
     */
    $.woowbot = function(options) {

        //Using plugins defualts values or overwrite by options.
        var settings = $.extend({}, $.woowbot.defaults, options);
        //Updating global settings
        globalwoow.settings=settings;
        //updating the helpkeywords
        globalwoow.wildcardsHelp=[globalwoow.settings.obj.sys_key_help.toLowerCase(),globalwoow.settings.obj.sys_key_product.toLowerCase(),globalwoow.settings.obj.sys_key_catalog.toLowerCase(),globalwoow.settings.obj.sys_key_support.toLowerCase(),globalwoow.settings.obj.email_subscription.toLowerCase(),globalwoow.settings.obj.sys_key_order.toLowerCase(),globalwoow.settings.obj.sys_key_reset.toLowerCase(), globalwoow.settings.obj.unsubscribe.toLowerCase() , globalwoow.settings.obj.sys_key_livechat.toLowerCase()]
        //updating wildcards
        globalwoow.wildcards='';
		
		
		if(globalwoow.settings.obj.disable_livechat=="" && globalwoow.settings.obj.is_livechat_active==1) {
			
			if(globalwoow.settings.obj.disable_livechat_operator_offline==1){
				if(globalwoow.settings.obj.is_operator_online==1){
					globalwoow.wildcards += '<span class="qcld-chatbot-custom-intent" data-text="'+globalwoow.settings.obj.sys_key_livechat+'" >'+(globalwoow.settings.obj.livechat_label)+'</span>';
				}
			}else{						
				globalwoow.wildcards += '<span class="qcld-chatbot-custom-intent" data-text="'+globalwoow.settings.obj.sys_key_livechat+'" >'+(globalwoow.settings.obj.livechat_label)+'</span>';
			}
			
		}
		
		
        if(globalwoow.settings.obj.livechat=='1') {
            globalwoow.wildcards += '<span class="qcld-chatbot-wildcard woobo_live_chat" >'+globalwoow.settings.obj.livechat_button_label+'</span>';
        }
        if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.settings.obj.custom_search_enable==1) {
            $.each(globalwoow.settings.obj.custom_intent_labels, function (i, obj) {
                globalwoow.wildcards += '<span class="qcld-chatbot-wildcard"  data-wildcart="tag-search" data-intent-key="'+globalwoow.settings.obj.custom_intent_kewords[i]+'" >'+obj+'</span>';
            });
        }


		


        if(globalwoow.settings.obj.disable_product_search!=1) {
            globalwoow.wildcards += '<span class="qcld-chatbot-wildcard"  data-wildcart="product">' + woowKits.randomMsg(globalwoow.settings.obj.wildcard_product) + '</span>';
        }
        if(globalwoow.settings.obj.disable_catalog!=1) {
            globalwoow.wildcards += '<span class="qcld-chatbot-wildcard"  data-wildcart="catalog">' + woowKits.randomMsg(globalwoow.settings.obj.wildcard_catalog) + '</span>';
        }
        if(globalwoow.settings.obj.disable_featured_product!=1){
            globalwoow.wildcards+='<span class="qcld-chatbot-wildcard"  data-wildcart="featured">'+woowKits.randomMsg(globalwoow.settings.obj.featured_products)+'</span>';
        }

        if(globalwoow.settings.obj.disable_sale_product!=1){
            globalwoow.wildcards+='<span class="qcld-chatbot-wildcard"  data-wildcart="sale">'+woowKits.randomMsg(globalwoow.settings.obj.sale_products)+' </span>';
        }
        if(globalwoow.settings.obj.disable_support!=1) {
            globalwoow.wildcards += '<span class="qcld-chatbot-wildcard"  data-wildcart="support">' + woowKits.randomMsg(globalwoow.settings.obj.wildcard_support) + '</span>';
        }

        if(globalwoow.settings.obj.disable_order_status!=1){
            globalwoow.wildcards+='<span class="qcld-chatbot-wildcard"  data-wildcart="order">'+woowKits.randomMsg(globalwoow.settings.obj.wildcard_order)+'</span>';
        }
        if(globalwoow.settings.obj.enable_messenger==1) {
            globalwoow.wildcards += '<span class="qcld-chatbot-wildcard"  data-wildcart="messenger">'+woowKits.randomMsg(globalwoow.settings.obj.messenger_label)+'</span>';
        }
        if(globalwoow.settings.obj.enable_whats==1) {
            globalwoow.wildcards += '<span class="qcld-chatbot-wildcard"  data-wildcart="whatsapp">'+woowKits.randomMsg(globalwoow.settings.obj.whats_label)+'</span>';
        }
        if(globalwoow.settings.obj.disable_feedback=='') {
            globalwoow.wildcards += '<span class="qcld-chatbot-suggest-email">'+woowKits.randomMsg(globalwoow.settings.obj.feedback_label)+'</span>';
        }
        if(globalwoow.settings.obj.call_gen=="") {
            globalwoow.wildcards += '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
        }
		if(globalwoow.settings.obj.disable_email_subscription=="") {
			globalwoow.wildcards += '<span class="qcld-chatbot-default woobd_subscription">' + globalwoow.settings.obj.email_subscription + '</span>';
		}

        //Initialize the woowBot with greeting and if already initialize and given name then return greeting..
        if(localStorage.getItem("woowHitory") && globalwoow.initialize==0 ){
            var woowHistory=localStorage.getItem("woowHitory");
            $(globalwoow.settings.messageWrapper).html(woowHistory);
            //Scroll to the last element.
            woowKits.scrollTo();
            //Now mainting the current stages tokens
            globalwoow.initialize = 1;
            if(localStorage.getItem("wildCard")){
                globalwoow.wildCard=localStorage.getItem("wildCard");
            }
            if(localStorage.getItem("productStep")){
                globalwoow.productStep=localStorage.getItem("productStep");
            }
            if(localStorage.getItem("orderStep")){
                globalwoow.orderStep=localStorage.getItem("orderStep");
            }
            if(localStorage.getItem("supportStep")){
                globalwoow.supportStep=localStorage.getItem("supportStep");
            }
            if(localStorage.getItem("aiStep")){
                globalwoow.ai_step=localStorage.getItem("aiStep");
            }
            //update the value for initializing.
            globalwoow.initialize=1;
			

        } else {
			if(globalwoow.wildCard == 9){
				woowTree.bargain();
			}else if(globalwoow.initialize==0 && globalwoow.wildCard==0 && globalwoow.settings.obj.re_target_handler==0){
                woowWelcome.greeting();
                //update the value for initializing.
                globalwoow.initialize=1;
            }else if(globalwoow.initialize==0 && globalwoow.wildCard==0 && globalwoow.settings.obj.re_target_handler==9){
               // woowWelcome.greeting();
                //update the value for initializing.
                globalwoow.initialize=1;
            }else{  // re targeting part .
                setTimeout(function (e) {
                    woowWelcome.greeting();
                },8500);
                globalwoow.initialize=1;
            }
        }
        //When shopper click on send button
        $(document).on('click',settings.sendButton,function (e) {
            var shopperMsg =$.trim($(settings.messageEditor).val());
            if(shopperMsg != ""){
                woowAction.shopper(woowKits.htmlTagsScape(shopperMsg));
                $(settings.messageEditor).val('');
            }
        });

		
		
        /*
         * Or when shopper press the ENTER key
         * Then chatting functionality will be started.
         */
        $(document).on('keypress',settings.messageEditor,function (e) {
            if (e.which == 13||e.keyCode==13) {
                e.preventDefault();
                var shopperMsg =$.trim($(settings.messageEditor).val());
                if(shopperMsg != ""){
                    woowAction.shopper(woowKits.htmlTagsScape(shopperMsg));
                    $(settings.messageEditor).val('');
                }
            }
        });
        //Click on the wildcards to select a service
        $(document).on('click','.qcld-chatbot-wildcard',function(){
            var wildcardData=$(this).attr('data-wildcart');
            var shooperChoice=$(this).text();
            woowMsg.shopper_choice(shooperChoice);
            //Wild cards handling for bot.
            if(wildcardData=='product'){
                globalwoow.wildCard=1;
                globalwoow.productStep='asking'
                woowAction.bot('from wildcard product');
                //keeping value in localstorage
                localStorage.setItem("wildCard",  globalwoow.wildCard);
                localStorage.setItem("productStep", globalwoow.productStep);
            }
            if(wildcardData=='catalog'){
                woowAction.bot(globalwoow.settings.obj.sys_key_catalog.toLowerCase());
            }
            if(wildcardData=='featured'){
                globalwoow.wildCard=1;
                globalwoow.productStep='featured'
                woowAction.bot('from wildcard product');
                //keeping value in localstorage
                localStorage.setItem("wildCard",  globalwoow.wildCard);
                localStorage.setItem("productStep", globalwoow.productStep);
            }
            if(wildcardData=='sale'){
                globalwoow.wildCard=1;
                globalwoow.productStep='sale'
                woowAction.bot('from wildcard product');
                //keeping value in localstorage
                localStorage.setItem("wildCard",  globalwoow.wildCard);
                localStorage.setItem("productStep", globalwoow.productStep);
            }
            if(wildcardData=='order'){
                globalwoow.wildCard=2;
                globalwoow.orderStep='welcome';
                woowAction.bot('from wildcard order');
                //keeping value in localstorage
                localStorage.setItem("wildCard",  globalwoow.wildCard);
                localStorage.setItem("orderStep", globalwoow.orderStep);
            }
            if(wildcardData=='support'){
                globalwoow.wildCard=3;
                globalwoow.supportStep='welcome';
                woowAction.bot('from wildcard support');
                //keeping value in localstorage
                localStorage.setItem("wildCard",  globalwoow.wildCard);
                localStorage.setItem("supportStep", globalwoow.supportStep);

            }
            if(wildcardData=='back'){
                globalwoow.wildCard=0;
                woowAction.bot('start');
                //keeping value in localstorage
                localStorage.setItem("wildCard",  globalwoow.wildCard);
            }

            if(wildcardData=='messenger'){
                var url='https://www.messenger.com/t/'+globalwoow.settings.obj.fb_page_id;
                var win = window.open(url, '_blank');
                win.focus();
            }
            if(wildcardData=='whatsapp'){
                var url='https://api.whatsapp.com/send?phone='+globalwoow.settings.obj.whats_num;
                var win = window.open(url, '_blank');
                win.focus();
            }
            if(wildcardData=='tag-search'){
                woowAction.bot($(this).attr('data-intent-key'));
            }

        });
        //
        $(document).on('click','.qcld-chatbot-product-category',function(){
            var catType=$(this).attr('data-category-type');
            var shopperChoiceCatId=$(this).text()+'#'+$(this).attr('data-category-id');
            var shopperChoiceCategory=$(this).text();
            if(catType=='hasChilds'){
                //Now hide all categories but shopper choice.
                woowMsg.shopper_choice(shopperChoiceCategory);
                //updating the product steps and bringing the product by category.
                woowKits.subCats($(this).attr('data-category-id'));
                globalwoow.productStep='search';
                globalwoow.wildCard=1;
            }else{
                //Now hide all categories but shopper choice.
                woowMsg.shopper_choice(shopperChoiceCategory);
                //updating the product steps and bringing the product by category.
                globalwoow.productStep='category';
                globalwoow.wildCard=1;
                //keeping value in localstorage
                localStorage.setItem("productStep",  globalwoow.productStep);
                woowAction.bot(shopperChoiceCatId);
            }

        });
        //Product Load More features for product search or category products
        $(document).on('click','#woo-chatbot-loadmore',function (e) {
            $('#woo-chatbot-loadmore-loader').html('<img class="woo-chatbot-comment-loader" src="'+globalwoow.settings.obj.image_path+'loadmore.gif" alt="..." />');
            var loadMoreDom=$(this);
            var productOffest=loadMoreDom.attr('data-offset');
            var searchType=loadMoreDom.attr('data-search-type');
            var searchTerm=loadMoreDom.attr('data-search-term');
            var data = { 'action': 'qcld_woo_chatbot_load_more','offset': productOffest,'search_type': searchType,'search_term': searchTerm};
            //Load more ajax handler.
            woowKits.ajax(data).done(function (response) {
                //Change button text
                $('#woo-chatbot-loadmore-loader').html('');
                $('.woo-chatbot-products').append(response.html);
                loadMoreDom.attr('data-search-term',response.search_term);
                woowKits.woowHistorySave();
                loadMoreDom.attr('data-offset',response.offset);
                if(response.product_num <= response.per_page){
                    loadMoreDom.hide();
                    //Now show the user infinite.
                    setTimeout(function () {
                        var searchAgain = woowKits.randomMsg(globalwoow.settings.obj.product_infinite);
                        woowMsg.single(searchAgain);
                        globalwoow.productStep='search';
                        //keeping value in localstorage
                        localStorage.setItem("productStep",  globalwoow.productStep);
                    },globalwoow.settings.wildcardsShowTime);

                }
                //scroll to the last message
                woowKits.scrollTo();
            });
        });
        /*Products details part **/
        if(globalwoow.settings.obj.open_product_detail!=1){
            $(document).on('click','.woo-chatbot-product a',function (e) {
                e.preventDefault();
                $('.woo-chatbot-product-container').addClass('active-chatbot-product-details');
                $('.woo-chatbot-product-reload').addClass('woo-chatbot-product-loading').html('<img class="woo-chatbot-product-loader" src="'+globalwoow.settings.obj.image_path+'comment.gif" alt="Loading..." />');
                var productId=$(this).attr('woo-chatbot-pid');
                var data = { 'action':'qcld_woo_chatbot_product_details', 'woo_chatbot_pid':productId};
                //product details ajax handler.
                woowKits.ajax(data).done(function (response) {
                    console.log(response);
                    $('.woo-chatbot-product-reload').removeClass('woo-chatbot-product-loading').html('');
                    $('#woo-chatbot-product-title').html(response.title);
                    $('#woo-chatbot-product-description').html(response.description);
                    $('#woo-chatbot-product-image').html(response.image);
                    $('#woo-chatbot-product-price').html(response.price);
                    if(globalwoow.settings.obj.hide_add_to_cart==""){
                        $('#woo-chatbot-product-quantity').html(response.quantity);
                        $('#woo-chatbot-product-variable').html(response.variation);
                        $('#woo-chatbot-product-cart-button').html(response.buttton);
                    }

                    //Load gallery magnify
                    setTimeout(function () {
                        $('#woo-chatbot-product-image-large-path').magnificPopup({type:'image'});
                    },1000);

                    //For shortcode handle recenlty view product by ajax as
                    if($('#woo-chatbot-shortcode-template-container').length > 0){
                        var data = {'action':'qcld_woo_chatbot_recently_viewed_products'};
                        woowKits.ajax(data).done(function (response) {
                            $('.woo-chatbot-product-shortcode-container').html(response);
                            $('.chatbot-sidebar .woo-chatbot-products').slimScroll({height: '435px', start: 'top'});
                        });
                    }
                });

            });
        }
        //Image gallery.
        $(document).on('click','.woo-chatbot-product-image-thumbs-path',function (e) {
            e.preventDefault();
            var imagePath=$(this).attr('href');
            $('#woo-chatbot-product-image-large-path').attr('href',imagePath);
            $('#woo-chatbot-product-image-large-src').attr('src',imagePath);
            //handle thumb active one
            $('.woo-chatbot-product-image-thumbs-path').parent().removeClass('woo-chatbot-product-active-image-thumbs');
            $(this).parent().addClass('woo-chatbot-product-active-image-thumbs');
        });
        //Product details close
        $(document).on('click', '.woo-chatbot-product-close', function (e) {
            $('.woo-chatbot-product-container').removeClass('active-chatbot-product-details');
        });
        $(document).on('click', '.woo-chatbot-card-button', function (e) {
            var PostBack=$(this).attr('card-target');
            woowAction.bot(PostBack);
        });
        /*add to cart part **/
        $(document).on("click","#woo-chatbot-add-cart-button",function (e) {
            var pId=$(this).attr('woo-chatbot-product-id');
            var qnty=$("#vPQuantity").val();
            var data = {'action': 'qcld_woo_chatbot_add_to_cart','product_id': pId,'quantity': qnty };
            //add to cart ajax handler.
            woowKits.ajax(data).done(function (response) {
                //Change button text
                if(response=="simple"){
                    //Showing cart.
                    //woowKits.showCart();
					 woowKits.addToCart(); // added by Raju, QC.  no need to show cart
                    //handle the active tab on chat board.
                    $('.woo-chatbot-operation-option').each(function(){
                        if($(this).attr('data-option')=='cart'){
                            $(this).parent().addClass('woo-chatbot-operation-active');
                        }else{
                            $(this).parent().removeClass('woo-chatbot-operation-active');
                        }
                    });
                }
                //Hide the shortcode and chat ui product details.
                $('.woo-chatbot-product-container').removeClass('active-chatbot-product-details');
            });
        });
        //Add to cart operation for variable product.
        $(document).on('click','#woo-chatbot-variation-add-to-cart',function(event) {
            event.preventDefault();

            var pId=$(this).attr('woo-chatbot-product-id');
            var quanity=$('#vPQuantity').val();
            var variation_id=$(this).attr('variation_id');
            var attributes=new Array();
            $.each($("#woo-chatbot-variation-data select"), function(){
                var attribute = $(this).attr('name')+'#'+ $(this).find('option:selected').text();
                attributes.push(attribute);
            });
            var data = {
                'action': 'variable_add_to_cart',
                'p_id': pId,
                'quantity': quanity,
                'variations_id':variation_id,
                'attributes':attributes
            };
            //add to cart ajax handler.
            woowKits.ajax(data).done(function (response) {
                //Change button text
                if(response=="variable"){
                    //Showing cart.
                   // woowKits.showCart();
				   woowKits.addToCart(); // added by Raju, QC.  no need to show cart
                    //handle the active tab on chat board.
                    //handle the active tab on chat board.
                    $('.woo-chatbot-operation-option').each(function(){
                        if($(this).attr('data-option')=='cart'){
                            $(this).parent().addClass('woo-chatbot-operation-active');
                        }else{
                            $(this).parent().removeClass('woo-chatbot-operation-active');
                        }
                    });
                }
                //Hide the shortcode and chat ui product details.
                $('.woo-chatbot-product-container').removeClass('active-chatbot-product-details');
            });
        });
        //Update cart.
        $(document).on("change", ".qcld-woo-chatbot-cart-item-qnty", function () {
            //Update editor only for chat ui
            if($('#woo-chatbot-shortcode-template-container').length == 0) {
                woowKits.disableEditor(woowKits.randomMsg(globalwoow.settings.obj.cart_updating));
            }
            var currentItem=$(this);
            setTimeout(function () {
                var item_key=currentItem.attr('data-cart-item');
                var qnty=currentItem.val();
                var data = {'action': 'qcld_woo_chatbot_update_cart_item_number','cart_item_key':item_key,'qnty':qnty};
                woowKits.ajax(data).done(function () {
                    //Showing cart.
                    woowKits.showCart();
                });
            }, globalwoow.settings.preLoadingTime);
        });
        //remove the cart item from global cart.
        $(document).on("click", ".woo-chatbot-remove-cart-item", function () {
            //Update editor only for chat ui
            if($('#woo-chatbot-shortcode-template-container').length == 0) {
                woowKits.disableEditor(woowKits.randomMsg(globalwoow.settings.obj.cart_removing));
            }
            var item=$(this).attr('data-cart-item');
            var data = {'action': 'qcld_woo_chatbot_cart_item_remove', 'cart_item':item };
            woowKits.ajax(data).done(function () {
                //Showing cart.
                woowKits.showCart();
            })
        });

        /*Support query answering.. **/
        $(document).on('click','.qcld-chatbot-support-items',function (e) {
            var shopperChoose=$(this).text();
            var queryIndex=$(this).attr('data-query-index');
            woowMsg.shopper_choice(shopperChoose);
            //Now answering the query.
            var queryAns=globalwoow.settings.obj.support_ans[queryIndex];
            woowMsg.single(queryAns);
            //Asking email after showing answer.
            var orPhoneSuggest='';
            setTimeout(function(){
                if(globalwoow.settings.obj.call_sup!=1) {
                    orPhoneSuggest = '<span class="qcld-chatbot-suggest-phone" >' + woowKits.randomMsg(globalwoow.settings.obj.support_phone) + '</span>';
                }
                var orEmailSuggest='<span class="qcld-chatbot-suggest-email">'+woowKits.randomMsg(globalwoow.settings.obj.support_email)+'</span>';
                woowKits.suggestEmail(orPhoneSuggest+orEmailSuggest);
            },globalwoow.settings.wildcardsShowTime);
        });
        /*Support Email **/
        $(document).on('click','.qcld-chatbot-suggest-email',function (e) {
            var shopperChoice=$(this).text();
            woowMsg.shopper_choice(shopperChoice);
            //Then ask email address
            if(typeof(globalwoow.hasNameCookie)=='undefined'|| globalwoow.hasNameCookie==''){
                var shopperName=  globalwoow.settings.obj.shopper_demo_name;
            }else{
                var shopperName=globalwoow.hasNameCookie;
            }
            var askEmail=globalwoow.settings.obj.hello+''+shopperName+'! '+ woowKits.randomMsg(globalwoow.settings.obj.asking_email);
            woowMsg.single(askEmail);
            //Now updating the support part as .
            globalwoow.supportStep='email';
            globalwoow.wildCard=3;
            //keeping value in localstorage
            localStorage.setItem("wildCard",  globalwoow.wildCard);
            localStorage.setItem("supportStep",  globalwoow.supportStep);

        });
        /*Support Phone **/
        $(document).on('click','.qcld-chatbot-suggest-phone',function (e) {
            var shopperChoice=$(this).text();
            woowMsg.shopper_choice(shopperChoice);
            //Then ask email address
            if(typeof(globalwoow.hasNameCookie)=='undefined'|| globalwoow.hasNameCookie==''){
                var shopperName=  globalwoow.settings.obj.shopper_demo_name;
            }else{
                var shopperName=globalwoow.hasNameCookie;
            }
            var askEmail=globalwoow.settings.obj.hello+' '+shopperName+'! '+ woowKits.randomMsg(globalwoow.settings.obj.asking_phone);
            woowMsg.single(askEmail);
            //Now updating the support part as .
            globalwoow.supportStep='phone';
            globalwoow.wildCard=3;
            //keeping value in localstorage
            localStorage.setItem("wildCard",  globalwoow.wildCard);
            localStorage.setItem("supportStep",  globalwoow.supportStep);

        });
        
		//email subscription
		
		$(document).on('click','.woobd_subscription',function (e) {
			 var shopperChoice=$(this).text();
			 woowMsg.shopper_choice(shopperChoice);
			globalwoow.wildCard=6;
			globalwoow.subscriptionStep='welcome';
			woowTree.subscription(shopperChoice);

        });
		
		
		$(document).on('click','.qcld_subscribe_confirm',function (e) {
            e.preventDefault();
            var actionType=$(this).attr('subscription');
            if(actionType=='yes'){
				globalwoow.wildCard=6;
				globalwoow.subscriptionStep = 'getname';
				woowTree.subscription();
            } else if(actionType=='no'){
                woowAction.bot(globalwoow.settings.obj.sys_key_help.toLowerCase());
            }
        });
		
		$(document).on('click','.qcld_unsubscribe_confirm',function (e) {
			
            e.preventDefault();
            var actionType=$(this).attr('unsubscription');
			
            if(actionType=='yes'){
				
				globalwoow.wildCard=8;
				globalwoow.unsubscriptionStep = 'getemail';
				woowTree.unsubscription();
            } else if(actionType=='no'){
                woowAction.bot(globalwoow.settings.obj.sys_key_help.toLowerCase());
            }
        });

        $(document).on('click','.qcld_unsubscribe_again',function (e) {
            e.preventDefault();
            
            globalwoow.wildCard=8;
            globalwoow.unsubscriptionStep = 'getemail';
            woowTree.unsubscription();
            
        });
		
		
		/**
         * Live chat
         */
        $(document).on('click','.woobo_live_chat',function (e) {
            e.preventDefault();
            woowKits.woowOpenWindow(globalwoow.settings.obj.livechatlink,'Testing', 400, 600);
        });
        $(document).on('click','#woobot_live_chat_floating_btn',function (e) {
            e.preventDefault();

			if(globalwoow.settings.obj.is_livechat_active){
                $('#woo-chatbot-editor').val(globalwoow.settings.obj.sys_key_livechat);
			    $('#woo-chatbot-send-message').trigger( "click" );
            }else{
                woowKits.woowOpenWindow(globalwoow.settings.obj.livechatlink,'Testing', 400, 600);
            }
			
        });
        //Show chat,cart and recently view products by click event.
        $(document).on('click','.woo-chatbot-operation-option',function (e) {
            e.preventDefault();
            var oppt=$(this).attr('data-option');
            if(oppt=='recent'  && globalwoow.woowIsWorking==0){
                woowKits.disableEditor(globalwoow.settings.obj.sys_key_product);
                var data = {'action':'qcld_woo_chatbot_recently_viewed_products'};
                woowKits.ajax(data).done(function (response) {
                    $(globalwoow.settings.messageWrapper).html(response);
                });
                //First remove woo-chatbot-operation-active class from all selector
                $('.woo-chatbot-operation-option').parent().removeClass('woo-chatbot-operation-active');
                //then add the active class to current element.
                $(this).parent().addClass('woo-chatbot-operation-active');
            }else if(oppt=='chat' && globalwoow.woowIsWorking==0){
                $(globalwoow.settings.messageWrapper).html(localStorage.getItem("woowHitory"));
                woowKits.scrollTo();
                woowKits.enableEditor(woowKits.randomMsg(globalwoow.settings.obj.send_a_msg));
                //First remove woo-chatbot-operation-active class from all selector
                $('.woo-chatbot-operation-option').parent().removeClass('woo-chatbot-operation-active');
                //then add the active class to current element.
                $(this).parent().addClass('woo-chatbot-operation-active');
            } else if(oppt=='cart' && globalwoow.woowIsWorking==0){
                woowKits.showCart();
                //First remove woo-chatbot-operation-active class from all selector
                $('.woo-chatbot-operation-option').parent().removeClass('woo-chatbot-operation-active');
                //then add the active class to current element.
                $(this).parent().addClass('woo-chatbot-operation-active');
            } else if(oppt=='help' && globalwoow.woowIsWorking==0){
                if( $('.woo-chatbot-messages-container').length==0) {
                    //if from other nob then goo to the chat window
                    $(globalwoow.settings.messageWrapper).html(localStorage.getItem("woowHitory"));
                    //Showing help message
                    setTimeout(function () {
                        woowKits.scrollTo();
                        var helpWelcome = woowKits.randomMsg(globalwoow.settings.obj.help_welcome);
                        var helpMsg = woowKits.randomMsg(globalwoow.settings.obj.help_msg);
                        woowMsg.double(helpWelcome,helpMsg);
                        //dialogflow
                        if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                            globalwoow.wildCard=0;
                            globalwoow.ai_step=1;
                            localStorage.setItem("wildCard",  globalwoow.wildCard);
                            localStorage.setItem("aiStep", globalwoow.ai_step);
                        }
                    },globalwoow.settings.preLoadingTime);
                }else{
                    //Showing help message on chat self window.
                    var helpWelcome = woowKits.randomMsg(globalwoow.settings.obj.help_welcome);
                    var helpMsg = woowKits.randomMsg(globalwoow.settings.obj.help_msg);
                    woowMsg.double(helpWelcome,helpMsg);
                    //dialogflow
                    if(globalwoow.settings.obj.ai_df_enable==1 && globalwoow.df_status_lock==0){
                        globalwoow.wildCard=0;
                        globalwoow.ai_step=1;
                        localStorage.setItem("wildCard",  globalwoow.wildCard);
                        localStorage.setItem("aiStep", globalwoow.ai_step);
                    }
                }
                //First remove woo-chatbot-operation-active class from all selector
                $('.woo-chatbot-operation-option').parent().removeClass('woo-chatbot-operation-active');
                //then add the active class to current element.
                $(this).parent().addClass('woo-chatbot-operation-active');

            } else if(oppt=='support' && globalwoow.woowIsWorking==0){
                if( $('.woo-chatbot-messages-container').length==0) {
                    //if from other nob then goo to the chat window
                    $(globalwoow.settings.messageWrapper).html(localStorage.getItem("woowHitory"));
                    //Showing help message
                    setTimeout(function () {
                        woowKits.scrollTo();
                        globalwoow.wildCard=3;
                        globalwoow.supportStep='welcome';
                        woowTree.support(globalwoow.settings.obj.sys_key_support.toLowerCase());
                    },globalwoow.settings.preLoadingTime);
                }else{
                    //Showing help message on chat self window.
                    globalwoow.wildCard=3;
                    globalwoow.supportStep='welcome';
                    woowTree.support(globalwoow.settings.obj.sys_key_support.toLowerCase());
                }

                //First remove woo-chatbot-operation-active class from all selector
                $('.woo-chatbot-operation-option').parent().removeClass('woo-chatbot-operation-active');
                //then add the active class to current element.
                $(this).parent().addClass('woo-chatbot-operation-active');
            }else if(oppt=='live-chat' && globalwoow.woowIsWorking==0){
				jQuery('.woo-saas-live-chat').height(jQuery('#woo-chatbot-board-container').height());
				jQuery('.wbcaBody').height((jQuery('#woo-chatbot-board-container').height()-35));
				jQuery('#wbca_chat_body').height((jQuery('#woo-chatbot-board-container').height()-85));

				if($('#wbca_signup_fullname').length>0){
					if(localStorage.getItem('shopperw')!==null){
						$('#wbca_signup_fullname').val(localStorage.getItem('shopperw'));
					}
					if(localStorage.getItem('shopperemail')!==null){
						$('#wbca_signup_email').val(localStorage.getItem('shopperemail'));
					}
				}
				$("#woo-chatbot-board-container").removeClass('active-chat-board');
				$('.woo-chatbot-container').hide();
				$('.woo-saas-live-chat').show();
			}
            //show chat wrapper and hide cart-checkout wrapper
            $(globalwoow.settings.messageWrapper).show();
            $('#woo-chatbot-checkout-short-code').hide();
            $('#woo-chatbot-cart-short-code').hide();


        });
        $(document).on('click','.qcld-chatbot-reset-btn',function (e) {
            e.preventDefault();
            var shopperChoice=$(this).text();
            woowMsg.shopper_choice(shopperChoice);
            var actionType=$(this).attr('reset-data');
            if(actionType=='yes'){
                $('#woo-chatbot-messages-container').html('');
                localStorage.removeItem('shopperw');
                globalwoow.wildCard=0;
                globalwoow.ai_step=0;
                globalwoow.sbs_search_flag=0;
                localStorage.setItem("wildCard",  globalwoow.wildCard);
                localStorage.setItem("aiStep", globalwoow.ai_step);
                woowWelcome.greeting();
            } else if(actionType=='no'){
                woowAction.bot(globalwoow.settings.obj.sys_key_help.toLowerCase());
            }
        });
        return this;
    };
    //Deafault value for woowbot.If nothing passes from the work station
    //Then defaults value will be used.
    $.woowbot.defaults={
        obj:{},
        editor_handler:0,
        sendButton:'#woo-chatbot-send-message',
        messageEditor:'#woo-chatbot-editor',
        messageContainer:'#woo-chatbot-messages-container',
        messageWrapper:'.woo-chatbot-messages-wrapper',
        botContainer:'.woo-chatbot-ball-inner',
        messageLastChild:'#woo-chatbot-messages-container li:last',
        messageLastBot:'#woo-chatbot-messages-container .woo-chatbot-msg:last .woo-chatbot-paragraph',
        preLoadingTime:2000,
        wildcardsShowTime:5000,
    }

})(jQuery);