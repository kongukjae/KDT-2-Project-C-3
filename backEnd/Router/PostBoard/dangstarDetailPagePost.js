import htmlBox from "../../../common/htmlBox.js";


export default function dangstarPageDetail(request, response) {
  if (request.url.startsWith("/detailPostDangstar")) {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log("댕스타 상세 페이지 진입이이이이이ㅣ이잉", body);
      let splitData = body.split('&');

      console.log(splitData)
      
      response.writeHead(200, { "Content-Type": "text/html" });  
      response.write(`<script>const datas = '${splitData}'</script>`);
      response.write(htmlBox.htmlFunc(htmlBox.postDetail));
      response.end();

    });
  }
}