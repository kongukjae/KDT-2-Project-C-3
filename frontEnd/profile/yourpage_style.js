function yourPage(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root, mypageStyle.mypageRoot)

  let rootChild = [];
  for(let i = 0;i<8;i++){
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


  styleCreate(rootChild[1], mypageStyle.mypageTitle)
  rootChild[1].innerText = `${targetIdFromServer}님의 페이지`;
  
  styleCreate(rootChild[2], mypageStyle.mypageImageStyle);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${targetIdFromServer}`); 
  xhr.addEventListener('load', function(){
      let imageFromServer = URL.createObjectURL(xhr.response);
      rootChild[2].style.backgroundImage = `url(${imageFromServer})`
      console.log("이미지 가져오기 완료");
  });


  styleCreate(rootChild[3], mypageStyle.mypageButtonWrap)
  for(let i = 0; i < 2; i++){
    let button = tagCreate("div");
    styleCreate(button, mypageStyle.mypageButton)
    rootChild[3].appendChild(button)
  }
  rootChild[3].children[0].innerText = "팔로우";
  rootChild[3].children[1].innerText = "채팅";
  const JWT = document.cookie.split("=")[2]
  let followCheckXhr = new XMLHttpRequest();
  let _URL = `http://localhost:2080/followCheck`;
  let followRequestURL = 'http://localhost:2080/followRequest'
  let followRequestMessage = '팔로우'
  followCheckXhr.open("POST",_URL);
  followCheckXhr.send(JSON.stringify({jwt:JWT,you:targetIdFromServer}));
  followCheckXhr.addEventListener("load",()=>{
    if(followCheckXhr.response === 'yes'){
      starCheck(rootChild[2]);
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
  rootChild[3].children[1].addEventListener('click',()=>{
    const jwt = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    
    fetch('http://localhost:2080/createChatRoomRequest', {
      method: 'POST',
      body: JSON.stringify({jwt:jwt,targetId:targetIdFromServer})
    }).then((result)=>{
      console.log(result);
      let chatBoxForm = document.createElement('form');
      chatBoxForm.method = "POST"
      chatBoxForm.action = "/dangTalkChatRoom";
      let params = {jwt:jwt, targetId:targetIdFromServer};
      for(let key in params){
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type","hidden");
        hiddenField.setAttribute("name",key);
        hiddenField.setAttribute("value",params[key]);
        chatBoxForm.appendChild(hiddenField);
      }
      document.body.appendChild(chatBoxForm);
      chatBoxForm.submit();
    })
  })

  //산책 온도 만드는 곳
  const tempJwt = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  let tempXhr = new XMLHttpRequest();
  tempXhr.open("POST", "http://localhost:2080/temperature");
  tempXhr.send(`jwt=${tempJwt}&you=${targetIdFromServer}`);
  tempXhr.addEventListener('load', () => {
    
    let result = JSON.parse(tempXhr.response);
    console.log("산책 온도 반환 받음: ", result)

    if(result.re){
        styleCreate(rootChild[4], {
          width: stylePropertyUnion.width.widthP90,
          height: stylePropertyUnion.height.height50,
          marginTop: "20px",
          position: "relative",
          borderRadius: "10px",
        ...stylePropertyUnion.flexRowAroundCenter,
        gap: "10px",
        backgroundColor: stylePropertyUnion.colorTheme.whiteTypeB,
        padding: "0 10px 0 10px"
      })
      
      for(let i = 0; i < 2; i++){
        let child = tagCreate("div");
        rootChild[4].appendChild(child)
      }
      styleCreate(rootChild[4].children[0], {
        width: stylePropertyUnion.width.widthP70,
        height: stylePropertyUnion.width.widthP90,
        // backgroundColor: stylePropertyUnion.colorTheme.whiteTypeA,
        ...stylePropertyUnion.flexRowCenter,
      })
      styleCreate(rootChild[4].children[1], {
        width: stylePropertyUnion.width.widthP30,
        height: stylePropertyUnion.width.widthP90,
        // backgroundColor: stylePropertyUnion.colorTheme.whiteTypeA,
        // cursor: "pointer",
        ...stylePropertyUnion.flexRowAroundCenter,
      })
      
      for(let i = 0; i < 2; i++){
        let child = tagCreate("div");
        let childBtn = tagCreate("div");
        rootChild[4].children[0].appendChild(child)
        rootChild[4].children[1].appendChild(childBtn)
        styleCreate(childBtn, {
          width: stylePropertyUnion.width.width40,
          height: stylePropertyUnion.width.width40,
          cursor: "pointer",
          borderRadius: "5px",
          ...stylePropertyUnion.flexRowCenter,
          fontSize: "35px",
          margin: "0 20px 5px 0",
        textAlign: "center"
    
        });
      }
    
      styleCreate(rootChild[4].children[0].children[0], {
        width: stylePropertyUnion.width.width50,
        height: stylePropertyUnion.width.widthP100,
        margin: "0 20px 5px 0",
        borderRadius: "50%",
        ...stylePropertyUnion.flexRowAroundCenter,
        fontSize: "35px",
        textAlign: "center"
      });
    
      styleCreate(rootChild[4].children[0].children[1], {
        width: stylePropertyUnion.width.widthP50,
        height: stylePropertyUnion.width.widthP60,
        paddingRight: "30px",
        ...stylePropertyUnion.flexRowAroundCenter,
        fontSize: stylePropertyUnion.fontSizeSet.mediumLarge,
        fontWeight: stylePropertyUnion.fontWeightSet.bold
      });

      if(result.up === 0 && result.down === 1) {
        rootChild[4].children[1].children[0].style.opacity = '0.7';
      } else if(result.up === 1 && result.down === 0) {
        rootChild[4].children[1].children[1].style.opacity = '0.7';
      }

      rootChild[4].children[0].children[1].innerText = `${result.temp.toFixed(1)} ℃`
      rootChild[4].children[1].children[0].innerText = `👍🏻`
      rootChild[4].children[1].children[1].innerText = `👎🏻`
      Tempemoji();

      goodTg = false;
      badTg = false;
      rootChild[4].children[1].children[0].addEventListener('click', () => {
        console.log("추천함")
        temperatureCheck(rootChild[4].children[1].children[0], rootChild[4].children[1].children[1])
      });
      rootChild[4].children[1].children[1].addEventListener('click', () => {
        console.log("비추천함")
        temperatureCheck(rootChild[4].children[1].children[1], rootChild[4].children[1].children[0])      
      });
    }
    else{
      console.log("값 없으으으으므ㅡㄷㅇㅁ: ", result.re)
    }
    function Tempemoji(){
      if(result.temp.toFixed(1) > 42 && result.temp.toFixed(1) <= 60){
        rootChild[4].children[0].children[0].innerText = `😃`
      }
      else if(result.temp.toFixed(1) > 25 && result.temp.toFixed(1) <= 35){
        rootChild[4].children[0].children[0].innerText = `😐`
      }
      else if(result.temp.toFixed(1) > 60){
        rootChild[4].children[0].children[0].innerText = `😄`
      }
      else if(result.temp.toFixed(1) <= 25){
        rootChild[4].children[0].children[0].innerText = `😓`
      }
      else{
        rootChild[4].children[0].children[0].innerText = `🙂`
      }
    }
  })

  function temperatureCheck(target, sibling) {
    const jwt = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let _URL;
    let _comment;

    if(target === rootChild[4].children[1].children[0]) {
      _URL = `http://localhost:2080/UpTemp`;
      _comment = '추천';
      target.style.opacity = '1';
      sibling.style.opacity = '0.7';
    } else {
      _URL = `http://localhost:2080/DownTemp`;
      _comment = '비추천';
      target.style.opacity = '1';
      sibling.style.opacity = '0.7';
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', _URL);
    xhr.send(`jwt=${jwt}&you=${targetIdFromServer}`)
    xhr.addEventListener('load', () => {
      let result = JSON.parse(xhr.response);
      console.log(result);
      console.log('산책 온도 응답 받음')
      if(!result) {
        alert(`이미 ${_comment}하셨습니다`);
      } else {
        rootChild[4].children[0].children[1].innerText = `${result.toFixed(1)} ℃`;
      }
    })
  }

  styleCreate(rootChild[5], mypageStyle.mypageUserinfoBox)
  for(let i = 0; i < 6;i++){
    let infoTag = tagCreate("div");
    styleCreate(infoTag, mypageStyle.mypageUserinfoBoxInnerStyle)
    rootChild[5].appendChild(infoTag)
  }
  rootChild[5].children[0].innerText = `강아지 이름 : ${dogNameFromServer}`
  if(dogageFromServer === 'null'){
    rootChild[5].children[1].innerText = `나이 : 나이 정보가 없습니다`
  }else{
    rootChild[5].children[1].innerText = `나이 : ${dogageFromServer}`
  }
  if(dogsizeFromServer === 'null'){
    rootChild[5].children[2].innerText = `강아지 크기 : 강아지 크기정보가 없습니다`
  }else if(dogsizeFromServer === '1'){
    rootChild[5].children[2].innerText = `강아지 크기 : 소형견`
  }else if(dogsizeFromServer === '2'){
    rootChild[5].children[2].innerText = `강아지 크기 : 중형견`
  }else if(dogsizeFromServer === '3'){
    rootChild[5].children[2].innerText = `강아지 크기 : 대형견`
  }
  

  // rootChild[5].children[3].innerText = `산책온도 :`
  if(dogGenderFromServer === '1'){
    rootChild[5].children[3].innerText = "성별 : 남자"
  }else{
    rootChild[5].children[3].innerText = "성별 : 여자"
  }
  if(introFromServer === 'null'){
    rootChild[5].children[5].innerText = '소개글이 없습니다'
  }else{
    rootChild[5].children[5].innerText = introFromServer;
  }
  rootChild[5].children[4].innerText = `소개글`

  rootChild[5].style.height = '400px'
  styleCreate(rootChild[5].lastChild, mypageStyle.mypageUserinfoBoxSelfIntroduce)

  styleCreate(rootChild[6], mypageStyle.mypageCalender)
  rootChild[6].innerText = "종윤씨가 좌표에 날짜 새기는 거 완료하면 만들어질 캘린더 자리"

  
  btmMeun(rootChild[7]);

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
