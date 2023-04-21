function yourPage(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,mypageStyle.mypageRoot)

  let rootChild = [];
  for(let i = 0;i<7;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }
  topMenu(rootChild[0]);
  createHamburger(root);
  // styleCreate(rootChild[0],mypageStyle.mypageTopMenu)
  // const logoLoginPage = tagCreate('img', '');
  // logoLoginPage.style.width = '28%';
  // logoLoginPage.src = './resource/MainLogo.png';
  // rootChild[0].appendChild(logoLoginPage);


  styleCreate(rootChild[1],mypageStyle.mypageTitle)
  rootChild[1].innerText = `${targetIdFromServer}님의 페이지`;
  
  styleCreate(rootChild[2],mypageStyle.mypageImageStyle);

  // 즐겨찾기 표시용 아이콘
  let star = tagCreate('button', {id: "star"});
  styleCreate(star, {
    position: "absolute",
    top: "0px",
    right: "0px",
    width: "50px",
    height: "50px",
    backgroundColor: "yellow",
  })
  rootChild[2].appendChild(star);
  star.addEventListener('click', () => {
    console.log("click");
    console.log(targetIdFromServer);
    let userID = document.cookie.split("jwt=")[1];
    console.log(userID);
    let fr_id = targetIdFromServer;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:2080/starCheck`);
    xhr.send(`userID=${userID}&fr_id=${fr_id}`);
    xhr.addEventListener('load', function() {
      console.log("응답");
    })
  })

  
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${targetIdFromServer}`); 
  xhr.addEventListener('load', function(){
      let imageFromServer = URL.createObjectURL(xhr.response);
      rootChild[2].style.backgroundImage = `url(${imageFromServer})`
      console.log("이미지 가져오기 완료");
  });


  styleCreate(rootChild[3],mypageStyle.mypageButtonWrap)
  for(let i = 0; i < 2; i++){
    let button = tagCreate("div");
    styleCreate(button,mypageStyle.mypageButton)
    rootChild[3].appendChild(button)
  }
  rootChild[3].children[0].innerText = "팔로우";
  rootChild[3].children[1].innerText = "쪽지";
  const JWT = document.cookie.split("=")[2]
  let followCheckXhr = new XMLHttpRequest();
  let _URL = `http://localhost:2080/followCheck`;
  let followRequestURL = 'http://localhost:2080/followRequest'
  let followRequestMessage = '팔로우'
  followCheckXhr.open("POST",_URL);
  followCheckXhr.send(JSON.stringify({jwt:JWT,you:targetIdFromServer}));
  followCheckXhr.addEventListener("load",()=>{
    if(followCheckXhr.response === 'yes'){
      followRequestURL = 'http://localhost:2080/unFollowRequest'
      followRequestMessage = '팔로우 취소'
      rootChild[3].children[0].innerText = "팔로우 취소";
    }
  })

  rootChild[3].children[0].addEventListener("click",()=>{
    let xhr = new XMLHttpRequest();
      xhr.open("POST",followRequestURL);
      xhr.send(JSON.stringify({jwt:JWT,you:targetIdFromServer}));
      xhr.addEventListener("load",()=>{
        alert(`${targetIdFromServer}님을 ${followRequestMessage} 했습니다`);
        location.reload();
      })
  })

  styleCreate(rootChild[4],mypageStyle.mypageUserinfoBox)
  for(let i = 0; i < 5;i++){
    let infoTag = tagCreate("div");
    styleCreate(infoTag,mypageStyle.mypageUserinfoBoxInnerStyle)
    rootChild[4].appendChild(infoTag)
  }
  rootChild[4].children[0].innerText = `강아지 이름 : ${dogNameFromServer}`
  rootChild[4].children[1].innerText = "나이"
  if(dogGenderFromServer === '1'){
    rootChild[4].children[2].innerText = "성별 : 남자"
  }else{
    rootChild[4].children[2].innerText = "성별 : 여자"
  }
  rootChild[4].children[3].innerText = "소개글"


  styleCreate(rootChild[4].lastChild,mypageStyle.mypageUserinfoBoxSelfIntroduce)

  styleCreate(rootChild[5],mypageStyle.mypageCalender)
  rootChild[5].innerText = "종윤씨가 좌표에 날짜 새기는 거 완료하면 만들어질 캘린더 자리"



  styleCreate(rootChild[6],targetStyle.bottomMenu)


  btmMeun(rootChild[6]);

  // for(let i = 0;i<5;i++){
  //   let child = tagCreate("div",{});
  //   rootChild[6].appendChild(child);
  //   styleCreate(child,{
  //     width : "59px",
  //     height : "59px",
  //     backgroundColor : "#FDFDFD",
  //     borderRadius : "5px",
  //     cursor : "pointer",
  //     boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  //     transition : "scale ease 0.3s",
  //     display : "flex",
  //     justifyContent: "center",
  //     alignItems : "center",
  //     fontSize : "13px",
  //     fontWeight : "500"
  //   })
  //   child.onmouseover = ()=>{
  //     child.style.scale = "1.1"
  //   }
  //   child.onmouseout = ()=>{
  //     child.style.scale = "1"

  //   }
  //   menuChild.push(child);
  // }
  // menuChild[0].innerText = "댕댕마켓";
  // menuChild[1].innerText = "댕자랑";
  // menuChild[2].innerText = "댕맵";

  // menuChild[3].innerText = "댕톡";
  // menuChild[4].innerText = "댕프랜드";
  // menuChild[2].addEventListener("click",()=>{
  //   window.location = "http://localhost:2080/map"
  // })
}
yourPage()
