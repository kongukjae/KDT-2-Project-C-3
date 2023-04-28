function commentInput(postWrap, src_comment_link, textName, cmText, index, postIndex){
// function commentInput(postWrap, index, postIndex){
  let test = document.cookie;
  console.log(test);
  let userID = test.split("jwt=")[1];

  // 댓글 입력창 감싸는 div
  const commentWrap = tagCreate("div", {});
  styleCreate(commentWrap, dangstarStyle.dangstarCommentWrap);
  postWrap.appendChild(commentWrap);

  // 댓글 입력창과 작성 버튼을 감쌀 form 요소
  const commentForm = tagCreate("form", {});
  styleCreate(commentForm, dangstarStyle.dangstarCommentForm);
  commentWrap.appendChild(commentForm);

  // 댓글 입력할 textarea
  const commentInput = tagCreate("input", {
    id: `comment_${postIndex}_${index}`,
    type: "text",
    name: "commentValue",
    placeholder: "내용을 입력해주세요",
  });
  styleCreate(commentInput, dangstarStyle.dangstarCommentInput);
  commentForm.appendChild(commentInput);

  // 댓글 작성 버튼
  const commentSubmit = tagCreate("div", {id: `commentSend_${index}`});
  styleCreate(commentSubmit, dangstarStyle.dangstarCommentWriteBtn);
  commentSubmit.innerText = "작성";
  commentForm.appendChild(commentSubmit);
  let commentSendBtn = document.getElementById(`commentSend_${index}`);
  commentSendBtn.addEventListener('click', () => {
    console.log(document.getElementById(`comment_${postIndex}_${index}`).value);
    let commentValueData = document.getElementById(`comment_${postIndex}_${index}`).value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:2080/commentSubmit`, true);
    xhr.send(`commentValue=${commentValueData}&userID=${userID}&post_index=${postIndex}`);
    xhr.addEventListener('load', () => {
      location.reload();
    })
  })

}