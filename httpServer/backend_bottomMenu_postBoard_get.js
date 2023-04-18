import htmlBox from "../common/htmlBox.js";
import postBoardFileRead from "./backend_postBoardFileRead.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";


export default function postBoard(request, response){
  
  postBoardFileRead(request, response);

  if (request.url === "/postBoard") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.postBoard));
  }
  if(request.url.startsWith('/loadpostBoard')){
    console.log("loadpostBoard: " + request.url);
    let nth = request.url.split('=')[1];
    console.log("nth: " + nth);
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(
      `select * from dangstar order by date desc limit ${nth*5},5`, function(err, data) {
        if (err) throw err;
        else {
          response.writeHead(200);
          response.write(JSON.stringify(data));
          response.end();
        }
      }
    )
    conn.end();
  }
}