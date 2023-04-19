import cmServer from "./commonServer.js";
import * as jwtFunc from "./jsonwebtoken.js"
import mysql from "mysql";

export default function postCommentInput(request, response) {
  if(request.url.startsWith("/commentSubmit")) {
    console.log("덧글 작성 됨");
    let body = "";
    request.on("data", function (data) {
      body = body + data;
      // console.log("아래 전달 된 데이터임")
      // console.log(body);
    });
    request.on("end", function () {
      console.log(body);
      let firstSplit = body.split('&');
      let cm_detail = decodeURIComponent(firstSplit[0].split('=')[1]);
      console.log(cm_detail);
      let cm_idCookie = firstSplit[1].split('=')[1];
      let cm_id = jwtFunc.jwtCheck(cm_idCookie).id;
      console.log(cm_id);
      let post_index;
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `insert into cm_post(cm_id, cm_detail, post_index) values("${cm_id}", "${cm_detail}", 3)`
      );
      conn.end();
      response.end();
    });
  }
}