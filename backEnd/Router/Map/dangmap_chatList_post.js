import cmServer from "../../commonServer.js";
import mysql from "mysql";
import * as jwtFunc from "../../module/jsonWebToken.js";

export default function postMapChatList(request, response) {
  if(request.url === '/mapChatList'){
    console.log("채팅 리스트 페이지 진입")

    let body = '';
    request.on('data', (data) =>{
      body += data;
    });
    request.on('end', () => {
    const roomName = body.split('=')[1];
    console.log('roomName: ', roomName)

    const conn = mysql.createConnection(cmServer.mysqlInfo)
    conn.connect();
    conn.query(`
      select userinfo.id, dogName from userinfo join chat_room on chat_room.id = userinfo.id where room = '${roomName}'`,
      (err, data) => {
        if(err) throw err;
        else{
          let roomList = {};
          for (const key in data) {
            roomList[key] = [data[key].id, data[key].dogName];
          }
          //console.log("room data: ", roomList)

          response.writeHead(200);
          response.end(JSON.stringify(roomList));
        }
      });
      conn.end();
    })
  }
}