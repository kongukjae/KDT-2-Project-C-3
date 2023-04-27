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
        html {
          scroll-behavior: smooth;
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
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/Home/home_weather.js"></script>
  <script src="/script/frontEnd/Home/home_style.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac"></script>
  <script src="/script/frontEnd/Home/home_map.js"></script>`,

  loginBody : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <div id='root'></div>
  <script src="/script/frontEnd/login/login_page.js"></script>`,
  signupPage : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/frontEnd/login/signup_page.js"></script>`,
  

  signUpResult : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/frontEnd/login/signup_page_result.js"></script>`,
  dangMap : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/dangMap/dangmap_userList.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac&libraries=services,clusterer"></script>
  <script src="/script/frontEnd/dangMap/dangmap_page.js"></script>
  <script src="/script/frontEnd/dangMap/dangmap_slide.js"></script>`,

  mypage : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/profile/mypage_style.js"></script>`,
  yourpage : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/profile/userprofile_star_check.js"></script>
  <script src="/script/frontEnd/profile/yourpage_style.js"></script>`,
  findUserInfo : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/frontEnd/login/find_password.js"></script>
  `,

  // 게시글 작성 페이지
  dangWrite : `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/postBoard/dangWritePagePost.js"></script>`,

  //댕프렌드
  friendsList: `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/dangfriends/dangfriends_list.js"></script>`,


  //댕댕마켓
  dangMarket:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/postBoard/dangmarket_list.js"></script>`,


  marketpost:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/postBoard/dangmarket_detail_page.js"></script>`,

  //댕스타그램
  postBoard: `
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/postBoard/dangstar_page_comment_update_delete_btn.js"></script>
  <script src="/script/frontEnd/postBoard/dangstar_page_comment_recent.js"></script>
  <script src="/script/frontEnd/postBoard/dangstar_page_comment_input.js"></script>
  <script src="/script/frontEnd/postBoard/dangstar_page_comment_window.js"></script>
  <script src="/script/frontEnd/postBoard/dangstar_page_like.js"></script>
  <script src="/script/frontEnd/postBoard/dangstar_page_create.js"></script>
  <script src="/script/frontEnd/postBoard/dangstar_page.js"></script>`,


  dangTalkMain:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/dangtalk/dangtalk_room.js"></script>`,

  dangTalkList:`
  <script src="/script/common/commonFunc.js"></script>
  <script src="/script/common/commonStyle.js"></script>
  <script src="/script/common/topMenu.js"></script>
  <script src="/script/common/bottomMenu.js"></script>
  <script src="/script/frontEnd/dangtalk/dangtalk_list.js"></script>`
}
export default html;