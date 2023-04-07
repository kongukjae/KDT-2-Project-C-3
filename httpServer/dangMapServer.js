import htmlBox from "../htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";

export default function dangMap(request, response) {
  let splitURL = request.url.split("/")[1];

  if (request.url === "/map") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.dangMap));
    response.end();
  }
  else if(splitURL === "dangMap.js") {
    cmServer.fileDirectory(splitURL, response);
  }
  else if (request.url.startsWith("/frFootprint")) {
    console.log("url == " + request.url);
    let checkID = request.url.split("=")[1];
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    let count;
    let fMarkerArr = {};
    connection.connect();
    console.log("url ==" + request.url);

    connection.query(
      `select count(*) as count from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = "${checkID}"`,
      function (err, data) {
        if (err) throw err;
        else {
          count = data[0].count;
          console.log("친구 발자국 수: " + count);
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
          for (let i = 0; i < count; i++) {
            let fArr = [];
            fArr.push(rows[i].latitude, rows[i].longitude, rows[i].id);
            fMarkerArr[i] = fArr;
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
  else if(request.url.split('/')[2] === 'dangMapSlide'){
    cmServer.fileDirectory("dangMapSlide.js", response);
  }
}