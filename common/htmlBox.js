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
    <body onselectstart="return false">
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
  <script src="/friends/mypageStyle.js"></script>`,
  yourpage : `
  <script src="/common/commonFunc.js"></script>
  <script src="/common/topMenu.js"></script>
  <script src="/common/bottomMenu.js"></script>
  <script src="/friends/yourpageStyle.js"></script>`,
  findUserInfo : `
  <script src="/common/commonFunc.js"></script>
  <script src="/init_user/findUserInfo.js"></script>
  `,
  followSearch:`
  <script src="/common/commonFunc.js"></script>
  <script src="/mapp/dangMapSlideSearchBar.js"></script>`,
  secondHand:`
  <script src="/common/commonFunc.js"></script>
  <script src="/market/marketList.js"></script>`,

mykeep:`
<script src="/common/commonFunc.js"></script>
  <script src="/common/topMenu.js"></script>
  <script src="/common/bottomMenu.js"></script>
  <script src="/friends/mykeep.js"></script>`




}
export default html;

// htmlBox.js 파일은 여러 HTML 페이지와 관련 스크립트를 반환하는 객체를 포함하고 있습니다. 이 파일은 주로 서버에서 클라이언트로 보내는 HTML 및 스크립트를 구성하는데 사용됩니다. 이 객체의 속성은 다음과 같습니다:

// htmlFunc(data): 이 함수는 주어진 data 변수를 HTML 템플릿에 삽입하여 완전한 HTML 문서를 생성하고 반환합니다. 템플릿에는 기본 head 태그와 Noto Sans KR 폰트가 포함되어 있습니다.

// mapBody: 이 문자열은 지도 관련 스크립트를 포함합니다. 여기에는 공통 함수, 상단 및 하단 메뉴, 날씨 및 지도 관련 자바스크립트 파일이 포함됩니다.

// loginBody: 로그인 페이지에 관련된 스크립트를 포함하는 문자열입니다.

// signupPage: 회원 가입 페이지와 관련된 스크립트를 포함하는 문자열입니다.

// signUpResult: 회원 가입 결과 페이지와 관련된 스크립트를 포함하는 문자열입니다.

// dangMap: "dangMap" 페이지와 관련된 스크립트를 포함하는 문자열입니다. 여기에는 공통 함수, 상단 및 하단 메뉴, 카카오 지도 API 및 dangMap 관련 자바스크립트 파일이 포함됩니다.

// mypage: 내 페이지와 관련된 스크립트를 포함하는 문자열입니다.

// yourpage: 다른 사용자의 페이지와 관련된 스크립트를 포함하는 문자열입니다.

// findUserInfo: 사용자 정보 찾기 페이지와 관련된 스크립트를 포함하는 문자열입니다.

// followSearch: 팔로우 검색과 관련된 스크립트를 포함하는 문자열입니다.

// secondHand: 중고 시장과 관련된 스크립트를 포함하는 문자열입니다.

// mykeep: 사용자가 저장한 페이지와 관련된 스크립트를 포함하는 문자열입니다.

// 이 객체의 속성들은 각 페이지와 관련된 스크립트를 포함하고 있으며, 서버에서 이를 호출하여 클라이언트에 적절한 HTML 및 스크립트를 전달할 수 있습니다.