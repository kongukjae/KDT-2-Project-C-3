import mysql from "mysql";
import cmServer from "../../commonServer.js";
import {publicChatGenerator} from '../../module/dangmapPublicChatGenerator.js'

export default function callPostDangMap(request, response) {
  if (request.url.startsWith("/menuMap")) { //댕맵의 지도에 발자국 전부 띄우는 코드
    let body = "";
    let cooData;

    request.on("data", function (chunk) {
      //서버로 보내지는 데이터 받는 중
      body += chunk;
    });
    request.on("end", function () {
      //데이터 다 받은 뒤 DB에 입력
      //console.log(body);
      cooData = JSON.parse(body);

      response.writeHead(200, { "Content-Type": "text/html" });
      response.end();

      for (const key in cooData) {
        console.log(cooData[key]);
        publicChatGenerator(cooData[key][2], cooData[key][0].toFixed(13), cooData[key][1].toFixed(13), 'none', './backEnd/module/dangmapPubilcChatListCheck.json','./backEnd/module/dangmapPubilcChatListResult.json')
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
          `insert into map_tables(latitude, longitude, id, addData) values(${cooData[0][0].toFixed(13)}, ${cooData[0][1].toFixed(13)}, '${cooData[0][2].split(";")[0]}', now())`,
          function (err) {
            if (err) throw err;
            else {
              // console.log(cooData[key][0], cooData[key][1], cooData[key][2], cooData[key][3]);
              console.log("정상적으로 DB에 저장")};
          }
        );
        conn.end();
      }
    });
  }
  if(request.url.startsWith('/dragMarker')) { // 댕맵에서 마커 드래그가 끝났을 때
    let body = "";
    let dragData;
  
    request.on('data', function(data){
      body += data;
    })
    request.on("end", function(){ // 전송된 데이터를 다 받은 후
      dragData = JSON.parse(body);
      // console.log("아래는 dragData 입니다")
      // console.log(dragData);
  
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end();
      for(const key in dragData){
        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        // DB에 있는 데이터를 업데이트 / id가 a고 위도가 b고 경도가 c인 데이터의 위도를 d, 경도를 e로 업데이트
        conn.query(`UPDATE map_tables SET latitude = '${dragData[key][0]}', longitude = '${dragData[key][1]}' WHERE id = '${dragData[key][2]}' and latitude = '${dragData[key][3]}' and longitude = '${dragData[key][4]}'`,
        function(err){
          if(err) throw err;
          else console.log("정상적으로 DB 업데이트");
        });
        conn.end();
      }
    })
  }
  else if (request.url.startsWith("/mapDelete")) {
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    connection.connect();
    let body = "";
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on("end", function(){
      function changeDate(date) {
  let nowDate = new Date(date);
  let formatDate = nowDate.toLocaleString();

  return formatDate;
}
      console.log(JSON.parse(body));
      const { id, date } = JSON.parse(body);
      // 문자열을 Date 객체로 변환
      const parsedDate = new Date(date);
      console.log(parsedDate);
      let target = changeDate(parsedDate);
     

let result = target.split(' ');
let answer = result[0].replace('.','-') + result[1].replace('.','-').padStart(3, '0') + result[2].replace('.',' ').padStart(3, '0')
let noon = 0
let time = result[4].split(':');
if(result[3] === '오후' && time[0] !== '12'){
  noon = 12;
}else if(result[3] ==='오전'){
  noon = 0;
}
answer += (Number(time[0]) + noon).toString().padStart(2, '0') + ':' + time[1].padStart(2, '0') + ':' + time[2].padStart(2, '0')

console.log(answer)
     




      connection.query(`DELETE FROM map_tables WHERE id = '${id}' AND addData = '${answer}'`, (error, results, fields) => {
        if (error) {
          console.log(error);
          console.log(dateTime);
          response.statusCode = 500;
          response.end();
          return;
        }
  
        console.log('Deleted rows:', results.affectedRows);
        response.statusCode = 200;
        response.end();
      });
    });
  }
}