import http from "http";
import fs from "fs";
import mysql from "mysql";
import htmlBox from "./htmlBox.js";

const server = http.createServer(function(request, response){
  // 최초접속
  if(request.method === 'GET' && request.url === '/'){
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
});

  let coo = [36.35, 127.385];
  let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'map_DB'
  });

  conn.connect();
  conn.query(`insert into map_tables(latitude, longitude) values(${coo[0]}, ${coo[1]})`,
  function(err){
    if(err) throw err;
    else console.log("정상");
  });
  conn.query('select * from map_tables', (error, rows) => {
    if (error) throw error;
    else{
      console.log(rows);
    }
  });
  conn.end();


  // 서버 포트 설정
  server.listen(2080, function(error) {
  if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
  });