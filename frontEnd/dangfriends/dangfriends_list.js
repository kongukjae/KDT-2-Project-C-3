let root = tagCreate("div", { id: "root" });
document.body.appendChild(root);
styleCreate(root, dangfriendsStyle.rootStyle);

let rootChild = [];
for (let i = 0; i < 3; i++) {
  let child = tagCreate("div", {});
  root.appendChild(child);
  rootChild.push(child);
}

//댕프렌드 리스트 자리
styleCreate(rootChild[1], dangfriendsStyle.listArea)

//즐겨찾기한 팔로우 자리
let starFriends = tagCreate("div", {id:"star"});
rootChild[1].appendChild(starFriends);
styleCreate(starFriends, dangfriendsStyle.starFriendsArea);

//구분선
let grid = tagCreate("div", {});
rootChild[1].appendChild(grid);
styleCreate(grid, dangfriendsStyle.divisLine);

//일반 팔로우 자리
let friends = tagCreate("div", {id:"friends"});
rootChild[1].appendChild(friends);
styleCreate(friends, dangfriendsStyle.stdFriendsArea);

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
  styleCreate(box, dangfriendsStyle.friendsProfile);

  let profileimg = tagCreate("div", {});
  box.appendChild(profileimg);
  styleCreate(profileimg, dangfriendsStyle.profileImage);

  let profileText = tagCreate("div", {});
  box.appendChild(profileText);
  styleCreate(profileText, dangfriendsStyle.profileTextArea);

  let userSapce = tagCreate("div", {})
  profileText.appendChild(userSapce);
  styleCreate(userSapce, dangfriendsStyle.profileNameArea)

  let friendListDogName = tagCreate("div", {});
  userSapce.appendChild(friendListDogName);
  styleCreate(friendListDogName, dangfriendsStyle.friendsDogname);
  friendListDogName.innerText = dogName;

  let friendListUserName = tagCreate("div", {});
  userSapce.appendChild(friendListUserName);
  styleCreate(friendListUserName, dangfriendsStyle.friendsName);
  friendListUserName.innerText = `(${userID})`;

  let friendIntro = tagCreate("div", {});
  profileText.appendChild(friendIntro);
  styleCreate(friendIntro, dangfriendsStyle.friendsIntro);
  friendIntro.innerText = intro;

  let chatlistCount = tagCreate("div", {});
  box.appendChild(chatlistCount);
  styleCreate(chatlistCount, dangfriendsStyle.profileMore);
  chatlistCount.innerText = '. . .';

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${userID}`); 
  xhr.addEventListener('load', function(){
    let imageFromServer = URL.createObjectURL(xhr.response);
    profileimg.style.backgroundImage = `url(${imageFromServer})`;
    console.log("이미지 가져오기 완료");
  });
}


// 하단 메뉴바
btmMeun(rootChild[2])