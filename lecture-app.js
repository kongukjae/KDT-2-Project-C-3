import http from "http";
import {Server} from "socket.io";
import fs from "fs";
import mysql from "mysql";
import htmlBox from "./common/htmlBox.js";
import { parse } from "path";
import cmServer from "./httpServer/commonServer.js";
import callPostImage from "./httpServer/callPostImage.js";

//import Main
import callMain from "./httpServer/callMain.js";

//import Login
import callLoginGet from "./httpServer/callLoginGet.js";
import callPostLogin from "./httpServer/callPostLogin.js";
import dupCheck from "./httpServer/dupCheckRoute.js";

//import singup
import signupResult from "./httpServer/signupResultRoute.js";

//import map
import dangMapServer from "./httpServer/dangMapServer.js";
import callPostDangMap from "./httpServer/callPostDangMap.js";

//import post board
import postBoard from "./httpServer/backend_bottomMenu_postBoard_get.js";
import postBoardLike from "./httpServer/post_postBoard_like.js";
import postCommentInput from "./httpServer/backend_postBoard_commentInput.js"
import postCommentLoad from "./httpServer/backend_postBoard_commentLoad.js"

//import secondHand
import secondHand from "./httpServer/backend_bottommenu_second_hand_get.js"
import secondHandPost from "./httpServer/backend_bottommenu_second_hand_post_get.js";

//import friends
import myPagePost from "./httpServer/myPagePost.js";
import myKeepPost from "./httpServer/backend_mykeepmenu_second.js";
import followSearch from "./httpServer/callPostFollowSearch.js";
import getFriendsList from "./httpServer/bottomMenu_friendsList_get.js"
import PostFriendsList from "./httpServer/bottomMenu_friendsList_post.js"
import starCheck from "./httpServer/backend_yourpage_starCheck.js";
import starLoad from "./httpServer/backend_yourpage_starLoad.js";

import chatWithSocketIo from "./httpServer/backend_module_bottommenu_dangtalk_socketIo.js"
import dangTalkChatRoom from "./httpServer/backend_dangtalk_chatting_room_main_get.js";
import dangTalkChatRoomPost from "./httpServer/backend_dangtalk_chatting_room_main_post.js";

/**
 * ! check point
 * * server 주요 기능 **************************************
 * ? GET 처리
 * * 검색 이동(주석) : get request
 * 
 * * 1. 로그인
 * * 2. 메인화면
 * * 3. 회원가입
 * * 4. 게시글 작성 페이지
 * * 5. 댕맵 페이지
 * * 6. 댕댕마켓 페이지
 * * 7. 댕스타그램 페이지
 * * 8. 댕톡
 * * 9. 댕프렌드
 * 
 * 
 * ? POST 처리
 * * 검색 이동(주석) : post request
 * 
 * * 9. 마이페이지
 * * 10. 게시글 작성
 * * 11. 업로드, 유저 이미지
 * * 12. 댕맵 - 지도에 발자국 표시, 발자국 드래그
 * * 13. 로그인
 * * 14. 팔로우 기능
 * * 15. 댕스타그램
 * * 16. 댕프렌드
 * */

const server = http.createServer(function(request, response) {

  if(request.method === "GET") {
    
    const GETFunction = {
      //1. 로그인
      login : callLoginGet(request, response),
      //2. 메인화면
      mainView : callMain(request, response),
      //5. 댕맵 페이지
      dangMapServer: dangMapServer(request, response),
      //6. 댕댕마켓 페이지
      secondHand: secondHand(request, response),
      secondHandPost: secondHandPost(request, response),
      //7. 댕스타그램 페이지
      postBoard: postBoard(request, response),
      //8. 댕톡
      dangTalkChatRoom: dangTalkChatRoom(request, response),
      //9. 댕프렌드
      getFriendsList: getFriendsList(request, response),
    }
  
    for(let key in GETFunction) {
      // 위의 GET 함수 모두 호출
      GETFunction[key]();
    }
  
    //3. 회원가입
    switch (request.url) {
      case "/signUp":
        response.writeHead(200);
        response.write(htmlBox.htmlFunc(htmlBox.signupPage));
        response.end();
        break;
      case "/init_user/signupstyle.js":
        // singupStyle.js가 어떤 기능을 하는지, 요약할 것
        // signupStyle.js는 signupPage.html의 css를 담당한다. <-- 처럼
        // 인자와 리턴을 명시할 것
        cmServer.fileDirectory(`init_user/signup.js`, response);
        break;
      case "/init_user/signupResultStyle.js":
        cmServer.fileDirectory(`init_user/signupResult.js`, response);
        break;
      case "/favicon":
        cmServer.fileDirectory(`graphic/dogpaw.png`, response);
        break;
      case request.url.startsWith("/dupCheck"):
        dupCheck(request, response);
        break;
      case "/friends/mypageStyle.js":
        cmServer.fileDirectory(`friends/mypageStyle.js`, response);
        break;
      case "/friends/yourpageStyle.js":
        cmServer.fileDirectory(`friends/yourpageStyle.js`, response);
        break;
      case "/friends/starCheck.js":
        cmServer.fileDirectory(`/friends/starCheck.js`, response);
        break;
      case request.url.startsWith("/myMarker"):
        myMarker(request, response);
        break;
        // 4. 게시글 작성 페이지
      case "/friends/myKeepStyle.js":
        cmServer.fileDirectory(`/friends/myKeepStyle.js`, response);
        break;
      default:
        response.writeHead(404);
        response.write("404 에러페이지 고려할 것");
        response.end();
        break;
    }
  }

  /**
   * ! check point
   * * 위의 스위치문은 여전히 기능을 추가할 때마다 지속적으로 수정해야 하므로
   * * 최선의 방식은 아님
   * * 라우팅에 대한 이해로, 리팩토링 진행 시 확인 할 것
   */


});












/**
 * ! check point
 * * chatting Socket 
 * 
 * */

/**
 * ! check point
 * * 서버 포트 설정
 * 
 */