import http from "http";
import {Server} from "socket.io";
import fs from "fs";
import mysql from "mysql";
import htmlBox from "./common/htmlBox.js";
import { parse } from "path";
import cmServer from "./httpServer/commonServer.js";
import callPostImage from "./httpServer/callPostImage.js";

//fileReader
import fileReaderScriptRouter from "./httpServer/fileReader/script.js";
// import fileReaderImageRouter from "./httpServer/fileReader/image.js";


//import Main
import homeGet from "./httpServer/router/home/homeGet.js";

//import Login
import loginGet from "./httpServer/router/login/loginGet.js";
import loginPost from "./httpServer/router/login/loginPost.js";

//import singup
import signupGet from "./httpServer/router/login/signupGet.js";
import signupResultPost from "./httpServer/router/login/signupResultPost.js";

//import map
import dangmapReadGet from "./httpServer/router/Map/dangmap_read_get.js"; // 전 dangmapServer
import dangmapWritePost from "./httpServer/router/Map/dangmap_write_post.js"; // 전 callpostdangmap
import dangmapChatList from "./httpServer/router/Map/dangmap_chatList_post.js";

//import post board
import postBoard from "./httpServer/backend_bottomMenu_postBoard_get.js";
import postBoardLike from "./httpServer/post_postBoard_like.js";
import postCommentInput from "./httpServer/backend_postBoard_commentInput.js"
import postCommentLoad from "./httpServer/backend_postBoard_commentLoad.js"
import dangMarket from "./backEnd/Router/PostBoard/dangMarketGet.js"
import dangMarketDetailPage from "./backEnd/Router/PostBoard/dangMarketDetailPageGet.js";

//import profile
import userPagePost from "./httpServer/router/profile/userPage_Post.js";
import dangWritePost from "./backEnd/Router/PostBoard/dangWritePost.js";
import followSearch from "./httpServer/callPostFollowSearch.js";
import starCheckPost from "./httpServer/router/profile/userPage_starCheck_post.js";
import starLoadPost from "./httpServer/router/profile/userPage_starLoad_Post.js";

//import social
import dangfriendGet from "./httpServer/router/sicial/dangfriendGet.js"
import dangfriendPost from "./httpServer/router/sicial/dangfriendPost.js"

// import chatimport chatWithSocketIo from "./httpServer/backend_module_bottommenu_dangtalk_socketIo.js"
import chatWithSocketIo from "./httpServer/backend_module_bottommenu_dangtalk_socketIo.js"
import dangTalkChatRoom from "./httpServer/router/chat/dangtalkGet.js";
import dangTalkChatRoomPost from "./httpServer/router/chat/dangtalkPost.js";



// import mapMerker from "./mapMerker.js";
// import markerJson from "./markerJson.json" assert { type: "json" };

/*
------서버 구동 시 필요한 설치 모듈---------
  1. npm에서 mysql 설치 필요
  npm install mysql
  2. jwt를 구현하기 위해선 다음 두 모듈 필요
  npm install rand-token
  npm install jsonwebtoken
  3. busboy
  npm install busboy
  4. socket.io 채팅을 위해 필요한 모듈
  npm install socket.io
------------------------------------------
*/

/*
-------------DB 접속 시 필요 안내 사항---------------
-> db 연동이 되어있으니 아래 테이블을 따로 만들 필요 없음
-> 집에서 수정하려면 만들어야함
  필요한 테이블 이름 : [
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
  ]
----------------------------------------------------
*/

/*
------------DB 정보---------------
  host: "192.168.0.93",
  user: "guest",
  password: "0000",
  database: "mungta",

  cmd로 mysql 접속방법
  > mysql -h192.168.0.93 -uguest -p
----------------------------------
*/
const server = http.createServer(function (request, response) {
  // get request
  if (request.method === "GET") {
    //fileReaderScript
    fileReaderScriptRouter(request, response);
    // fileReaderImageRouter(request, response);
    //console.log("요청 들어옴 : " + request.url);
    //로그인
    loginGet(request, response);

    //메인화면
    homeGet(request, response);
    
    //회원가입
    signupGet(request, response);

    //게시글 작성 페이지
    if (request.url === "/friends/myKeepStyle.js") {
      cmServer.fileDirectory(`/friends/myKeepStyle.js`, response);
    } 

    if (request.url === "/favicon") {
      cmServer.fileDirectory(`graphic/dogpaw.png`, response);
    }
    if (request.url.startsWith("/dupCheck")) {
      dupCheck(request, response);
    }
    
    if (request.url.startsWith("/myMarker")) {
      myMarker(request, response)
    }

    //게시글 작성 페이지
    // console.log("aaaaaa:" + request.url)
    if (request.url === "/backEnd/Router/PostBoard/dangWritePagePost.js") {
      cmServer.fileDirectory(`/backEnd/Router/PostBoard/dangWritePagePost.js`, response);
    } 

    //댕맵 페이지
    dangmapReadGet(request, response);
    
    //댕댕마켓 페이지
    dangMarket(request, response);
    dangMarketDetailPage(request, response);

    //댕스타그램 페이지
    postBoard(request, response);

    //댕톡
    dangTalkChatRoom(request, response)

    //댕프렌드
    dangfriendGet(request, response);

  };

/*-----------------post request-----------------------*/
  if (request.method === 'POST') {
    //마이페이지
    userPagePost(request, response);

    //게시글 작성
    dangWritePost(request,response);

    //업로드, 유저 이미지
    callPostImage(request, response);

    //댕맵 - 지도에 발자국 표시, 발자국 드래그
    dangmapWritePost(request, response);
    //댕맵 - 채팅 참여자 리스트
    dangmapChatList(request, response);

    //로그인
    loginPost(request, response);
    if (request.url.startsWith("/signUpResult")) {
      signupResultPost(request, response)
    }

    //팔로우 기능
    followSearch(request, response);

    //댕스타그램
    postCommentLoad(request, response);
    postCommentInput(request, response);
    postBoardLike(request, response);

    //댕프렌드
    dangfriendPost(request, response)

    starCheckPost(request, response);
    starLoadPost(request, response);
    dangTalkChatRoomPost(request, response)
  };
});

//chatting Socket
chatWithSocketIo(server)


// 서버 포트 설정
server.listen(2080, function (error) {
  if (error) {
    console.error("서버 안돌아감");
  } else {
    console.log("서버 돌아감");
  }
});
