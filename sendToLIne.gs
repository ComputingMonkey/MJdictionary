//LINE Developersで取得したアクセストークンを入れる
var CHANNEL_ACCESS_TOKEN = 'wAKpjodu9MUG6ZMeVQ+CU7YN7yXnBGTntjcy7hmHBDM9/68q43NZ6X5NR8OhUY6AbEIlEAvViOOC18O90Lu/N5rNo0Cip3BajWxqGWS+NPfAphv3p2Pm4112IMdkbVPsbeu2Ov7t8bmuDY7oaoFJwgdB04t89/1O/w1cDnyilFU='; 
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';
var sheet = SpreadsheetApp.getActiveSheet();
function aaa(){
  getColLastRow(5);
}

//ポストで送られてくるので、送られてきたJSONをパース
function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  
  //返信するためのトークン取得
  var reply_token= json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }

  //送られたメッセージ内容を取得
  //var message = json.events[0].message.text;  
  var userText = json.events[0].message.text.toUpperCase();
  //Logger.log(userText);
  var definition = getDefinition(userText);
  if(definition == undefined){
    var undefLRow = getColLastRow(5) + 1;
    sheet.getRange(undefLRow,5).setValue(userText);
    definition = 'その言葉は辞書の中にありません、\n「アイセック用語集」でゆんみさんの用語集、「単語リスト」でみんなが登録してくれた単語のリストが表示されます\nどんどん単語を登録していただけると助かります(><)\n【登録用フォーム】\nhttps://docs.google.com/forms/d/e/1FAIpQLSdIsG-ELdC0OtcoHdevfaidgWBKUI-xnbhW8KGaEnFyYPiD7Q/viewform\n【データのスプレッドシート】\nhttps://docs.google.com/spreadsheets/d/1gI3YeM9nBnIVvB8jIIYp6kyAvF162Nxv2tiYfyWfa_Y/edit?folder=0AF7KI4H8FByUUk9PVA#gid=2019354538 ';
  }
  
  // メッセージを返信
  //sheet.appendRow([userText]);
  UrlFetchApp.fetch(line_endpoint, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': definition,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}