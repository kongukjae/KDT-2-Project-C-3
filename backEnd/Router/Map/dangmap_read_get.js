import mysql from "mysql";
import cmServer from "../../commonServer.js";
import dangmap_HTML from "./dangmap_get.js";

export default function dangMap(request, response) {
  let splitURL = request.url.split("/")[2];

  dangmap_HTML(request, response);

  if (request.url.startsWith("/loadMap")) {
    let targetId = request.url.split("=")[1];
    let myRowCnt;
    let markerMyArr = {};

    // console.log("url: " + request.url);
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(
      `select count(*) as count from map_tables where id = '${targetId}' order by addData desc;`,
      function (err, data) {
        if (err) throw err;
        else {
          myRowCnt = data[0].count;
          console.log("a " + myRowCnt);
          conn.query(
            `select * from map_tables where id = '${targetId}' order by addData desc;`,
            function (err, rows) {
              if (err) throw err;
              else {
                if (myRowCnt <= 10) {
                  for (let i = 0; i < myRowCnt; i++) {
                    let myArr = [];
                    myArr.push(
                      rows[i].latitude,
                      rows[i].longitude,
                      rows[i].id,
                      rows[i].addData
                    );
                    markerMyArr[i] = myArr;
                  }
                } else {
                  for (let i = 0; i < 10; i++) {
                    let myArr = [];
                    myArr.push(
                      rows[i].latitude,
                      rows[i].longitude,
                      rows[i].id,
                      rows[i].addData
                    );
                    markerMyArr[i] = myArr;
                  }
                }
                // console.log(markerMyArr)
                response.writeHead(200);
                response.write(JSON.stringify(markerMyArr));
                response.end();
                conn.end();
              }
            }
          );
        }
      }
    );
    
  } else if (request.url.startsWith("/allloadMap")) {
    let targetId = request.url.split("=")[1].split("?")[0];
    let first = request.url.split("=")[2].split("?")[0];
    let last = request.url.split("=")[3];
    console.log(request.url);
    console.log(targetId);
    console.log(first);
    console.log(last);

    let connection = mysql.createConnection(cmServer.mysqlInfo);
    let markerMyAllArr = {};
    connection.connect();

    connection.query(
      // * 쿼리문 변경 -> 발자국 찍은 날짜를 전부 가져오는 것이 아니라 캘린더가 표시한 달에 찍힌 발자국만 가져오도록 변경, 오름차순으로 변경
      `select * from map_tables where id = '${targetId}' and addData between '${first}' and '${last}' order by addData ASC;`,
      function (err, rows) {
        if (err) throw err;
        else {
          for (let i = 0; i < rows.length; i++) {
            let myArr = [];
            myArr.push(rows[i].id, rows[i].addData);
            markerMyAllArr[i] = myArr;
          }
          response.writeHead(200);
          response.write(JSON.stringify(markerMyAllArr));
          response.end();
        }
      }
    );
    connection.end();
  } else if (request.url.startsWith("/starFootprint")) {
    // console.log("url == " + request.url);
    let targetId = request.url.split("=")[1];
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    let starCnt;
    let markerStarArr = {};
    connection.connect();
    //console.log("url ==" + request.url);

    connection.query(
      `select count(*) as count from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = '${targetId}' and star = true order by addData desc;`,
      function (err, data) {
        if (err) throw err;
        else {
          starCnt = data[0].count;
          console.log("즐찾 발자국 수: " + starCnt);
          // response.writeHead(200);
          // response.end(JSON.stringify(data));
          // console.log(JSON.stringify(data));
        }
      }
    );
    connection.query(
      `select latitude, longitude, fr_id, addData from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = '${targetId}' and star = true order by addData desc;`,
      (err, rows) => {
        if (err) throw err;
        else {
          if (starCnt <= 10) {
            for (let i = 0; i < starCnt; i++) {
              let starArr = [];
              starArr.push(
                rows[i].latitude,
                rows[i].longitude,
                rows[i].fr_id,
                rows[i].addData
              );
              markerStarArr[i] = starArr;
            }
          } else {
            for (let i = 0; i < 10; i++) {
              let starArr = [];
              starArr.push(
                rows[i].latitude,
                rows[i].longitude,
                rows[i].fr_id,
                rows[i].addData
              );
              markerStarArr[i] = starArr;
            }
          }
          response.writeHead(200);
          response.write(JSON.stringify(markerStarArr));
          response.end();
          connection.end();
        }
      }
    );
  } else if (request.url.startsWith("/frFootprint")) {
    // console.log("url == " + request.url);
    let targetId = request.url.split("=")[1];
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    let friendCnt;
    let markerFriendsArr = {};
    connection.connect();
    //console.log("url ==" + request.url);

    connection.query(
      `select count(*) as count from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = '${targetId}' and star = false order by addData desc;`,
      function (err, data) {
        if (err) throw err;
        else {
          friendCnt = data[0].count;
          console.log("친구 발자국 수: " + friendCnt);
          // response.writeHead(200);
          // response.end(JSON.stringify(data));
          // console.log(JSON.stringify(data));
        }
      }
    );
    connection.query(
      `select latitude, longitude, fr_id, addData from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = '${targetId}' and star = false order by addData desc;`,
      (err, rows) => {
        if (err) throw err;
        else {
          if (friendCnt <= 10) {
            for (let i = 0; i < friendCnt; i++) {
              let friendArr = [];
              friendArr.push(
                rows[i].latitude,
                rows[i].longitude,
                rows[i].fr_id,
                rows[i].addData
              );
              markerFriendsArr[i] = friendArr;
            }
          } else {
            for (let i = 0; i < 10; i++) {
              let friendArr = [];
              friendArr.push(
                rows[i].latitude,
                rows[i].longitude,
                rows[i].fr_id,
                rows[i].addData
              );
              markerFriendsArr[i] = friendArr;
            }
          }
          response.writeHead(200);
          response.write(JSON.stringify(markerFriendsArr));
          response.end();
          connection.end();
        }
      }
    );
  } else if (request.url.startsWith("/otFootprint")) {
    // console.log("url == " + request.url);
    let targetId = request.url.split("=")[1];
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    let otherCnt;
    let markerOtherArr = {};
    connection.connect();
    //console.log("url ==" + request.url);

    connection.query(
      `select count(*) as count from map_tables left join (select id from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = '${targetId}') as mt on map_tables.id = mt.id where mt.id is null and (map_tables.id not in ('${targetId}')) order by addData desc;`,
      function (err, data) {
        if (err) throw err;
        else {
          otherCnt = data[0].count;
          console.log("낯선 발자국 수: " + otherCnt);
          // response.writeHead(200);
          // response.end(JSON.stringify(data));
          // console.log(JSON.stringify(data));
        }
      }
    );
    connection.query(
      `select latitude, longitude, map_tables.id, addData from map_tables left join (select id from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = '${targetId}') as mt on map_tables.id = mt.id where mt.id is null and (map_tables.id not in ('${targetId}')) order by addData desc;`,
      (err, rows) => {
        if (err) throw err;
        else {
          if (otherCnt <= 10) {
            for (let i = 0; i < otherCnt; i++) {
              let otherArr = [];
              otherArr.push(
                rows[i].latitude,
                rows[i].longitude,
                rows[i].id,
                rows[i].addData
              );
              markerOtherArr[i] = otherArr;
            }
          } else {
            //console.log(rows);
            for (let i = 0; i < 10; i++) {
              let otherArr = [];
              otherArr.push(
                rows[i].latitude,
                rows[i].longitude,
                rows[i].id,
                rows[i].addData
              );
              markerOtherArr[i] = otherArr;
            }
          }
          response.writeHead(200);
          response.write(JSON.stringify(markerOtherArr));
          response.end();
          connection.end();
        }
      }
    );
  }
}
