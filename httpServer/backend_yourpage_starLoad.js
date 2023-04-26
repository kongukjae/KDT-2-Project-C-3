import cmServer from "./commonServer.js";
import * as jwtFunc from "./jsonwebtoken.js";
import mysql from "mysql";

export default function FollowStarLoad(request, response) {
  if (request.url.startsWith("/starLoad")) {
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
      console.log("star load");

      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `SELECT * FROM fr_list WHERE user_id = '${userID}' and fr_id = '${fr_id}'`,
        (error, data) => {
          console.log(userID)
          console.log(data);
          if (data === undefined || data === null) {
            console.log("값이 없다")
            conn.end();
          } else {
            console.log("해당하는 값이 있습니다");
            conn.query(
              `SELECT star FROM fr_list WHERE user_id = '${userID}' and fr_id = '${fr_id}'`,
              (error, data) => {
                console.log(data[0]);
                console.log(data[0].star);
                if (data[0].star === 0) {
                  response.end("false");
                } else {
                  response.end("true");
                }
              }
            );
            conn.end();
          }
        }
      );
    });
  }
}
