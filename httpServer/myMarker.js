import cmServer from "./commonServer.js";
import mysql from "mysql";

export default function myMarker() {
  let connection = mysql.createConnection(cmServer.mysqlInfo);
  let checkID = request.url.split("=")[1];
  console.log(checkID);

  connection.connect();
  connection.query(`select * from map_tables`)

}