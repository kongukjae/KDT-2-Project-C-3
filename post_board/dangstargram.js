
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
  postCreate(root, "../resource/MainDogImg.jpg", "멍뭉이", "임시 텍스트 내용 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", "../resource/MainDogImg.jpg", "임시 댓글 작성자", "임시 댓글 내용", i); // 두번째 파라미터는 DB 혹은 ftp에서 주소를 가져와서 적용, 지금은 임시 값
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

loadDangstargram(0);

function loadDangstargram(nth){
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:2080/loadPostBoard?nth=${nth}`);
  xhr.send();
  xhr.addEventListener('load', function() {
    let res = JSON.parse(xhr.response);
    for(let key in res) {
      // postCreate(parent, src_link(이미지 링크), writerNickname(작성자 이름), text(게시글 내용), src_comment_link(댓글 작성자 프로필 이미지), textName(댓글 작성자 이름), cmText(댓글 내용), index(인덱싱))
      postCreate(root, );
      console.log(res[key]);
    }
  })
  
}


