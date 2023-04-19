// 게시글 생성 함수
function postCreate(parent, src_link, writerNickname, text, src_comment_link, textName, index) {
  console.log(index);
  // 게시글 전체를 감싸는 div
  const postWrap = tagCreate("div", {});
  styleCreate(postWrap, {
    border: "1px solid black",
    width: "500px",
    marginBottom: "20px",
    position: "relative",
  });
  parent.appendChild(postWrap);

  // 이미지 영역을 감싸는 div
  const postImgWrap = tagCreate("div", {});
  styleCreate(postImgWrap, {
    //border: "1px solid red",
    width: "500px",
    height: "400px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  postWrap.appendChild(postImgWrap);

  // 이미지 영역
  const postImg = tagCreate("img", { src: src_link });
  styleCreate(postImg, {
    height: "100%",
  });
  postImgWrap.appendChild(postImg);

  // 텍스트 영역을 감싸는 wrap, 한번 더 wrap을 이용해 감싸는 이유는 padding을 넣기 위함. 직접적으로 padding을 넣으면 paddingLeft 값 때문에 텍스트가 영역을 삐져나감
  const textWrap = tagCreate("div", {});
  styleCreate(textWrap, {
    padding: "25px",
    display: "flex",
    flexDirection: "column",
  });
  postWrap.appendChild(textWrap);

  // 작성자 닉네임 영역
  const writerName = tagCreate("p", {});
  styleCreate(writerName, {
    fontWeight: "bold",
  })
  // writerName.innerText = writerNickname;
  writerName.innerText = "작성자 이름 영역"
  textWrap.appendChild(writerName);

  // 텍스트가 표시될 영역, DB에서 게시글 내용 텍스트를 가져와서 표시하고 5줄을 넘기면 말줄임표로 표시되도록 구현함
  const textBox = tagCreate("p", {});
  // textBox.innerText = text;
  textBox.innerText =
    "DB에서 받아올 텍스트 영역 임시로 넣어둔 더미 텍스트 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  styleCreate(textBox, {
    border: "1px solid green",
    width: "450px", // 500px - 부모의 좌우 패딩 값
    display: "-webkit-box",
    webkitBoxOrient: "vertical",
    webkitLineClamp: "5",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre-wrap",
  });
  textWrap.appendChild(textBox);

  // 좋아요, 댓글, 구독(변경 예정) 버튼을 감싸는 div
  const postBtnWrap = tagCreate("div", {});
  styleCreate(postBtnWrap, {
    //border: "1px solid red",
    width: "500px",
    height: "100px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  });
  postWrap.appendChild(postBtnWrap);

  // 각각의 버튼을 만드는 반복문
  for (let i = 0; i < 3; i++) {
    const postBtn = tagCreate("button", {});
    if (i === 0) {
      postBtn.innerText = "좋아요";
    } else if (i === 1) {
      postBtn.innerText = "댓글";
      postBtn.id = `index_${index}`
    } else {
      postBtn.innerText = "구독";
    }
    styleCreate(postBtn, {
      width: "60px",
      height: "60px",
    });
    postBtnWrap.appendChild(postBtn);

  }
  
  //댓글 입력창 만드는 함수 실행
  commentInput(postWrap, src_comment_link);
  
  // 모달창 함수 실행, index = 게시글 작성 함수를 돌리는 for문의 i값
  commentWindow(index, 5, parent);

  
}