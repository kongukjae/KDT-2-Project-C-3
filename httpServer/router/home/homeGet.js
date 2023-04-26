import htmlBox from "../../../common/htmlBox.js"
import mysql from "mysql";
import cmServer from "../../commonServer.js"

export default function homeGet(request, response) {
  // const mysqlInfo = {
  //   host: "192.168.0.93",
  //   user: "guest",
  //   password: "0000",
  //   database: "mungta",
  // }

  if (request.url === "/main") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.mapBody));
  } 

  else if (request.url.startsWith("/loadMap")) {
    let targetId = request.url.split("=")[1];
    let myRowCnt;
    let markerMyArr = {};

    console.log("url: " + request.url);
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(
      `select count(*) as count from map_tables where id='${targetId}'`,
      function (err, data) {
        if (err) throw err;
        else {
          myRowCnt = data[0].count;
          // console.log("a "+ myRowCnt);
        }
      }
    );
    conn.query(
      `select * from map_tables where id='${targetId}' order by addData desc`,
      function (err, rows) {
        if (err) throw err;
        else {
          console.log(rows)
          if(myRowCnt <= 10) {
            for (let i = 0; i < myRowCnt; i++) {
              let myArr = [];
              myArr.push(rows[i].latitude, rows[i].longitude, rows[i].id, rows[i].addData);
              markerMyArr[i] = myArr;
            }
          }
          else {
            for(let i = 0; i < 10; i++) {
              let myArr = [];
              myArr.push(rows[i].latitude, rows[i].longitude, rows[i].id, rows[i].addData);
              markerMyArr[i] = myArr;
            }
          }
          
          response.writeHead(200);
          response.write(JSON.stringify(markerMyArr));
          response.end();
        }
      }
    );

    conn.end();
  } else if (request.url.startsWith("/wholeFootprint")) {
    let targetId = request.url.split("=")[1];
    let otRowCnt;
    let markerOtArr = {};
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(
      `SELECT count(*) as count FROM map_tables WHERE (addData BETWEEN DATE_ADD(NOW(), INTERVAL -5 HOUR ) and NOW()) and id != '${targetId}' order by addData desc;`,
      function (err, data) {
        if (err) throw err;
        else {
          otRowCnt = data[0].count;
          // console.log(data);
        }
      }
    );
    conn.query(
      `SELECT * FROM map_tables WHERE (addData BETWEEN DATE_ADD(NOW(), INTERVAL -5 HOUR ) and NOW()) and id != '${targetId}' order by addData desc`,
      function (err, rows) {
        if (err) throw err;
        else {
          if (otRowCnt <= 10) {
            for (let i = 0; i < otRowCnt; i++) {
              let otArr = [];
              otArr.push(rows[i].latitude, rows[i].longitude);
              markerOtArr[i] = otArr;
            }
          } else {
            for (let i = 0; i < 10; i++) {
              let otArr = [];
              otArr.push(rows[i].latitude, rows[i].longitude);
              markerOtArr[i] = otArr;
            }
          }
          response.writeHead(200);
          response.write(JSON.stringify(markerOtArr));
          response.end();
        }
      }
    );
    conn.end();
  }
}
