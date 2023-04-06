import mysql from "mysql";
import cmServer from "./commonServer.js";



export default function callPostImage(request, response) {
  if(request.url.startsWith('/uploadImage')){
    let body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      console.log("image uploading")
      let result = body.split("\r")
      console.log(result[3].slice(1));
      console.log(result[7].slice(1));

      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(`INSERT INTO userimage VALUES('${result[3].slice(1)}','${result[7].slice(1)}')`, (error, rows, fields) => {
      if (error) throw error;
      else{
        response.writeHead(200);
        response.end();
        }
      });
      connection.end();

      console.log("이미지 저장 완료");

    })}
    if(request.url.startsWith('/sendUserImage'))
    {
      
      let body = '';
      request.on('data', function (data) {
        body = body + data;
      });
      request.on('end', function () {
        console.log("이미지 요청 받는 중")
        let connection = mysql.createConnection(cmServer.mysqlInfo);
        connection.connect();
        connection.query(`SELECT image FROM userimage WHERE id='${body.split("=")[1]}'`, (error, rows, fields) => {
        if (error) throw error;
        else{
          response.writeHead(200);
          if(rows.length === 0){
            response.end(`https://i.ibb.co/8gB9yVS/img-546302.png`);
          }else{
            response.end(rows[0].image);
          }
        }
      });
      connection.end();
    })}
}