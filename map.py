# from http.server import HTTPServer, SimpleHTTPRequestHandler

# httpd = HTTPServer ( ('127.0.0.1', 2023), SimpleHTTPRequestHandler)
# print('서버시작')
# httpd.serve_forever()
# print('서버종료')

# GET방식

from http.server import HTTPServer, BaseHTTPRequestHandler

class MyHTTPRequestHandler(BaseHTTPRequestHandler):
  def do_GET(self):
    print('get방식 요청')
    self.send_response(200)
    self.send_header('Content-type', 'text/html; charset-utf-8')
    self.end_headers()
    
    html = '''
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>다음 지도 API</title>
    </head>
    <body>
      <div id="map" style="width:750px;height:600px;"></div>
      <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0be9eb1239670903ce4fd764c73b8c86"></script>
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
    </html>
    '''
    self.wfile.write(html.encode('utf-8'))
    
  def do_POST(self):
    print('post방식 요청')
    
if __name__ == '__main__':
  httpd = HTTPServer(('127.0.0.1', 2080), MyHTTPRequestHandler)
  print('Server Start')
  httpd.serve_forever()
  print('Server End')