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

        let like = [];
        let follow = [];
        let comment = [];
        let alarmData = {};

        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(`select * from alarm where id = '${targetId}'`,
        (err, data) => {
          if(err) throw err;
          else{
            // console.log("gkgkgkgkgk: ", data);
            data.forEach((value, index) => {
              like.push(value.postlike);
              follow.push(value.follow)
              
            })
            alarmData['like'] = like;
            alarmData['follow'] = follow;
            // console.log("value: ", alarmData)

            response.writeHead(200);
            response.write(JSON.stringify(alarmData));
            response.end();
          }
        });
        conn.end();
        

      });
  };

}