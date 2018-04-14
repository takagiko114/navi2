// This is a JavaScript file
function initDao(){
    createDB();
}

// ============================================================================================ -->
// _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/ -->
//                　　　　　　　　  　　        　　    　　                                    -->
//                　　　　　　　　   Method section     　　                                    -->
//                　　　　　　　　  　　        　　    　　                                    -->
// _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/ -->
// ============================================================================================ -->

function deleteDB(){
    console.log(getTime() + "deleteDB");
    var db = window.openDatabase("Database", "1.0", "AccountID", 200000);
    db.transaction(deleteDBQuery, errorCB, successCB);
} 

function createDB(){
    console.log(getTime() + "createDB");
    var db = window.openDatabase("Database", "1.0", "AccountID", 200000);
    db.transaction(createDBQuery, errorCB, successCB);
}

function insertDB(){
    console.log(getTime() + "insertDB");
    var db = window.openDatabase("Database", "1.0", "AccountID", 200000);
    db.transaction(insertQuery, errorCB, successCB);
}

function queryDB(tx) {
    console.log(getTime() + "queryDB");
    tx.executeSql('SELECT * FROM AccountID ORDER BY id', [], querySuccess, errorCB);
}

function successCB() {
    console.log(getTime() + "successCB");
    window.alert("success");
    var db = window.openDatabase("Database", "1.0", "AccountID", 200000);
    db.transaction(queryDB, errorCB);
}

function errorCB(err) {
    console.log(getTime() + "errorCB");
    console.log("Error occured while executing SQL: "+err.code);
}

//function querySuccess(tx, results) {
//    console.log(getTime() + " querySuccess");
//    var len = results.rows.length;
///*
//    var ct;
//    var id;
//    var data;
//*/
//    console.log("There are " + len + " rows of records in the database.");
//    /*
//    for (var i=0; i<len; i++){
//        ct = results.rows.item(i).ct;
//        id = results.rows.item(i).id;
//        data = results.rows.item(i).data;
//        addLine(ct, id, data);
//        
//        console.log(ct + " " + id + " " + data);
//    }
//    */    
////    addbutton();
//}

// ============================================================================================ -->
// _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/ -->
//                　　　　　　　　  　　        　　    　　                                    -->
//                　　　　　　　　    Query section     　　                                    -->
//                　　　　　　　　  　　        　　    　　                                    -->
// _/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/ -->
// ============================================================================================ -->

function deleteDBQuery(tx){
    tx.executeSql('DROP TABLE IF EXISTS AccountID');
}

function createDBQuery(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS AccountID' +
                  ' (id integer primary key autoincrement,' +
                  ' site_name text,' + 
                  ' account_name text,' +
                  ' account_id text,' + 
                  ' account_pw text' + 
                  ')');
}

function insertQuery(tx){
    console.log(getTime() + "insertQuery");
    var siteName = document.getElementById("siteName").value;
    var accountName = document.getElementById("accountName").value;
    var accountID = document.getElementById("accountID").value;
    var accountPW = document.getElementById("accountPW").value;
    if(siteName != "" && accountID != "" && accountPW != ""){
//        console.log("id:" + siteName + " / pw:" + sitePW);
        tx.executeSql('INSERT INTO AccountID (site_name, account_name, account_id, account_pw) ' + 
                        'VALUES (?, ?, ?, ?)',
                        [siteName, accountName, accountID, accountPW]);
    } else {
        window.alert("サイト名、ID、PWは必須項目です");
    }
}

function querySuccess(tx, results) {
    console.log(getTime() + " querySuccess");
    var len = results.rows.length;
    var id;
    var siteName;
    var accountName;
    var accountID;
    var accountPW;
    console.log("There are " + len + " rows of records in the database.");
    for (var i=0; i<len; i++){
        id = results.rows.item(i).id;
        siteName = results.rows.item(i).site_name;
        accountName = results.rows.item(i).account_name;
        accountID = results.rows.item(i).account_id;
        accountPW = results.rows.item(i).account_pw;
        addLine(id, siteName, accountName, accountID, accountPW);
        console.log("siteName   : " + siteName);
        console.log("accountName: " + accountName);
        console.log("accountID  : " + accountID);
        console.log("accountPW  : " + accountPW);
    }
}