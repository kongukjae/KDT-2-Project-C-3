import htmlBox from "../common/htmlBox.js";
import cmServer from "./commonServer.js";
import mysql from "mysql";


export default function secondHand(request, response){
  let splitURL = request.url.split("/")[2];

  if (request.url === "/postBoard") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.postBoard));
  }

  if (splitURL === "commonFunc.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  } 
  else if (splitURL === "topMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  } 
  else if (splitURL === "bottomMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  }
  else if (splitURL === "commentWindow.js") {
    cmServer.fileDirectory(`post_board/${splitURL}`, response);
  }
  else if (splitURL === "commentRecent.js") {
    cmServer.fileDirectory(`post_board/${splitURL}`, response);
  }
  else if (splitURL === "commentUpdateDelete.js") {
    cmServer.fileDirectory(`post_board/${splitURL}`, response);
  }
  else if (splitURL === "commentInput.js") {
    cmServer.fileDirectory(`post_board/${splitURL}`, response);
  }
  else if (splitURL === "postCreate.js") {
    cmServer.fileDirectory(`post_board/${splitURL}`, response);
  }
  else if (splitURL === "dangstargram.js") {
    cmServer.fileDirectory(`post_board/${splitURL}`, response);
  }

}