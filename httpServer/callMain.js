import htmlBox from "../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";


export default function callMain(request, response) {
  // const mysqlInfo = {
  //   host: "192.168.0.93",
  //   user: "guest",
  //   password: "0000",
  //   database: "mungta",
  // }

  let splitURL = request.url.split("/")[2];
  if (splitURL === "commonFunc.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  }
  else if (splitURL === "topMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  }
  else if (splitURL === "bottomMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  } 
  else if (splitURL === "weather.js") {
    cmServer.fileDirectory(`main/${splitURL}`, response);
  } 
  else if (splitURL === "mainStyle.js") {
    cmServer.fileDirectory(`main/${splitURL}`, response);
  } 
  else if (splitURL === "map.js") {
    cmServer.fileDirectory(`mapp/${splitURL}`, response);
  }

  if (request.url === "/main") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.mapBody));
  }
  else if (request.url.startsWith("/loadMap")) {
    let targetId = request.url.split("=")[1];
    console.log("loadmap id is " + targetId);
    let tableCnt;
    let markerArr = {};

    console.log("url: " + request.url);
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(`select count(*) as cnt from map_tables where id='${targetId}'`,
      function (err, data) {
        if (err) throw err;
        else {
          tableCnt = data[0].cnt;
          //console.log("테이블 개수: " + tableCnt);
        }
      }
    );
    conn.query(
      `select * from map_tables where id='${targetId}'`,
      function (err, rows) {
        if (err) throw err;
        else {
          //console.log(rows);
          //console.log(rows.lenght);

          for (let i = 0; i < tableCnt; i++) {
            let arr = [];
            arr.push(rows[i].latitude, rows[i].longitude);
            markerArr[i] = arr;
          }
          //console.log(markerArr);
          response.writeHead(200);
          response.write(JSON.stringify(markerArr));
          response.end();
        }
      }
    );
    conn.end();
  }
}