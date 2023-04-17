import htmlBox from "../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";
import * as JWT from "./jsonwebtoken.js";

export default function dangMap(request, response) {
  if (request.url.startsWith("/mykeep")) {
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
              
            </script>`);
            response.end();
          }
        }
        );
      }
      connection.end();
    })
  } 
  // if (request.url.startsWith("/followRequest")) {
  //   let target = request.url.split("?")[1];
  //   let targetArr = target.split("&");
  //   let connection = mysql.createConnection(cmServer.mysqlInfo);
  //   connection.connect();
  //   connection.query(
  //     `INSERT INTO fr_list_testbyJin VALUES('${targetArr[0].split("=")[1]}','${
  //       targetArr[1].split("=")[1]
  //     }')`,
  //     (error, rows, fields) => {
  //       if (error) throw error;
  //       else {
  //         response.writeHead(200);
  //         response.end();
  //       }
  //     }
  //   );
  //   connection.end();
  // }
}
