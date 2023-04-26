import htmlBox from "../../../common/htmlBox.js";

export default function dangTalk(request, response) {
  if (request.url === "/dangTalkChatList") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.dangTalkList));
    response.end();
  }
}
  