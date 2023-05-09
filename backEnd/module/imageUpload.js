import mysql from "mysql";
import fs from "fs";
import cmServer from "../commonServer.js";
import {
  SaveRequestedProfileImagewithBusboy,
  SaveRequestedPostBoardImagewithBusboy,
} from "./imageSaveBusboy.js";

export default function callPostImage(request, response) {
  if (request.url.startsWith("/uploadImage")) {
    console.log("업로드 시도");
    SaveRequestedProfileImagewithBusboy(
      request,
      response,
      "./image/userProfile/",
      "."
    );
    response.writeHead(200);
    response.end();
  }
  if (request.url === "/dangMarketImageSubmit") {
    console.log("중고마켓 업로드 시도");
    SaveRequestedPostBoardImagewithBusboy(
      request,
      response,
      "./image/dangMarket/"
    );
    response.writeHead(200);
    response.end();
  }
  console.log("댕스타 이미지 업로드 시도");
  if (request.url === "/dangStarImageSubmit") {
    SaveRequestedPostBoardImagewithBusboy(
      request,
      response,
      "./image/dangstar/"
    );
    response.writeHead(200);
    response.end();
  }

  if (request.url === "/sendImage") {
    console.log("이미지 요청 받는 중");
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let splitBody = body.split("&");
      switch (splitBody[0].split("=")[1]) {
        case "proFile":
          console.log("프로필 사진 요청");
          let connection = mysql.createConnection(cmServer.mysqlInfo);
          connection.connect();
          console.log(splitBody[1].split("=")[1] + "님 사진 조회 중");
          connection.query(
            `SELECT image FROM userimage WHERE id='${
              splitBody[1].split("=")[1]
            }'`,
            (error, rows, fields) => {
              if (error) throw error;
              else {
                response.writeHead(200);
                if (rows.length === 0) {
                  console.log(
                    splitBody[1].split("=")[1] + "님 사진이 없습니다"
                  );
                  fs.readFile(`./image/default/null.png`, function (err, data) {
                    response.end(data);
                  });
                } else {
                  console.log(
                    splitBody[1].split("=")[1] +
                      "님 사진이 있습니다 : " +
                      rows[0].image
                  );
                  fs.readFile(
                    `./image/userProfile/${rows[0].image}`,
                    function (err, data) {
                      response.end(data);
                    }
                  );
                }
                connection.end();
              }
            }
          );
          break;
        case "dangStar":
          console.log("댕스타 사진 요청");
          break;
        case "secondHand":
          console.log("중고거래 사진 요청");
          break;
        default:
          console.log("switch에서 이미지타입 확인 안됨");
      }
    });
  }
  if (request.url === "/sendImageSlide") {
    console.log("really");
    let body = "";
    request.on("data", function (data) {
      body = body + data;
      console.log("black");
    });
    request.on("end", function () {
      console.log("cute");

      console.log(body);
      let targeNumber = [10];
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `select * from dangstar where post_index IN (${targeNumber.join(
          ", "
        )})`,
        function (err, data) {
          if (err) throw err;
          else {
            console.log(data);
            response.writeHead(200, { "content-Type": "application/json" });
            response.write(JSON.stringify(data));
            console.log("response end");
            response.end();
          }
        }
      );
    });
  }
}
