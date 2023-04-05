import loginDB from "./loginFunc.js";

export default function callLoginPost(request, response) {
  // 들어온 요청이 POST일 경우
  if (request.method === "POST") {
    if (request.url.startsWith("/login")) {
      console.log("/login 페이지 진입");
      request.on("data", function (data) {
        body = body + data;
        console.log(body);
      });
      request.on("end", function () {
        loginDB(body);
      });
    }
  }
}
