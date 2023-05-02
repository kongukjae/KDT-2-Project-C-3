function main(){

  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,dangtalkChattingRoomStyle.mainRoot)
  let wrap = tagCreate("div",{id : "wrap"});
  styleCreate(wrap,dangtalkChattingRoomStyle.chattingContainer)
  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<6;i++){
    let child = tagCreate("div",{});
    wrap.appendChild(child);
    rootChild.push(child);
  }
  topMenu(rootChild[0]);
  createHamburger(root);
  
  styleCreate(rootChild[1],dangtalkChattingRoomStyle.chattingTitle)
  styleCreate(rootChild[2],dangtalkChattingRoomStyle.chattingWrap)
  styleCreate(rootChild[3],dangtalkChattingRoomStyle.chattingInputWrap)
  styleCreate(rootChild[4],{
    height : "120px"
  })
  // rootChild[2].addEventListener('scroll', function(){
  //   console.log(rootChild[2].scrollY)
  // });

  rootChild[1].innerText = `${roomName} 단톡방`;
  let inputWrapChild = [];
  let inputWrapChildInput = tagCreate("input",{type:'text'});
  rootChild[3].appendChild(inputWrapChildInput);
  inputWrapChild.push(inputWrapChildInput);
  let inputWrapChildButton = tagCreate("div",{});
  rootChild[3].appendChild(inputWrapChildButton);
  inputWrapChild.push(inputWrapChildButton);

  styleCreate(inputWrapChild[0],dangtalkChattingRoomStyle.chattingInputText)
  styleCreate(inputWrapChild[1],dangtalkChattingRoomStyle.chattingSubmitButton)
  inputWrapChild[1].innerText = "전송"

  

  // 하단 메뉴바
  btmMeun(rootChild[5])
  // 이전채팅 불러오기
  fetch('http://localhost:2080/loadBeforeChatRequest', {
    method: 'POST',
    body:  roomCode
  }).then(response => response.json())
  .then((result=>{
    for(let i of result){
      console.log(i)
      if(userId===i.id){
        createChatMsg(rootChild[2],i.id,'Me', i.id+':'+i.text);
      }
      else{
        createChatMsg(rootChild[2],i.id,'You', i.id+':'+i.text);
      }
    }
  }))
  createUserOrgchat(rootChild[1],roomCode)

  function createUserOrgchat(mother,roomCode){
    let chatListButton = tagCreate('div');
    styleCreate(chatListButton, {
      width : '100px',
      height : '40px',
      backgroundColor: stylePropertyUnion.colorTheme.peach,
      boxShadow: stylePropertyUnion.defaultBoxShadow.defBoxSdw,
      position:'absolute',
      left : '10px',
      borderRadius : '5px',
      ...stylePropertyUnion.flexRowCenter,
      cursor : 'pointer',
      fontSize : '12px',
      color: 'white'
    });
    chatListButton.innerText = '참여자 목록'
    mother.appendChild(chatListButton);
    chatListButton.addEventListener('click',()=>{
      mother.appendChild(chatList)
    })

    let chatList = tagCreate("div", {id: 'chatList'});
    styleCreate(chatList, dangMapStyle.userList);
    styleCreate(chatList, {
      position : 'absolute',
      left : '5px',
      top : '5px',
      borderRadius : '5px',
      border : '0px',
      boxShadow: stylePropertyUnion.defaultBoxShadow.defBoxSdw,
    });
  
    let chatChild = [];
    for (let i = 0; i < 2; i++) {
      let child = tagCreate("div", {});
      chatList.appendChild(child);
      chatChild.push(child);
    }
    //채팅방 제목 영억
    styleCreate(chatChild[0], dangMapStyle.chatRoomTitleBox);
    
    //나가기 버튼
    let exit = tagCreate("button", {});
    chatChild[0].appendChild(exit);
    styleCreate(exit, dangMapStyle.chatJoinBtn);
    styleCreate(exit, {
      position : 'relative',
      left : '-90px',
      border : '0px',
      borderRadius : '5px',
      boxShadow: stylePropertyUnion.defaultBoxShadow.defBoxSdw,
      cursor : 'pointer'
    });

    exit.innerText = "X";
    exit.addEventListener('click',()=>{
      chatList.remove();
    })
  
    //채팅 참여자 리스트 영역
    //chatChild[1].id = "chatList";
    styleCreate(chatChild[1], dangMapStyle.chatPeopleListContainer);
  
    const http = new XMLHttpRequest();
    const url = `http://localhost:2080/mapChatList`;
  
  
    http.open("POST", url);
    http.send(`roomName=${roomCode}`);
    http.addEventListener('load', () => {
      let roomList = JSON.parse(http.response);
      chatListButton.innerText += " "+ Object.keys(roomList).length +'명';
      for (const key in roomList) {
        createUserOrgchatList(chatChild[1], roomList[key][0], roomList[key][1]);        
      }
    });
  }
  
  
  function createUserOrgchatList(parent, userID, dogName){
  
    let box = tagCreate("div", {});
    parent.appendChild(box);
    styleCreate(box, dangMapStyle.chatPeopleListBox);
  
    let chatlistUserImg = tagCreate("div", {});
    box.appendChild(chatlistUserImg);
    styleCreate(chatlistUserImg, dangMapStyle.chatlistUserImg);
  
    let chatlistBoxComponent = tagCreate("div", {});
    box.appendChild(chatlistBoxComponent);
    styleCreate(chatlistBoxComponent, dangMapStyle.chatlistBoxComponent);
  
    // let userSapce = tagCreate("div", {})
    // chatlistBoxComponent.appendChild(userSapce);
    // styleCreate(userSapce, {
  
    // })
  
    let chatlistUserName = tagCreate("div", {});
    chatlistBoxComponent.appendChild(chatlistUserName);
    styleCreate(chatlistUserName, dangMapStyle.chatlistUserName);
    // chatlistUserName.innerText = dogName;
    chatlistUserName.innerText = userID;
  
    let chatlistDogName = tagCreate("div", {});
    chatlistBoxComponent.appendChild(chatlistDogName);
    styleCreate(chatlistDogName, dangMapStyle.chatlistDogName);
    chatlistDogName.innerText = dogName;
  
    let target = userID;
    console.log("cookie: ", target);
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:2080/sendImage`);
    xhr.responseType = 'blob';
    xhr.send(`type=proFile&id=${target}`); 
    xhr.addEventListener('load', function(){
      let imageFromServer = URL.createObjectURL(xhr.response);
      chatlistUserImg.style.backgroundImage = `url(${imageFromServer})`;
      console.log("이미지 가져오기 완료");
    });
    styleCreate(box,{cursor:'pointer'});
    const jwt = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let mypageForm = document.createElement('form');
    
    mypageForm.method = "POST";
    mypageForm.action = "/mypage";
    let params = {jwt:jwt, targetId:userID}
    for(let key in params){
      let hiddenField = document.createElement("input");
      hiddenField.setAttribute("type","hidden");
      hiddenField.setAttribute("name",key);
      hiddenField.setAttribute("value",params[key]);
      mypageForm.appendChild(hiddenField);
    }
    window.document.body.appendChild(mypageForm);
    box.addEventListener('click',()=>{
      mypageForm.submit();
    })
  }




  //채팅
  let chat = io('http://localhost:2080/chat')
  if(firsttime==='true'){
    chat.emit("firstEnter", {
      name: `${userId}`,
      room: `${roomCode}`})
  }

  chat.emit("login", {
      name: `${userId}`,
      room: `${roomCode}`})
  inputWrapChild[1].addEventListener("click",()=>{
    let msgNow = inputWrapChild[0].value
    // 서버로 자신의 정보를 전송한다.
    chat.emit("chat message", {
      name: `${userId}`,
      room: `${roomCode}`,
      msg: msgNow
    });

    inputWrapChild[0].value='';
  });
  inputWrapChild[0].addEventListener("keydown",(e)=>{
    if(e.key==='Enter'){
      let msgNow = inputWrapChild[0].value
      // 서버로 자신의 정보를 전송한다.
      chat.emit("chat message", {
        name: `${userId}`,
        room: `${roomCode}`,
        msg: msgNow
      });
  
      inputWrapChild[0].value='';
    }
  });
 
  // 서버로부터의 메시지가 수신되면
  chat.on("chat message", function(data) {
    let msgFrom = data.split('&')[0]
    let msgtext = data.split('&')[1]
    if(userId===msgFrom){
      createChatMsg(rootChild[2],msgFrom,'Me', msgFrom+':'+msgtext)
    }
    else{
      createChatMsg(rootChild[2],msgFrom,'You', msgFrom+':'+msgtext)
    }
  });
  chat.on("firstEnter", function(data) {
    let firstEnterText = tagCreate('div')
    styleCreate(firstEnterText,{
      width : '300px',
      height : '30px',
      backgroundColor : 'darkgray',
      opacity : '0.5',
      margin : '10px',
      borderRadius:'15px',
      fontSize :'14px',
      display : 'flex',
      justifyContent:'center',
      alignItems:'center'
    })
    firstEnterText.innerText = data;
    rootChild[2].appendChild(firstEnterText);
  });
}
main()

function createChatMsg(mother,targetId,fromMeorYou, msg){
  let chatBox = tagCreate("div");
  let imagebox = tagCreate("div");
  let msgbox = tagCreate("div");
  if(fromMeorYou ==='Me'){
    styleCreate(chatBox,dangtalkChattingRoomStyle.chattingFromMe);
    styleCreate(msgbox,dangtalkChattingRoomStyle.msgBoxStyleFromMe);
    chatBox.appendChild(msgbox);
    chatBox.appendChild(imagebox);
  }else{
    styleCreate(chatBox,dangtalkChattingRoomStyle.chattingFromYou);
    styleCreate(msgbox,dangtalkChattingRoomStyle.msgBoxStyleFromYou);
    chatBox.appendChild(imagebox);
    chatBox.appendChild(msgbox);
  };
  
  styleCreate(imagebox,dangtalkChattingRoomStyle.imageBoxStyle);

   msgbox.innerText = msg;
  
  mother.appendChild(chatBox);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${targetId}`); 
  xhr.addEventListener('load', function(){
      let imageFromServer = xhr.response;
      const resultURL = URL.createObjectURL(xhr.response);
      imagebox.style.backgroundImage = `url(${resultURL})`
      console.log("이미지 가져오기 완료");
  })
}