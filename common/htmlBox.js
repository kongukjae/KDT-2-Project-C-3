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
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/main/weather.js"></script>
  <script src="/script/main/mainStyle.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac"></script>
  <script src="/script/mapp/map.js"></script>`,

  loginBody : `
  <script src="/script/common/commonFunc.js"></script>
  <div id='root'></div>
  <script src="/script/init_user/loginPage.js"></script>`,
  signupPage : `
  <script src="/script/common/commonFunc.js"></script>

  <script src="/script/init_user/signupstyle.js"></script>`,
  

  signUpResult : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/init_user/signupResultStyle.js"></script>`,
  dangMap : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/mapp/dangMap_userChatList.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac&libraries=services,clusterer"></script>
  <script src="/script/mapp/dangMap.js"></script>
  <script src="/script/mapp/dangMapSlide.js"></script>`
,
  mypage : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/friends/mypageStyle.js"></script>`,
  yourpage : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/friends/starCheck.js"></script>
  <script src="/script/friends/yourpageStyle.js"></script>`,
  findUserInfo : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/init_user/findUserInfo.js"></script>
  `,

  secondHand:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/market/marketList.js"></script>`,

  dangWrite : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/backEnd/Router/PostBoard/dangWritePagePost.js"></script>`,

  //댕프렌드
  friendsList: `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/friends/friendsListPage.js"></script>`,


  //댕댕마켓
  secondHand:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/market/marketList.js"></script>`,


  marketpost:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/market/market-post-page.js"></script>`,

  //댕스타그램
  postBoard: `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/post_board/commentUpdateDelete.js"></script>
  <script src="/script/post_board/commentRecent.js"></script>
  <script src="/script/post_board/commentInput.js"></script>
  <script src="/script/post_board/commentWindow.js"></script>
  <script src="/script/post_board/dangstarLike.js"></script>
  <script src="/script/post_board/postCreate.js"></script>
  <script src="/script/post_board/dangstargram.js"></script>`,


  dangTalkMain:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/dangtalk/chattingRoomMain.js"></script>`,

  dangTalkList:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/dangtalk/dangtalk_list.js"></script>`
}
export default html;