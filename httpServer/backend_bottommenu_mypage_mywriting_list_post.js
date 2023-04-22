import cmServer from "./commonServer.js";
import mysql from "mysql";
import * as JWT from "./jsonwebtoken.js";  

export default function myListMyWriting(request, response) {
  if (request.url===('/second')) {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log('cute') //확인용

      let result = body.split("&");
      console.log(result);
      const jsonwebtoken = result[0].split("=")[1];
      const jwtunlockId = JWT.jwtCheck(jsonwebtoken).id;
     console.log("여기는되냐?");
     console.log( result[1].split("=")[1]);
  

      const text = result[1].split("=")[1];
  
    let conn = mysql.createConnection(cmServer.mysqlInfo);
    conn.connect();
    conn.query(
      `select id,detail from second_hand where id='${jwtunlockId}'order by '${text}' desc limit 5  `,
      function (err, data) {
        if (err) throw err;
        else {
          console.log(data);
          response.writeHead(200,{'content-Type':'application/json'});
          response.write(JSON.stringify(data));
          response.end();
        }
      }
    );
  });
// } else if (request.url === '/Five') { // else문 수정
//   let body = "";
//   request.on("data", function (data) {
//     body = body + data;
//   });
//   request.on("end", function () {
//     console.log('cute') //확인용

//     let result = body.split("&");
//     console.log(result);
//     const jsonwebtoken = result[0].split("=")[1];
//     const jwtunlockId = JWT.jwtCheck(jsonwebtoken).id;
//     console.log("여기는되냐?2");
//     console.log(result[1].split("=")[1]);

//     const text = result[1].split("=")[1];

//     let conn = mysql.createConnection(cmServer.mysqlInfo);
//     conn.connect();
//     conn.query(
//       `select cm_id, cm_detail from cm_post where id='${jwtunlockId}' order by '${text}' desc limit 5`,
//       function (err, data) {
//         if (err) throw err;
//         else {
//           console.log(data);
//           response.writeHead(200, { 'content-Type': 'application/json' });
//           response.write(JSON.stringify(data));
//           response.end();
//         }
//       }
//     );
//     conn.end();
//   });
// }
}
}
  // response.write();






// `<script>
//   let target = document.getElementById('mainBox');
//   target.style.display = 'none';
//   </script>`