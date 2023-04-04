import htmlBox from "../htmlBox.js";
import fs from "fs";
import mysql from "mysql";
export default function test(request, response) {

  const mysqlInfo = {
    host: "192.168.0.93",
    user: "guest",
    password: "0000",
    database: "mungta",
  };
  console.log("함수 실행 중")
  // console.log(res)
  function fileDirectory(request) {
    fs.readFile(`../${request}`, function (err, data) {
      response.writeHead(200);
      response.write(data);
      response.end();
    });
  }
  let splitURL = request.url.split("/")[1];
  if (splitURL === "commonFunc.js") {
    fileDirectory(splitURL);
  } else if (splitURL === "mainStyle.js") {
    fileDirectory(splitURL);
  } else if (splitURL === "map.js") {
    fileDirectory(splitURL);
  }

  // fileDirectory("commonFunc.js")
  // if (request.url.split("/")[1] === "commonFunc.js") {
  //   console.log(request.url)
  //   fs.readFile(`../commonFunc.js`, function (err, data) {
  //     response.writeHead(200);
  //     response.write(data);
  //     response.end();
  //   });

  if (request.url === "/main") {
    //const b = request.url.split("/")
    //console.dir(b)
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.mapBody));
    // } else if (request.url.split("/")[1] === "mainStyle.js") {
    //   fs.readFile(`../mainStyle.js`, function (err, data) {
    //     response.writeHead(200);
    //     response.write(data);
    //     response.end();
    //   });
    // } else if (request.url.split("/")[1] === "map.js") {
    //   fs.readFile(`../map.js`, function (err, data) {
    //     response.writeHead(200);
    //     response.write(data);
    //     response.end();
    //   });
    // } 
  }
  else if (request.url.startsWith("/loadMap")) {
    let targetId = request.url.split("=")[1];
    console.log("loadmap id is " + targetId);
    let tableCnt;
    let markerArr = {};

    console.log("url: " + request.url);
    let conn = mysql.createConnection(mysqlInfo);
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