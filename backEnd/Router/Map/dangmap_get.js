import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";
// import fs from 'fs';
import mysql from "mysql";


export default function dangmap_HTML(request, response) {

  if (request.url === "/map") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.dangMap));
    response.end();
  }else if(request.url === '/publicChatLocation'){
   
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    connection.connect();
    connection.query(`SELECT value FROM public_chat_list WHERE type = 'chatList'`, (error, rows, fields) => {
      if (error) throw error;
      else{
        response.writeHead(200);
        response.end(rows[0].value);
    }})
    connection.end();
  }
}