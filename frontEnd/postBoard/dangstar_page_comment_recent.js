function commentRecent(postWrap, src_comment_link, textName, cmText){
  // 최신 댓글 하나가 보여질 영역
  const commentViewWrap = tagCreate("div", {});
  styleCreate(commentViewWrap, dangstarStyle.dangstarRecentComment);
  postWrap.appendChild(commentViewWrap);

  // 최신 댓글 프로필 이미지와 내용을 한줄로 넣기 위한 wrap
  const commentImgContentWrap = tagCreate("div", {});
  styleCreate(commentImgContentWrap, dangstarStyle.dangstarRecentCommentContentWrap);
  commentViewWrap.appendChild(commentImgContentWrap);

  // 최신 댓글의 프로필 이미지를 감싸는 div 영역
  const commentViewImgWrap = tagCreate("div", {});
  styleCreate(commentViewImgWrap, dangstarStyle.dangstarRecentCommentProfileWrap);
  commentViewImgWrap.style.backgroundImage = `url(${src_comment_link})`;
  commentImgContentWrap.appendChild(commentViewImgWrap);

  // 최신 댓글의 프로필 이미지
  // const commentViewImg = tagCreate("img", { src: src_comment_link });
  // styleCreate(commentViewImg, dangstarStyle.dangstarRecentCommentProfileImg);
  // commentViewImgWrap.appendChild(commentViewImg);

  // 최신 댓글 내용을 표시할 영역
  const commentViewContentWrap = tagCreate("div", {});
  commentImgContentWrap.appendChild(commentViewContentWrap);

  // 최신 댓글 닉네임 표시
  const commentViewName = tagCreate("p", {});
  styleCreate(commentViewName, dangstarStyle.dangstarRecentCommentWriterName);
  commentViewName.innerText = textName;
  // commentViewName.innerText = "댓글 닉네임 DB에서 가져올 데이터";
  commentViewContentWrap.appendChild(commentViewName);

  // 최신 댓글 내용
  const commentViewContent = tagCreate("p", {});
  commentViewContent.innerText = cmText;
  styleCreate(commentViewContent, dangstarStyle.dangstarRecentCommentTextBox);
  commentViewContentWrap.appendChild(commentViewContent);

  userCheck().then((userID) => {
    if (textName === userID) {
      commentUpdateDelete(commentViewWrap);
    }
  });
}

// 접속한 유저가 작성한 댓글인지 판단하는 함수
function userCheck() {
  return new Promise((resolve, reject) => {
    let userIDSend = document.cookie.split("jwt=")[1];
    console.log("comment userID: " + userIDSend);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:2080/userCheck`);
    xhr.send(`userID=${userIDSend}`);
    xhr.addEventListener('load', () => {
      let userID = JSON.parse(xhr.response);
      resolve(userID);
    });
  });
}