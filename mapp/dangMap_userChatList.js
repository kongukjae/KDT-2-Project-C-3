
function createUserOrgchat(test){

  let chatList = tagCreate("div", {id: 'chatList'});
  // document.body.appendChild(chatList);
  test.appendChild(chatList);
  styleCreate(chatList, {
    width: pageStyle.width.width250,
      // height: pageStyle.height.height2000,
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      border: "1px solid black",
      zIndex: '5',
      left: "50px",
      backgroundColor: pageStyle.colorTheme.peach

  });

  let chatChild = [];
  for (let i = 0; i < 2; i++) {
    let child = tagCreate("div", {});
    chatList.appendChild(child);
    chatChild.push(child);
  }
  //채팅방 제목 영억
  styleCreate(chatChild[0], {
    ...pageStyle.flexRowBetweenCenter,
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height30,
  })
  
  //채팅방 이름
  let chatTitle = tagCreate("div", {});
  chatChild[0].appendChild(chatTitle);
  styleCreate(chatTitle, {
    width: pageStyle.width.widthP70,
    height: pageStyle.height.heightP100,
  });
  chatTitle.innerText = "단체방입니다"

  //채팅 참가 버튼
  let attend = tagCreate("button", {});
  chatChild[0].appendChild(attend);
  styleCreate(attend, {
    width: pageStyle.width.width40,
    height: pageStyle.height.height24,
    border: "1px solid red",
    margin: "5px"
  })
  attend.innerText = "참가"

  
  //채팅 참여자 리스트 영역
  //chatChild[1].id = "chatList";
  styleCreate(chatChild[1], {
    ...pageStyle.flexColCenter,
    width: pageStyle.width.widthP100,
    
  });

   //root.addEventListener('load', () => {
    //let chatList = document.getElementById('chatList');
    

    for(let i = 0; i < 5; i++){
      createUserOrgchatList(chatChild[1], i);
    }
  //})

}

function createUserOrgchatList(parent, index){

  let box = tagCreate("div", {});
  parent.appendChild(box);
  styleCreate(box, {
    width: pageStyle.width.widthP95,
    height: pageStyle.height.height50,
    borderRadius: pageStyle.borderRadius.borderRadius9,
    margin: "5px 0 5px 0",
    ...pageStyle.flexRowCenter,
    color: pageStyle.colorTheme.black,
    backgroundColor: pageStyle.colorTheme.beige,
    boxShadow: pageStyle.defaultBoxShadow.defBoxSdw,
  });

  let chatlistUserImg = tagCreate("div", {id: `chatImage_${index}`});
  box.appendChild(chatlistUserImg);
  styleCreate(chatlistUserImg, {
    width: pageStyle.width.width50,
    height: pageStyle.height.heightP90,
    border: "1px solid black",
    borderRadius: pageStyle.borderRadius.borderRadius15,
    margin: "10px",
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
  chatlistUserName.innerText = "견주님";

  let chatlastMsg = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlastMsg);
  styleCreate(chatlastMsg, {
    width: pageStyle.width.width90,
    height: pageStyle.height.heightP50,
    // marginBottom: "3px",
  });
  chatlastMsg.innerText = "초코";
}