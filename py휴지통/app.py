import http.server
import socketserver
import os

PORT = 2080

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    innerbody = {
    "signupPage" : '<script src="./signupstyle.js"></script>',
    "signUpResult" : '<script src="./signupResultStyle.js"></script>'
    }
    @staticmethod
    def htmlBox(data):
      return '''<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
          <title>Document</title>
          <style>
            *{
              box-sizing: border-box;
              padding: 0%;
              margin: 0%;
              font-family: 'Noto Sans KR', sans-serif;
            }
          </style>
        </head>
        <body>'''+ data + '''
        </body>
        </html>'''

    @staticmethod
    def imagetag(link):
      return f'''<img src="/{link}" alt="" style = "width:50px"></img>'''

    # HTTP GET 요청을 처리합니다.
    def do_GET(self):
        # 최초접속
        print("get요청")
        if self.path == '/signUp':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            page = self.htmlBox(self.innerbody["signupPage"])
            self.wfile.write(page.encode('utf-8'))
            return

        if self.path.startswith('/signupstyle'):
            self.path = "./signup.js"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

        if self.path.startswith('/signupResultStyle'):
            self.path = "./signupResult.js"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        
    def do_POST(self):
        print("post요청")

        if self.path.startswith('/signUpResult'):
            content_length = int(self.headers.get('Content-Length'))
            postbody = self.rfile.read(content_length)
            print(postbody)
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            page = self.htmlBox(self.innerbody["signUpResult"])
            self.wfile.write(page.encode('utf-8'))
            return

            if False:
              print("add")
              f = open(f'''./filelist/{postbody[0][1]}.{postbody[1][1]}''',"w");
              f.close()
              self.send_response(200)
              self.send_header('Content-Type', 'text/html')
              self.end_headers()
              page = self.htmlBox(f'''<h1>{postbody[0][1]}.{postbody[1][1]}   생성완료</h1><button type="button" value="클릭하세요" onClick="location.href='http://localhost:2080/'">''')
              self.wfile.write(page.encode('utf-8'))
              return

# 서버 포트 설정
Handler = MyHttpRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()