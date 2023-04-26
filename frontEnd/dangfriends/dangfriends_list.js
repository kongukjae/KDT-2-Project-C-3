let root = tagCreate("div", { id: "root" });
document.body.appendChild(root);
styleCreate(root, {
  width: pageStyle.width.width500,
    // height: pageStyle.height.height2000,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    position: "relative",

});

let rootChild = [];
for (let i = 0; i < 3; i++) {
  let child = tagCreate("div", {});
  root.appendChild(child);
  rootChild.push(child);
}

//댕프렌드 리스트 자리
styleCreate(rootChild[1], {
  ...pageStyle.flexColCenter,
  width: pageStyle.width.widthP100,
})

//즐겨찾기한 팔로우 자리
let starFriends = tagCreate("div", {id:"star"});
rootChild[1].appendChild(starFriends);
styleCreate(starFriends, {
  ...pageStyle.flexColCenter,
width: pageStyle.width.widthP100,
marginTop: "10px"
});

//구분선
let grid = tagCreate("div", {});
rootChild[1].appendChild(grid);
styleCreate(grid, {
width: pageStyle.width.widthP95,
height: pageStyle.height.height3,
border: `2px solid ${pageStyle.colorTheme.lightGray}`,
margin: '10px 0 10px 0'
});

//일반 팔로우 자리
let friends = tagCreate("div", {id:"friends"});
rootChild[1].appendChild(friends);
styleCreate(friends, {
  ...pageStyle.flexColCenter,
width: pageStyle.width.widthP100,
});

//상단 메뉴바
topMenu(rootChild[0]);
createHamburger(root);


loadFriendsList(starFriends, friends);

function loadFriendsList(starFriends, friends) {
  const xhr = new XMLHttpRequest();
  const cookie = document.cookie.split("=")[2];
  const _URL = `http://localhost:2080/loadFriendsList`;
  // let result = {};
  xhr.open("POST", _URL, true);
  xhr.send(`{id=${cookie}}`);
  xhr.addEventListener("load", function () {
    const friendsList = JSON.parse(this.response)

    for(let i = 0; i < friendsList.starId.length; i++){
      createfriendsList(starFriends, friendsList.starId[i], friendsList.starDogName[i], friendsList.starIntro[i]);
    }

    for(let i = 0; i < friendsList.stdId.length; i++){
      createfriendsList(friends, friendsList.stdId[i], friendsList.stdDogName[i], friendsList.stdIntro[i]);
    }
  });
}

function createfriendsList(parent, userID, dogName, intro){

  let box = tagCreate("div", {});
  parent.appendChild(box);
  styleCreate(box, {
    width: pageStyle.width.widthP95,
    height: pageStyle.height.height100,
    borderRadius: pageStyle.borderRadius.borderRadius15,
    margin: "10px 0 5px 0",
    ...pageStyle.flexRowCenter,
    textDecoration: 'none',
    color: pageStyle.colorTheme.black,
    backgroundColor: pageStyle.colorTheme.beige,
    boxShadow: pageStyle.defaultBoxShadow.defBoxSdw,
  });

  let chatlistUserImg = tagCreate("div", {});
  box.appendChild(chatlistUserImg);
  styleCreate(chatlistUserImg, {
    width: pageStyle.width.width80,
    height: pageStyle.height.height80,
    borderRadius: pageStyle.borderRadius.borderRadius9,
    margin: "5px",
    backgroundSize: "cover",
    backgroundPosition: "center"
  });

  let chatlistBoxComponent = tagCreate("div", {});
  box.appendChild(chatlistBoxComponent);
  styleCreate(chatlistBoxComponent, {
    width: pageStyle.width.width300,
    height: pageStyle.height.height100,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    margin: "20px 0 0 10px"
  });

  let userSapce = tagCreate("div", {})
  chatlistBoxComponent.appendChild(userSapce);
  styleCreate(userSapce, {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.heightP30,
    display: "flex",
    marginBottom: "5px",
    alignItems: "center",
    textAlign: "center"

  })

  let friendListDogName = tagCreate("div", {});
  userSapce.appendChild(friendListDogName);
  styleCreate(friendListDogName, {
    // width: pageStyle.width.widthP30,
    fontSize: pageStyle.fontSizeSet.small,
    fontWeight: "700",
  });
  friendListDogName.innerText = dogName;

  let friendListUserName = tagCreate("div", {});
  userSapce.appendChild(friendListUserName);
  styleCreate(friendListUserName, {
    // width: pageStyle.width.widthP70,
    fontSize: "14px"
  });
  friendListUserName.innerText = `(${userID})`;



  let chatlastMsg = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlastMsg);
  styleCreate(chatlastMsg, {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.heightP70,
    marginBottom: "3px",
  });
  chatlastMsg.innerText = intro;

  let chatlistCount = tagCreate("div", {});
  box.appendChild(chatlistCount);
  styleCreate(chatlistCount, {
    width: pageStyle.width.width30,
    height: pageStyle.height.height30,
    ...pageStyle.flexRowCenter,
    margin: '5px',
    fontSize: pageStyle.fontSizeSet.small,
    fontWeight: "800",
    textAlign: 'center'
  });
  chatlistCount.innerText = '. . .';

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${userID}`); 
  xhr.addEventListener('load', function(){
    let imageFromServer = URL.createObjectURL(xhr.response);
    chatlistUserImg.style.backgroundImage = `url(${imageFromServer})`;
    console.log("이미지 가져오기 완료");
  });
}


// 하단 메뉴바
btmMeun(rootChild[2])