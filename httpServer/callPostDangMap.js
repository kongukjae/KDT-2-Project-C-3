import mysql from "mysql";
import cmServer from "./commonServer.js";

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
        //console.log(cooData[key]);

        let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
          `insert into map_tables(latitude, longitude, id) values(${cooData[key][0]}, ${cooData[key][1]}, '${cooData[key][2]}')`,
          function (err) {
            if (err) throw err;
            else {
              console.log(cooData[key][0], cooData[key][1])
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
      console.log("아래는 dragData 입니다")
      console.log(dragData);
  
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
}