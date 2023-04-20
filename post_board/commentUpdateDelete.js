function commentUpdateDelete(commentViewWrap){
  // 댓글 수정 / 삭제 버튼을 감싸는 div 영역
  const commentViewBtnWrap = tagCreate("div", {});
  styleCreate(commentViewBtnWrap, {
    position: "absolute",
    top: "5px",
    right: "10px",
  });
  commentViewWrap.appendChild(commentViewBtnWrap);

  // 댓글 수정 버튼
  const commentViewEdit = tagCreate("button", {});
  styleCreate(commentViewEdit, {
    backgroundColor: "transparent",
    border: "none",
    marginRight: "10px",
    cursor: "pointer",
  });
  commentViewEdit.innerText = "수정";
  commentViewBtnWrap.appendChild(commentViewEdit);


  // 댓글 삭제 버튼
  const commentViewDelet = tagCreate("button", {});
  styleCreate(commentViewDelet, {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  });
  commentViewDelet.innerText = "삭제";
  commentViewBtnWrap.appendChild(commentViewDelet);

}