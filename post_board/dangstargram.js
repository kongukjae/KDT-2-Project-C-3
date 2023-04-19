
const root = tagCreate("div", { id: "root" });
root.style.width = "500px";
root.style.margin = "auto";
document.body.appendChild(root);

// 탑 메뉴
const topMenuWrap = tagCreate("div", {});
root.appendChild(topMenuWrap);
topMenu(topMenuWrap);

// 게시글 영역

// for (let i = 0; i < 3; i++) {
//   // i < 3에서 3 부분은 나중에 무한 스크롤 방식을 이용해 적용
//   console.log(i);
//   postCreate(root, "../resource/MainDogImg.jpg", "멍뭉이", "text", "../resource/MainDogImg.jpg", "name", i); // 두번째 파라미터는 DB 혹은 ftp에서 주소를 가져와서 적용, 지금은 임시 값
// }

// 바텀 메뉴
const btmMeunWrap = tagCreate("div", {});
root.appendChild(btmMeunWrap);
btmMeun(btmMeunWrap);

// 게시글 작성 버튼
const writeBtn = tagCreate("button", {});
root.appendChild(writeBtn);

const writeImg = tagCreate("img", {src: '/writeImage'})
writeBtn.appendChild(writeImg);
styleCreate(writeImg, {
  width: "70%",
  height: "70%",
})

styleCreate(writeBtn, {
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
  zIndex: 3
});

loadDangstargram(0);

function loadDangstargram(nth) {
  const xhr = new XMLHttpRequest();
  // let result = {};
  xhr.open("GET", `http://localhost:2080/loadPostBoard?nth=${nth}`);
  xhr.send();
  xhr.addEventListener("load", function () {
    let res = JSON.parse(xhr.response);
    for (let i = 0; i < res.length; i++) {
      console.log(res[i])
      // postCreate(부모요소, src_link(이미지 링크), writerNickname(작성자 이름), text(게시글 내용), src_comment_link(댓글 작성자 프로필 이미지), textName(댓글 작성자 이름), cmText(댓글 내용), index(인덱싱), postIndex(DB인덱싱))
      postCreate(root, "../resource/MainDogImg.jpg", res[i].post_id, res[i].post_detail, "../resource/MainDogImg.jpg", res[i].cm_id, res[i].cm_detail, i, res[i].post_index); // 두번째 파라미터는 DB 혹은 ftp에서 주소를 가져와서 적용, 지금은 임시 값
    }
  });
}


