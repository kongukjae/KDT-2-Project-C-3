import cmServer from "../../commonServer.js";
import * as jwtFunc from "../../module/jsonWebToken.js";  
import mysql from "mysql";

export default function dangstarUserCheck(request, response) {
  if(request.url.startsWith("/userCheck")) {
    console.log("유저 체크 중");
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log("전체 데이터")
      console.log(body);
      let userID = jwtFunc.jwtCheck(body.split('=')[1]).id;
      console.log(userID);
      response.writeHead(200);
      response.end(JSON.stringify(userID));
    });
  }
}