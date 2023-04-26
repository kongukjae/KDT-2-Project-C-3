let root = tagCreate("div", { id: "chat" });
document.body.appendChild(root);
styleCreate(root, dangtalk.chatRoot);
let rootChild = [];

for (let i = 0; i < 3; i++) {
  let child = tagCreate("div", { id: i });
  root.appendChild(child);
  rootChild.push(child);
}

topMenu(rootChild[0]);
createHamburger(root);

styleCreate(rootChild[1], dangtalk.chatlistContainer);

function createchatList(id, text, unread) {
  let chatBox = tagCreate("div", {});
  let mother = document.getElementById("1");
  mother.appendChild(chatBox);
  styleCreate(chatBox, dangtalk.chatlistBox);

  let chatlistUserImg = tagCreate("div", {});
  chatBox.appendChild(chatlistUserImg);
  styleCreate(chatlistUserImg, dangtalk.chatlistImg);

  let chatlistBoxComponent = tagCreate("div", {});
  chatBox.appendChild(chatlistBoxComponent);
  styleCreate(chatlistBoxComponent, dangtalk.chatlistBoxComponent);

  let chatlistUserName = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlistUserName);
  styleCreate(chatlistUserName, dangtalk.chatlistUserName);
  chatlistUserName.innerText = id;

  let chatlastMsg = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlastMsg);
  styleCreate(chatlastMsg, dangtalk.chatlistlastMsg);
  chatlastMsg.innerText = text;
  
  let chatlistCount = tagCreate("div", {});
  chatBox.appendChild(chatlistCount);
  styleCreate(chatlistCount, dangtalk.chatlistCount);
  chatlistCount.innerText = unread;
  if(unread === 0){
    chatlistCount.style.display = 'none'
  }

  const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:2080/sendImage`);
    xhr.responseType = 'blob';
    xhr.send(`type=proFile&id=${id}`); 
    xhr.addEventListener('load', function(){
        let imageFromServer = URL.createObjectURL(xhr.response);
        chatlistUserImg.style.backgroundImage = `url(${imageFromServer})`
        console.log("이미지 가져오기 완료");
    });
  return chatBox;
}

async function getRoomListAsync() {
  
  const jwt = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  
  let chatRoomList = await fetch('http://localhost:2080/chatRoomRequest', {
    method: 'POST',
    body: jwt
  }).then(response => response.json())
  console.log(chatRoomList)
  let targetRoomObject = {};
  for(let i of chatRoomList){
    let roomFrom = i.room.replace(i.id, '').replace('&', '');
    targetRoomObject[roomFrom] = new Roomdata();
    targetRoomObject[roomFrom].putBasicData(i);
  }
  for(let i = 0;i<Object.keys(targetRoomObject).length;i++){
    let recentText = await fetch('http://localhost:2080/chatRecentTextRequest', {
      method: 'POST',
      body: targetRoomObject[Object.keys(targetRoomObject)[i]].room
    }).then(response => response.json());
    console.log('recentText')    
    console.log(recentText)
    if(recentText.length===0){
      targetRoomObject[Object.keys(targetRoomObject)[i]].putRecentText('채팅 이력이 없습니다')
    }else{
      targetRoomObject[Object.keys(targetRoomObject)[i]].putRecentText(recentText[0].text)
    }
  
  }
  
  for(let i in targetRoomObject){
    let chatBoxForLink = createchatList(i,targetRoomObject[i].recentText,targetRoomObject[i].unread);
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
