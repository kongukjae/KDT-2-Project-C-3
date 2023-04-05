import htmlBox from "../htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";

export default function callPostLogin(request, response) {
  let body = "";
  if (request.url.startsWith("/login")) {
    console.log("/login 페이지 진입");
    request.on("data", function (data) {
      body = body + data;
      console.log(body);
    });
    request.on("end", function () {
      let idSplit = body.split("&")[0];
      let pwSplit = body.split("&")[1];
      let userLoginId = idSplit.split("=")[1];
      let userLoginPw = pwSplit.split("=")[1];
      console.log(userLoginId);
      console.log(userLoginPw);

      // MySQL과 연동 , UserLoginData DB에 접속
      let connection = mysql.createConnection(cmServer.mysqlInfo);

      // connection 시작
      connection.connect();

      // where절 사용을 위한 userLoginId 변수 배열화
      // let sqlValId = [userLoginId];
      // where절 사용을 위한 query 변수화
      // let sql = 'SELECT ifnull(max(userID), 0) userID, userPW from LoginData where userID = ?';
      // ifnull(컬럼명, 출력값) -> 만약 데이터가 null일 경우 출력값을 대신 출력
      // ifnull(max(userID), 0) -> max(userID) : userID 중에 가장 높은 값을 출력 -> userID에 존재하지 않는 값이 들어온 경우 가장 높은 값이 없다 -> null 출력 -> ifnull에 의해 0 출력

      // DB에 접근 후 데이터 조회

      connection.query(
        `SELECT id, PW from userinfo where id = '${userLoginId}'`,
        (error, data, fields) => {
          if (error) throw error;
          console.log("실행");
          console.log(data);
          if (data.length > 0) {
            let dataId = data[0].id; //DB에 저장된 ID값
            let dataPw = data[0].PW; //DB에 저장된 PW값
            if (userLoginId === dataId) {
              // 입력된 ID가 DB에 있을 경우
              if (userLoginPw === dataPw) {
                // 입력된 ID에 대해 입력된 PW값과 DB에서 조회된 PW값이 일치 할 경우
                console.log("로그인 성공");
                connection.end();
                response.writeHead(200);

                const idCookie = "id=" + dataId;
                console.log(idCookie);
                response.write(
                  `<script>document.cookie ="${idCookie}"</script>`
                );
                response.write("<script>window.location='/main'</script>"); // 이후 병합시 main 페이지로 연결
                response.end();
              } 
              else {
                // 입력된 ID에 대해 입력된 PW값과 DB에서 조회된 PW값이 일치 하지 않을 경우
                console.log("비밀번호가 틀렸습니다");
                connection.end();

                const msg = htmlBox.htmlFunc(
                  `<script>window.alert('비밀번호가 틀렸습니다')</script>`
                );
                const back = htmlBox.htmlFunc(
                  `<script>window.location = 'http://localhost:2080'</script>`
                );
                response.writeHead(200);
                response.write(msg);
                response.write(back);
                response.end();
              }
            }
          } 
          else {
            console.log("가입되지 않은 회원입니다");
            connection.end();
            const msg = htmlBox.htmlFunc(
              `<script>window.alert('가입되지 않은 회원입니다')</script>`
            );
            const back = htmlBox.htmlFunc(
              `<script>window.location = 'http://localhost:2080'</script>`
            );
            response.writeHead(200);
            response.write(msg);
            response.write(back);
            response.end();
          }
        }
      );
    });
  }
}