import htmlBox from "../htmlBox.js";
import cmServer from "./commonServer.js";

export default function callLoginGet(request, response) {
  // 들어온 요청이 GET일 경우
  if (request.url === "/") {
    console.log(request.url);
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write(htmlBox.htmlFunc(htmlBox.loginBody));
    response.end();
  } else if (request.url === "/loginPage.js") {
    // loginPage.js 파일 read
    cmServer.fileDirectory(`${request.url}`, response);
  } else if (request.url.startsWith("/resource/MainLogo")) {
    // MainLogo.png 파일 read
    cmServer.fileDirectory(`resource/MainLogo.png`, response);
  } else if (request.url.startsWith("/resource/MainDog")) {
    // MainDogImg.png 파일 read
    cmServer.fileDirectory(`resource/MainDogImg.jpg`, response);
  }
}
