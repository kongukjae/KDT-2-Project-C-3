function main(){

  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,dangtalkChattingRoom.mainRoot)
  let wrap = tagCreate("div",{id : "wrap"});
  styleCreate(wrap,dangtalkChattingRoom.chattingContainer)
  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<6;i++){
    let child = tagCreate("div",{});
    wrap.appendChild(child);
    rootChild.push(child);
  }
  topMenu(rootChild[0]);
  createHamburger(root);
  
  styleCreate(rootChild[1],dangtalkChattingRoom.chattingTitle)
  styleCreate(rootChild[2],dangtalkChattingRoom.chattingWrap)
  styleCreate(rootChild[3],dangtalkChattingRoom.chattingInputWrap)
  styleCreate(rootChild[4],{
    height : "120px"
  })
  rootChild[1].innerText = `${targetId} 님과의 채팅방`;
  let inputWrapChild = [];
  let inputWrapChildInput = tagCreate("input",{type:'text'});
  rootChild[3].appendChild(inputWrapChildInput);
  inputWrapChild.push(inputWrapChildInput);
  let inputWrapChildButton = tagCreate("div",{});
  rootChild[3].appendChild(inputWrapChildButton);
  inputWrapChild.push(inputWrapChildButton);

  styleCreate(inputWrapChild[0],dangtalkChattingRoom.chattingInputText)
  styleCreate(inputWrapChild[1],dangtalkChattingRoom.chattingSubmitButton)
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
}
main()

function createChatMsg(mother,targetId,fromMeorYou, msg){
  let chatBox = tagCreate("div");
  let imagebox = tagCreate("div");
  let msgbox = tagCreate("div");
  if(fromMeorYou ==='Me'){
    styleCreate(chatBox,dangtalkChattingRoom.chattingFromMe);
    styleCreate(msgbox,dangtalkChattingRoom.msgBoxStyleFromMe);
    chatBox.appendChild(msgbox);
    chatBox.appendChild(imagebox);
  }else{
    styleCreate(chatBox,dangtalkChattingRoom.chattingFromYou);
    styleCreate(msgbox,dangtalkChattingRoom.msgBoxStyleFromYou);
    chatBox.appendChild(imagebox);
    chatBox.appendChild(msgbox);
  };
  
  styleCreate(imagebox,dangtalkChattingRoom.imageBoxStyle);

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