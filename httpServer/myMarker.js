import cmServer from "../backEnd/commonServer.js";
import mysql from "mysql";

export default function myMarker(request, response) {
  let connection = mysql.createConnection(cmServer.mysqlInfo);
  let myId = request.url.split("=")[1];
  console.log(myId);

  connection.connect();
  connection.query(`select * from map_tables where user_id = "${myId}"`)
  // 일시 보류 -> 버튼 토글로 변수를 전달하여 dangMap.js의 load함수를 제어하고자 생각 중
}