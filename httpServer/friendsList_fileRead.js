import cmServer from "./commonServer.js";


export default function friendsListFileRead(request, response){

  let splitURL = request.url.split("/")[2];

  if (splitURL === "commonFunc.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  } 
  else if (splitURL === "topMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  } 
  else if (splitURL === "bottomMenu.js") {
    cmServer.fileDirectory(`common/${splitURL}`, response);
  }
  else if (splitURL === "friendsListPage.js") {
    cmServer.fileDirectory(`friends/${splitURL}`, response);
  }
  
}