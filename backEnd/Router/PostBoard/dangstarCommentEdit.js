import htmlBox from "../../../common/htmlBox.js";
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
      let userID = jwtFunc.jwtCheck(body.split("=")[1]).id;
      console.log(userID)
      response.end();
    })
  }
}