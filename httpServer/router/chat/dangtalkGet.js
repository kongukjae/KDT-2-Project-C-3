import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";

export default function dangTalk(request, response) {
  if (request.url === "/dangTalkChatList") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.dangTalkList));
    response.end();
  } else if (request.url === "/dangtalk/dangtalk_list.js") {
    cmServer.fileDirectory(`dangtalk/dangtalk_list.js`, response);
  }else if (request.url === "/dangtalk/chattingRoomMain.js") {
    cmServer.fileDirectory(`dangtalk/chattingRoomMain.js`, response);
  }
}
