
function resultWindow(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,signupPageStyle.signupResultRoot)
  let wrap = tagCreate("div",{id : "wrap"});
  styleCreate(wrap,signupPageStyle.signupResultWrap)

  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<2;i++){
    let child = tagCreate("div",{});
    styleCreate(child,signupPageStyle.signupResultMent)
    wrap.appendChild(child);
    rootChild.push(child);
  }

  
  // styleCreate(rootChild[0],{
  //   color : "white",
  //   fontSize : "23px",
  //   fontWeight : "700"
  // })

  rootChild[0].innerText = "축하합니다 회원가입이 완료되었습니다";
  
  rootChild[1].innerText = "로그인 화면으로 돌아가기"
  styleCreate(rootChild[1],signupPageStyle.signupResultBackBtn)
  rootChild[1].addEventListener("click",()=>{
    window.location = 'http://localhost:2080/';
  })
 

}

resultWindow()

