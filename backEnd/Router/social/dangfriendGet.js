import htmlBox from "../../../common/htmlBox.js";


export default function friendsList(request, response) {  
  if (request.url.startsWith("/friendsList")) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.friendsList));
  }
  
}