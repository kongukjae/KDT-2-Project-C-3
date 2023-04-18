import http from "http";
import fs from "fs";
import mysql from "mysql";
import htmlBox from "./common/htmlBox.js";
// import ValueCheck from "../ValueCheck.js";
import { parse } from "path";
import callMain from "./httpServer/callMain.js";
import cmServer from "./httpServer/commonServer.js";
import signupResult from "./httpServer/signupResultRoute.js";
import dupCheck from "./httpServer/dupCheckRoute.js";
import callPostImage from "./httpServer/callPostImage.js";
import callPostLogin from "./httpServer/callPostLogin.js";
import callPostDangMap from "./httpServer/callPostDangMap.js";

import callLoginGet from "./httpServer/callLoginGet.js";
import dangMapServer from "./httpServer/dangMapServer.js";
import myPagePost from "./httpServer/myPagePost.js";
// import myPage from "./httpServer/myPage.js";
import followSearch from "./httpServer/callPostFollowSearch.js";
import secondHand from "./httpServer/backend_bottommenu_second_hand_get.js";
import myKeepPost from "./httpServer/callpostKeep.js";
// import mapMerker from "./mapMerker.js";
// import markerJson from "./markerJson.json" assert { type: "json" };

//jwt를 구현하기 위해선 다음 두 모듈 필요
//npm install rand-token
//npm install jsonwebtoken

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

// const mysqlInfo = {
//   host: "192.168.0.93",
//   user: "guest",
//   password: "0000",
//   database: "mungta",
// };

const server = http.createServer(function (request, response) {
  //로그인
  let body = "";
  if (request.method === "GET") {
    callLoginGet(request, response);

    //메인화면
    callMain(request, response);
    
    //회원가입
    if (request.url === "/signUp") {
      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.signupPage));
      response.end();
    }

    if (request.url === "/friends/myKeepStyle.js") {
      cmServer.fileDirectory(`/friends/myKeepStyle.js`, response);
    }    


    if (request.url === "/init_user/signupstyle.js") {
      cmServer.fileDirectory(`init_user/signup.js`, response);
    }
    if (request.url === "/init_user/signupResultStyle.js") {
      cmServer.fileDirectory(`init_user/signupResult.js`, response);
    }
    if (request.url === "/favicon") {
      cmServer.fileDirectory(`graphic/dogpaw.png`, response);
    }
    if (request.url.startsWith("/dupCheck")) {
      dupCheck(request, response);
    }else if (request.url === "/friends/mypageStyle.js") {
      cmServer.fileDirectory(`friends/mypageStyle.js`, response);
    }else if (request.url === "/friends/yourpageStyle.js") {
      cmServer.fileDirectory(`friends/yourpageStyle.js`, response);
    }
    if (request.url.startsWith("/myMarker")) {
      myMarker(request, response)
    }


    //댕맵 불러오기
    dangMapServer(request, response);
    
    //중고거래 페이지
    secondHand(request, response);


  }

  // post request
  if (request.method === 'POST') {
    //마이페이지

    myKeepPost(request,response);
    
    myPagePost(request, response);
    //업로드, 유저 이미지
    callPostImage(request, response);

    //댕맵 - 지도에 발자국 표시, 발자국 드래그
    callPostDangMap(request, response);

    //로그인
    callPostLogin(request, response);
    if (request.url.startsWith("/signUpResult")) {
      signupResult(request, response)
    }

    followSearch(request, response);
  }
}
);


// 서버 포트 설정
server.listen(2080, function (error) {
  if (error) {
    console.error("서버 안돌아감");
  } else {
    console.log("서버 돌아감");
  }
});
