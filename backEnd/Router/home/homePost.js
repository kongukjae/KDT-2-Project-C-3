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
    console.log("really");
    let body = "";
    request.on("data", function (data) {
      body = body + data;
      console.log("black");
    });
    request.on("end", function () {
      console.log("cute");

      // let targeNumber = [4, 5, 6, 7, 8];
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
            console.log(data);
            response.writeHead(200, { "content-Type": "application/json" });
            response.write(JSON.stringify(data));
            console.log("response end");
            response.end();
          }
        }
      );
    });
  }
}
