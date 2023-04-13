import htmlBox from "../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";

export default function dangMap(request, response) {
  let splitURL = request.url.split("/")[2];

  if (request.url === "/map") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.dangMap));
    response.end();
  }
  else if (splitURL === "topMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  }
  else if (splitURL === "bottomMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  } 
  else if(splitURL === "dangMap.js") {
    cmServer.fileDirectory(`mapp/${splitURL}`, response);
  }
  else if (request.url.startsWith("/starFootprint")) {
    // console.log("url == " + request.url);
    let targetId = request.url.split("=")[1];
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    let starCnt;
    let markerStarArr = {};
    connection.connect();
    console.log("url ==" + request.url);

    connection.query(
      `select count(*) as count from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = ${targetId} and star = true order by addData desc;`,
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
      `select latitude, longitude, fr_id from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = ${targetId} and star = true order by addData desc;`,
      (err, rows) => {
        if (err) throw err;
        else {
          if (starCnt <= 10) {
            for (let i = 0; i < starCnt; i++) {
              let starArr = [];
              starArr.push(rows[i].latitude, rows[i].longitude, rows[i].fr_id);
              markerStarArr[i] = starArr;
            }
          } else {
            for (let i = 0; i < 10; i++) {
              let starArr = [];
              starArr.push(rows[i].latitude, rows[i].longitude, rows[i].fr_id);
              markerStarArr[i] = starArr;
            }
          }
          response.writeHead(200);
          response.write(JSON.stringify(markerStarArr));
          response.end();
        }
      }
    );
    connection.end();
  }
  else if (request.url.startsWith("/frFootprint")) {
    console.log("url == " + request.url);
    let checkID = request.url.split("=")[1];
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    let frCnt;
    let fMarkerArr = {};
    connection.connect();
    console.log("url ==" + request.url);

    connection.query(
      `select count(*) as count from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = "${checkID}"`,
      function (err, data) {
        if (err) throw err;
        else {
          frCnt = data[0].count;
          console.log("친구 발자국 수: " + frCnt);
          // response.writeHead(200);
          // response.end(JSON.stringify(data));
          // console.log(JSON.stringify(data));
        }
      }
    );
    connection.query(
      `select latitude, longitude, id, addData from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = "${checkID}"`,
      (err, rows) => {
        if (err) throw err;
        else {
          if (frCnt <= 10) {
            for (let i = 0; i < frCnt; i++) {
              let frArr = [];
              frArr.push(rows[i].latitude, rows[i].longitude, rows[i].fr_id);
              fMarkerArr[i] = frArr;
            }
          } else {
            for (let i = 0; i < 10; i++) {
              let frArr = [];
              frArr.push(rows[i].latitude, rows[i].longitude, rows[i].fr_id);
              fMarkerArr[i] = frArr;
            }
          }
          response.writeHead(200);
          response.write(JSON.stringify(fMarkerArr));
          response.end();
          console.log(JSON.stringify(fMarkerArr));
        }
      }
    );
    connection.end();
  }
  // else if (request.url.startsWith("/otFootprint")) {
  //   // console.log("url == " + request.url);
  //   let targetId = request.url.split("=")[1];
  //   let connection = mysql.createConnection(cmServer.mysqlInfo);
  //   let otherCnt;
  //   let markerOtherArr = {};
  //   connection.connect();
  //   console.log("url ==" + request.url);

  //   connection.query(
  //     `select count(*) as count from map_tables left join (select id from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = '${targetId}') as mt on map_tables.id = mt.id where mt.id is null and (map_tables.id not in ('${targetId}')) order by addData desc;`,
  //     function (err, data) {
  //       if (err) throw err;
  //       else {
  //         otherCnt = data[0].count;
  //         console.log("낯선 발자국 수: " + otherCnt);
  //         // response.writeHead(200);
  //         // response.end(JSON.stringify(data));
  //         // console.log(JSON.stringify(data));
  //       }
  //     }
  //   );
  //   connection.query(
  //     `select * from map_tables left join (select id from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id ='aaa1234') as mt on map_tables.id = mt.id where mt.id is null and (map_tables.id not in ('${targetId}'));`,
  //     (err, rows) => {
  //       if (err) throw err;
  //       else {
  //         if (otherCnt <= 10) {
  //           for (let i = 0; i < otherCnt; i++) {
  //             let otherArr = [];
  //             otherArr.push(rows[i].latitude, rows[i].longitude, rows[i].fr_id);
  //             markerOtherArr[i] = otherArr;
  //           }
  //         } else {
  //           for (let i = 0; i < 10; i++) {
  //             let otherArr = [];
  //             starArr.push(rows[i].latitude, rows[i].longitude, rows[i].fr_id);
  //             markerOtherArr[i] = otherArr;
  //           }
  //         }
  //         response.writeHead(200);
  //         response.write(JSON.stringify(markerOtherArr));
  //         response.end();
  //       }
  //     }
  //   );
  //   connection.end();
  // }
  else if(splitURL === "dangMapSlide.js"){
    cmServer.fileDirectory(`mapp/${splitURL}`, response);
  }
}