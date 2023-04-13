import htmlBox from "../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";
import * as JWT from "./jsonwebtoken.js";

// export default function mywritepost(request, response) {
//   if (request.method === "POST" && request.url.startsWith("/write")) {
//     let body = "";
//     request.on("data", function (data) {
//       body = body + data;
//     });
//     request.on("end", function () {
//       let result = body.split("&");
//       let jwtfromClient = result[0].split("=")[1];
//       let target = result[1].split("=")[1];
//       console.log(jwtfromClient)
//       console.log(target)

//       let requestId = JWT.jwtCheck(jwtfromClient).id;

//       response.writeHead(200);
//       response.write(htmlBox.htmlFunc(htmlBox.writePage));
//       response.end();
//     });
//   }
// }

//클라이언트가 보낸 URL이 /write로 시작하는지를 확인한다.
export default function mywritepost(request, response) {
  if (request.url.startsWith("/write")) {
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

      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.writePage));
      response.end();

      // let connection = mysql.createConnection(cmServer.mysqlInfo);
      // connection.connect();
      // if(target === "mine"){
      //   console.log("작성창");
      //   connection.query(
      //     `SELECT * FROM userinfo where id='${requestId}'`,
      //     (error, rows, fields) => {
      //       if (error) throw error;
      //       else {
      //         response.writeHead(200);
      //         response.write(`<script>
      //         const targetIdFromServer = '${requestId}';
      //         const dogNameFromServer = '${rows[0].dogName}';
      //         const dogGenderFromServer = '${rows[0].dogGender}';
      //       </script>`);
      //       response.write(htmlBox.htmlFunc(htmlBox.mypage));
      //       response.end();
      //     }
      //   }
      //   );
      // }else{
      //   connection.query(
      //     `SELECT * FROM userinfo where id='${target}'`,
      //     (error, rows, fields) => {
      //       if (error) throw error;
      //       else {
      //         response.writeHead(200);
      //         response.write(`<script>
      //         const targetIdFromServer = '${target}';
      //         const dogNameFromServer = '${rows[0].dogName}';
      //         const dogGenderFromServer = '${rows[0].dogGender}';
      //       </script>`);
      //       response.write(htmlBox.htmlFunc(htmlBox.writepage));
      //       response.end();
      //     }
      //   }
      //   );
      // }
      // connection.end();
    })
  } 
  
}