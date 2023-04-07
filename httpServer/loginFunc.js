// import mysql from "mysql";
// import crypto from "crypto";


// export default function loginDB(body) {
//   let idSplit = body.split("&")[0];
//   let pwSplit = body.split("&")[1];
//   let userLoginId = idSplit.split("=")[1];
//   let userLoginPw = pwSplit.split("=")[1];
//   console.log(userLoginId);
//   console.log(userLoginPw);
  
//   // MySQL과 연동 , UserLoginData DB에 접속
//   let conn = mysql.createConnection(cmServer.mysqlInfo);

//   // connection 시작
//   conn.connect();

//   // DB에 접근 후 데이터 조회
//   conn.query(
//     `SELECT id, PW from userinfo where id = '${userLoginId}'`,
//     (error, data, fields) => {
//       if (error) throw error;
//       if (data.length > 0) {
//         let dataId = data[0].id; //DB에 저장된 ID값
//         let dataPw = data[0].PW; //DB에 저장된 PW값
//         if (userLoginId === dataId) {
//           // 입력된 ID가 DB에 있을 경우
//           const hashPassword = crypto.createHash('sha512').update(userLoginPw).digest('hex');
//           console.log("암호화된 비밀번호 :" + hashPassword)
//           if (hashPassword === dataPw) {
//             // 입력된 ID에 대해 입력된 PW값과 DB에서 조회된 PW값이 일치 할 경우
//             console.log("로그인 성공");
//             conn.end();
//             response.writeHead(200);
//             const idCookie = "id=" + dataId;
//             console.log(idCookie);
//             response.write(`<script>document.cookie ="${idCookie}"</script>`);
//             response.write("<script>window.location='/main'</script>"); // 이후 병합시 main 페이지로 연결
//             response.end();
//           } else {
//             // 입력된 ID에 대해 입력된 PW값과 DB에서 조회된 PW값이 일치 하지 않을 경우
//             console.log("비밀번호가 틀렸습니다");
//             conn.end();
//             const msg = htmlBox.htmlFunc(
//               `<script>window.alert('비밀번호가 틀렸습니다')</script>`
//             );
//             const back = htmlBox.htmlFunc(
//               `<script>window.location = 'http://localhost:2080'</script>`
//             );
//             response.writeHead(200);
//             response.write(msg);
//             response.write(back);
//             response.end();
//           }
//         }
//       } else {
//         console.log("가입되지 않은 회원입니다");
//         conn.end();
//         const msg = htmlBox.htmlFunc(
//           `<script>window.alert('가입되지 않은 회원입니다')</script>`
//         );
//         const back = htmlBox.htmlFunc(
//           `<script>window.location = 'http://localhost:2080'</script>`
//         );
//         response.writeHead(200);
//         response.write(msg);
//         response.write(back);
//         response.end();
//       }
//     }
//   );
// }
