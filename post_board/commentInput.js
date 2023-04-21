function commentInput(postWrap, src_comment_link, textName, cmText, index, postIndex){
// function commentInput(postWrap, index, postIndex){
  let test = document.cookie;
  console.log(test);
  let userID = test.split("jwt=")[1];

  // 댓글 입력창 감싸는 div
  const commentWrap = tagCreate("div", {});
  styleCreate(commentWrap, {
    //border: "1px solid black",
    padding: "15px",
  });
  postWrap.appendChild(commentWrap);

  // 댓글 입력창과 작성 버튼을 감쌀 form 요소
  const commentForm = tagCreate("form", {});
  styleCreate(commentForm, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });
  commentWrap.appendChild(commentForm);

  // 댓글 입력할 textarea
  const commentInput = tagCreate("input", {
    id: `comment_${postIndex}_${index}`,
    type: "text",
    name: "commentValue",
    placeholder: "내용을 입력해주세요",
  });
  styleCreate(commentInput, {
    width: "85%",
    height: "38px",
    outline: "none",
  });
  commentForm.appendChild(commentInput);

  // 댓글 작성 버튼
  const commentSubmit = tagCreate("div", {id: `commentSend_${index}`});
  styleCreate(commentSubmit, {
    width: "60px",
    height: "38px",
    backgroundColor: "#ddd",
    border: "1px solid #999",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  });
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

  //최신 댓글 1개 보여주는 함수 실행
  // commentRecent(postWrap, src_comment_link, textName, cmText);
}