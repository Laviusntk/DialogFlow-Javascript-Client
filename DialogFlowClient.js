var DIALOGFLOW_BASE_URL = "https://api.dialogflow.com/v1/query?v=20150910";
var DIALOGFLOW_CLIENT_TOKEN = "xxxxxxxxxxxxxxx";
var DIALOGFLOW_SESSION_ID = "xxxxxxxxxxxxxx";

//----------------------------------- Request handler-----------------
function request(_url, _payload, _callback, _auth){
  $.ajax({
    type: "POST",
    url: _url,
    data:JSON.stringify(_payload),
    headers: {
      'Authorization': DIALOGFLOW_CLIENT_TOKEN,
      'Content-Type': 'application/json',
     }
  })
  .done(function(data){
    _callback(data);
  })
  .fail(function(data){
    _callback(data);
  });
}

//----------------------------------display the response from Dialogflow to the user-------------------------------
var sendMessageCallback = function(_response_data){
    var responseMessage = _response_data.result.fulfillment.speech;

    //display message
    window.setTimeout(displayMessage, 2000,responseMessage );

    //read the message out loud
    Speech(responseMessage);
}

function  displayMessage(_BotResponse){
  //write your message display code here
}
//send the user's response to Dialogflow, analyse it and get back the response
function sendMessage(_message){

  var sndData = {
    "contexts": [
      "shop"
    ],
    "lang": "en",
    "query": _message,
    "sessionId": DIALOGFLOW_SESSION_ID,
    "timezone": "America/New_York"
    };

  request(
    DIALOGFLOW_BASE_URL,
    sndData,
    sendMessageCallback,
    DIALOGFLOW_CLIENT_TOKEN
  );
}


//-------canvert the given text 'say' to speech and speeck it out-----------------------------------
function Speech(say) {
  if(audio_is_on){
    VoiceRSS.speech({
      key: 'adff6001e26449b6b5596982a2e3ae86',
      src: say,
      hl: 'en-us',
      r: 1,
      c: 'mp3',
      f: 'ulaw_44khz_stereo',
      ssml: false
    });
  }
}
