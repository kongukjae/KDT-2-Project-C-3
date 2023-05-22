let root = tagCreate("div", { id: "chat" });
document.body.appendChild(root);
styleCreate(root, dangtalkStyle.chatRoot);
let rootChild = [];

for (let i = 0; i < 3; i++) {
  let child = tagCreate("div", { id: i });
  root.appendChild(child);
  rootChild.push(child);
}

topMenu(rootChild[0]);
createHamburger(root);

styleCreate(rootChild[1], dangtalkStyle.chatlistContainer);

function createchatList(id, text, unread, type) {
  let chatBox = tagCreate("div", {});
  let mother = document.getElementById("1");
  mother.appendChild(chatBox);
  styleCreate(chatBox, dangtalkStyle.chatlistBox);

  let chatlistUserImg = tagCreate("div", {});
  chatBox.appendChild(chatlistUserImg);
  styleCreate(chatlistUserImg, dangtalkStyle.chatlistImg);

  let chatlistBoxComponent = tagCreate("div", {});
  chatBox.appendChild(chatlistBoxComponent);
  styleCreate(chatlistBoxComponent, dangtalkStyle.chatlistBoxComponent);

  let chatlistUserName = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlistUserName);
  styleCreate(chatlistUserName, dangtalkStyle.chatlistUserName);
  chatlistUserName.innerText = id;

  let chatlastMsg = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlastMsg);
  styleCreate(chatlastMsg, dangtalkStyle.chatlistlastMsg);
  chatlastMsg.innerText = text;
  
  let chatlistCount = tagCreate("div", {});
  chatBox.appendChild(chatlistCount);
  styleCreate(chatlistCount, dangtalkStyle.chatlistCount);
  chatlistCount.innerText = unread;
  if(unread === 0){
    chatlistCount.style.display = 'none'
  }
  if(type==='public'){
    chatlistUserImg.style.backgroundImage = `url(/image/resource/publicTalk.png)`
  }else{
    const xhr = new XMLHttpRequest();
      xhr.open('POST', `http://15.164.63.222:2080/sendImage`);
      xhr.responseType = 'blob';
      xhr.send(`type=proFile&id=${id}`); 
      xhr.addEventListener('load', function(){
          let imageFromServer = URL.createObjectURL(xhr.response);
          chatlistUserImg.style.backgroundImage = `url(${imageFromServer})`
          console.log("이미지 가져오기 완료");
      });
  }
  return chatBox;
}

async function getRoomListAsync() {
  
  const jwt = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  
  let chatRoomList = await fetch('http://15.164.63.222:2080/chatRoomRequest', {
    method: 'POST',
    body: jwt
  }).then(response => response.json())
  let targetRoomObject = {};
  for(let i of chatRoomList){
    targetRoomObject[i.room_name] = new Roomdata();
    targetRoomObject[i.room_name].putBasicData(i);
  }
  for(let i = 0;i<Object.keys(targetRoomObject).length;i++){
    let recentText = await fetch('http://15.164.63.222:2080/chatRecentTextRequest', {
      method: 'POST',
      body: targetRoomObject[Object.keys(targetRoomObject)[i]].room
    }).then(response => response.json());

    if(recentText.length===0){
      targetRoomObject[Object.keys(targetRoomObject)[i]].putRecentText('채팅 이력이 없습니다')
    }else{
      targetRoomObject[Object.keys(targetRoomObject)[i]].putRecentText(recentText[0].text)
    }
  }
  
  for(let i in targetRoomObject){
    if(targetRoomObject[i].room.startsWith('!')){
      let chatBoxForLink = createchatList(i,targetRoomObject[i].recentText,targetRoomObject[i].unread, 'public');
      
      let publicChatForm = document.createElement("form");
      publicChatForm.method = "POST";
      publicChatForm.action = "/dangTalkPublicChatRoom";
      let params = {jwt: jwt,roomCode:targetRoomObject[i].room,roomName:i,firsttime:'false'};
      for (let key in params) {
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", encodeURI(params[key]));
        publicChatForm.appendChild(hiddenField);
      }
      document.body.appendChild(publicChatForm);
      chatBoxForLink.addEventListener('click',()=>{
        publicChatForm.submit();
      })
    }else{
      let chatBoxForLink = createchatList(i,targetRoomObject[i].recentText,targetRoomObject[i].unread, 'private');
      let chatBoxForm = document.createElement('form');
      chatBoxForm.method = "POST"
      chatBoxForm.action = "/dangTalkChatRoom";
      let params = {jwt:jwt, targetId:i}
      for(let key in params){
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type","hidden");
        hiddenField.setAttribute("name",key);
        hiddenField.setAttribute("value",params[key]);
        chatBoxForm.appendChild(hiddenField);
      }
      document.body.appendChild(chatBoxForm);
      chatBoxForLink.addEventListener('click',()=>{
        chatBoxForm.submit();
      });
    }
  }
  console.log(targetRoomObject)
}
getRoomListAsync()

btmMeun(rootChild[2]);

class Roomdata{
  constructor(){
  }
  //id, room, unread, unreadtime
  putBasicData(object) {
    this.room = object.room;
    this.unread = object.unread;
    this.unreadTime = changeDate(object.unread_time);
  }
  putRecentText(value){
    this.recentText = value;
  }
}
