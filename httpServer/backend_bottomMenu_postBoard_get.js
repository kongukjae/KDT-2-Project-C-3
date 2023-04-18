import htmlBox from "../common/htmlBox.js";
import postBoardFileRead from "./backend_postBoardFileRead.js";
import mysql from "mysql";


export default function postBoard(request, response){
  
  postBoardFileRead(request, response);

  if (request.url === "/postBoard") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.postBoard));
  }
  if(request.url.startsWith('/loadpostBoard')){
    console.log(request.url);

  }
  

}