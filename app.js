import http from 'http';
import fs from 'fs';
import mysql from 'mysql';
import htmlBox from "./htmlBox.js";
const mysqlInfo = {
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'signup'
}

const server = http.createServer(function(request, response) {
  //로그인
  let body = '';
  if(request.method === 'GET' && request.url === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write(htmlBox.htmlFunc(htmlBox.loginBody));
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
      let sqlValId = [userLoginId];
      // where절 사용을 위한 query 변수화
      let sql = 'SELECT ifnull(max(userID), 0) userID, userPW from LoginData where userID = ?';
      // ifnull(컬럼명, 출력값) -> 만약 데이터가 null일 경우 출력값을 대신 출력
      // ifnull(max(userID), 0) -> max(userID) : userID 중에 가장 높은 값을 출력 -> userID에 존재하지 않는 값이 들어온 경우 가장 높은 값이 없다 -> null 출력 -> ifnull에 의해 0 출력 

      connection.query(sql, sqlValId, (error, data, fields) => {
        console.log('연결 시작');
        if (error) throw error;
        console.log('User info: ', data);
        // 테이블 내부 데이터에 접근 실험
        console.dir(data[0].userID); //'testid01'
        let dataId = data[0].userID;
        let dataPw = data[0].userPW;
        if (data[0].userID === '0') {
          console.log('가입되지 않은 회원입니다');
          connection.end();
          response.writeHead(200);
          response.write('Not members');
          response.end();
        } else if(userLoginId === dataId) {
          if(userLoginPw === dataPw) {
            console.log('로그인 성공');
            connection.end();
            response.writeHead(200);
            response.write('login success');
            response.end();
          } else {
            console.log('비밀번호 확인');
            connection.end();
            response.writeHead(200);
            response.write('incorrect PW');
            response.end();
          }
        }
        //   console.log('존재하지 않는 회원입니다');
        // }
      });
      // connection 끝
      // connection.end();

      // response.writeHead(200);
      // response.write('success');
      // response.end();
    })
    // response.writeHead(200);
    // response.write('success');
    // response.end();
  }

  //메인
  if(request.method === 'GET' && request.url === '/main'){
    //const b = request.url.split("/")
    //console.dir(b)
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(htmlBox.htmlFunc(htmlBox.mapBody));
  }
  else if(request.url.split('/')[1] === 'mainStyle.js'){
      fs.readFile(`./mainStyle.js`, function (err, data) {
        response.writeHead(200);
        response.write(data);
        response.end();
      });
    }
  else if(request.url.split('/')[1] === 'map.js'){
    fs.readFile(`./map.js`, function (err, data) {
        response.writeHead(200);
        response.write(data);
        response.end();
      });
    }
 


  //회원가입
  if(request.method === 'GET' && request.url === '/signUp') {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.signupPage))
    response.end();
  }
  if(request.method === 'GET' && request.url.startsWith('/signupstyle')){
    fs.readFile(`./signup.js`, function(err, data){
      response.writeHead(200);
      response.write(data);
      response.end();
    })
  }
  if(request.method === 'GET' && request.url.startsWith('/signupResultStyle')){
    fs.readFile(`./signupResult.js`, function(err, data){
      response.writeHead(200);
      response.write(data);
      response.end();
    })
  }
  if(request.method === 'GET' && request.url.startsWith('/dupCheck')){
    let checkID = request.url.split("=")[1]
    let connection = mysql.createConnection(mysqlInfo);
    connection.connect();
    connection.query(`SELECT * FROM userInfo WHERE id = "${checkID}"`, (error, rows, fields) => {
      if (error) throw error;
      else{
        response.writeHead(200);
        response.end(String(rows));
      }
    });
  }

  if(request.method === 'POST' && request.url.startsWith('/signUpResult')){
    let body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      let bodycarrier = body.split("&");
      let bodySplit = [];
      for(let i = 0;i<bodycarrier.length;i++){
        bodySplit.push(bodycarrier[i].split("="))
      };
      let connection = mysql.createConnection(mysqlInfo);
      connection.connect();
      connection.query(`INSERT INTO userInfo(id,PW,question,answer,dogName,dogGender) values("${bodySplit[0][1]}","${bodySplit[1][1]}",${Number(bodySplit[2][1])},"${decodeURIComponent(bodySplit[3][1])}","${decodeURIComponent(bodySplit[4][1])}",${Number(bodySplit[5][1])})`, (error) => {
        if (error) throw error;
        console.log("정상작동");
      });

      connection.query('SELECT * FROM userInfo', (error, rows, fields) => {
        if (error) throw error;
        else{
          console.log(rows);
        }
      });

      connection.end();
      
      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.signUpResult))
      response.end();
      }
    );
    }
  })
  // 서버 포트 설정
  server.listen(2080, function(error) {
    if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
  });
