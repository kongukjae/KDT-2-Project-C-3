import htmlBox from "../../../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "../../../httpServer/commonServer.js";
import * as JWT from "../../../httpServer/jsonwebtoken.js";  

export default function dangMap(request, response) {
  // 댕스타 작성글 클릭시 게시글
  if (request.url === "/dangStarWrite") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.dangWrite));
      response.write(`<script>
      let target = document.getElementById('titleTextboxWrap');
      target.style.display = 'none';
      </script>`);
      response.end();
    });
  } 
//중고거래 작성글 클릭시 게시글
  if (request.url === "/dangMarketWrite") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.dangWrite));
      response.end();
    });
  } 

  // 제출했을때 --> 중고거래 반환
  if (request.url === "/secondHand") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log('cute') //확인용
     
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
        `INSERT INTO second_hand (id, title, detail,img) VALUES ('${jwtunlockId}', '${title}', '${text}','image_url')`,
         (error,) => {
           if (error) throw error;
       },
       )
      connection.end();
      response.writeHead(200);
      response.end();

    });
  }
 // 제출했을때 -->  댕스타 반환
 if (request.url === "/postBoard") {
  let body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    console.log('yoone') //확인용
   
    let result = body.split("&");
    const jsonwebtoken = result[1].split("=")[1];
    const jwtunlockId = JWT.jwtCheck(jsonwebtoken).id; 
    const text = result[3].split("=")[1];
    console.log(result);


    let connection = mysql.createConnection(cmServer.mysqlInfo);
     connection.connect();
    //  if(target === "mine"){
     connection.query(
      `INSERT INTO dangstar (post_id,post_detail) VALUES ('${jwtunlockId}','${text}')`,
       (error,) => {
         if (error) throw error;
     },
     )
    connection.end();
    response.writeHead(200);
    response.end();

  });
}

















}

