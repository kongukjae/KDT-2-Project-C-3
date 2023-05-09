import htmlBox from "../../../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "../../commonServer.js";

export default function homePost(request, response) {
  // const mysqlInfo = {
  //   host: "192.168.0.93",
  //   user: "guest",
  //   password: "0000",
  //   database: "mungta",
  // }

  if (request.url.startsWith("/slidePlease")) {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `SELECT ds.* FROM dangstar ds
        JOIN (
            SELECT post_index
            FROM dangstar
            ORDER BY LENGTH(post_like) DESC
            LIMIT 5
        ) AS top_posts ON ds.post_index = top_posts.post_index;`,
        function (err, data) {
          if (err) throw err;
          else {
            response.writeHead(200, { "content-Type": "application/json" });
            response.write(JSON.stringify(data));
            response.end();
          }
        }
      );
    });
  }
}
