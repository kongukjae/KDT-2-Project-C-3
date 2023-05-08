import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";
import dupCheck from "./signupDupcheckGet.js";
import * as jwtFunc from "../../module/jsonWebToken.js";


export default function signupGet(request, response) {

  if (request.url === "/signUp") {
    //* 요청의 header에서 cookie값 추출
    const cookieCheck = request.headers.cookie;
    console.log(cookieCheck);
    console.log("쿠키 체크 중")
    //* 쿠키가 존재한다면 /main으로 이동시킴
    if(cookieCheck !== undefined) {
      console.log("쿠키 !undefined 진입");
      const checkToken = jwtFunc.jwtCheck(cookieCheck.split('jwt=')[1]).id;
      if(checkToken === undefined) {
        console.log("유효하지 않은 토큰입니다")
        //* 토큰 값이 유효하지 않다면 그대로 회원가입 진행
        console.log(request.url);
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.write(htmlBox.htmlFunc(htmlBox.findUserInfo));
        response.end();
      } else {
        //* 토큰 값이 유효하다면 /main으로 이동 
        console.log("로그인 쿠키 체크");
        response.writeHead(302, { 'Location': '/main' });
        response.end();
      }
    } else {
      //* 쿠키 값이 없다면 그대로 회원가입 진행
      response.writeHead(200);
      response.write(htmlBox.htmlFunc(htmlBox.signupPage));
      response.end();
    }
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
  if (request.url === "/friends/starCheck.js") {
    cmServer.fileDirectory(`/friends/starCheck.js`, response);
  }
  if (request.url.startsWith("/myMarker")) {
    myMarker(request, response)
  }
}