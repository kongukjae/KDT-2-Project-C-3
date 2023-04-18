import htmlBox from "../common/htmlBox.js";
import cmServer from "./commonServer.js";
import mysql from "mysql";


export default function secondHand(request, response){

  let splitURL = request.url.split("/")[2];
  if (splitURL === "commonFunc.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  } 
  else if (splitURL === "topMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  } 
  else if (splitURL === "bottomMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  }

  if (request.url === "/postBoard") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.postBoard));
  } 

  if(request.url.startsWith('/loadSecondHandBoard')){
    let nth = request.url.split('=')[1];
    let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
          `select * from second_hand order by date desc limit ${nth*5},5`,
          function (err, data) {
            if (err) throw err;
            else {
              response.writeHead(200);
              response.write(JSON.stringify(data));
              response.end();
            }}
        );
        conn.end();
  }
}