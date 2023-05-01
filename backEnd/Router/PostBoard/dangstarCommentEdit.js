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
      let commentIndex = firstSpilt[1].split('=')[1];
      console.log(commentIndex);
      console.log("userID : " + userID)
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `delete from cm_post where cm_id = '${userID}' and cm_index = '${commentIndex}'`
      )
      response.end();
    })
  } else if(request.url.startsWith("/commentUpdate")) {
    console.log("코멘트 수정 진입 코멘트 수정 진입 코멘트 수정 진입 코멘트 수정 진입");
    let body = '';
    request.on('data', function(data){
      body = body + data;
    })
    request.on('end', function() {
      let result = JSON.parse(body);
      console.log(result);
      console.log(result.userID);
      console.log("result result result")
      // console.log(result);
      let userID = jwtFunc.jwtCheck(result.userID).id;
      console.log(userID);
      let commentIndex = result.index;
      console.log(commentIndex);
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `select * from cm_post where cm_id = '${userID}' and cm_index = '${commentIndex}'`, function(err, data) {
          if(err) throw err;
          else {
            console.log(data);
            response.writeHead(200);
            response.write(JSON.stringify(data));
            response.end();
          }
        }
      );
      conn.end();
    })
  }
}