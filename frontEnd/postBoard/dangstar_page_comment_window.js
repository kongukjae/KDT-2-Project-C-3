//댓글 창 만드는 함수
function commentWindow(parent, cmText, cmName, profileImg, i) {
  // console.log(i);
  // 댓글 하나가 보여질 영역
  let cmt = tagCreate("div", {});
  parent.appendChild(cmt);
  styleCreate(cmt, dangstarStyle.dangstarCommentModalWrap);
  cmt.style.order = i;

  // 최신 댓글 프로필 이미지와 내용을 한줄로 넣기 위한 wrap
  let imgWrap = tagCreate("div", {});
  cmt.appendChild(imgWrap);
  styleCreate(imgWrap, dangstarStyle.dangstarRecentCommentContentWrap);

  // 최신 댓글의 프로필 이미지 영역
  let imgChild = tagCreate("div", {});
  imgWrap.appendChild(imgChild);
  styleCreate(imgChild, dangstarStyle.dangstarCommentModalImg);
  imgChild.style.backgroundImage = `url(${profileImg})`;

  // 최신 댓글 내용을 표시할 영역
  let textChild = tagCreate("div", {});
  imgWrap.appendChild(textChild);
  styleCreate(textChild, dangstarStyle.dangstarCommentModalTextWrap);

  // 최신 댓글 닉네임 표시
  let userName = tagCreate("p", {});
  textChild.appendChild(userName);
  styleCreate(userName, dangstarStyle.dangstarCommentModalWriterName);
  userName.innerText = cmName;

  // 최신 댓글 내용
  let comment = tagCreate("p", {});
  textChild.appendChild(comment);
  styleCreate(comment, dangstarStyle.dangstarCommentModalTextBox);
  comment.innerText = cmText;
}
