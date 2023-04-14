function myPage(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,mypageStyle.mypageRoot)

  let rootChild = [];
  for(let i = 0;i<7;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }
  // 1.메뉴상단 부분 root 0  ==> 메뉴 최상단
  styleCreate(rootChild[0],mypageStyle.mypageTopMenu)
  const logoLoginPage = tagCreate('img', '');
  logoLoginPage.style.width = '28%';
  logoLoginPage.src = './resource/MainLogo.png';
  rootChild[0].appendChild(logoLoginPage); 



//  2.  제목부분 root1
  styleCreate(rootChild[1],mypageStyle.mypageTitle)
  rootChild[1].innerText = `산돌이를 찾아주세요`;


//  3.  root2 본문부분이다. 본문에 작성할 함수
  styleCreate(rootChild[2],mypageStyle.mypageTopMenu)
  rootChild[2].innerText = `산돌이는 대전에서 잃어버렸어요`;
  let maintext =  tagCreate("div",{});
  

  // root3 카테고리, 사진업로드 버튼 
  styleCreate(rootChild[3],mypageStyle.mypageTopMenu)
  // for(let i = 0; i < 2; i++){
  //   let button = tagCreate("div");
  //   styleCreate(button,mypageStyle.mypageButton)
  //   rootChild[3].appendChild(button)
  // }
  rootChild[3].innerText = `산돌이를 찾아주세요`;
  rootChild[3].children[0].innerText = `카테고리`;
  rootChild[3].children[1].innerText = `사진업로드`;


//  root4, 제출버튼
  styleCreate(rootChild[4],mypageStyle.mypageUserinfoBox)
  rootChild[4].innerText=`제출버튼`;


  



 // root6 바텀메뉴, 맨 밑에 페이지 구간
//   styleCreate(rootChild[6],targetStyle.bottomMenu)

//   let menuChild = [];
//   for(let i = 0;i<5;i++){
//     let child = tagCreate("div",{});
//     rootChild[6].appendChild(child);
//     styleCreate(child,{
//       width : "59px",
//       height : "59px",
//       backgroundColor : "#FDFDFD",
//       borderRadius : "5px",
//       cursor : "pointer",
//       boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
//       transition : "scale ease 0.3s",
//       display : "flex",
//       justifyContent: "center",
//       alignItems : "center",
//       fontSize : "13px",
//       fontWeight : "500"
//     })
//     child.onmouseover = ()=>{
//       child.style.scale = "1.1"
//     }
//     child.onmouseout = ()=>{
//       child.style.scale = "1"

//     }
//     menuChild.push(child);
//   }
//   menuChild[0].innerText = "댕댕마켓";
//   menuChild[1].innerText = "댕자랑";
//   menuChild[2].innerText = "댕맵";

//   menuChild[3].innerText = "댕톡";
//   menuChild[4].innerText = "댕프랜드";
//   menuChild[2].addEventListener("click",()=>{
//     window.location = "http://localhost:2080/map"
//   })
}

myPage()


