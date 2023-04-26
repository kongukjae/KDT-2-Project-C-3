import mysql from "mysql";
import cmServer from "../backEnd/commonServer.js";


export default function putUserImageDirectoryOnMySQL(request, response, tableName,columnName,id, direc){
  let connection = mysql.createConnection(cmServer.mysqlInfo);
      connection.connect();
      connection.query(`SELECT ${columnName} FROM ${tableName} WHERE id ='${id}'`, (error, rows, fields) => {
      if (error) throw error;
      else{
        console.log(rows);
        if(rows.length === 0){
          console.log("이전 이미지 없음")
          connection.query(`INSERT INTO ${tableName} VALUES('${id}','${direc}')`, (error, rows, fields) => {
            if (error) throw error;
            else{
              response.writeHead(200);
              response.end();
              }
            ;
            connection.end();
          }
          )
        }else{
          connection.query(`UPDATE ${tableName} SET image='${direc}' WHERE id='${id}'`, (error, rows, fields) => {
            if (error) throw error;
            else{
              console.log("이미지 변경")
              response.writeHead(200);
              response.end();
              }
            });
            connection.end();
      }
  }})
} 
