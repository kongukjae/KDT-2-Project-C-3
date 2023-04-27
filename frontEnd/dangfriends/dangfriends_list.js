let root = tagCreate("div", { id: "root" });
document.body.appendChild(root);
styleCreate(root, {
  width: stylePropertyUnion.width.width500,
    // height: stylePropertyUnion.height.height2000,
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
  ...stylePropertyUnion.flexColCenter,
  width: stylePropertyUnion.width.widthP100,
})

//즐겨찾기한 팔로우 자리
let starFriends = tagCreate("div", {id:"star"});
rootChild[1].appendChild(starFriends);
styleCreate(starFriends, {
  ...stylePropertyUnion.flexColCenter,
width: stylePropertyUnion.width.widthP100,
marginTop: "10px"
});

//구분선
let grid = tagCreate("div", {});
rootChild[1].appendChild(grid);
styleCreate(grid, {
width: stylePropertyUnion.width.widthP95,
height: stylePropertyUnion.height.height3,
border: `2px solid ${stylePropertyUnion.colorTheme.lightGray}`,
margin: '10px 0 10px 0'
});

//일반 팔로우 자리
let friends = tagCreate("div", {id:"friends"});
rootChild[1].appendChild(friends);
styleCreate(friends, {
  ...stylePropertyUnion.flexColCenter,
width: stylePropertyUnion.width.widthP100,
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
    width: stylePropertyUnion.width.widthP95,
    height: stylePropertyUnion.height.height100,
    borderRadius: stylePropertyUnion.borderRadius.borderRadius15,
    margin: "10px 0 5px 0",
    ...stylePropertyUnion.flexRowCenter,
    textDecoration: 'none',
    color: stylePropertyUnion.colorTheme.black,
    backgroundColor: stylePropertyUnion.colorTheme.beige,
    boxShadow: stylePropertyUnion.defaultBoxShadow.defBoxSdw,
  });

  let chatlistUserImg = tagCreate("div", {});
  box.appendChild(chatlistUserImg);
  styleCreate(chatlistUserImg, {
    width: stylePropertyUnion.width.width80,
    height: stylePropertyUnion.height.height80,
    borderRadius: stylePropertyUnion.borderRadius.borderRadius9,
    margin: "5px",
    backgroundSize: "cover",
    backgroundPosition: "center"
  });

  let chatlistBoxComponent = tagCreate("div", {});
  box.appendChild(chatlistBoxComponent);
  styleCreate(chatlistBoxComponent, {
    width: stylePropertyUnion.width.width300,
    height: stylePropertyUnion.height.height100,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    margin: "20px 0 0 10px"
  });

  let userSapce = tagCreate("div", {})
  chatlistBoxComponent.appendChild(userSapce);
  styleCreate(userSapce, {
    width: stylePropertyUnion.width.widthP100,
    height: stylePropertyUnion.height.heightP30,
    display: "flex",
    marginBottom: "5px",
    alignItems: "center",
    textAlign: "center"

  })

  let friendListDogName = tagCreate("div", {});
  userSapce.appendChild(friendListDogName);
  styleCreate(friendListDogName, {
    // width: stylePropertyUnion.width.widthP30,
    fontSize: stylePropertyUnion.fontSizeSet.small,
    fontWeight: "700",
  });
  friendListDogName.innerText = dogName;

  let friendListUserName = tagCreate("div", {});
  userSapce.appendChild(friendListUserName);
  styleCreate(friendListUserName, {
    // width: stylePropertyUnion.width.widthP70,
    fontSize: "14px"
  });
  friendListUserName.innerText = `(${userID})`;



  let chatlastMsg = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlastMsg);
  styleCreate(chatlastMsg, {
    width: stylePropertyUnion.width.widthP100,
    height: stylePropertyUnion.height.heightP70,
    marginBottom: "3px",
  });
  chatlastMsg.innerText = intro;

  let chatlistCount = tagCreate("div", {});
  box.appendChild(chatlistCount);
  styleCreate(chatlistCount, {
    width: stylePropertyUnion.width.width30,
    height: stylePropertyUnion.height.height30,
    ...stylePropertyUnion.flexRowCenter,
    margin: '5px',
    fontSize: stylePropertyUnion.fontSizeSet.small,
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