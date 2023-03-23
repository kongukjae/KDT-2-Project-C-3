// root 식별 및 스타일 설정
const rootLoginPage = document.getElementById('root');
rootLoginPage.style.width = '500px';
rootLoginPage.style.height = '100vh';
rootLoginPage.style.display = 'flex';
rootLoginPage.style.flexDirection = 'column';
rootLoginPage.style.justifyContent = 'top';
rootLoginPage.style.alignItems = 'center';
rootLoginPage.style.backgroundColor = '#F7786B'

//tag maker
function tagCreate(tType,props){
  let element = document.createElement(tType);
  for(let i in props){
    element[i] = props[i];
  }
  return element;
};

// 로고 영역
const logoLoginPageWaper = tagCreate('div', '');
logoLoginPageWaper.style.width = '250px';
logoLoginPageWaper.style.height = '100px';
logoLoginPageWaper.style.marginTop = '156px';
rootLoginPage.appendChild(logoLoginPageWaper);

const logoLoginPage = tagCreate('img', '');
logoLoginPage.style.width = '100%';
logoLoginPage.src = './resource/Main_Logo.png';
logoLoginPageWaper.appendChild(logoLoginPage);



// 로그인 페이지 이미지
const imgLoginPageWrapper = tagCreate('div', '');
imgLoginPageWrapper.style.width = '150px';
imgLoginPageWrapper.style.height = '150px';
imgLoginPageWrapper.style.marginTop = '60px';
imgLoginPageWrapper.style.borderRadius = '50%';
imgLoginPageWrapper.style.backgroundColor = '#d9d9d9';
imgLoginPageWrapper.style.display = 'flex';
imgLoginPageWrapper.style.justifyContent = 'center';
imgLoginPageWrapper.style.alignItems = 'center';
imgLoginPageWrapper.style.overflow = 'hidden';
rootLoginPage.appendChild(imgLoginPageWrapper);

const imgLoginPage = tagCreate('img', '');
imgLoginPage.style.height = '100%';
imgLoginPage.src = './resource/Login_Dog.jpg';
imgLoginPage.alt = '로그인 페이지 이미지';
imgLoginPageWrapper.appendChild(imgLoginPage);

// 로그인 페이지 ID/PW 입력
const formLoginPageWrapper = tagCreate('div', '')
formLoginPageWrapper.style.width = '390px';
formLoginPageWrapper.style.height = '154px';
rootLoginPage.appendChild(formLoginPageWrapper);

formLoginPageWrapper.innerHTML += `
<form>
  <input type="text" name="user_id"></input>
  <input type="text" name="user_pw"></input>
  <div>
    <input type="submit" value="로그인">
    <a href='/signUp'>회원가입</a>
  </div>
</form>
`;
console.dir(formLoginPageWrapper.children[0]);

// form 태그
formLoginPageWrapper.children[0].style.display = 'flex';
formLoginPageWrapper.children[0].style.flexDirection = 'column';
formLoginPageWrapper.children[0].style.marginTop = '110px';

// ID input
formLoginPageWrapper.children[0].children[0].style.marginBottom = '50px';
formLoginPageWrapper.children[0].children[0].style.height = '52px';
formLoginPageWrapper.children[0].children[0].style.borderRadius = '52px';
formLoginPageWrapper.children[0].children[0].style.border = 'none';
formLoginPageWrapper.children[0].children[0].style.paddingLeft = '25px';
formLoginPageWrapper.children[0].children[0].style.fontSize = '20px';
formLoginPageWrapper.children[0].children[0].setAttribute('placeholder', ' 아이디를 입력하세요');

console.dir(formLoginPageWrapper.children[0].children[0]);

// PW input
formLoginPageWrapper.children[0].children[1].style.marginBottom = '80px';
formLoginPageWrapper.children[0].children[1].style.height = '52px';
formLoginPageWrapper.children[0].children[1].style.borderRadius = '52px';
formLoginPageWrapper.children[0].children[1].style.border = 'none';
formLoginPageWrapper.children[0].children[1].style.paddingLeft = '25px';
formLoginPageWrapper.children[0].children[1].style.fontSize = '20px';
formLoginPageWrapper.children[0].children[1].setAttribute('placeholder', ' 비밀번호를 입력하세요');

// 로그인&회원가입 버튼 wrap
formLoginPageWrapper.children[0].children[2].style.display = 'flex';
formLoginPageWrapper.children[0].children[2].style.flexDirection = 'row';
formLoginPageWrapper.children[0].children[2].style.justifyContent = 'space-between';
formLoginPageWrapper.children[0].children[2].style.alignItems = 'center';

// 로그인 input=submit 버튼
formLoginPageWrapper.children[0].children[2].children[0].style.border = '1px solid #999';
formLoginPageWrapper.children[0].children[2].children[0].style.width = '180px';
formLoginPageWrapper.children[0].children[2].children[0].style.height = '52px';
formLoginPageWrapper.children[0].children[2].children[0].style.cursor = 'pointer';



// 회원가입 a태그 버튼
formLoginPageWrapper.children[0].children[2].children[1].style.border = '1px solid #999';
formLoginPageWrapper.children[0].children[2].children[1].style.borderRadius = '3px';
formLoginPageWrapper.children[0].children[2].children[1].style.backgroundColor = '#d9d9d9';
formLoginPageWrapper.children[0].children[2].children[1].style.color = '#222';
formLoginPageWrapper.children[0].children[2].children[1].style.textDecoration = 'none';
formLoginPageWrapper.children[0].children[2].children[1].style.width = '180px';
formLoginPageWrapper.children[0].children[2].children[1].style.height = '52px';
formLoginPageWrapper.children[0].children[2].children[1].style.display = 'flex';
formLoginPageWrapper.children[0].children[2].children[1].style.justifyContent = 'center';
formLoginPageWrapper.children[0].children[2].children[1].style.alignItems = 'center';
formLoginPageWrapper.children[0].children[2].children[1].style.cursor = 'pointer';