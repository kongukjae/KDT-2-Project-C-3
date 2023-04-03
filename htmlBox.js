const html = {
  htmlFunc: function(data){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
      <title>MungTa</title>
      <style>
        *{
          box-sizing: border-box;
          padding: 0%;
          margin: 0%;
          font-family: 'Noto Sans KR', sans-serif;
        }
      </style>
    </head>
    <body>
      ${data}
    </body>
    </html>`
  },
  mapBody: `<script src="/mainStyle.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac"></script>
  <script src="/map.js"></script>`,

  loginBody : `<div id='root'></div>
  <script src="./loginPage.js"></script>`,
  signupPage : '<script src="./signupstyle.js"></script>',
  signUpResult : '<script src="./signupResultStyle.js"></script>',
  dangMap : `
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac&libraries=services"></script>

  <script src="/dangMap.js"></script>
  <script src="map/dangMapSlide"></script>`
,
  mypage : `<script src="/mypageStyle.js"></script>`
}
export default html;