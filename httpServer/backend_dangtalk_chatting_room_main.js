import htmlBox from "../common/htmlBox.js";
import cmServer from "./commonServer.js";

export default function dangTalkMain(request, response) {
  if (request.url === "/dangTalkChatRoom") {
    response.writeHead(200);
    response.write(`<script src="/socket.io/socket.io.js"></script>`);
    response.write(htmlBox.htmlFunc(htmlBox.dangTalkMain));
    response.end();
  } else if (request.url === "/dangtalk/chattingRoomMain.js") {
    cmServer.fileDirectory(`dangtalk/chattingRoomMain.js`, response);
  }
}
