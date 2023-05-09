function commentRecent(postWrap, src_comment_link, textName, cmText, commentIndex){
  // 최신 댓글 하나가 보여질 영역
  const commentViewWrap = tagCreate("div", {});
  styleCreate(commentViewWrap, dangstarStyle.dangstarRecentComment);
  postWrap.appendChild(commentViewWrap);

  // 최신 댓글 프로필 이미지와 내용을 한줄로 넣기 위한 wrap
  const commentImgContentWrap = tagCreate("div", {});
  styleCreate(commentImgContentWrap, dangstarStyle.dangstarRecentCommentContentWrap);
  commentViewWrap.appendChild(commentImgContentWrap);

  // 최신 댓글의 프로필 이미지 영역
  const commentViewImgWrap = tagCreate("div", {});
  styleCreate(commentViewImgWrap, dangstarStyle.dangstarRecentCommentProfileWrap);
  commentViewImgWrap.style.backgroundImage = `url(${src_comment_link})`;
  commentImgContentWrap.appendChild(commentViewImgWrap);

  // 최신 댓글 내용을 표시할 영역
  const commentViewContentWrap = tagCreate("div", {});
  styleCreate(commentViewContentWrap, dangstarStyle.dangstarRecentCommentWrap)
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
    // 접속한 유저의 ID와 작성자의 ID가 일치한다면 수정/삭제 버튼 표시
    if (textName === userID) {
      commentUpdateDelete(commentViewWrap, commentIndex);
    }
  });
}

// 접속한 유저가 작성한 댓글인지 판단하는 함수
function userCheck() {
  return new Promise((resolve, reject) => {
    console.log("cookie 데이터");
    console.log(document.cookie);
    let userIDSend = document.cookie.split("jwt=")[1];
    console.log("comment userID: " + userIDSend);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/userCheck`);
    xhr.send(`userID=${userIDSend}`);
    xhr.addEventListener('load', () => {
      let userID = JSON.parse(xhr.response);
      resolve(userID);
    });
  });
}