function tagCreate(tType,props){
  let element = document.createElement(tType);
  for(let i in props){
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj,styleOb){
  for(i in styleOb){
    obj.style[i] = styleOb[i];
  }
}

function resultWindow(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,targetStyle.signupResultRoot)
  let wrap = tagCreate("div",{id : "wrap"});
  styleCreate(wrap,targetStyle.signupResultWrap)

  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<2;i++){
    let child = tagCreate("div",{});
    styleCreate(child,targetStyle.signupResultMent)
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
  styleCreate(rootChild[1],targetStyle.signupResultBackBtn)
  rootChild[1].addEventListener("click",()=>{
    window.location = 'http://localhost:2080/';
  })
 

}

resultWindow()

