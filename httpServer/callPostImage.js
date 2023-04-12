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
      let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(`SELECT * FROM userimage WHERE id ='${result[3].slice(1).split(";")[0]}'`, (error, rows, fields) => {
      if (error) throw error;
      else{
        if(rows.length === 0){
          console.log("이전 이미지 없음")
          connection.query(`INSERT INTO userimage VALUES('${result[3].slice(1).split(";")[0]}','${result[7].slice(1)}')`, (error, rows, fields) => {
              if (error) throw error;
              else{
                response.writeHead(200);
                response.end();
                }
              });
              connection.end();
        }else{
          connection.query(`UPDATE userimage SET image='${result[7].slice(1)}' WHERE id='${result[3].slice(1).split(";")[0]}'`, (error, rows, fields) => {
              if (error) throw error;
              else{
                console.log("이미지 변경")
                response.writeHead(200);
                response.end();
                }
              });
              connection.end();
        }
        }
      });
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
        connection.query(`SELECT image FROM userimage WHERE id='${body.split("=")[1].split(";")[0]}'`, (error, rows, fields) => {
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