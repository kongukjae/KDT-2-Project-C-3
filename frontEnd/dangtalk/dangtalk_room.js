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

  rootChild[1].innerText = `${targetId} 님과의 채팅방`;
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
    body:  roomName
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



  //채팅
  let chat = io('http://localhost:2080/chat')
  chat.emit("login", {
      name: `${userId}`,
      room: `${roomName}`})
  inputWrapChild[1].addEventListener("click",()=>{
    let msgNow = inputWrapChild[0].value
    // 서버로 자신의 정보를 전송한다.
    chat.emit("chat message", {
      name: `${userId}`,
      room: `${roomName}`,
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
        room: `${roomName}`,
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

 window.addEventListener('load',()=>{
  const jwt = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  setTimeout(()=>{
    fetch("http://localhost:2080/bottomMenuUnreadCircle", {
      method: "POST",
      body: jwt,
    })
      .then((response) => response.json())
      .then((result) => {
        let cnt = 0;
        for (let i of result) {
          cnt += i.unread;
        }
        if (cnt > 0) {
          let unread = tagCreate("div");
          let dangtalkButton = document.getElementById('dangtalkButton')
          styleCreate(unread, targetStyle.unreadCircle);
          dangtalkButton.appendChild(unread);
          unread.innerText = cnt;
        }else if (cnt === 0 && dangtalkButton.children.length === 1){
          let dangtalkButton = document.getElementById('dangtalkButton')
          dangtalkButton.children[0].style.display ='none'
        }
      });
  },1000)
 }) 
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