import htmlBox from "../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";
import * as JWT from "./jsonwebtoken.js";

export default function dangMap(request, response) {
  if (request.url.startsWith("/mypage")) {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let result = body.split("&");
      let jwtfromClient = result[0].split("=")[1];
      let target = result[1].split("=")[1];
      console.log(jwtfromClient)
      console.log(target)

      let requestId = JWT.jwtCheck(jwtfromClient).id;
      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      if(target === "mine"){
        console.log("마이페이지");
        connection.query(
          `SELECT * FROM userinfo where id='${requestId}'`,
          (error, rows, fields) => {
            if (error) throw error;
            else {
              response.writeHead(200);
              response.write(`<script>
              const targetIdFromServer = '${requestId}';
              const dogNameFromServer = '${rows[0].dogName}';
              const dogGenderFromServer = '${rows[0].dogGender}';
            </script>`);
            response.write(htmlBox.htmlFunc(htmlBox.mypage));
            response.end();
          }
        }
        );
      }else{
        connection.query(
          `SELECT * FROM userinfo where id='${target}'`,
          (error, rows, fields) => {
            if (error) throw error;
            else {
              response.writeHead(200);
              response.write(`<script>
              const targetIdFromServer = '${target}';
              const dogNameFromServer = '${rows[0].dogName}';
              const dogGenderFromServer = '${rows[0].dogGender}';
            </script>`);
            response.write(htmlBox.htmlFunc(htmlBox.yourpage));
            response.end();
          }
        }
        );
      }
      connection.end();
    })
  } 
  if (request.url === "/followRequest"){
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let followTarget = JSON.parse(body).you
      let myId = JWT.jwtCheck(JSON.parse(body).jwt).id;
      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(
        `INSERT INTO fr_list VALUES('${myId}','${followTarget}',0)`,
        (error, rows, fields) => {
          if (error) throw error;
          else {
            response.writeHead(200);
            response.end();
          }
        }
      );
      connection.end();
    })
    
  }
  if (request.url === "/unFollowRequest"){
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let followTarget = JSON.parse(body).you
      let myId = JWT.jwtCheck(JSON.parse(body).jwt).id;
      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(
        `DELETE FROM fr_list WHERE user_id = '${myId}' AND fr_id = '${followTarget}'`,
        (error, rows, fields) => {
          if (error) throw error;
          else {
            response.writeHead(200);
            response.end();
          }
        }
      );
      connection.end();
    })
    
  }
  if (request.url === "/followCheck"){
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let followTarget = JSON.parse(body).you
      let myId = JWT.jwtCheck(JSON.parse(body).jwt).id;
      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(
        `SELECT * FROM fr_list WHERE user_id = '${myId}'`,
        (error, rows, fields) => {
          if (error) throw error;
          else {
            let checkFlag = false
            for(let i of rows){
              if(i.fr_id === followTarget){
                checkFlag = true;
                break
              }
            }
            response.writeHead(200);
            if(checkFlag){
              response.end('yes');
            }else{
              response.end('no');
            }
        }}
      );
      connection.end();
    })
    // 중고거래 게시판 보이게 만드는 방법
  } if (request.url === "/secondHand") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log('cute') //확인용
     
     
      connection.end();
      response.writeHead(200);
      response.end();

    });
  }





}
