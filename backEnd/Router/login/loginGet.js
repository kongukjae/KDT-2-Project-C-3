import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";

export default function callLoginGet(request, response) {
  // 들어온 요청이 GET일 경우
  let splitURL = request.url.split("/")[2];
  if (request.url === "/") {
    console.log(request.url);
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write(htmlBox.htmlFunc(htmlBox.loginBody));
    response.end();
  } 
  else if(request.url === "/findUserInfo"){
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write(htmlBox.htmlFunc(htmlBox.findUserInfo));
    response.end();
  }
}
