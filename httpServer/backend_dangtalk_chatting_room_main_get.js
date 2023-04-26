import htmlBox from "../common/htmlBox.js";
import cmServer from "./commonServer.js";

export default function dangTalkMain(request, response) {
  if (request.url === "/dangTalkChatList") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.dangTalkList));
    response.end();
  }
}
  