import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";
import * as JWT from "../../module/jsonWebToken.js";  
import mysql from "mysql";


export default function dangTalkPost(request, response) {
  if (request.url === "/dangTalkChatRoom") {
    let body = "";
      request.on("data", function (data) {
        body = body + data;
      });
      request.on("end", function () {
        let userId = JWT.jwtCheck(body.split('=')[1].split('&')[0]).id;
        let targetId = body.split('=')[2]
        let roomArray = [userId, targetId];
        roomArray.sort();
        let roomName = roomArray[0] + '&' + roomArray[1];
        response.writeHead(200);
        response.write(`<script>const userId = '${userId}';
        const targetId = '${targetId}';
        const roomName = '${roomName}';
        </script>`);
        response.write(`<script src="/socket.io/socket.io.js"></script>`);
        response.write(htmlBox.htmlFunc(htmlBox.dangTalkMain));
        response.end();
      })
  } 
  if(request.url === '/chatRoomRequest'){
    let body = "";
      request.on("data", function (data) {
        body = body + data;
      });
      request.on("end", function () {
        const targetId = JWT.jwtCheck(body).id;
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
        `select * from chat_room where id='${targetId}';`,
        function (err, rows) {
          if (err) throw err;
          else {
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
          }
        }
      );
      conn.end();
      });
  };
  if(request.url === '/chatRecentTextRequest'){
    let body = "";
      request.on("data", function (data) {
        body = body + data;
      });
      request.on("end", function () {
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
        `select text from chat_text where room='${body}' order by time desc limit 1;`,
        function (err, rows) {
          if (err) throw err;
          else {
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
          }
        }
      );
      conn.end();
      });
  }
  if(request.url === '/createChatRoomRequest'){
    let body = "";
      request.on("data", function (data) {
        body = body + data;
      });
      request.on("end", function () {
        let result = JSON.parse(body)
        const userId = JWT.jwtCheck(result.jwt).id;
        const targetId = result.targetId
        const chatRoomArr = [userId,targetId];
        chatRoomArr.sort();
        const roomName = chatRoomArr[0] + "&" + chatRoomArr[1];
        console.log(userId);
        console.log(targetId);
        let connection = mysql.createConnection(cmServer.mysqlInfo);
        connection.connect();
        connection.query(`select * from chat_room where room='${roomName}'`, (error, rows, fields) => {
        if (error) throw error;
        else{
          if(rows.length === 0){
            console.log("이전 대화방이 없으므로 새로운 대화방을 생성합니다")
            connection.query(`INSERT INTO chat_room VALUES('${userId}','${roomName}',0,now(),'${targetId}');`, (error, rows, fields) => {
              if (error) throw error;
              else{
                connection.query(`INSERT INTO chat_room VALUES('${targetId}','${roomName}',0,now(),'${userId}');`, (error, rows, fields) => {
                  if (error) throw error;
                  else{
                    console.log('생성완료')
                    response.writeHead(200);
                    response.end();
                    connection.end();
                  }              
                })
              }
            }
            )
          }else{
              response.writeHead(200);
              response.end();
              connection.end();
          }
      }})

      });
  }
  if(request.url === '/loadBeforeChatRequest'){
    let body = "";
      request.on("data", function (data) {
        body = body + data;
      });
      request.on("end", function () {
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
        `select * from chat_text where room='${body}'`,
        function (err, rows) {
          if (err) throw err;
          else {
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
          }
        }
      );
      conn.end();
      });
  }
  if(request.url === '/bottomMenuUnreadCircle'){
    let body = "";
      request.on("data", function (data) {
        body = body + data;
      });
      request.on("end", function () {
        const targetId = JWT.jwtCheck(body).id;
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
        `select * from chat_room where id='${targetId}';`,
        function (err, rows) {
          if (err) throw err;
          else {
            response.writeHead(200);
            response.write(JSON.stringify(rows));
            response.end();
          }
        }
      );
      conn.end();
      });
  };

  if(request.url === '/createPublicChatRoomRequest'){
    let body = "";
      request.on("data", function (data) {
        body = body + data;
    });
    request.on("end", function () {
      let result = JSON.parse(body)
      const userId = JWT.jwtCheck(result.jwt).id;

      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(`select * from chat_room where room='${result.roomCode}' and id ='${userId}'`, (error, rows, fields) => {
      if (error) throw error;
      else{
        if(rows.length === 0){
          console.log("처음 해당 단톡방에 진입")
          connection.query(`INSERT INTO chat_room VALUES('${userId}','${result.roomCode}',0,now(),'${result.roomName}');`, (error, rows, fields) => {
            if (error) throw error;
            else{
                  console.log('생성완료')
                  response.writeHead(200);
                  response.end('true');
                  connection.end();
            }
          }
          )
        }else{
            response.writeHead(200);
            response.end('false');
            connection.end();
        }
    }})

    });
  }
  if (request.url === "/dangTalkPublicChatRoom") {
    let body = "";
      request.on("data", function (data) {
        body = body + data.toString();
      });
      request.on("end", function () {
        let result = decodeURIComponent(body);
        let userId = JWT.jwtCheck(result.split('=')[1].split('&')[0]).id;
        let roomCode = result.split('=')[2].split('&')[0]+'&'+result.split('=')[2].split('&')[1];
        let roomName = decodeURI(result.split('=')[3].split('&')[0]);
        let firsttime = result.split('=')[4]

        response.writeHead(200);
        response.write(`<script>const userId = '${userId}';
        const roomCode = '${roomCode}';
        const roomName = '${roomName}';
        const firsttime = '${firsttime}'
        </script>`);
        response.write(`<script src="/socket.io/socket.io.js"></script>`);
        let connection = mysql.createConnection(cmServer.mysqlInfo);
        connection.connect();
        connection.query(`select id from chat_room where room='${roomCode}';`, (error, rows, fields) => {
          if (error) throw error;
          else{
            response.write(`<script> const memberList = '${JSON.stringify(rows)}' </script>`);
            response.write(htmlBox.htmlFunc(htmlBox.dangTalkPublicMain));
            response.end();
          }
        })

      })
  }

}
