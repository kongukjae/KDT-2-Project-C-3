import htmlBox from "../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";
import * as JWT from "./jsonwebtoken.js";

export default function dangMap(request, response) {
  if (request.url === "/mykeep") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.mykeep));
      response.end();
    });
  }
  // 제출했을때 --> mykeepcute로 이동하는 일련의 과정
  if (request.url === "/secondHand") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log("cute"); //확인용

      let result = body.split("&");
      const jsonwebtoken = result[1].split("=")[1];
      const jwtunlockId = JWT.jwtCheck(jsonwebtoken).id;
      const title = result[2].split("=")[1];
      const text = result[3].split("=")[1];
      console.log(result);

      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      //  if(target === "mine"){
      connection.query(
        `INSERT INTO second_hand (id, title, detail,img) VALUES ('${jwtunlockId}', '${title}', '${text}', null)`,
        (error) => {
          if (error) throw error;
        }
      );
      connection.end();
      response.writeHead(200);
      response.end();
    });
  }
}
