

//댓글 창 만드는 함수
function commentWindow(index, cmtNumber, parent) {
  let cmtModal = tagCreate("div", { id: "cmtModal" });
  // console.log("index");
  // console.log(index);
  // console.log(parent);
  parent.children[index].appendChild(cmtModal);
  // console.log("parent : ");
  // console.log(parent);
  styleCreate(cmtModal, dangstarStyle.dangstarCommentModal);

  let closeWrap = tagCreate("div", {});
  cmtModal.appendChild(closeWrap);
  styleCreate(closeWrap, dangstarStyle.dangstarCommentModalCloseWrap);

  let closeBtn = tagCreate("button", { id: "closeBtn" });
  cmtModal.appendChild(closeBtn);
  styleCreate(closeBtn, dangstarStyle.dangstarCommentModalCloseBtn);
  closeBtn.innerText = "X";

  for (let i = 0; i < cmtNumber; i++) {
    let cmt = tagCreate("div", {});
    cmtModal.appendChild(cmt);
    styleCreate(cmt, dangstarStyle.dangstarCommentModalWrap);

    let imgChild = tagCreate("div", {});
    cmt.appendChild(imgChild);
    styleCreate(imgChild, dangstarStyle.dangstarCommentModalImg);

    let textChild = tagCreate("div", {});
    cmt.appendChild(textChild);
    styleCreate(textChild, dangstarStyle.dangstarCommentModalTextWrap);

    let userName = tagCreate("div", {});
    textChild.appendChild(userName);
    styleCreate(userName, dangstarStyle.dangstarCommentModalWriterName);
    userName.innerText = "몽뭉이";

    let comment = tagCreate("div", {});
    textChild.appendChild(comment);
    styleCreate(comment, dangstarStyle.dangstarCommentModalTextBox);
    comment.innerText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  }

  let commentBtn = document.getElementById(`index_${index}`);

  commentBtn.addEventListener("click", function () {
    cmtModal.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    console.log("닫기");
    cmtModal.style.display = "none";
  });
}
