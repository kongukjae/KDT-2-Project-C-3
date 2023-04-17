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
 
}
// 서버사이드 코드이다.듈 임포트:

// 필요한 모듈들을 임포트합니다. htmlBox는 HTML 템플릿을 제공하는 모듈, mysql은 MySQL 데이터베이스와의 연결을 관리하는 모듈, cmServer는 일반적인 서버 설정을 제공하는 모듈, JWT는 JSON Web Token을 다루는 모듈입니다.
// myKeep 함수:

// 이 함수는 클라이언트의 HTTP 요청을 처리하는데 사용됩니다. 클라이언트의 요청 URL에 따라 다양한 작업을 수행합니다.
// "/mykeep" 요청: 클라이언트로부터 받은 JWT 토큰을 검증하고, 사용자 정보를 데이터베이스에서 가져옵니다. 가져온 사용자 정보를 클라이언트에게 보내주며, 사용자의 마이페이지를 렌더링합니다.
// "/followRequest" 요청: 클라이언트로부터 받은 JWT 토큰과 팔로우 대상을 데이터베이스에 저장합니다. 이 작업은 사용자가 다른 사용자를 팔로우하고자 할 때 수행됩니다.
// "/unFollowRequest" 요청: 클라이언트로부터 받은 JWT 토큰과 팔로우 해제 대상을 데이터베이스에서 제거합니다. 이 작업은 사용자가 팔로우를 취소하고자 할 때 수행됩니다.
// "/followCheck" 요청: 클라이언트로부터 받은 JWT 토큰과 팔로우 대상을 확인하여, 현재 사용자가 대상 사용자를 팔로우하고 있는지 여부를 확인합니다. 이 작업은 팔로우 상태를 확인하고자 할 때 수행됩니다.
// 이러한 작업들을 통해 사용자의 마이페이지 및 팔로우 관련 기능들을 처리하고 있습니다. 코드는 클라이언트의 요청을 받아 적절한 작업을 수행한 후, 결과를 클라이언트에게 반환하는 역할을 수행합니다.
