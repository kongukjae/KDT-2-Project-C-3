import cmServer from "../../../httpServer/commonServer.js";
import mysql from "mysql";

export default function postCommentLoad(request, response) {
  if (request.url.startsWith("/postBoardCommentData")) {
    let body = "";

    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      console.log("댓글 데이터 로딩");
      console.log(body);
      let postIndex = body.split("=")[1];
      console.log(postIndex);
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `select * from cm_post where post_index = ${postIndex} order by cm_date desc limit 1`,
        function (err, data) {
          if (err) throw err;
          else {
            console.log(JSON.stringify(data));
            response.writeHead(200);
            response.write(JSON.stringify(data));
            response.end();
          }
        }
      );
      conn.end();
    });

  }
}