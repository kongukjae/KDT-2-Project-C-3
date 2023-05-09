import writeHtmlBox from "../login/writeHtmlBox.js";
import * as jwtFunc from "../../module/jsonWebToken.js";

export default function tokenCheck(request, response, target) {
  console.log("리팩토링 함수 진입");
  //* 요청의 header에서 cookie값 추출
  console.log("쿠키 체크 중")
  const cookieCheck = request.headers.cookie;
  console.log(cookieCheck);
  console.log("쿠키 체크 중")
  //* 쿠키가 존재한다면
  if(cookieCheck !== undefined) {
    console.log("쿠키 !undefined 진입");
    const checkToken = jwtFunc.jwtCheck(cookieCheck.split('jwt=')[1]).id;
    if(checkToken === undefined) {
      console.log("유효하지 않은 토큰입니다")
      //* 토큰 값이 유효하지 않다면 그대로 로그인 진행
      writeHtmlBox(response,target)
    } else {
      //* 토큰 값이 유효하다면 /main으로 이동 
      console.log("로그인 쿠키 체크");
      response.writeHead(302, { 'Location': '/main' });
      response.end();
    }
  } else {
    //* 쿠키가 없다면 그대로 로그인 진행
    writeHtmlBox(response, target);
  }
}