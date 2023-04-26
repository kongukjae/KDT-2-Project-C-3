import cmServer from "../../commonServer.js";
import * as jwtFunc from "../../../httpServer/jsonwebtoken.js"
import mysql from "mysql";

export default function FollowStarCheck(request, response) {
  if (request.url.startsWith("/starCheck")) {
    console.log("star check");
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log(body);
      let bodySplit = body.split("&");
      console.log(bodySplit);
      let userID = jwtFunc.jwtCheck(bodySplit[0].split("=")[1]).id;
      console.log(userID);
      let fr_id = bodySplit[1].split("=")[1];
      console.log(fr_id);

      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `SELECT * FROM fr_list WHERE user_id = '${userID}' and fr_id = '${fr_id}'`,
        (error, data) => {
          console.log(data);
          console.log(data[0].user_id);
          console.log(data[0].fr_id);
          console.log(data[0].star);
          if (data[0].star === 0) {
            console.log("stat = 0");
            conn.query(
              `UPDATE fr_list SET star = 1 WHERE user_id = '${userID}'and fr_id = '${fr_id}';`,
              function (err) {
                if (err) throw err;
                else console.log("정상적으로 1 업데이트");
                conn.end();
                response.end('true');
              }
            );
          } else {
            console.log("stat = 1");
            conn.query(
              `UPDATE fr_list SET star = 0 WHERE user_id = '${userID}'and fr_id = '${fr_id}';`,
              function (err) {
                if (err) throw err;
                else console.log("정상적으로 0 업데이트");
                conn.end();
                response.end('false');
              }
            );
          }
        }
      );
      // response.end();
    });
  }
}