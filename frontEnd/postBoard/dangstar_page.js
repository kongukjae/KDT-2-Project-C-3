const root = tagCreate("div", { id: "root" });
styleCreate(root, dangstarStyle.dangstarRoot);
document.body.appendChild(root);

// 탑 메뉴
const topMenuWrap = tagCreate("div", {});
root.appendChild(topMenuWrap);
topMenu(topMenuWrap);
createHamburger(root);

// 게시글 영역

// for (let i = 0; i < 3; i++) {
//   // i < 3에서 3 부분은 나중에 무한 스크롤 방식을 이용해 적용
//   console.log(i);
//   postCreate(root, "../resource/MainDogImg.jpg", "멍뭉이", "text", "../resource/MainDogImg.jpg", "name", i); // 두번째 파라미터는 DB 혹은 ftp에서 주소를 가져와서 적용, 지금은 임시 값
// }

const postWrap = tagCreate("div", {id: "dangstarRoot"});
styleCreate(postWrap, dangstarStyle.dangstarFeedListWrap);
root.appendChild(postWrap);

// 바텀 메뉴
const btmMeunWrap = tagCreate("div", {});
root.appendChild(btmMeunWrap);
btmMeun(btmMeunWrap);

// 게시글 작성 버튼
const writeBtn = tagCreate("div", {});
styleCreate(writeBtn, dangstarStyle.dangstarAddWriteBtn);
btmMeunWrap.appendChild(writeBtn);
writeBtn.innerText = "✏";

writeBtn.addEventListener("click", () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  let writeForm = document.createElement("form");
  writeForm.method = "POST";
  writeForm.action = "/dangStarWrite";
  let params = { jwt: token, targetId: "mine" };
  for (let key in params) {
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    writeForm.appendChild(hiddenField);
  }
  document.body.appendChild(writeForm);
  writeForm.submit();
});