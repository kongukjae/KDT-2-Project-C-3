import htmlBox from "../common/htmlBox.js";
import postBoardFileRead from "./backend_postBoardFileRead.js";
import cmServer from "./commonServer.js";
import mysql from "mysql";


export default function postBoard(request, response) {
  //console.log("요청 들어옴 2");

  postBoardFileRead(request, response);

  if (request.url.startsWith("/postBoard")) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.postBoard));
  }
  if (request.url.startsWith("/loadPostBoard")) {
    console.log(request.url);
    let nth = request.url.split("=")[1];
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(
      // `select dangstar.* , cm_post.cm_index, cm_post.cm_id, cm_post.cm_detail, cm_post.cm_img, cm_post.cm_date FROM dangstar LEFT JOIN cm_post on dangstar.post_index = cm_post.post_index order by post_date desc limit ${nth * 3},3`,
      `select * from dangstar order by post_date desc limit ${nth * 3},3`,
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