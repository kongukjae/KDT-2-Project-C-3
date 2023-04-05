import http from "http";
import fs from "fs";
import mysql from "mysql";
import htmlBox from "../htmlBox.js";
import ValueCheck from "../ValueCheck.js";
import { parse } from "path";
import callMain from "./callMain.js";
import cmServer from "./commonServer.js";
import signupResult from "./signupResultRoute.js";
import dupCheck from "./dupCheckRoute.js";
import callPostImage from "./callPostImage.js";
import callPostLogin from "./callPostLogin.js";
import callPostDangMap from "./callPostDangMap.js";

import callLoginGet from "./callLoginGet.js";

// import mapMerker from "./mapMerker.js";
// import markerJson from "./markerJson.json" assert { type: "json" };

//db 연동이 되어있으니 아래 테이블을 따로 만들 필요 없음
// 집에서 수정하려면 만들어야함
/* 필요한 테이블 이름 : [
  CREATE TABLE userinfo(
    id varchar(20),
    PW varchar(20),
    question int,
    answer varchar(20),
    dogName varchar(20),
    dogGender int,

    primary key(id)
  );
  CREATE TABLE map_tables(
    latitude decimal(17,14),
    longitude decimal(17,14)
  )
]*/

const mysqlInfo = {
  host: "192.168.0.93",
  user: "guest",
  password: "0000",
  database: "mungta",
};

const server = http.createServer(function (request, response) {
  //로그인
  let body = "";
  if (request.method === "GET") {
    callLoginGet(request, response);

    //메인화면
    callMain(request, response);

    //회원가입
    let splitURLbyJin = request.url.split("/")[1];
    if (splitURLbyJin === "signUp") {
      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.signupPage));
      response.end();
    }

    if (splitURLbyJin === "signupstyle.js") {
      cmServer.fileDirectory(`signup.js`, response);
    }
    if (splitURLbyJin === "signupResultStyle.js") {
      cmServer.fileDirectory(`signupResult.js`, response);
    }
    if (splitURLbyJin === "favicon") {
      cmServer.fileDirectory(`graphic/dogpaw.png`, response);
    }
    if (request.url.startsWith("/dupCheck")) {
      dupCheck(request, response);
    }


    //댕맵
    if (request.url === "/map") {
      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.dangMap));
      response.end();
    } else if (request.url.startsWith("/dangMap")) {
      fs.readFile(`../dangMap.js`, function (err, data) {
        response.writeHead(200);
        response.write(data);
        response.end();
      });
      // console.log("url == " + request.url);
    }
    else if (request.url.startsWith("/frFootprint")) {
      console.log("url == " + request.url);
      let checkID = request.url.split("=")[1];
      let connection = mysql.createConnection(mysqlInfo);
      let count;
      let fMarkerArr = {};
      connection.connect();
      console.log("url ==" + request.url);

      connection.query(
        `select count(*) as count from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = "${checkID}"`,
        function (err, data) {
          if (err) throw err;
          else {
            count = data[0].count;
            console.log("친구 발자국 수: " + count);
            // response.writeHead(200);
            // response.end(JSON.stringify(data));
            // console.log(JSON.stringify(data));
          }
        }
      );

      connection.query(
        `select latitude, longitude, id from map_tables join fr_list on fr_list.fr_id = map_tables.id where user_id = "${checkID}"`,
        (err, rows) => {
          if (err) throw err;
          else {
            for (let i = 0; i < count; i++) {
              let fArr = [];
              fArr.push(rows[i].latitude, rows[i].longitude, rows[i].id);
              fMarkerArr[i] = fArr;
            }
            response.writeHead(200);
            response.write(JSON.stringify(fMarkerArr));
            response.end();
            console.log(JSON.stringify(fMarkerArr));
          }
        }
      );
      connection.end();
    }
    else if (request.url.split('/')[2] === 'dangMapSlide') {
      fs.readFile(`../dangMapSlide.js`, function (err, data) {
        response.writeHead(200);
        response.write(data);
        response.end();
      })
    }

    //마이페이지
    if (request.url.startsWith('/mypage?')) {
      let target = request.url.split("=")[1]
      let connection = mysql.createConnection(mysqlInfo);
      connection.connect();
      connection.query(`SELECT * FROM userinfo where id='${target}'`, (error, rows, fields) => {
        if (error) throw error;
        else {
          response.writeHead(200);
          response.write(`<script>
            const targetIdFromServer = '${target}';
            const dogNameFromServer = '${rows[0].dogName}';
            const dogGenderFromServer = '${rows[0].dogGender}';
          </script>`)
          response.write(htmlBox.htmlFunc(htmlBox.mypage))
          response.end();
        }
      });
      connection.end();
    }
    else if (request.url.startsWith('/mypageStyle')) {
      fs.readFile(`../mypageStyle.js`, function (err, data) {
        response.writeHead(200);
        response.write(data);
        response.end();
      })
    }
    if (request.url.startsWith('/followRequest')) {
      let target = request.url.split("?")[1]
      let targetArr = target.split("&")
      let connection = mysql.createConnection(mysqlInfo);
      connection.connect();
      connection.query(`INSERT INTO fr_list_testbyJin VALUES('${targetArr[0].split("=")[1]}','${targetArr[1].split("=")[1]}')`, (error, rows, fields) => {
        if (error) throw error;
        else {
          response.writeHead(200);
          response.end();
        }
      });
      connection.end();
    }
  }

  // post request
  if (request.method === 'POST') {

    //업로드, 유저 이미지
    callPostImage(request, response);
    // if (request.url.startsWith('/loadUserImage')) {
    //   let body = '';
    //   request.on('data', function (data) {
    //     body = body + data;
    //   });
    //   request.on('end', function () {
    //     console.log("이미지 요청 받는 중")
    //     let connection = mysql.createConnection(mysqlInfo);
    //     connection.connect();
    //     connection.query(`SELECT image FROM userimage WHERE id='${body.split("=")[1]}'`, (error, rows, fields) => {
    //       if (error) throw error;
    //       else {
    //         response.writeHead(200);
    //         response.end(rows[0].image);
    //       }
    //     });
    //     connection.end();
    //   })
    // }

    //댕맵 - 지도에 발자국 표시, 발자국 드래그
    callPostDangMap(request, response);
    callPostLogin(request, response);
    if (request.url.startsWith("/signUpResult")) {
      signupResult(request, response)
    }
  }
});



// 서버 포트 설정
server.listen(2080, function (error) {
  if (error) {
    console.error("서버 안돌아감");
  } else {
    console.log("서버 돌아감");
  }
});
