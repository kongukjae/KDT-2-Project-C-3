import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";
import dupCheck from "./signupDupcheckGet.js";


export default function signupGet(request, response) {

  if (request.url === "/signUp") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.signupPage));
    response.end();
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