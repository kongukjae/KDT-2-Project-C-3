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
      let postIndex;

      console.log(commentIndex);
      console.log("userID : " + userID)
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(`select post_index from cm_post where cm_index = '${commentIndex}'`,
      (err, data) => {
        if(err) throw err;
        else{
          postIndex = data[0].post_index;
          console.log("asdjlaksjdladjl: :::: ", postIndex)
          conn.query(`select post_id from dangstar where post_index = ${postIndex}`,
          (err, data) => {
            if(err) throw err;
            else{
              // console.log("indexsskssskksks: ", data[0].post_id)
              conn.query(`delete from alarm where id = '${data[0].post_id}' and comment = '${userID}' and comment_index = '${commentIndex}'`);
            }
          });
        }
      })
      conn.query(
        `delete from cm_post where cm_id = '${userID}' and cm_index = '${commentIndex}'`
      )
      response.end();
    })
  }
  if(request.url.startsWith("/commentUpdateBtn")) {
    console.log(request.url)
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
  if(request.url.startsWith("/commentUpdateSubmit")) {
    console.log(request.url)
    console.log("코멘트 수정 입력 진입 코멘트 수정 입력 진입 코멘트 수정 입력 진입 코멘트 수정 입력 진입");
    let body = '';
    request.on('data', function(data){
      body = body + data;
    })
    request.on('end', function() {
      let result = JSON.parse(body);
      console.log(result);
      let userID = jwtFunc.jwtCheck(result.userID).id;
      console.log(userID);
      let commentIndex = result.cm_index;
      console.log(commentIndex);
      let commentValue = result.cm_detail;
      console.log(commentValue);
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `UPDATE cm_post SET cm_detail = '${commentValue}' where cm_index = ${commentIndex}`, (err, data) => {
          if (err) throw err;
          else {
            console.log("댓글 수정 DB 업데이트 성공");
          }
        }
      )
      response.end();
      conn.end()
    })
  }
}