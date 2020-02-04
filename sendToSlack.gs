// Legacy tokenをSLACK_TOKENに格納します。
var SLACK_TOKEN = "xoxp-139567565152-680949140533-859343407392-c0687b83037ecfae9276e325026511ca";
// Outgoing Webhooks設定画面で表示されるTokenをWEBHOOK_TOKENに格納します。
var WEBHOOK_TOKEN = "sZgyynGNzYIqQqvM551BkfXh";
function test(){
  var aa = getDefinition('LCP');
  Logger.log(aa);
}

// doPost関数はエンドポイントにPOSTで届いた情報をキャッチする関数のことです(GASのデフォルト関数)
function doPost(e) { // eにはPOSTされた投稿情報が格納されています。
  // 注意：下記if文は無限ループを回避する為のものです。e.parameter.user_nameが"slackbot"以外の時のみ次の処理を行います。
  // outgoing webhooksの設定でトリガーを指定していない場合、slackAPPからslackに行う投稿(後述)もGASにPOSTされてしまいます。
  // その投稿情報のe.parameter.user_nameは必ず"slackbot"になります。その為、user_nameが"slackbot"じゃない時のみ処理します。
  // ※SlackAppでSlackに投稿する際、投稿するユーザー名を自由に決められる(後述)ので、parameter.user_nameも指定したユーザー名になるかと思いきや、必ず"slackbot"という値になリます。
  // トリガーを設定しない場合は必ず設定してください。
  var userText = e.parameter.text;
  var definition = getDefinition(userText);
  if (e.parameter.user_name != "slackbot"){
    postMessage(e.parameter.token, e.parameter.channel_name, definition);
  }
  /*
  if (e.parameter.user_name != "slackbot"){
    var userText = e.parameter.text;
    var difinition = getDifinition(userText);
    postMessage(e.parameter.token, e.parameter.channel_name, userText);
  }
  */
}

//Post massage(Slackに投稿する関数)
var postMessage = function(webhook_token,channel_name, text){
  // POSTされたwebhook_tokenと、設定したOutgoing Webhooksのwebhook_tokenを照合し、異なる場合はエラーを通知します。
  // GASのendpointを知られてしまい、勝手にGASにPOSTされた場合への対処です。
  if (WEBHOOK_TOKEN != webhook_token) {
    throw new Error("invalid token."); //エラーを通知します
  }
  // PropertiesService：https://developers.google.com/apps-script/reference/properties/
  PropertiesService.getScriptProperties().setProperty("token", SLACK_TOKEN);
  var prop =  PropertiesService.getScriptProperties().getProperties();
  // slackAppライブラリを利用してslackに投稿
  var slackApp = SlackApp.create(prop.token);
  slackApp.postMessage("#"+channel_name, text, {
    username : "MJdictionay", // 任意の名前を入力します
    //icon_url : "http://~~~~~~~"
  });
  return null;
}