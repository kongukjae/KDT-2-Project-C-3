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
  mapBody: `
  <script src="/common/commonFunc.js"></script>
  <script src="/common/topMenu.js"></script>
  <script src="/common/bottomMenu.js"></script>
  <script src="/main/weather.js"></script>
  <script src="/main/mainStyle.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac"></script>
  <script src="/mapp/map.js"></script>`,

  loginBody : `
  <script src="/common/commonFunc.js"></script>
  <div id='root'></div>
  <script src="init_user/loginPage.js"></script>`,
  signupPage : `
  <script src="/common/commonFunc.js"></script>
  <script src="/init_user/signupstyle.js"></script>`,
  signUpResult : `
  <script src="/common/commonFunc.js"></script>
  <script src="/init_user/signupResultStyle.js"></script>`,
  dangMap : `
  <script src="/common/commonFunc.js"></script>
  <script src="/common/topMenu.js"></script>
  <script src="/common/bottomMenu.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac&libraries=services"></script>
  <script src="/mapp/dangMap.js"></script>
  <script src="/mapp/dangMapSlide.js"></script>`
,
  mypage : `
  <script src="/common/commonFunc.js"></script>
  <script src="/common/topMenu.js"></script>
  <script src="/common/bottomMenu.js"></script>
  <script src="/friends/mypageStyle.js"></script>`
}
export default html;