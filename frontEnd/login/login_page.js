// root 식별
const rootLoginPage = document.getElementById('root');
styleCreate(rootLoginPage, loginStyle.loginPageRoot);

// 로고 영역 생성
const logoLoginPageWaper = tagCreate('div', '');
styleCreate(logoLoginPageWaper, loginStyle.loginPageLogoWrap);
rootLoginPage.appendChild(logoLoginPageWaper);

const logoLoginPage = tagCreate('img', '');
styleCreate(logoLoginPage, loginStyle.loginPageLogo);
logoLoginPage.src = '/image/resource/MainLogo.png';
logoLoginPageWaper.appendChild(logoLoginPage);

// 로그인 페이지 이미지 요소 생성
const imgLoginPageWrapper = tagCreate('div', '');
styleCreate(imgLoginPageWrapper, loginStyle.loginPageImgWarp);

rootLoginPage.appendChild(imgLoginPageWrapper);
const imgLoginPage = tagCreate('img', '');
styleCreate(imgLoginPage, loginStyle.loginPageImg);
imgLoginPage.src = '/image/resource/MainDogImg.jpg';
imgLoginPage.alt = '로그인 페이지 이미지';
imgLoginPageWrapper.appendChild(imgLoginPage);

// 로그인 페이지 ID/PW 입력
const formLoginPageWrapper = tagCreate('div', '');
styleCreate(formLoginPageWrapper, loginStyle.loginPageFormWrap);
rootLoginPage.appendChild(formLoginPageWrapper);
// formLoginPageWrapper.innerHTML += `
// <form action="/login" method="post">
//   <input id = "loginId" type="text" name="user_id" autofocus></input>
//   <input id = "loginPw" type="password" name="user_pw"></input>
//   <div>
//     <input id = "login" type="submit" value="로그인">
//     <a href='/signUp'>회원가입</a>
//   </div>
//   <a id = "findUserInfo" href='/findUserInfo'>아이디 / 비밀번호 찾기</a>
// </form>
// `;

const loginFormTag = tagCreate('form', '');
styleCreate(loginFormTag, loginStyle.loginPageForm)
formLoginPageWrapper.appendChild(loginFormTag);

const logininputId = tagCreate('input', {id: 'loginId', type: 'text', name: 'user_id'});
styleCreate(logininputId, loginStyle.loginPageFormId)
logininputId.setAttribute('placeholder', ' 아이디를 입력하세요');
loginFormTag.appendChild(logininputId);

const logininputPw = tagCreate('input', {id: 'loginPw', type: 'text', name: 'user_pw'});
styleCreate(logininputPw, loginStyle.loginPageFormPw)
logininputPw.setAttribute('placeholder', ' 비밀번호를 입력하세요');
loginFormTag.appendChild(logininputPw);

const formInnerDiv = tagCreate('div', '');
styleCreate(formInnerDiv, loginStyle.loginPageFormBtnWrap);
loginFormTag.appendChild(formInnerDiv);

const loginBtn = tagCreate('button', {id: 'loginBtn', innerText: '로그인'});
styleCreate(loginBtn, loginStyle.loginPageFormBtnLogin);
formInnerDiv.appendChild(loginBtn);

const signUpBtn = tagCreate('a', {href: '/signUp', innerText: '회원가입'});
styleCreate(signUpBtn, loginStyle.loginPageFormBtnSignup);
formInnerDiv.appendChild(signUpBtn);

const findUser = tagCreate('a', {id: 'findUserInfo',href: '/findUserInfo', innerText: '아이디 / 비밀번호 찾기'})
styleCreate(findUser, loginStyle.loginPageFormBtnFindUserInfo);
loginFormTag.appendChild(findUser);


// form 태그 스타일
// styleCreate(formLoginPageWrapper.children[0], loginStyle.loginPageForm)

// ID input 스타일
// styleCreate(formLoginPageWrapper.children[0].children[0], loginStyle.loginPageFormId)
// formLoginPageWrapper.children[0].children[0].setAttribute('placeholder', ' 아이디를 입력하세요');

// PW input 스타일
// styleCreate(formLoginPageWrapper.children[0].children[1], loginStyle.loginPageFormPw)
// formLoginPageWrapper.children[0].children[1].setAttribute('placeholder', ' 비밀번호를 입력하세요');

// 로그인&회원가입 버튼 wrap 스타일
// styleCreate(formLoginPageWrapper.children[0].children[2], loginStyle.loginPageFormBtnWrap);

// 로그인 input=submit 버튼 스타일
// styleCreate(formLoginPageWrapper.children[0].children[2].children[0], loginStyle.loginPageFormBtnLogin);

// 회원가입 a태그 버튼 스타일
// styleCreate(formLoginPageWrapper.children[0].children[2].children[1], loginStyle.loginPageFormBtnSignup);

// 아이디 비밀번호 찾기 구현 후 리펙토링 예정
// let findUserInfo = document.getElementById("findUserInfo");
// styleCreate(findUserInfo, loginStyle.loginPageFormBtnFindUserInfo);
