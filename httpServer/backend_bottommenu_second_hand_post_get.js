import htmlBox from "../common/htmlBox.js";
import cmServer from "./commonServer.js";
import mysql from "mysql";

export default function secondHandPost(request, response) {
  if (request.url === "/secondHandPost") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.marketpost));
  } 
  if(request.url === "/market/market-post-page.js") {
    cmServer.fileDirectory(`market/market-post-page.js`, response)
  }
  if(request.url.startsWith('/postSecondHand')){
    console.log(request.url);
    let nth = request.url.split('=')[1];
    let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
          `select * from second_hand order by date desc limit ${nth},1`,
          function (err, data) {
            if (err) throw err;
            else {
              response.writeHead(200);
              response.write(JSON.stringify(data));
              response.end();
              console.log(JSON.stringify(data));
            }}
        );
        conn.end();
  }
}