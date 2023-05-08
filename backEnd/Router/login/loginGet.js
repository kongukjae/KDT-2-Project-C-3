import tokenCheck from "../login/loginTokenCheck.js";

export default function callLoginGet(request, response) {
  // 들어온 요청이 GET일 경우
  if (request.url === "/") {
    tokenCheck(request, response, 'loginBody');
  } 
  else if(request.url === "/findUserInfo"){
    tokenCheck(request, response, 'findUserInfo');
  }
}
