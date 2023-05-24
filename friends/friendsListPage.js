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
});

//즐겨찾기한 팔로우 자리
let starFriends = tagCreate("div", { id: "star" });
rootChild[1].appendChild(starFriends);
styleCreate(starFriends, {
  ...pageStyle.flexColCenter,
  width: pageStyle.width.widthP100,
  marginTop: "10px",
});

//구분선
let grid = tagCreate("div", {});
rootChild[1].appendChild(grid);
styleCreate(grid, {
  width: pageStyle.width.widthP95,
  height: pageStyle.height.height3,
  border: `2px solid ${pageStyle.colorTheme.lightGray}`,
  margin: "10px 0 10px 0",
});

//일반 팔로우 자리
let friends = tagCreate("div", { id: "friends" });
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
  const _URL = `http://13.124.220.4:2080/loadFriendsList`;
  // let result = {};
  xhr.open("POST", _URL, true);
  xhr.send(`{id=${cookie}}`);
  xhr.addEventListener("load", function () {
    const friendsList = JSON.parse(this.response);

    for (let i = 0; i < friendsList.starId.length; i++) {
      createfriendsList(
        starFriends,
        friendsList.starDogName[i],
        friendsList.starIntro[i]
      );
    }

    for (let i = 0; i < friendsList.stdId.length; i++) {
      createfriendsList(
        friends,
        friendsList.stdDogName[i],
        friendsList.stdIntro[i]
      );
    }
  });
}

function createfriendsList(parent, dogName, intro) {
  let box = tagCreate("div", {});
  parent.appendChild(box);
  styleCreate(box, {
    width: pageStyle.width.widthP95,
    height: pageStyle.height.height100,
    borderRadius: pageStyle.borderRadius.borderRadius15,
    margin: "10px 0 10px 0",
    ...pageStyle.flexRowCenter,
    textDecoration: "none",
    color: pageStyle.colorTheme.black,
    backgroundColor: pageStyle.colorTheme.beige,
    boxShadow: pageStyle.defaultBoxShadow.defBoxSdw,
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
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    margin: "20px 0 0 10px",
  });

  // let userSapce = tagCreate("div", {})
  // chatlistBoxComponent.appendChild(userSapce);
  // styleCreate(userSapce, {

  // })

  let chatlistUserName = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlistUserName);
  styleCreate(chatlistUserName, {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.heightP30,
    fontSize: pageStyle.fontSizeSet.small,
    fontWeight: "700",
    marginBottom: "5px",
    // ...pageStyle.flexColCenter,
  });
  chatlistUserName.innerText = dogName;

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
    margin: "5px",
    fontSize: pageStyle.fontSizeSet.small,
    fontWeight: "800",
    textAlign: "center",
    cursor: "pointer",
  });
  chatlistCount.innerText = ". . .";

  // chatlistCount.addEventListener('click', createModalWindow)
}

function createModalWindow() {
  // 모달창 생성
  const modal = document.createElement("div");
  modal.classList.add("modal");
  styleCreate(modal, market.marketPostAddModal);

  // 버튼 생성
  const profileBtn = document.createElement("div");
  profileBtn.textContent = "즐겨찾기 추가/ 삭제";
  const chatBtn = document.createElement("div");
  chatBtn.textContent = "채팅";
  const reportBtn = document.createElement("div");
  reportBtn.textContent = "차단";
  const exitBtn = document.createElement("div");
  exitBtn.innerHTML = "&#x2716;";
  styleCreate(exitBtn, {
    display: "flex",
    justifyContent: "end",
  });

  // 버튼을 모달창에 추가
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.appendChild(exitBtn);
  modalContent.appendChild(profileBtn);
  modalContent.appendChild(chatBtn);
  modalContent.appendChild(reportBtn);
  // modalContent.appendChild(mypageForm);

  styleCreate(profileBtn, market.marketPostAddModalBtn);
  styleCreate(chatBtn, market.marketPostAddModalBtn);
  styleCreate(reportBtn, market.marketPostAddModalBtn);
  // 모달창에 모달컨텐츠 추가
  modal.appendChild(modalContent);

  exitBtn.addEventListener("mouseover", function () {
    exitBtn.style.cursor = "pointer";
  });

  chatlistCount.addEventListener("click", function () {
    chatlistCount.appendChild(modal);
  });
  exitBtn.addEventListener("click", function () {
    modal.remove();
  });

  profileBtn.addEventListener("click", () => {
    mypageForm.submit();
  });
}

// 하단 메뉴바
btmMeun(rootChild[2]);
