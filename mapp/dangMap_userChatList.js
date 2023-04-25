
function createUserOrgchat(test, roomName){
  let chatList = tagCreate("div", {id: 'chatList'});
  // document.body.appendChild(chatList);
  test.appendChild(chatList);
  styleCreate(chatList, {
    width: pageStyle.width.width250,
    // height: pageStyle.height.height2000,
    margin: "auto",
    display: "none",
    flexDirection: "column",
    position: "absolute",
    border: "1px solid black",
    zIndex: '5',
    left: "50px",
    backgroundColor: pageStyle.colorTheme.peach,


  });

  let chatChild = [];
  for (let i = 0; i < 2; i++) {
    let child = tagCreate("div", {});
    chatList.appendChild(child);
    chatChild.push(child);
  }
  //채팅방 제목 영억
  styleCreate(chatChild[0], {
    ...pageStyle.flexRowCenter,
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height40,
    textAlign : "center"

  })
  
  //채팅방 이름
  let chatTitle = tagCreate("div", {});
  chatChild[0].appendChild(chatTitle);
  styleCreate(chatTitle, {
    width: pageStyle.width.widthP70,
    fontWeight: pageStyle.fontWeightSet.bold
  });
  chatTitle.innerText = roomName + "방 입니다"

  //채팅 참가 버튼
  let attend = tagCreate("button", {});
  chatChild[0].appendChild(attend);
  styleCreate(attend, {
    width: pageStyle.width.width50,
    height: pageStyle.height.height30,

  })
  attend.innerText = "참가"

  
  //채팅 참여자 리스트 영역
  //chatChild[1].id = "chatList";
  styleCreate(chatChild[1], {
    ...pageStyle.flexColCenter,
    width: pageStyle.width.widthP100,
    
  });

  const http = new XMLHttpRequest();
  const url = `http://localhost:2080/mapChatList`;


  http.open("POST", url);
  http.send(`roomName=${roomName}`);
  http.addEventListener('load', () => {
    let roomList = JSON.parse(http.response);

    for (const key in roomList) {
      createUserOrgchatList(chatChild[1], roomList[key][0], roomList[key][1]);        
    }
  });

}

function createUserOrgchatList(parent, userID, dogName){

  let box = tagCreate("div", {});
  parent.appendChild(box);
  styleCreate(box, {
    width: pageStyle.width.widthP95,
    height: pageStyle.height.height52,
    borderRadius: pageStyle.borderRadius.borderRadius9,
    // margin: "5px 0 5px 0",
    marginBottom: "5px",
    ...pageStyle.flexRowCenter,
    color: pageStyle.colorTheme.black,
    backgroundColor: pageStyle.colorTheme.beige,
    boxShadow: pageStyle.defaultBoxShadow.defBoxSdw,
  });

  let chatlistUserImg = tagCreate("div", {});
  box.appendChild(chatlistUserImg);
  styleCreate(chatlistUserImg, {
    width: pageStyle.width.width50,
    height: "95%",
    borderRadius: pageStyle.borderRadius.borderRadiusP50,
    marginRight: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center"
  });

  let chatlistBoxComponent = tagCreate("div", {});
  box.appendChild(chatlistBoxComponent);
  styleCreate(chatlistBoxComponent, {
    width: pageStyle.width.width150,
    height: pageStyle.height.heightP90,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    margin: "5px"
  });

  // let userSapce = tagCreate("div", {})
  // chatlistBoxComponent.appendChild(userSapce);
  // styleCreate(userSapce, {

  // })

  let chatlistUserName = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlistUserName);
  styleCreate(chatlistUserName, {
    width: pageStyle.width.width90,
    height: pageStyle.height.heightP50,
    fontWeight: "700",
    // marginBottom: "5px"
    // ...pageStyle.flexColCenter,
  });
  // chatlistUserName.innerText = dogName;
  chatlistUserName.innerText = userID;

  let chatlistDogName = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlistDogName);
  styleCreate(chatlistDogName, {
    width: pageStyle.width.width90,
    height: pageStyle.height.heightP50,
    fontSize: "13px"
    // marginBottom: "3px",
  });
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
}