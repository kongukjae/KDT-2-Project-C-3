import cmServer from "../../commonServer.js";
import mysql from "mysql";

export default function dupCheck(request, response) {
  let checkID = request.url.split("=")[1];
  let connection = mysql.createConnection(cmServer.mysqlInfo);
  connection.connect();
  connection.query(
    `SELECT * FROM userInfo WHERE id = "${checkID}"`,
    (error, rows, fields) => {
      if (error) throw error;
      else {
        response.writeHead(200);
        response.end(String(rows));
      }
    }
  );
}

