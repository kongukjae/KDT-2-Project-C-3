import http from "http";
import fs from "fs";

const server = http.createServer(function(request, response){
  // 최초접속
  if(request.method === 'GET' && request.url === '/'){
  
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
    <script src="/test2.js"></script>
    </body>
    </html>`);

    response.end();
  }
  else if(request.url.split('/')[1] === 'test2.js'){
      fs.readFile(`./test2.js`, function (err, data) {
        response.writeHead(200);
        console.log(re);
        response.write(data);
        response.end();
      });
    }

});


  // 서버 포트 설정
  server.listen(2080, function(error) {
  if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
  });