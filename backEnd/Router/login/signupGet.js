import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";
import dupCheck from "./signupDupcheckGet.js";


export default function signupGet(request, response) {

  if (request.url === "/signUp") {
    //* 요청의 header에서 cookie값 추출
    const cookieCheck = request.headers.cookie;
    console.log(cookieCheck);
    console.log("쿠키 체크 중")
    //* 쿠키가 존재한다면 /main으로 이동시킴
    if(cookieCheck !== undefined) {
      console.log("쿠키 undefined 진입")
      console.log("로그인 쿠키 체크");
      response.writeHead(302, { 'Location': '/main' });
      response.end();
    } else {
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