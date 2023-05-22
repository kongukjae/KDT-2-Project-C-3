const root = tagCreate("div", { id: "root" });
styleCreate(root, dangstarStyle.dangstarRoot);
document.body.appendChild(root);

// 탑 메뉴
const topMenuWrap = tagCreate("div", {});
root.appendChild(topMenuWrap);
topMenu(topMenuWrap);
createHamburger(root);

const postWrap = tagCreate("div", { id: "dangstarRoot" });
styleCreate(postWrap, dangstarStyle.dangstarFeedListWrap);
// styleCreate(postWrap, dangstarStyle.dangstarFeedWrap);

root.appendChild(postWrap);

// 바텀 메뉴
const btmMeunWrap = tagCreate("div", {});
root.appendChild(btmMeunWrap);
btmMeun(btmMeunWrap);

// console.log("dldkfkdkkd:: ", datas)

console.log("디테일 값: ", link, id, text, idx, postIdx);

// let decLink = decodeURIComponent(link);
// let decText = decodeURIComponent(text);
// console.log(decLink, "/", decText)

if (link === "null") {
  dangstarDetail(
    postWrap,
    "/image/image/default/null.png",
    id,
    text,
    idx,
    postIdx
  );
  //postCreate(postWrap, "/image/image/default/null.png", res[i].post_id, res[i].post_detail, i, res[i].post_index);
} else {
  dangstarDetail(
    postWrap,
    `/image/image/dangstar/${link}`,
    id,
    text,
    idx,
    postIdx
  );
  //postCreate(postWrap, `/image/image/dangstar/${res[i].img}`, res[i].post_id, res[i].post_detail, i, res[i].post_index);
}
// dangstarDetail(postWrap, decLink, id, decText, idx, postIdx);

function dangstarDetail(
  postWrap,
  src_link,
  writerNickname,
  text,
  index,
  postIndex
) {
  // 이미지 영역을 감싸는 div
  const postImgWrap = tagCreate("div", {});
  styleCreate(postImgWrap, dangstarStyle.dangstarFeedImgWrap);
  postWrap.appendChild(postImgWrap);

  // 이미지 영역
  const postImg = tagCreate("img", { src: src_link });
  styleCreate(postImg, dangstarStyle.dangstarFeedImg);
  postImgWrap.appendChild(postImg);

  // 텍스트 영역을 감싸는 wrap, 한번 더 wrap을 이용해 감싸는 이유는 padding을 넣기 위함. 직접적으로 padding을 넣으면 paddingLeft 값 때문에 텍스트가 영역을 삐져나감
  const textWrap = tagCreate("div", {});
  styleCreate(textWrap, dangstarStyle.dangstarFeedTextWrap);
  postWrap.appendChild(textWrap);

  // 작성자 닉네임 영역
  const writerName = tagCreate("p", {});
  styleCreate(writerName, dangstarStyle.dangstarFeedWriterName);
  writerName.innerText = writerNickname;
  textWrap.appendChild(writerName);

  // 텍스트가 표시될 영역, DB에서 게시글 내용 텍스트를 가져와서 표시하고 5줄을 넘기면 말줄임표로 표시되도록 구현함
  const textBox = tagCreate("p", {});
  textBox.innerText = text;
  styleCreate(textBox, dangstarStyle.dangstarFeedTextBox);
  textWrap.appendChild(textBox);

  // 좋아요, 댓글, 구독(변경 예정) 버튼을 감싸는 div
  const postBtnWrap = tagCreate("div", {});
  styleCreate(postBtnWrap, dangstarStyle.dangstarFeedBtnsWrap);
  postWrap.appendChild(postBtnWrap);

  //좋아요 버튼 생성
  const postBtn = tagCreate("button", {});
  const heartImage = tagCreate("img", { id: "heartImage" });
  postBtn.appendChild(heartImage);
  styleCreate(heartImage, dangstarStyle.dangstarLikeImg);
  postBtn.id = `like_${postIndex}_${index}`;
  styleCreate(postBtn, dangstarStyle.dangstarFeedBtns);
  postBtnWrap.appendChild(postBtn);

  //좋아요 표시 함수 실행
  dangstarLike(postIndex, index, writerNickname);
  // 댓글 입력 창 및 최신 댓글 표시 함수 실행
  commentInputData(postIndex);

  //댓글 정보를 받아오는 함수
  function commentInputData(postIndex) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://15.164.63.222:2080/postBoardCommentData`, true);
    xhr.send(`postIndex=${postIndex}`);
    xhr.addEventListener("load", function () {
      // 댓글 입력창 만드는 함수
      commentInput(postWrap, postIndex);

      let res = JSON.parse(xhr.response);
      console.log(res);
      console.log("res res res res res");
      // console.log(res[0]);
      // console.log(res[0].cm_detail);
      let textName;
      let cmText;
      let src_comment_link;
      let commentIndex;
      let cnt = res.length - 1;
      // 댓글 데이터가 있을 경우에만
      if (res.length !== 0) {
        console.log("조건문 안쪽");
        console.log(res);
        console.log("조건문 안쪽");
        textName = res[0].cm_id;
        cmText = res[0].cm_detail;
        commentIndex = res[0].cm_index;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `http://15.164.63.222:2080/sendImage`);
        xhr.responseType = "blob";
        xhr.send(`type=proFile&id=${res[0].cm_id}`);
        xhr.addEventListener("load", function () {
          console.log("이미지 응답 받음");
          let imageFromServer = URL.createObjectURL(xhr.response);
          console.log(imageFromServer);
          console.log("imageFromServer");
          src_comment_link = imageFromServer;
          //최신 댓글 1개 보여주는 함수 실행
          commentRecent(
            postWrap,
            src_comment_link,
            textName,
            cmText,
            commentIndex
          );

          // 이전 댓글 목록 불러오기
          for (let i = 1; i < cnt + 1; i++) {
            let text = res[i].cm_detail;
            let name = res[i].cm_id;
            let cmIndex = res[i].cm_index;
            let profileImg;
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `http://15.164.63.222:2080/sendImage`);
            xhr.responseType = "blob";
            xhr.send(`type=proFile&id=${res[i].cm_id}`);
            xhr.addEventListener("load", function () {
              profileImg = URL.createObjectURL(xhr.response);
              commentWindow(postWrap, text, name, profileImg, i, cmIndex);
            });
          }
        });
      }
    });
    console.log("commentData를 받아오기 위한 함수 실행 테스트");
  }
}
