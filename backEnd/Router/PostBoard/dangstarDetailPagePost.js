import htmlBox from "../../../common/htmlBox.js";


export default function dangstarPageDetail(request, response) {
  if (request.url === "/postDetailDangstar") {
    console.log("댕스타 상세 페이지 진입이이이이이ㅣ이잉");
    console.log(request.url);
    //let nth = request.url.split("=")[1];
    //response.write(`<script>const idx = 7</script>`);
    response.writeHead(200, { "Content-Type": "text/html" });  
    response.write(htmlBox.htmlFunc(htmlBox.postDetail));
    response.end();
  }
}