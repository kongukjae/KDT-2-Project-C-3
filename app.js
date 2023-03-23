import http from "http";
import fs from "fs";
import mysql from "mysql";


function htmlBox(data){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
    <title>Document</title>
    <style>
      *{
        box-sizing: border-box;
        padding: 0%;
        margin: 0%;
        font-family: 'Noto Sans KR', sans-serif;
      }
    </style>
  </head>
  <body>
      ${data}
  </body>
  </html>`
}
function imagetag(link){
  return `<img src="/${link}" alt="" style = "width:50px"></img>`
}

const innerbody = {
  signupPage : '<script src="./signupstyle.js"></script>',
  signUpResult : '<script src="./signupResultStyle.js"></script>'
}



const server = http.createServer(function(request, response){
  // 최초접속
  if(request.method === 'GET' && request.url === '/signUp') {
    response.writeHead(200);
    response.write(htmlBox(innerbody.signupPage))
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
    let connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '0000',
      database : 'signup'
    });
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
      let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '0000',
        database : 'signup'
      });
      connection.connect();
      connection.query(`INSERT INTO userInfo(id,PW,question,answer,dogName,dogGender) values("${bodySplit[0][1]}","${bodySplit[1][1]}",${Number(bodySplit[2][1])},"${bodySplit[3][1]}","${bodySplit[4][1]}",${Number(bodySplit[5][1])})`, (error) => {
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
      response.write(htmlBox(innerbody.signUpResult))
      response.end();
      }
    );
  }
  });


  // 서버 포트 설정
  server.listen(2085, function(error) {
  if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
  });