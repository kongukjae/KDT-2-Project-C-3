import htmlBox from "../../../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "../../commonServer.js";
import * as JWT from "../../module/jsonWebToken.js";  

export default function dangMap(request, response) {
  // 댕스타 작성글 클릭시 게시글
  if (request.url === "/dangStarWrite") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      response.writeHead(200);
      response.write(`<script>
      const postBoardType = 'dangStar';
      </script>`);
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
      response.write(`<script>
      const postBoardType = 'dangMarket';
      </script>`);
      response.write(htmlBox.htmlFunc(htmlBox.dangWrite));
      response.end();
    });
  } 

  // 제출했을때 --> 중고거래 반환
  if (request.url === "/dangMarketWriteSubmit") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log(body) //확인용
     
      let result = JSON.parse(body);
      const jwtunlockId = JWT.jwtCheck(result['jwt']).id; 
      console.log(jwtunlockId);
      let imageName = result['imageType']
      let today = new Date()
      if(imageName !== null){
        console.log('이미지 있음')
        imageName = jwtunlockId +'-'+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getHours()+'-'+today.getMinutes()+'-'+today.getSeconds() + '.'+imageName;
      }else{
        imageName = 'null.png'
      }
      console.log(imageName);
      let connection = mysql.createConnection(cmServer.mysqlInfo);
       connection.connect();
      //  if(target === "mine"){
       connection.query(
        `INSERT INTO second_hand (id, title, detail,img) VALUES ('${jwtunlockId}', '${result['titleText']}', '${result['mainText']}','${imageName}')`,
         (error,) => {
           if (error) throw error;
       },
       )
      connection.end();
      response.writeHead(200);
      response.end(imageName);

    });
  }
 // 제출했을때 -->  댕스타 반환
 if (request.url === "/dangStarWriteSubmit") {
  let body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    console.log(body) //확인용

    let result = JSON.parse(body);
      const jwtunlockId = JWT.jwtCheck(result['jwt']).id; 
      console.log(jwtunlockId);
      let imageName = result['imageType']
      let today = new Date()
      if(imageName !== null){
        console.log('이미지 있음')
        imageName = jwtunlockId +'-'+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getHours()+'-'+today.getMinutes()+'-'+today.getSeconds() + '.'+imageName;
      }
      console.log(imageName);

    let connection = mysql.createConnection(cmServer.mysqlInfo);
     connection.connect();
    //  if(target === "mine"){
     connection.query(
      `INSERT INTO dangstar (post_id, img, post_detail) VALUES ('${jwtunlockId}','${imageName}','${result['mainText']}')`,
       (error,) => {
         if (error) throw error;
     },
     )
    connection.end();
    response.writeHead(200);
    response.end(imageName);

  });
}

















}

