import htmlBox from "../../../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "../../commonServer.js";
import crypto from "crypto";
import * as JWT from "../../module/jsonWebToken.js";

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
      const hashPassword = crypto.createHash('sha512').update(userLoginPw).digest('hex');
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
              if (hashPassword === dataPw) {
                // 입력된 ID에 대해 입력된 PW값과 DB에서 조회된 PW값이 일치 할 경우
                console.log("로그인 성공");
                connection.end();
                response.writeHead(200);
                let newjwt = JWT.jwtCreate({id:dataId}).token
                const idCookie = "id=" + dataId;
                console.log(idCookie);
                response.write(
                  `<script>document.cookie ="${idCookie}"</script>`
                );
                response.write(
                  `<script>document.cookie ="jwt=${newjwt}"</script>`
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
                  `<script>window.location = '/'</script>`
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
              `<script>window.location = '/'</script>`
            );
            response.writeHead(200);
            response.write(msg);
            response.write(back);
            response.end();
          }
        }
      );
    });
  }else if(request.url === "/findUserInfoCheck"){
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let result = body.split(`\n`)
      let userinfo = {id : result[3].slice(0,-1),
        question : result[7].slice(0,-1),
        answer : result[11].slice(0,-1)};
      console.log(userinfo)
      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(`SELECT question, answer from userinfo where id = '${userinfo.id}'`,
      (error, data, fields) => {
        if (error) throw error;
        else{
          response.writeHead(200);
          if(data.length === 0){
            response.write(JSON.stringify({err:"noData"}))
          }
          else if(parseInt(userinfo.question) === data[0].question && userinfo.answer === data[0].answer){
            console.log("정보 일치");
            response.write(JSON.stringify(JWT.jwtCreate({id:userinfo.id})))
            // response.write()

          }else{
            console.log("정보 불일치");      
            response.write(JSON.stringify({err:"noData"}))
          }
          response.end(); 
        }
        
      }
      )      
      
    })
  }else if(request.url === "/updatepassword"){
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log(body);
      let targetId = JWT.jwtCheck(JSON.parse(body).token).id;
      let targetPW = JSON.parse(body).newpassword
      const hashedTargetPassword = crypto.createHash('sha512').update(targetPW).digest('hex');
      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(`UPDATE userinfo SET PW = '${hashedTargetPassword}' WHERE id = '${targetId}'`,(error, data, fields) =>{
        if(error) throw error;
        else{
          console.log("비밀번호 변경 완료");
          response.writeHead(200);
          response.end();
        }})
      })
    }
  
}