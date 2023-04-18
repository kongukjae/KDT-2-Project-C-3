
const root = tagCreate("div", { id: "root" });
root.style.width = "500px";
root.style.margin = "auto";
document.body.appendChild(root);

// 탑 메뉴
const topMenuWrap = tagCreate("div", {});
root.appendChild(topMenuWrap);
topMenu(topMenuWrap);

// 게시글 영역
for (let i = 0; i < 3; i++) {
  // i < 3에서 3 부분은 나중에 무한 스크롤 방식을 이용해 적용
  console.log(i);
  postCreate(root, "../resource/MainDogImg.jpg", "멍뭉이", "text", "../resource/MainDogImg.jpg", "name", i); // 두번째 파라미터는 DB 혹은 ftp에서 주소를 가져와서 적용, 지금은 임시 값
}

// 바텀 메뉴
const btmMeunWrap = tagCreate("div", {});
root.appendChild(btmMeunWrap);
btmMeun(btmMeunWrap);

// 게시글 작성 버튼
const writeBtn = tagCreate("button", {});
styleCreate(writeBtn, {
  // backgroundImage: "url(../resource/write.png)",
  backgroundSize: "65%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  cursor: "pointer",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  position: "fixed",
  bottom: "20px",
  right: "15%",
  border: "1px solid black",
});
root.appendChild(writeBtn);

/*
function loadSecondHandBoard(nth){
  const httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", `http://localhost:2080/dragMarker`, true);
  // 객체를 JSON 형식으로 바꿔서 서버로 전송
  httpRequest.send(JSON.stringify(resultObject));
  
}
*/

