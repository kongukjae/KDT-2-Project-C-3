import htmlBox from "../../../common/htmlBox.js";

export default function dangmap_HTML(request, response) {

  if (request.url === "/map") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.dangMap));
    response.end();
  }
}