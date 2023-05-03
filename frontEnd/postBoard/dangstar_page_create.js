// 게시글 생성 함수
// function postCreate(parent, src_link, writerNickname, text, src_comment_link, textName, cmText, index, postIndex) {
function postCreate(parent, src_link, writerNickname, text, index, postIndex) {
  console.log(index);
  console.log(postIndex);
  // 게시글 전체를 감싸는 div
  const postWrap = tagCreate("div", {id: `post_${postIndex}`});
  styleCreate(postWrap, dangstarStyle.dangstarFeedWrap);
  parent.appendChild(postWrap);

  // 이미지 영역을 감싸는 div
  const postImgWrap = tagCreate("div", {});
  styleCreate(postImgWrap, dangstarStyle.dangstarFeedImgWrap);
  postWrap.appendChild(postImgWrap);

  // 이미지 영역
  const postImg = tagCreate("img", { src: src_link });
  styleCreate(postImg, dangstarStyle.dangstarFeedImg);
  postImgWrap.appendChild(postImg);

  // 텍스트 영역을 감싸는 wrap, 한번 더 wrap을 이용해 감싸는 이유는 padding을 넣기 위함. 직접적으로 padding을 넣으면 paddingLeft 값 때문에 텍스트가 영역을 삐져나감
  const textWrap = tagCreate("div", {});
  styleCreate(textWrap, dangstarStyle.dangstarFeedTextWrap);
  postWrap.appendChild(textWrap);

  // 작성자 닉네임 영역
  const writerName = tagCreate("p", {});
  styleCreate(writerName, dangstarStyle.dangstarFeedWriterName)
  writerName.innerText = writerNickname;
  textWrap.appendChild(writerName);

  // 텍스트가 표시될 영역, DB에서 게시글 내용 텍스트를 가져와서 표시하고 5줄을 넘기면 말줄임표로 표시되도록 구현함
  const textBox = tagCreate("p", {});
  textBox.innerText = text;
  styleCreate(textBox, dangstarStyle.dangstarFeedTextBox);
  textWrap.appendChild(textBox);

  // 좋아요, 댓글, 구독(변경 예정) 버튼을 감싸는 div
  const postBtnWrap = tagCreate("div", {});
  styleCreate(postBtnWrap, dangstarStyle.dangstarFeedBtnsWrap);
  postWrap.appendChild(postBtnWrap);

  // 각각의 버튼을 만드는 반복문
  for (let i = 0; i < 3; i++) {
    const postBtn = tagCreate("button", {});
    if (i === 0) {
      const heartImage = tagCreate("img", {id: 'heartImage'})
      postBtn.appendChild(heartImage);
      styleCreate(heartImage, dangstarStyle.dangstarLikeImg)
      //postBtn.innerText = "좋아요";
      postBtn.id = `like_${postIndex}_${index}`;
    } else if (i === 1) {
      postBtn.innerText = "댓글"; 
      postBtn.id = `index_${postIndex}_${index}`
    } else {
      postBtn.innerText = "➤";
      postBtn.id = `detail_${postIndex}`;
      //const de = tagCreate('a', {});
      //de.href = `/dangstarDetail?nth=${postIndex}`;
      //postBtn.appendChild(de);

    }
    styleCreate(postBtn, dangstarStyle.dangstarFeedBtns);
    postBtnWrap.appendChild(postBtn);

  }
  
  //좋아요 표시 함수 실행
  dangstarLike(postIndex, index, writerNickname);
  // 댓글 입력 창 및 최신 댓글 표시 함수 실행
  commentInputData(postIndex);

  let detailBtn = document.getElementById(`detail_${postIndex}`);
  detailBtn.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
      xhr.open("POST", `http://localhost:2080//postDetailDangstar`)
      xhr.send(`{src_link=${src_link}&writerNickname=${writerNickname}&text=${text}index=${index}&postIndex=${postIndex}}`);
  })

  //댓글 정보를 받아오는 함수
  // 숨김 / 표시를 컨트롤 할 영역
  let cmtModal = tagCreate("div", { id: "cmtModal" });

  document.getElementById(`post_${postIndex}`).appendChild(cmtModal);
  styleCreate(cmtModal, dangstarStyle.dangstarCommentModal);

  // 댓글 버튼 클릭 시 이전 댓글 보이기 / 감추기
  let commentBtn = document.getElementById(`index_${postIndex}`);

  let cmBtnCount = true;
  commentBtn.addEventListener("click", function () {
    if(cmBtnCount) {
      cmtModal.style.display = "flex";
      cmBtnCount = false;
    } else {
      cmtModal.style.display = "none";
      cmBtnCount = true;
    }
  });

  
  

  // commentInput(postWrap, src_comment_link, textName, cmText, index, postIndex);
  function commentInputData(postIndex) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:2080/postBoardCommentData`, true);
    xhr.send(`postIndex=${postIndex}`);
    xhr.addEventListener('load', function() {
      // 댓글 입력창 만드는 함수
      commentInput(postWrap, postIndex);

      let res = JSON.parse(xhr.response);
      console.log(res);
      console.log("res res res res res");
      // console.log(res[0]);
      // console.log(res[0].cm_detail);
      let textName;
      let cmText;
      let src_comment_link;
      let commentIndex;
      let cnt = res.length - 1;
      // 댓글 데이터가 있을 경우에만
      if(res.length !== 0) {
        console.log("조건문 안쪽")
        console.log(res);
        console.log("조건문 안쪽")
        textName = res[0].cm_id;
        cmText = res[0].cm_detail;
        commentIndex = res[0].cm_index;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `http://localhost:2080/sendImage`);
        xhr.responseType = "blob";
        xhr.send(`type=proFile&id=${res[0].cm_id}`);
        xhr.addEventListener("load", function () {
          console.log("이미지 응답 받음")
          let imageFromServer = URL.createObjectURL(xhr.response);
          console.log(imageFromServer);
          console.log("imageFromServer");
          src_comment_link = imageFromServer;
          //최신 댓글 1개 보여주는 함수 실행
          commentRecent(postWrap, src_comment_link, textName, cmText, commentIndex);

          // 이전 댓글 목록 불러오기
          for(let i = 1; i < cnt + 1; i++) {
            let text = res[i].cm_detail;
            let name = res[i].cm_id;
            let cmIndex = res[i].cm_index;
            let profileImg;
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:2080/sendImage`);
            xhr.responseType = "blob";
            xhr.send(`type=proFile&id=${res[i].cm_id}`);
            xhr.addEventListener("load", function () {
              profileImg = URL.createObjectURL(xhr.response);
              commentWindow(cmtModal, text, name, profileImg, i, cmIndex);
            })
          }
        });
        // console.log(src_comment_link);
      }
      // else {
      //   textName = res[0].cm_id;
      //   cmText = res[0].cm_detail;
      // }
      // commentWindow(index, cnt, parent);

    })
    console.log("commentData를 받아오기 위한 함수 실행 테스트");
  }
  
  // 모달창 함수 실행, index = 게시글 작성 함수를 돌리는 for문의 i값
  // function commentModal(index, cmtNumber, parent) {
  //   commentWindow(index, cmtNumber, parent);
  // }
  // commentModal()
}