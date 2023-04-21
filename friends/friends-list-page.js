let root = tagCreate("div", { id: "market" });
document.body.appendChild(root);
styleCreate(root, market.root);
let rootChild = [];
for (let i = 0; i < 3; i++) {
  let child = tagCreate("div", { id: i });
  root.appendChild(child);
  rootChild.push(child);
}

//상단 메뉴바
topMenu(rootChild[0]);
createHamburger(root);

function createfriendsList(result, count) {
  let child = tagCreate("div", {});
  let mother = document.getElementById("1");
  mother.appendChild(child);
  styleCreate(child, market.listBox);

  let listImgChild = tagCreate("div", {});
  child.appendChild(listImgChild);
  styleCreate(listImgChild, market.listImg);

  let listTextChild = tagCreate("div", {});
  child.appendChild(listTextChild);
  styleCreate(listTextChild, market.listText);

  document.getElementById(`index${count}`).addEventListener('click', function() {
    console.log(`index${count}`);
  })

  let title = tagCreate("div", {});
  listTextChild.appendChild(title);
  styleCreate(title, market.listTitle);
  title.innerText = result.title;

  let text = tagCreate("div", {});
  listTextChild.appendChild(text);
  styleCreate(text, market.listElementText);
  text.innerText = result.detail;
}

// 하단 메뉴바
btmMeun(rootChild[2])