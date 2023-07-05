import http from "http";
import qs from "querystring";
const server = http.createServer(function (request, response) {
  // 최초접속
  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200);
    response.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>POST</title>
      <meta charset="utf-8">
    </head>
    <body>
      <form action="/post_test" method="post">
        <p><input type="submit"></p>
      </form>
    </body>
    </html>
    `);
  } else if (request.method === "POST" && request.url === "/post_test") {
    const body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      const post = qs.parse(body);
      console.log(post);
      response.end(`<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>다음 지도 API</title>
      </head>
      <body>
        <div id="map" style="width:750px;height:600px;"></div>
        <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c304b4af9ca18f6f93bc721db923ec9a"></script>
        <script>
          var mapContainer = document.getElementById('map'), // 지도를 표시할 div
              mapOption = {
                  center: new kakao.maps.LatLng(37.56682, 126.97865), // 지도의 중심좌표
                  level: 3, // 지도의 확대 레벨
                  mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
              };
          // 지도를 생성한다
          var map = new kakao.maps.Map(mapContainer, mapOption);
        </script>
      </body>
      </html>`);
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});
// 서버 포트 설정
server.listen(2080, function (error) {
  if (error) {
    console.error("서버 안돌아감");
  } else {
    console.log("서버 돌아감");
  }
});
