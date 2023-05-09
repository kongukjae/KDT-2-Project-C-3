
function createUserOrgchat(positionNow, roomName, roomCode){
  let chatList = tagCreate("div", {id: 'chatList'});
  // document.body.appendChild(chatList);
  styleCreate(chatList, dangMapStyle.userList);

  let chatChild = [];
  for (let i = 0; i < 2; i++) {
    let child = tagCreate("div", {});
    chatList.appendChild(child);
    chatChild.push(child);
  }
  //채팅방 제목 영억
  styleCreate(chatChild[0], dangMapStyle.chatRoomTitleBox);
  
  //채팅방 이름
  let chatTitle = tagCreate("div", {});
  chatChild[0].appendChild(chatTitle);
  styleCreate(chatTitle, dangMapStyle.chatRoomTitle);
  chatTitle.innerText = roomName + "방 입니다"

  //채팅 참가 버튼
  let attend = tagCreate("button", {});
  chatChild[0].appendChild(attend);
  styleCreate(attend, dangMapStyle.chatJoinBtn);
  attend.innerText = "참가"
  attend.addEventListener('click',moveToPublicChat);
  async function moveToPublicChat(){
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    await fetch(`http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/createPublicChatRoomRequest`,{
      method: "POST",
      body: JSON.stringify({jwt:token,roomCode:roomCode,roomName:roomName})
    }).then((res)=>{return res.text()})
    .then((result)=>{
      let publicChatForm = document.createElement("form");
      publicChatForm.method = "POST";
      publicChatForm.action = "/dangTalkPublicChatRoom";
      let params = {jwt: token,roomCode:roomCode,roomName:roomName,firsttime:result};
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
  //나가기 버튼
  let exit = tagCreate("button", {});
  chatChild[0].appendChild(exit);
  styleCreate(exit, dangMapStyle.chatJoinBtn);
  exit.innerText = "X";
  exit.addEventListener('click',()=>{
    chatList.remove();
  })

  //채팅 참여자 리스트 영역
  //chatChild[1].id = "chatList";
  styleCreate(chatChild[1], dangMapStyle.chatPeopleListContainer);

  const http = new XMLHttpRequest();
  const url = `http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/mapChatList`;


  http.open("POST", url);
  http.send(`roomName=${roomCode}`);
  http.addEventListener('load', () => {
    let roomList = JSON.parse(http.response);
    for (const key in roomList) {
      createUserOrgchatList(chatChild[1], roomList[key][0], roomList[key][1]);        
    }
  });

  const customOverlay = new kakao.maps.CustomOverlay({
    position: positionNow,
    content: chatList,
    xAnchor: 0.3,
    yAnchor: 0.91,
  });
  return customOverlay;
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
  xhr.open('POST', `http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${target}`); 
  xhr.addEventListener('load', function(){
    let imageFromServer = URL.createObjectURL(xhr.response);
    chatlistUserImg.style.backgroundImage = `url(${imageFromServer})`;
    console.log("이미지 가져오기 완료");
  });
}