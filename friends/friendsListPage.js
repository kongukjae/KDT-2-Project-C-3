let root = tagCreate("div", { id: "root" });
document.body.appendChild(root);
styleCreate(root, {
  width: pageStyle.width.width500,
    // height: pageStyle.height.height2000,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    position: "relative"
});

let rootChild = [];
for (let i = 0; i < 3; i++) {
  let child = tagCreate("div", {});
  root.appendChild(child);
  rootChild.push(child);
}

styleCreate(rootChild[1], {
  ...pageStyle.flexColCenter,
  width: pageStyle.width.widthP100,
})

let parent = rootChild[1];

  let starFriends = tagCreate("div", {id:"star"});
  rootChild[1].appendChild(starFriends);
  styleCreate(starFriends, {
    ...pageStyle.flexColCenter,
  width: pageStyle.width.widthP100,
  });

  let grid = tagCreate("div", {});
  rootChild[1].appendChild(grid);
  styleCreate(grid, {
  width: pageStyle.width.widthP95,
  height: pageStyle.height.height3,
  border: `2px solid ${pageStyle.colorTheme.lightGray}`,
  });

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
    for(let i = 0; i < 5; i++){
      createfriendsList(friends, i);

    }
    // let res = JSON.parse(xhr.response);
    // for (let i = 0; i < res.length; i++) {
    //   console.log(res[i])
    //   createfriendsList();
    // }
  });
}

function createfriendsList(parent){

  let box = tagCreate("div", {});
  parent.appendChild(box);
  styleCreate(box, {
    width: pageStyle.width.widthP95,
    height: pageStyle.height.height100,
    borderRadius: pageStyle.borderRadius.borderRadius15,
    margin: "10px 0 10px 0",
    ...pageStyle.flexRowCenter,
    textDecoration: 'none',
    color: pageStyle.colorTheme.black,
    backgroundColor: pageStyle.colorTheme.peach,
    // boxShadow: pageStyle.defaultBoxShadow.ConBoxSdw,
  });

  let chatlistUserImg = tagCreate("div", {});
  box.appendChild(chatlistUserImg);
  styleCreate(chatlistUserImg, {
    width: pageStyle.width.width80,
    height: pageStyle.height.height80,
    border: "1px solid black",
    borderRadius: pageStyle.borderRadius.borderRadius9,
    margin: "5px",
  });

  let chatlistBoxComponent = tagCreate("div", {});
  box.appendChild(chatlistBoxComponent);
  styleCreate(chatlistBoxComponent, {
    width: pageStyle.width.width300,
    height: pageStyle.height.height100,
    ...pageStyle.flexColCenter,
  });

  let chatlistUserName = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlistUserName);
  styleCreate(chatlistUserName, {
    width: pageStyle.width.width300,
    height: pageStyle.height.height100,
    ...pageStyle.flexColCenter,
  });
  chatlistUserName.innerText = "나다";

  let chatlastMsg = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlastMsg);
  styleCreate(chatlastMsg, {
    width: pageStyle.width.widthP90,
    height: pageStyle.height.heightP30,
    marginBottom: "3px",
  });
  chatlastMsg.innerText = "ㅎㅇ";

  let chatlistCount = tagCreate("div", {});
  box.appendChild(chatlistCount);
  styleCreate(chatlistCount, {
    width: pageStyle.width.width30,
    height: pageStyle.height.height30,
    ...pageStyle.flexRowCenter,
    margin: '5px',
    // fontSize: "15px",
    // fontWeight: "700",
  });
  chatlistCount.innerText = '...';
}


// 하단 메뉴바
btmMeun(rootChild[2])