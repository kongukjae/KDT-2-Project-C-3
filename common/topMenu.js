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
  logoLoginPage.style.cursor = 'pointer'
  logoLoginPage.src = '/image/resource/MainLogo.png';
  rootChild.appendChild(logoLoginPage);

  logoLoginPage.addEventListener('click',()=>{
    window.location = "/main"
  })

  //알림 기능 영역
  let alarmWrap = tagCreate('div', {})
  rootChild.appendChild(alarmWrap);
  styleCreate(alarmWrap, {
    ...stylePropertyUnion.flexRowCenter,
    position: 'absolute',
    left: "85%"
  })

  let alarmImg = tagCreate('img', {})
  alarmImg.src = '/image/resource/alarm.png';
  styleCreate(alarmImg, targetStyle.alarmStyle)
  alarmWrap.appendChild(alarmImg);

  //알림버튼 클릭 시 나올 모달창
  let alarmWind = tagCreate('div', {});
  styleCreate(alarmWind, targetStyle.alarmWindStyle);

  //알림 온 개수 표시 영역
  let alarmCount = tagCreate('div', {});
  styleCreate(alarmCount, targetStyle.alarmCount)
  alarmWrap.appendChild(alarmCount);
  alarmCount.style.display = "none";

  const jwt = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  fetch("http://15.165.220.45:2080/alarmMark", {
    method: "POST",
    body: jwt,
  })
  .then((response) => response.json())
  .then((result) => {
    console.log("count: ", result)

    if(result > 0){
      alarmCount.style.display = "";

      if(result > 99){
        alarmCount.style.fontSize = "10px";
        alarmCount.style.paddingTop = "2px";
        alarmCount.innerText = "99+";
      }
      else{
        alarmCount.innerText = result;
      }
    }
  })

  // let scrollBar = tagCreate('div', {});
  // styleCreate(scrollBar, {
  //   width: stylePropertyUnion.width.width15,
  //   height: stylePropertyUnion.height.height500,
  // });
  // alarmWind.appendChild(scrollBar);

  //알림 내용 불러오는 곳
  let tg = true;
  alarmImg.addEventListener('click', () => {
    if(tg){
      rootChild.appendChild(alarmWind);
      createClose(alarmWind);

      let alarmList = document.getElementById('alarmList');
  
      fetch("http://15.165.220.45:2080/alarmConent", {
        method: "POST",
        body: jwt,
      })
      .then((response) => response.json())
      .then((result) => {
  
        console.log("akjaksjdk:::::" , result)
        let msg;
        let type = [];
        let num = [];
        let follower = [];

        for(key in result){
          //console.log(result[key], key);
          if(key !== 'type'){
            result[key].forEach((value, index) => {
              if(value !== null && key !== 'commentIdx' && key !== 'public_chat'){
                msg = createMent(key, value);
                createList(alarmList, msg);
                type.push(key);
                num.push(result['commentIdx'][index]);
                
              }
              if(value !== null && key === 'follow'){
                follower.push(value)

              }
              if(value !== null && key === 'public_chat'){

                let targetLocation = value.split('&')
                let geocoder = new kakao.maps.services.Geocoder();
                console.log(targetLocation[0],targetLocation[1])
                let coord = new kakao.maps.LatLng(targetLocation[0], targetLocation[1]);
                let callback = function(result, status) {
                  if (status === kakao.maps.services.Status.OK) {

                    let resultSplit = result[0].address.address_name.split(' ')
                    let roomName = resultSplit[resultSplit.length - 2] +' '+ resultSplit[resultSplit.length - 1]
                    let msgofPublicChat =  roomName + '동네에 단톡이 생성되었습니다'
                    let publicChat = createList(alarmList, msgofPublicChat);
                    let join = tagCreate('div');
                    let dismiss = tagCreate('div');
                    let buttonStyle = {width:'40px',height:'40px',backgroundColor:'antiquewhite',borderRadius:'5px',justifySelf:'end',marginTop:'-7px',cursor:'pointer',display:'flex',justifyContent:"center",alignItems:'center'}
                    styleCreate(join,buttonStyle)
                    styleCreate(dismiss,buttonStyle)
                    join.innerText = '참가';
                    dismiss.innerText = '무시';

                    publicChat.appendChild(join);
                    publicChat.appendChild(dismiss);
                    dismiss.addEventListener('click',()=>{
                      const jwt = document.cookie.replace(
                        /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      );
                      let xhr = new XMLHttpRequest();
                      let url = "http://15.165.220.45:2080/deleteAlarm";
                      xhr.open('POST', url, true);
                      xhr.send(`id=${jwt}&public_chat=${value}&type=public_chat`)
                      xhr.addEventListener('load',()=>{
                        location.reload()
                      })
                    })

                    join.addEventListener('click',()=>{
                      const jwt = document.cookie.replace(
                        /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
                        "$1"
                      );
                      let xhr = new XMLHttpRequest();
                      let url = "http://15.165.220.45:2080/deleteAlarm";
                      xhr.open('POST', url, true);
                      xhr.send(`id=${jwt}&public_chat=${value}&type=public_chat`)
                      xhr.addEventListener('load', moveToPublicChat)
                      async function moveToPublicChat(){
                        const token = document.cookie.replace(
                          /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
                          "$1"
                        );
                        await fetch(`http://15.165.220.45:2080/createPublicChatRoomRequest`,{
                          method: "POST",
                          body: JSON.stringify({jwt:token,roomCode:"!public!"+value,roomName:roomName})
                        }).then((res)=>{return res.text()})
                        .then((result)=>{
                          let publicChatForm = document.createElement("form");
                          publicChatForm.method = "POST";
                          publicChatForm.action = "/dangTalkPublicChatRoom";
                          let params = {jwt: token,roomCode:"!public!"+value,roomName:roomName,firsttime:result};
                          for (let key in params) {
                            let hiddenField = document.createElement("input");
                            hiddenField.setAttribute("type", "hidden");
                            hiddenField.setAttribute("name", key);
                            hiddenField.setAttribute("value", encodeURI(params[key]));
                            publicChatForm.appendChild(hiddenField);
                          }
                          document.body.appendChild(publicChatForm)
                          publicChatForm.submit();
                        })
                      };
                    })
                  }
                };
                geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
              }
            });
          }
        }
        
        alarmListEvent(alarmList, type, num, follower);

      });
      tg = false;
      
    }
    else if(!tg){
      alarmWind.innerHTML = '';
      rootChild.removeChild(alarmWind);
      tg = true;
    }
  });
  

  function createClose(parent){
    //닫기 버튼 영역
    let closeArea = tagCreate('div', {})
    parent.appendChild(closeArea);
    styleCreate(closeArea, {
      width: stylePropertyUnion.width.widthP100,
      height: stylePropertyUnion.height.height30
    })

    let closeBtn = tagCreate("button", {});
    closeArea.appendChild(closeBtn);
    styleCreate(closeBtn, targetStyle.alarmClose);
    closeBtn.innerText = "X";

    let listArea = tagCreate('div', {id: "alarmList"});
    styleCreate(listArea, {
      width: "440px",
      height: "440px",
      overflowY : "scroll",
      marginTop: "10px"
    });
    parent.appendChild(listArea);

    closeBtn.addEventListener('click', () => {
      alarmWind.innerHTML = '';
      rootChild.removeChild(alarmWind);
      tg = true;
    });


  }
  function createList(parent, text){

    //모달창에 알림 리스트 영역
    let alarmList = tagCreate('div', {});
    styleCreate(alarmList, targetStyle.alarmListStyle);
    parent.appendChild(alarmList);
    alarmList.innerText = text;
    return alarmList
  }

  function createMent(type, value){
    if(type === 'like'){
      return `${value}님이 회원님의 게시글에 하트를 표시했습니다.`
    }
    else if(type === 'follow'){
      return `${value}님이 회원님을 팔로우 했습니다.`
    }
    else if(type === 'comment'){
      return `${value}님이 회원님의 게시글에 댓글을 남겼습니다.`
    }
    else if(type === 'public_chat'){
      return '로딩 중'

    }
  }
  
  function alarmListEvent(alarmList, type, num, follower){
    console.log("ljdasdkjdkjaskdjkjkjkdj, ", type, num);
    const jwt = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    console.log("알림 리스트 개수: ", alarmList.childElementCount);

    let cnt = alarmList.childElementCount;
    let xhr = new XMLHttpRequest();
    let url = "http://15.165.220.45:2080/deleteAlarm";

    for(let i = 0; i < cnt; i++){
      alarmList.children[i].addEventListener('click', () => {
        console.log(`${i}번째 자식을 클릭했습니다. `)

        if(type[i] === 'like'){
          xhr.open('POST', url, true);
          xhr.send(`id=${jwt}&num=${num[i]}&type=${type[i]}`)
          xhr.addEventListener('load', ()=>{

            let dataForm = document.createElement("form");
            dataForm.method = "POST";
            dataForm.action = "/detailPostDangstar";
            let params = {postIndex:num[i]}
            for (let key in params) {
              let hiddenField = document.createElement("input");
              hiddenField.setAttribute("type", "hidden");
              hiddenField.setAttribute("name", key);
              hiddenField.setAttribute("value", params[key]);
              dataForm.appendChild(hiddenField);
            }
            document.body.appendChild(dataForm);
            dataForm.submit();
  
          })

        }
        else if(type[i] === 'follow'){
          console.log(follower)
          let test = alarmList.children[i].innerText;
          test = test.split("님이 ")[0];
          console.log("testdkdkdkdk: ", test);

          let flw;
          for(let i=0; i < follower.length; i++){
            if(follower[i] === test){
              flw = follower[i];
            }
          }
          console.log("ddddd: ", flw)
          xhr.open('POST', url, true);
          xhr.send(`id=${jwt}&follow=${flw}&type=${type[i]}`)
          xhr.addEventListener('load', ()=>{
            let mypageForm = document.createElement('form');
            document.body.appendChild(mypageForm);
            mypageForm.method = "POST";
            mypageForm.action = "/mypage";
            let params = {jwt:jwt, targetId:flw}
            for(let key in params){
              let hiddenField = document.createElement("input");
              hiddenField.setAttribute("type","hidden");
              hiddenField.setAttribute("name",key);
              hiddenField.setAttribute("value",params[key]);
              mypageForm.appendChild(hiddenField);
            }
            mypageForm.submit();

          });
        }
        else if(type[i] === 'comment'){
          xhr.open('POST', url, true);
          xhr.send(`id=${jwt}&num=${num[i]}&type=${type[i]}`)
          xhr.addEventListener('load', ()=>{

            let dataForm = document.createElement("form");
            dataForm.method = "POST";
            dataForm.action = "/detailPostDangstar";
            let params = {postIndex:num[i]}
            for (let key in params) {
              let hiddenField = document.createElement("input");
              hiddenField.setAttribute("type", "hidden");
              hiddenField.setAttribute("name", key);
              hiddenField.setAttribute("value", params[key]);
              dataForm.appendChild(hiddenField);
            }
            document.body.appendChild(dataForm);
            dataForm.submit();
  
          })
        }

      })
    }
  };
  
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
  zIndex: 10,
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
  backgroundColor: stylePropertyUnion.colorTheme.peach,
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
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = "/";
  });
}


