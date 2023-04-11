// root 식별
const rootLoginPage = document.getElementById('root');
styleCreate(rootLoginPage, loginPageStyle.loginPageRoot);

// 로고 영역 생성
const logoLoginPageWaper = tagCreate('div', '');
styleCreate(logoLoginPageWaper, loginPageStyle.loginPageLogoWrap);
rootLoginPage.appendChild(logoLoginPageWaper);

const logoLoginPage = tagCreate('img', '');
styleCreate(logoLoginPage, loginPageStyle.loginPageLogo);
logoLoginPage.src = './resource/MainLogo.png';
logoLoginPageWaper.appendChild(logoLoginPage);

// 로그인 페이지 이미지 요소 생성
const imgLoginPageWrapper = tagCreate('div', '');
styleCreate(imgLoginPageWrapper, loginPageStyle.loginPageImgWarp);

rootLoginPage.appendChild(imgLoginPageWrapper);
const imgLoginPage = tagCreate('img', '');
styleCreate(imgLoginPage, loginPageStyle.loginPageImg);
imgLoginPage.src = './resource/MainDogImg.jpg';
imgLoginPage.alt = '로그인 페이지 이미지';
imgLoginPageWrapper.appendChild(imgLoginPage);

// 로그인 페이지 ID/PW 입력
const formLoginPageWrapper = tagCreate('div', '');
styleCreate(formLoginPageWrapper, loginPageStyle.loginPageFormWrap);
rootLoginPage.appendChild(formLoginPageWrapper);
formLoginPageWrapper.innerHTML += `
<form action="/login" method="post">
  <input id = "loginId" type="text" name="user_id" autofocus></input>
  <input id = "loginPw" type="text" name="user_pw"></input>
  <div>
    <input id = "login" type="submit" value="로그인">
    <a href='/signUp'>회원가입</a>
  </div>
  <a id = "findUserInfo" href='/findUserInfo'>아이디 / 비밀번호 찾기</a>
</form>
`;
// form 태그 스타일
styleCreate(formLoginPageWrapper.children[0], loginPageStyle.loginPageForm)

// ID input 스타일
styleCreate(formLoginPageWrapper.children[0].children[0], loginPageStyle.loginPageFormId)
formLoginPageWrapper.children[0].children[0].setAttribute('placeholder', ' 아이디를 입력하세요');

// PW input 스타일
styleCreate(formLoginPageWrapper.children[0].children[1], loginPageStyle.loginPageFormPw)
formLoginPageWrapper.children[0].children[1].setAttribute('placeholder', ' 비밀번호를 입력하세요');

// 로그인&회원가입 버튼 wrap 스타일
styleCreate(formLoginPageWrapper.children[0].children[2], loginPageStyle.loginPageFormBtnWrap);

// 로그인 input=submit 버튼 스타일
styleCreate(formLoginPageWrapper.children[0].children[2].children[0], loginPageStyle.loginPageFormBtnLogin);

// 회원가입 a태그 버튼 스타일
styleCreate(formLoginPageWrapper.children[0].children[2].children[1], loginPageStyle.loginPageFormBtnSignup);

// 아이디 비밀번호 찾기 구현 후 리펙토링 예정
let findUserInfo = document.getElementById("findUserInfo");
styleCreate(findUserInfo, loginPageStyle.loginPageFormBtnFindUserInfo);
