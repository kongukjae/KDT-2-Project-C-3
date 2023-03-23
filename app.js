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
      response.writeHead(200);
      console.log(data);
      response.write(data);
      response.end();
    })
  } else if(request.method === 'GET' && request.url.startsWith('/resource/MainDog')) {
    // MainDogImg.png 파일 read
    fs.readFile(`./resource/MainDogImg.jpg`, function(err, data) {
      response.writeHead(200);
      console.log(data);
      response.write(data);
      response.end();
    })
  }
})

  // 서버 포트 설정
  server.listen(2082, function(error) {
    if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
    });

// MySQL과 연동
const connection = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : '0000',
  database : 'UserLoginData'
});

connection.connect();

connection.query('SELECT * from LoginData', (error, rows, fields) => {
  if (error) throw error;
  console.Console.log('User info: ', rows);
});

connection.end();