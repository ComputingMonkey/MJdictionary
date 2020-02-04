function debug(){
  var aaa = getColLastRow(3);
  //Logger.log(aaa);
}

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();
var lRow = sheet.getLastRow();
var lCol = sheet.getLastColumn();

var dicData = {};
for(var i = 2; i <= lRow ; i++){
  dicData[sheet.getRange(i,1).getValue()] = sheet.getRange(i,2).getValue();
}

function getColLastRow(column){
  //var column = 3;
  var range = sheet.getRange(1,column,lRow).getValues();
  Logger.log(range);
  for(i = 0;i <= lRow;i++){
    if(range[i][0] == ''){
      Logger.log(i);
      return i;
    }
  }
}
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
/*
function getColLastRow(column) {
  // シート全体の最終行を取得
  var lastRowAll = sheet.getLastRow();
  // 取得したい列を指定 A列=>1, B列=>2,・・・

  // 指定した列の最終行を取得
  var last_row = lastRow(lastRowAll, column);
  //Logger.log(last_row);
  return last_row;
}

function lastRow(lastRowAll, column) {
  var range = sheet.getRange(1, column, lastRowAll).getValues();
  for(var i=1; i <= lastRowAll; i++){
    if(range[i][0] != ""){
      return i + 1;
    }
  }
}
*/
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function getList(){
  var list = sheet.getRange(2,1,lRow - 1,2).getValues();
  //Logger.log(list);
  var mes;
  var array = [];
  for(var i = 0; i < list.length; i++){
    mes = '\n' + list[i][0] + ':\n' + list[i][1];
    //Logger.log(mes);
    array.push(mes);
  }
  var message;
  for(var i = 0; i < array.length; i++){
    message += array[i];
  }
  Logger.log(message);
  //Logger.log(array);
  return message;
}

function getDefinition(word){
  //Logger.log(lRow);

  var definiton = dicData[word];
  /*
  for(var key in dicData){
    Logger.log(key + ':' + dicData[key]);
  }
  */
  return definiton;
}


//ーーーーーーーーーーーーーーーーーーーーーーーーーースニペットーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

//#シート、キーワード:キーワードの列;1列目の特定のキーワードがある列を取得
function getKeyCol(sheet,key) {
  //タイトルの配列を取得
  var titles = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues();
  //タイトルがある列を検索
  var key_col = titles[0].indexOf(key) + 1;
  //列の番号を返す
  return key_col;
}
