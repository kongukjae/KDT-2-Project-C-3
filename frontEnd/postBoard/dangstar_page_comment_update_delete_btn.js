function commentUpdateDelete(parent, commentIndex) {
  let test = document.cookie;
  let userIdSend = test.split("jwt=")[1];
  // 댓글 수정 / 삭제 버튼을 감싸는 div 영역
  const commentViewBtnWrap = tagCreate("div", {});
  styleCreate(commentViewBtnWrap, dangstarStyle.dangstarRecentCommentBtnsWrap);
  parent.appendChild(commentViewBtnWrap);

  // 댓글 수정 버튼
  const commentViewEdit = tagCreate("button", { id: `update_${commentIndex}` });
  styleCreate(commentViewEdit, dangstarStyle.dangstarRecentCommentEdit);
  commentViewEdit.innerText = "수정";
  commentViewEdit.onclick = function () {
    console.log("수정 요청 보냄");
    fetch(`http://15.164.63.222:2080/commentUpdateBtn`, {
      method: "POST",
      body: JSON.stringify({
        userID: userIdSend,
        index: commentIndex,
      }),
    })
      .then((response) => {
        console.log("수정 응답 받음");
        // console.log(response.JSON());
        return response.json();
      })
      .then((result) => {
        console.log(result);
        let index = result[0].cm_index;
        let postIndex = result[0].post_index;
        let textValue = result[0].cm_detail;
        commentUpdateFunc(parent, index, textValue);
      });
  };
  commentViewBtnWrap.appendChild(commentViewEdit);

  // 댓글 수정 버튼 클릭 시 input 요소 생성 및 수정된 값 처리하는 함수
  function commentUpdateFunc(parent, index, textValue) {
    parent.children[0].children[1].children[0].style.display = "none";
    parent.children[0].children[1].children[1].style.display = "none";
    parent.children[1].style.display = "none";

    const commentWrap = tagCreate("div", {});
    styleCreate(commentWrap, dangstarStyle.dangstarCommentUpdateWrap);
    parent.children[0].children[1].appendChild(commentWrap);

    // 댓글 입력창과 작성 버튼을 감쌀 form 요소
    const commentForm = tagCreate("form", {});
    styleCreate(commentForm, dangstarStyle.dangstarCommentUpdateForm);
    commentWrap.appendChild(commentForm);

    // 댓글 입력할 textarea
    const commentInput = tagCreate("input", {
      id: `comment_${index}`,
      type: "text",
      name: "commentValue",
      value: `${textValue}`,
      placeholder: "내용을 입력해주세요",
    });
    styleCreate(commentInput, dangstarStyle.dangstarCommentUpdateInput);
    commentForm.appendChild(commentInput);

    // 댓글 수정 입력 버튼
    const commentSubmit = tagCreate("div", { id: `commentSend_${commentIndex}` });
    styleCreate(commentSubmit, dangstarStyle.dangstarCommentUpdateBtn);
    commentSubmit.innerText = "수정";
    commentForm.appendChild(commentSubmit);

    let commentUpdateSendBtn = document.getElementById(`commentSend_${commentIndex}`);
    commentUpdateSendBtn.addEventListener("click", () => {
      console.log("수정 버튼 눌림 수정 버튼 눌림 수정 버튼 눌림");
      let commentValueData = document.getElementById(`comment_${commentIndex}`).value;
      console.log(commentValueData);
      fetch(`http://15.164.63.222:2080/commentUpdateSubmit`, {
        method: "POST",
        body: JSON.stringify({
          userID: userIdSend,
          cm_index: commentIndex,
          cm_detail: commentValueData,
        })
      })
      .then(response => {
        console.log("댓글 수정 응답 받음")
        location.reload();
      })
    });
  }

  // 댓글 삭제 버튼
  const commentViewDelet = tagCreate("button", { id: `del_${commentIndex}` });
  styleCreate(commentViewDelet, dangstarStyle.dangstarRecentCommentDelete);
  commentViewDelet.innerText = "삭제";
  commentViewBtnWrap.appendChild(commentViewDelet);
  commentViewDelet.onclick = function () {
    console.log("삭제 요청 보냄");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://15.164.63.222:2080/commentDelete`);
    xhr.send(`userID=${userIdSend}&commentIndex=${commentIndex}`);
    xhr.addEventListener("load", () => {
      console.log("삭제 응답 받음");
      location.reload();
    });
  };
}
