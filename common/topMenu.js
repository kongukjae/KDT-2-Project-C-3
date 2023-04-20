// 아래 두 함수를 나란히 쓰는 것을 추천
// topMenu는 들어가야할 div 인자로 받고 그 인자를 직접 수정하는 함수
// createHamburger는 부모인 root를 직접 인자로 받아 새로운 슬라이드 태그를 생성하는 함수
// topMenu(rootChild[0]);
// createHamburger(root);

function topMenu(rootChild){
  //const root = document.getElementById('root');

  styleCreate(rootChild,targetStyle.topMenu)
  const logoLoginPage = tagCreate('img', '');
  logoLoginPage.style.width = '28%';
  logoLoginPage.src = './resource/MainLogo.png';
  rootChild.appendChild(logoLoginPage);

}

   // ----햄버거 버튼 구역입니다.----

  function createHamburger(targetRoot){
  // 루트 오버플로우
  styleCreate(targetRoot, {
    overflow: "hidden",
  });
  let hamburger = tagCreate("div",{});
  targetRoot.children[0].appendChild(hamburger);
  styleCreate(hamburger,{
    width: "30px",
  height: "22.5px",
  position: "absolute",
  top: "50px",
  left: "15px",
  cursor: "pointer"
  })
  
  hamburger.addEventListener("click", () => {
    menuSlide.style.left = "0";
  });
 // 햄버거 바 생성
  let bar1 = tagCreate("div", {});
  let bar2 = tagCreate("div", {});
  let bar3 = tagCreate("div", {});
  hamburger.appendChild(bar1);
  hamburger.appendChild(bar2);
  hamburger.appendChild(bar3);
  styleCreate(bar1, {
    width: "100%",
    height: "4.5px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    position: "absolute",
    top: "0px",
    left: "0px",
  });
  styleCreate(bar2, {
    width: "100%",
    height: "4.5px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    position: "absolute",
    top: "9px",
    left: "0px",
  });
  styleCreate(bar3, {
    width: "100%",
    height: "4.5px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    position: "absolute",
    top: "18px",
    left: "0px",
  });


 // 햄버거 설정 이곳이 메뉴 공간

 // 메뉴 슬라이드 요소
  let menuSlide = tagCreate("div", {id: 'hamburgerSlide'});
  targetRoot.appendChild(menuSlide);
  styleCreate(menuSlide, {
    width: "300px",
    height: "100%",
    backgroundColor: "#F7786B",
    position: "absolute",
    left: "-600px",
    top: "0",
    transition: "left 0.6s ease",
    zIndex: 1
  });
 // 햄버거 빵, 고기, 빵 이벤트 요소
 // bar1.addEventListener("click", () => {
 //   menuSlide.style.left = "0";
 // });
 // bar2.addEventListener("click", () => {
 //   menuSlide.style.left = "0";
 // });
 // bar3.addEventListener("click", () => {
 //   menuSlide.style.left = "0";
 // });
 
 // X버튼 요소
  let closeButton = tagCreate("div", {});
  menuSlide.appendChild(closeButton);
  styleCreate(closeButton, {
    width: "30px",
    height: "30px",
    backgroundColor: pageStyle.colorTheme.peach,
    borderRadius: "50%",
    position: "absolute",
    top: "20px",
    right: "15px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  
  });
  
  closeButton.innerHTML = "&#x2716;"; // X 모양 아이콘
  
  
  // x모양 메뉴슬라이드 클릭시,슬라이드 없어짐
  closeButton.addEventListener("click", () => {
    menuSlide.style.left = "-600px";
  });
  // 다른 곳 클릭시, 슬라이드 사라짐
  targetRoot.children[1].addEventListener("click",() =>{
    menuSlide.style.left = "-600px";
  });
 // 마이페이지 버튼을 만들어준다.
  let myPageBtn = tagCreate("button", {});
  menuSlide.appendChild(myPageBtn);
  styleCreate(myPageBtn, {
    width: "100px",
    height: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    position: "absolute",
    top: "20px",
    left: "20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "#F7786B"
  });
  myPageBtn.innerText = "마이페이지";
  
  // 로그아웃 버튼을 만들어준다.
  let logoutBtn = tagCreate("button", {});
  menuSlide.appendChild(logoutBtn);
  styleCreate(logoutBtn, {
    width: "100px",
    height: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    position: "absolute",
    top: "20px",
    left: "140px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "#F7786B"
  });
  logoutBtn.innerText = "로그아웃";
  
  myPageBtn.addEventListener("click", () => {
   // 1. 토큰이 유효한지 검사한다.
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let mypageForm = document.createElement('form');
  
    mypageForm.method = "POST"
    mypageForm.action = "/mypage";
    let params = {jwt:token, targetId:"mine"}
    for(let key in params){
      let hiddenField = document.createElement("input");
      hiddenField.setAttribute("type","hidden");
      hiddenField.setAttribute("name",key);
      hiddenField.setAttribute("value",params[key]);
      mypageForm.appendChild(hiddenField);
    }
    document.body.appendChild(mypageForm);
    mypageForm.submit();
  // // 2. 폼데이터에 JWT와 targetID 값을 추가한다.
 //   const formData = new FormData();
 //   formData.append("jwt", token);
 //   formData.append("targetId", "mine");

 // // 3. XMLhttpRequest 방식 사용해서 POST 방식으로 요청한다.
 //   const xhr = new XMLHttpRequest();
 //   xhr.open("POST", "/mypage");
 //   xhr.send(formData);

 //   xhr.onreadystatechange = function () {
 //     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
 //       console.log(xhr.response);
 //     }
 //   };
  });
  
  
  
  logoutBtn.addEventListener("click", () => {
  
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = "/";
  });
}


