function commentUpdateDelete(commentViewWrap){
  // 댓글 수정 / 삭제 버튼을 감싸는 div 영역
  const commentViewBtnWrap = tagCreate("div", {});
  styleCreate(commentViewBtnWrap, dangstarStyle.dangstarRecentCommentBtnsWrap);
  commentViewWrap.appendChild(commentViewBtnWrap);

  // 댓글 수정 버튼
  const commentViewEdit = tagCreate("button", {});
  styleCreate(commentViewEdit, dangstarStyle.dangstarRecentCommentEdit);
  commentViewEdit.innerText = "수정";
  commentViewBtnWrap.appendChild(commentViewEdit);


  // 댓글 삭제 버튼
  const commentViewDelet = tagCreate("button", {});
  styleCreate(commentViewDelet, dangstarStyle.dangstarRecentCommentDelete);
  commentViewDelet.innerText = "삭제";
  commentViewBtnWrap.appendChild(commentViewDelet);

}