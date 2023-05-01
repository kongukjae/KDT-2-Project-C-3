function commentUpdateDelete(parent, commentIndex){
  let test = document.cookie;
  let userIdSend = test.split("jwt=")[1];
  // 댓글 수정 / 삭제 버튼을 감싸는 div 영역
  const commentViewBtnWrap = tagCreate("div", {});
  styleCreate(commentViewBtnWrap, dangstarStyle.dangstarRecentCommentBtnsWrap);
  parent.appendChild(commentViewBtnWrap);

  // 댓글 수정 버튼
  const commentViewEdit = tagCreate("button", {id: `update_${commentIndex}`});
  styleCreate(commentViewEdit, dangstarStyle.dangstarRecentCommentEdit);
  commentViewEdit.innerText = "수정";
  commentViewEdit.onclick = function() {
    console.log("수정 요청 보냄")
    fetch(`http://localhost:2080/commentUpdate`, {
      method: "POST",
      body: JSON.stringify({
        userID: userIdSend,
        index: commentIndex,
      })
    })
    .then((response) => {
      console.log("수정 응답 받음")
      // console.log(response.JSON());
      return response.json()
    })
    .then((result) => {
      console.log(result)
    })
  }
  commentViewBtnWrap.appendChild(commentViewEdit);


  // 댓글 삭제 버튼
  const commentViewDelet = tagCreate("button", {id: `del_${commentIndex}`});
  styleCreate(commentViewDelet, dangstarStyle.dangstarRecentCommentDelete);
  commentViewDelet.innerText = "삭제";
  commentViewBtnWrap.appendChild(commentViewDelet);
  commentViewDelet.onclick = function() {
    console.log("삭제 요청 보냄")
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:2080/commentDelete`);
    xhr.send(`userID=${userIdSend}&commentIndex=${commentIndex}`);
    xhr.addEventListener('load', () => {
      console.log("삭제 응답 받음")
      location.reload();
    })
  }
}