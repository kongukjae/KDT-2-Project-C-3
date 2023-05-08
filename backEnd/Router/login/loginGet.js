import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";

export default function callLoginGet(request, response) {
  // 들어온 요청이 GET일 경우
  if (request.url === "/") {
    const cookieCheck = request.headers.cookie;
    console.log(cookieCheck);
    console.log("쿠키 체크 중")
    if(cookieCheck !== undefined) {
      console.log("쿠키 undefined 진입")
      console.log("로그인 쿠키 체크");
      response.writeHead(302, { 'Location': '/main' });
      response.end();
    } else {
      console.log(request.url);
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.write(htmlBox.htmlFunc(htmlBox.loginBody));
      response.end();
    }
  } 
  else if(request.url === "/findUserInfo"){
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write(htmlBox.htmlFunc(htmlBox.findUserInfo));
    response.end();
  }
}
