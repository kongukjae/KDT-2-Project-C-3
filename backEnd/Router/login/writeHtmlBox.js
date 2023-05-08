import htmlBox from "../../../common/htmlBox.js";

export default function writeHtmlBox(response, target) {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");
  response.write(htmlBox.htmlFunc(htmlBox[target]));
  response.end();
}