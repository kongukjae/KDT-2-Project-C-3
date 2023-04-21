import mysql from "mysql";
import fs from "fs";
import cmServer from "./commonServer.js";
import busboyImageSave from "./backend_module_busboy_image_save.js";
import busboyImageUpload from "./backend_module_busboy_image_save_upload.js";

export default function callPostImage(request, response) {
  if (request.url.startsWith("/imageUpload")) {
    console.log("업로드 시도");
    busboyImageSave(request, response, "./image/userProfile/", ".");
    response.writeHead(200);
    response.end();
  }
  let count = 0
  if (request.url.startsWith("/postImageUpload")) {
    count += 1;
    console.log("게시글 이미지 업로드 시도");
    busboyImageUpload(
      request,
      response,
      "./image/postImgUpload/",
      `-postupload${count}.`
    );
    response.writeHead(200);
    response.end();
  }
  if(request.url === "/uploadIMG") {
    console.log("업로드 요청 받는 중");
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log(body.split("="));
      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(
        `SELECT image FROM post_upload WHERE id='${body.split("=")[1]
        }' order by date desc`,
        (error, rows, fields) => {
          if (error) throw error;
          else {
            response.writeHead(200);
            fs.readFile(
              `./image/postImgUpload/${rows[0].image}`,
              function (err, data) {
                response.end(data);
              }
            );
            connection.end();
          }
        }
      );
    });
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
}
