import htmlBox from "../../../common/htmlBox.js";

export default function callLoginGet(request, response) {
  // 들어온 요청이 GET일 경우
  if (request.url === "/") {
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
      //* 쿠키 값이 없다면 그대로 로그인 진행
      console.log(request.url);
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.write(htmlBox.htmlFunc(htmlBox.loginBody));
      response.end();
    }
  } 
  else if(request.url === "/findUserInfo"){
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
      //* 쿠키 값이 없다면 그대로 비밀번호 찾기 진행
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.write(htmlBox.htmlFunc(htmlBox.findUserInfo));
      response.end();
    }
    
  }
}
