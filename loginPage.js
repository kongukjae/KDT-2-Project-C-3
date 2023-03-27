// root 생성

// root 식별
const rootLoginPage = document.getElementById('root');

// root 스타일 설정
const rootLoginPageStyleObj = {
  width : '500px',
  height : '100vh',
  display : 'flex',
  flexDirection : 'column',
  justifyContent : 'top',
  alignItems : 'center',
  backgroundColor : '#F7786B'
};
let rootLoginPageArr = [];
for(let key in rootLoginPageStyleObj) {
  rootLoginPageArr.push(key);
}
for(let i = 0; i < rootLoginPageArr.length; i++) {
  rootLoginPage.style[rootLoginPageArr[i]] = rootLoginPageStyleObj[rootLoginPageArr[i]];
}

//tagCreate 함수
function tagCreate(tType,props){
  let element = document.createElement(tType);
  for(let i in props){
    element[i] = props[i];
  }
  return element;
};

// 로고 영역 생성
const logoLoginPageWaper = tagCreate('div', '');
const logoLoginPageWaperStyleObj = {
  width : '250px',
  height : '100px',
  marginTop : '156px',
};
let logoLoginPageWaperStyleArr = [];
for(let key in logoLoginPageWaperStyleObj) {
  logoLoginPageWaperStyleArr.push(key);
}
for(let i = 0; i < logoLoginPageWaperStyleArr.length; i++) {
  logoLoginPageWaper.style[logoLoginPageWaperStyleArr[i]] = logoLoginPageWaperStyleObj[logoLoginPageWaperStyleArr[i]];
}
rootLoginPage.appendChild(logoLoginPageWaper);

const logoLoginPage = tagCreate('img', '');
logoLoginPage.style.width = '100%';
logoLoginPage.src = './resource/MainLogo.png';
logoLoginPageWaper.appendChild(logoLoginPage);



// 로그인 페이지 이미지 요소 생성
const imgLoginPageWrapper = tagCreate('div', '');
const imgLoginPageWrapperStyleObj = {
  width : '150px',
  height : '150px',
  marginTop : '60px',
  borderRadius : '50%',
  backgroundColor : '#d9d9d9',
  display : 'flex',
  justifyContent : 'center',
  alignItems : 'center',
  overflow : 'hidden',
}
let imgLoginPageWrapperArr = [];
for(let key in imgLoginPageWrapperStyleObj) {
  imgLoginPageWrapperArr.push(key);
}
for(let i = 0; i <imgLoginPageWrapperArr.length; i++) {
  imgLoginPageWrapper.style[imgLoginPageWrapperArr[i]] = imgLoginPageWrapperStyleObj[imgLoginPageWrapperArr[i]];
}

rootLoginPage.appendChild(imgLoginPageWrapper);

const imgLoginPage = tagCreate('img', '');
imgLoginPage.style.height = '100%';
imgLoginPage.src = './resource/MainDogImg.jpg';
imgLoginPage.alt = '로그인 페이지 이미지';
imgLoginPageWrapper.appendChild(imgLoginPage);

// 로그인 페이지 ID/PW 입력
const formLoginPageWrapper = tagCreate('div', '')
formLoginPageWrapper.style.width = '390px';
formLoginPageWrapper.style.height = '154px';
rootLoginPage.appendChild(formLoginPageWrapper);

formLoginPageWrapper.innerHTML += `
<form action="/login" method="post">
  <input type="text" name="user_id" autofocus></input>
  <input type="text" name="user_pw"></input>
  <div>
    <input type="submit" value="로그인">
    <a href='/signUp'>회원가입</a>
  </div>
</form>
`;

// form 태그 스타일
const formStyleObj = {
  display : 'flex',
  flexDirection : 'column',
  marginTop : '110px',
};
let formStyleArr = [];
for(let key in formStyleObj) {
  formStyleArr.push(key);
}
for(let i = 0; i < formStyleArr.length; i++) {
  formLoginPageWrapper.children[0].style[formStyleArr[i]] = formStyleObj[formStyleArr[i]];
}

// ID input 스타일
const inputIdStyleObj = {
  marginBottom : '50px',
  height : '52px',
  borderRadius : '52px',
  border : 'none',
  paddingLeft : '25px',
  fontSize : '20px',
};
let inputIdStyleArr = [];
for(let key in inputIdStyleObj) {
  inputIdStyleArr.push(key);
}
for(let i = 0; i < inputIdStyleArr.length; i++) {
  formLoginPageWrapper.children[0].children[0].style[inputIdStyleArr[i]] = inputIdStyleObj[inputIdStyleArr[i]];
}
formLoginPageWrapper.children[0].children[0].setAttribute('placeholder', ' 아이디를 입력하세요');


// PW input 스타일
const inputPwStyleObj = {
  marginBottom : '80px',
  height : '52px',
  borderRadius : '52px',
  border : 'none',
  paddingLeft : '25px',
  fontSize : '20px',
}
let inputPwStyleArr = [];
for(let key in inputPwStyleObj) {
  inputPwStyleArr.push(key);
}
for(let i = 0; i < inputPwStyleArr.length; i++) {
  formLoginPageWrapper.children[0].children[1].style[inputPwStyleArr[i]] = inputPwStyleObj[inputPwStyleArr[i]];
}
formLoginPageWrapper.children[0].children[1].setAttribute('placeholder', ' 비밀번호를 입력하세요');

// 로그인&회원가입 버튼 wrap 스타일
const formWarpStyleObj = {
  display : 'flex',
  flexDirection : 'row',
  justifyContent : 'space-between',
  alignItems : 'center',
}
let formWarpStyleArr = [];
for(let key in formWarpStyleObj) {
  formWarpStyleArr.push(key);
}
for(let i = 0; i < formWarpStyleArr.length; i++) {
  formLoginPageWrapper.children[0].children[2].style[formWarpStyleArr[i]] = formWarpStyleObj[formWarpStyleArr[i]];
}


// 로그인 input=submit 버튼 스타일
const submitBtnStyleObj = {
  border : '1px solid #999',
  borderRadius : '15px',
  width : '180px',
  height : '52px',
  cursor : 'pointer',
  fontSize : '20px',
};
let submitBtnStyleArr = [];
for(let key in submitBtnStyleObj) {
  submitBtnStyleArr.push(key);
}
for(let i = 0; i < submitBtnStyleArr.length; i++) {
  formLoginPageWrapper.children[0].children[2].children[0].style[submitBtnStyleArr[i]] = submitBtnStyleObj[submitBtnStyleArr[i]];
}

// 회원가입 a태그 버튼 스타일
const signUpBtnStyleObj = {
  border : '1px solid #999',
  borderRadius : '15px',
  backgroundColor : '#d9d9d9',
  color : '#222',
  textDecoration : 'none',
  width : '180px',
  height : '52px',
  display : 'flex',
  justifyContent : 'center',
  alignItems : 'center',
  fontSize : '20px',
  cursor : 'pointer',
}
let signUpBtnStyleArr = [];
for(let key in signUpBtnStyleObj) {
  signUpBtnStyleArr.push(key);
}
for(i = 0; i < signUpBtnStyleArr.length; i++) {
  formLoginPageWrapper.children[0].children[2].children[1].style[signUpBtnStyleArr[i]] = signUpBtnStyleObj[signUpBtnStyleArr[i]];
}