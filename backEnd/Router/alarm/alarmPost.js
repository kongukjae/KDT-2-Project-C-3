import cmServer from "../../commonServer.js";
import * as JWT from "../../module/jsonWebToken.js";  
import mysql from "mysql";

export default function alarmMark(request, response){
  if(request.url.startsWith('/alarmMark')){
    let body = "";
      request.on("data", function (data) {
        body = body + data;
      });
      request.on("end", function () {
        const targetId = JWT.jwtCheck(body).id;
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query();
      conn.end();
      });
  };

}