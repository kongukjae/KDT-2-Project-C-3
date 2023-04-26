// btmMenu는 들어가야할 div 인자로 받고 그 인자를 직접 수정하는 함수
//  예시 : btmMeun(rootChild[6]);
function btmMeun(rootChild){
  let menuChild = [];
  styleCreate(rootChild,targetStyle.bottomMenu)
  
  
  
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    rootChild.appendChild(child);
    styleCreate(child,{
      width : "59px",
      height : "59px",
      backgroundColor : "#FDFDFD",
      borderRadius : "5px",
      cursor : "pointer",
      boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      transition : "scale ease 0.3s",
      display : "flex",
      justifyContent: "center",
      alignItems : "center",
      fontSize : "13px",
      fontWeight : "500",
      position : 'relative'
    })
    child.onmouseover = ()=>{
      child.style.scale = "1.1"
    }
    child.onmouseout = ()=>{
      child.style.scale = "1"
  
    }
    menuChild.push(child);
  }
  menuChild[2].id = "mapBtn";

  menuChild[0].innerText = "댕댕마켓";
  menuChild[1].innerText = "댕스타";
  menuChild[2].innerText = "댕맵";
  
  menuChild[3].innerText = "댕톡";
  menuChild[4].innerText = "댕프랜드";
  const jwt = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  fetch('http://localhost:2080/bottomMenuUnreadCircle', {
    method: 'POST',
    body:  jwt
  }).then(response => response.json())
  .then((result)=>{
    let cnt = 0;
    for(let i of result){
      cnt += i.unread
    }
    if(cnt>0){
      let unread = tagCreate('div');
      styleCreate(unread,targetStyle.unreadCircle)
      menuChild[3].appendChild(unread)
      unread.innerText = cnt;
    }
  })

  menuChild[0].addEventListener("click",()=>{
    window.location = "http://localhost:2080/secondHand"
  });
  menuChild[1].addEventListener("click",()=>{
    window.location = "http://localhost:2080/dangstar"
  });
  menuChild[2].addEventListener("click",()=>{
    window.location = "http://localhost:2080/map"
  });
  menuChild[3].addEventListener("click",()=>{
    window.location = "http://localhost:2080/dangTalkChatList"
  });
  menuChild[4].addEventListener("click",()=>{
    window.location = "http://localhost:2080/friendsList"
  });
}