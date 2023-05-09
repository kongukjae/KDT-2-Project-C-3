import cmServer from "../../commonServer.js";
import * as JWT from "../../module/jsonWebToken.js";  
import mysql from "mysql";

export default function alarmMark(request, response){
  if(request.url.startsWith('/alarmConent')){
    let body = "";
      request.on("data", function (data) {
        body = body + data;
      });
      request.on("end", function () {
        const targetId = JWT.jwtCheck(body).id;

        let like = [];
        let follow = [];
        let comment = [];
        let commentIdx = [];
        let public_chat = [];
        let public_chat_code = [];
        let type = [];
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
              follow.push(value.follow);
              comment.push(value.comment);
              commentIdx.push(value.comment_index);
              public_chat.push(value.public_chat);
              public_chat_code.push(value.public_chat_code);
              type.push(value.alarm_type);
              
            })
            alarmData['like'] = like;
            alarmData['follow'] = follow;
            alarmData['comment'] = comment;
            alarmData['commentIdx'] = commentIdx;
            alarmData['public_chat'] = public_chat;
            alarmData['public_chat_code'] = public_chat_code;
            alarmData['type'] = type;
            console.log("value: ", alarmData)

            response.writeHead(200);
            response.write(JSON.stringify(alarmData));
            response.end();
          }
        });
        conn.end();
        

      });
  };
  if(request.url.startsWith('/alarmMark')){
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      const targetId = JWT.jwtCheck(body).id;

      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(`select count(*) as count from alarm where id = '${targetId}'`,
      (err, data) => {
        if(err) throw err;
        else{
          console.log("알림 개수 불러오기 완료", data[0].count)
          response.writeHead(200);
          response.write(JSON.stringify(data[0].count));
          response.end();
        }
      });
      conn.end();

    });
  };
  if(request.url.startsWith('/deleteAlarm')){
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      
      let bodySplit = body.split('&');
      const targetId = JWT.jwtCheck(bodySplit[0].split('=')[1]).id;
      let disc = bodySplit[1].split('=')[0];
      const target = bodySplit[1].split('=')[1];
      const type = bodySplit[2].split('=')[1];
      console.log("사용자가 알림 확인 ", targetId, disc, target, type);

      if(disc === "follow"){
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(`delete from alarm where id = '${targetId}' and follow = '${target}' and alarm_type = '${type}'`);
      }else if(disc === 'public_chat'){
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(`delete from alarm where id = '${targetId}' and public_chat = '${target+'&'+bodySplit[2]}' and alarm_type = '${disc}'`);
      }
      else{
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(`delete from alarm where id = '${targetId}' and comment_index = '${target}' and alarm_type = '${type}'`);

      }
      response.writeHead(200);
      response.end();

    });
  };
}

