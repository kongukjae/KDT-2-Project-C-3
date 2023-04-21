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

function createchatList() {
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
  chatlistUserName.innerText = "나다";

  let chatlastMsg = tagCreate("div", {});
  chatlistBoxComponent.appendChild(chatlastMsg);
  styleCreate(chatlastMsg, dangtalk.chatlistlastMsg);
  chatlastMsg.innerText = "ㅎㅇ";

  let chatlistCount = tagCreate("div", {});
  chatBox.appendChild(chatlistCount);
  styleCreate(chatlistCount, dangtalk.chatlistCount);
  chatlistCount.innerText = '3';
}

for(let i = 0; i < 5; i++) {
  createchatList();
}

btmMeun(rootChild[2]);