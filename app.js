import http from 'http';
import fs from 'fs';
import mysql from 'mysql';

// html 구조
function htmlBox(data) {
  return `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id='root'></div>
    ${data}
  </body>
  </html>
  `
}

// data 안에 들어갈 내용물
const innerbody = {
  login: `<script src="./loginPage.js"></script>`
}

const server = http.createServer(function(request, response) {
  // 최초접속
  let body = '';
  if(request.method === 'GET' && request.url === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write(htmlBox(innerbody.login));
    response.end();
  } else if(request.url === '/loginPage.js'){
    // loginPage.js 파일 read
    fs.readFile('./loginPage.js', function(err, data) {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.write(data);
      response.end();
    })
  } else if(request.method === 'GET' && request.url.startsWith('/resource/MainLogo')) {
    // MainLogo.png 파일 read
    fs.readFile(`./resource/MainLogo.png`, function(err, data) {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.write(data);
      response.end();
    })
  } else if(request.method === 'GET' && request.url.startsWith('/resource/MainDog')) {
    // MainDogImg.png 파일 read
    fs.readFile(`./resource/MainDogImg.jpg`, function(err, data) {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.write(data);
      response.end();
    })
  }
  if(request.method === 'POST' && request.url.startsWith('/login')) {
    console.log('/login 페이지 진입');
    request.on('data', function(data) {
      body = body + data;
      console.log(body);
    });
    request.on('end', function() {
      let idSplit = body.split('&')[0];
      let pwSplit = body.split('&')[1];
      let userLoginId = idSplit.split('=')[1];
      let userLoginPw = pwSplit.split('=')[1];
      console.log(userLoginId);
      console.log(userLoginPw);

      // MySQL과 연동 , UserLoginData DB에 접속
      const connection = mysql.createConnection({
        host  : 'localhost',
        user  : 'root',
        password  : '0000',
        database : 'UserLoginData'
      });
      
      // connection 시작
      connection.connect();

      // where절 사용을 위한 userLoginId 변수 배열화
      // let sqlValId = [userLoginId];
      // where절 사용을 위한 query 변수화
      // let sql = 'SELECT ifnull(max(userID), 0) userID, userPW from LoginData where userID = ?';
      // ifnull(컬럼명, 출력값) -> 만약 데이터가 null일 경우 출력값을 대신 출력
      // ifnull(max(userID), 0) -> max(userID) : userID 중에 가장 높은 값을 출력 -> userID에 존재하지 않는 값이 들어온 경우 가장 높은 값이 없다 -> null 출력 -> ifnull에 의해 0 출력 

      // DB에 접근 후 데이터 조회
      connection.query(`SELECT userID, userPW from LoginData where userID = '${userLoginId}'`, (error, data, fields) => {
        if (error) throw error;
        console.log("실행");
        console.log(data);
        if(data.length > 0) {
          let dataId = data[0].userID; //DB에 저장된 ID값
          let dataPw = data[0].userPW; //DB에 저장된 PW값
          if(userLoginId === dataId) { // 입력된 ID가 DB에 있을 경우
            if(userLoginPw === dataPw) {  // 입력된 ID에 대해 입력된 PW값과 DB에서 조회된 PW값이 일치 할 경우
              console.log('로그인 성공');
              connection.end();
              response.writeHead(200);
              response.write('login success'); // 이후 병합시 main 페이지로 연결
              response.end();
            } else { // 입력된 ID에 대해 입력된 PW값과 DB에서 조회된 PW값이 일치 하지 않을 경우
              console.log('비밀번호가 틀렸습니다');
              connection.end();
              const msg = htmlBox(`<script>window.alert('비밀번호 확인')</script>`);
              const back = htmlBox(`<script>window.location = 'http://localhost:2082'</script>`);
              response.writeHead(200);
              response.write(msg);
              response.write(back);
              response.end();
            }
          }
        } else {
          console.log('가입되지 않은 회원입니다');
          connection.end();
          const msg = htmlBox(`<script>window.alert('가입되지 않은 회원입니다')</script>`);
          const back = htmlBox(`<script>window.location = 'http://localhost:2082'</script>`);
          response.writeHead(200);
          response.write(msg);
          response.write(back);
          response.end();
        }
      })
    })
  }
});

  // 서버 포트 설정
  server.listen(2082, function(error) {
    if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
    });
