import cmServer from "../../commonServer.js";
import * as jwtFunc from "../../module/jsonWebToken.js";  
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
      console.log(firstSplit);
      let cm_detail = firstSplit[0].split('=')[1];
      console.log(cm_detail);
      let cm_idCookie = firstSplit[1].split('=')[1];
      let cm_id = jwtFunc.jwtCheck(cm_idCookie).id;
      console.log(cm_id);
      let post_index = firstSplit[2].split('=')[1];
      console.log(post_index);

      let postID;
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `insert into cm_post(cm_id, cm_detail, post_index) values("${cm_id}", "${cm_detail}", ${post_index})`
      );
      conn.query(`select post_id from dangstar where post_index = ${post_index}`,
      (err, data) => {
        if(err) throw err;
        else{
          postID = data[0].post_id;
          // console.log("indexsskssskksks: ", data[0].post_id)
          conn.query(`select cm_index from cm_post order by cm_index desc limit 1`,
          (err, data) => {
            if(err) throw err;
            else{
              // console.log("kjdaksjdjasdklaj::::::::::", data[0].cm_index)
              conn.query(`insert into alarm(id, comment, comment_index, alarm_type) values ('${postID}', '${cm_id}', '${data[0].cm_index}', 'comment')`)
              conn.end();
            }
          });
        };
      });
      console.log("새로고침 시작");
      // response.write("<script>location.reload();</script>");
      response.end();
    });
  }
}