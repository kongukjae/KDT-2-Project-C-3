function marketPostPage() {
  let root = tagCreate("div", { id: "root" });
  document.body.appendChild(root);
  styleCreate(root, market.marketPost);
  // styleCreate(root, targetStyle.mainRoot);

  let rootChild = [];
  for (let i = 0; i < 5; i++) {
    let child = tagCreate("div", { id: i });
    root.appendChild(child);
    rootChild.push(child);
  }

  // topMenu(rootChild);
  // styleCreate(rootChild[0], targetStyle.topMenu);

  styleCreate(rootChild[1], market.marketPostImageArea);

  styleCreate(rootChild[2], market.marketPostImgNameAdd);
  let imgNameAdd = [];
  let nameAdd = [];
  let dotdotdot = [];

  for (let i = 0; i < 2; i++) {
    let imgNameAddChild = tagCreate("div", {});
    rootChild[2].appendChild(imgNameAddChild);
    imgNameAdd.push(imgNameAddChild);
  }
  for (let i = 0; i < 2; i++) {
    let nameAddChild = tagCreate("div",{});
    imgNameAdd[1].appendChild(nameAddChild);
    nameAdd.push(nameAddChild);
  }
  for (let i = 0; i < 3; i++) {
    let dot = tagCreate("div",{});
    nameAdd[1].appendChild(dot);
    dotdotdot.push(dot);
    styleCreate(dotdotdot[i], market.marketPostAddDot);

  }
  styleCreate(imgNameAdd[0], market.marketPostImgStyle);
  styleCreate(imgNameAdd[1], market.marketPostnameAddStyle);
  styleCreate(nameAdd[0], market.marketPostName);
  nameAdd[0].innerText = "뭉뭉";
  styleCreate(nameAdd[1], market.marketPostAdd);
  styleCreate(rootChild[3], market.marketPostDetail);
}
marketPostPage();
