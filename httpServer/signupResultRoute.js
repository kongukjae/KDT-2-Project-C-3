import htmlBox from "../htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";
import ValueCheck from "../ValueCheck.js";
import crypto from "crypto";

export default function signUpResult(request, response) {

  let body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    let bodycarrier = body.split("&");
    let bodySplit = [];
    for (let i = 0; i < bodycarrier.length; i++) {
      bodySplit.push(bodycarrier[i].split("="));
    }
    const hashPassword = crypto.createHash('sha512').update(bodySplit[1][1]).digest('hex');
    console.log(hashPassword.length)
    let userInfoCheck = new ValueCheck(
      bodySplit[0][1],
      hashPassword,
      bodySplit[2][1],
      decodeURIComponent(bodySplit[3][1]),
      decodeURIComponent(bodySplit[4][1]),
      bodySplit[5][1]
    );
    console.log(userInfoCheck);
    let connection = mysql.createConnection(cmServer.mysqlInfo);
    connection.connect();
    connection.query(
      `INSERT INTO userInfo(id,PW,question,answer,dogName,dogGender) values("${userInfoCheck._id}","${userInfoCheck.pw}",${userInfoCheck.qe},"${userInfoCheck._as}","${userInfoCheck._dogName}",${userInfoCheck.dogGender})`,
      (error) => {
        if (error) throw error;
        console.log("정상작동");
      }
    );

    connection.query("SELECT * FROM userInfo", (error, rows, fields) => {
      if (error) throw error;
      else {
        console.log(rows);
      }
    });

    connection.end();

    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.signUpResult));
    response.end();
  });
}