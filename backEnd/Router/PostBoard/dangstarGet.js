import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";
import mysql from "mysql";



export default function postBoard(request, response) {

  if (request.url.startsWith("/dangstar")) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.postBoard));
  }
  if (request.url.startsWith("/dangstarDetail")) {
    console.log(request.url);
    let nth = request.url.split("=")[1];
    response.writeHead(200, { "Content-Type": "text/html" });   
    response.write(`<script>const idx = ${nth}</script>`);
    response.end(htmlBox.htmlFunc(htmlBox.postDetail));
  }
  if (request.url.startsWith("/loadPostBoard")) {
    console.log(request.url);
    let nth = request.url.split("=")[1];
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(`select * from dangstar order by post_date desc limit ${nth * 3},3`,
      function (err, data) {
        if (err) throw err;
        else {
          console.log(JSON.stringify(data));
          console.log("JSON data");
          response.writeHead(200);
          response.write(JSON.stringify(data));
          response.end();
        }
      }
    );
    conn.end();
  }
}