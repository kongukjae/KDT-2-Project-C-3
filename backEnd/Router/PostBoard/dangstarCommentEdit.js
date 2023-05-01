import cmServer from "../../commonServer.js";
import mysql from "mysql";
import * as jwtFunc from "../../module/jsonWebToken.js"

export default function dangstarCommentEdit(request, response) {
  if (request.url.startsWith("/commentDelete")) {
    console.log("코멘트 삭제 진입 코멘트 삭제 진입 코멘트 삭제 진입 코멘트 삭제 진입");
    let body;
    request.on('data', function(data){
      body += data;
    })
    request.on("end", function(){
      let firstSpilt = body.split('&');
      let userID = jwtFunc.jwtCheck(firstSpilt[0].split("=")[1]).id;
      let commentID = firstSpilt[1].split('=')[1];
      console.log(commentID);
      console.log("userID : " + userID)
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `delete from cm_post where cm_id = '${userID}' and cm_index = '${commentID}'`
      )
      response.end();
    })
  }
}