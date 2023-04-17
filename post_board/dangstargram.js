//  import 예정 함수들, 임시로 가져옴
// --------------------------------------------------------------------------------------- //

function tagCreate(tType, props) {
  let element = document.createElement(tType);
  for (let i in props) {
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj, styleOb) {
  for (i in styleOb) {
    obj.style[i] = styleOb[i];
  }
}

// --------------------------------------------------------------------------------------- //

const root = tagCreate("div",{id:"root"});
root.style.width = "500px";
root.style.margin = "auto";
document.body.appendChild(root);

const topMenuWrap = tagCreate("div",{});
topMenuWrap.innerText = "탑메뉴 영역";
root.appendChild(topMenuWrap);

// 탑 메뉴
// topMenu(topMenuWrap);

// 게시글 영역
for(let i = 0; i < 3; i++) { // i < 3에서 3 부분은 나중에 무한 스크롤 방식을 이용해 적용
  postCreate(root, "../resource/MainDogImg.jpg"); // 두번째 파라미터는 DB 혹은 ftp에서 주소를 가져와서 적용, 지금은 임시 값
}


// 바텀 메뉴
const btmMeunWrap = tagCreate("div", {});
btmMeunWrap.innerText = "바텀메뉴 영역";
root.appendChild(btmMeunWrap);
// btmMeun(rootChild[5], menuChild);

// 게시글 작성 버튼
const writeBtn = tagCreate("button", {});
styleCreate(writeBtn, {
  backgroundImage: "url(../resource/write.png)",
  backgroundSize: "65%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  cursor: "pointer",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  position: "fixed",
  bottom: "20px",
  right: "35%",
  border: "1px solid black",
})
root.appendChild(writeBtn);

console.dir(writeBtn);

// 게시글 생성 함수
function postCreate(parent, src_link, text) {
  // 게시글 전체를 감싸는 div
  const postWrap = tagCreate("div", {});
  styleCreate(postWrap, {
    border: "1px solid black",
    width: "500px",
    marginBottom: "20px",
  })
  parent.appendChild(postWrap);
  
  // 이미지 영역을 감싸는 div
  const postImgWrap = tagCreate("div", {});
  styleCreate(postImgWrap, {
    border: "1px solid red",
    width: "500px",
    height: "400px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })
  postWrap.appendChild(postImgWrap);

  // 이미지 영역
  const postImg = tagCreate("img", {src:src_link});
  styleCreate(postImg, {
    height: "100%", 
  })
  postImgWrap.appendChild(postImg);

  // 텍스트 영역을 감싸는 wrap, 한번 더 wrap을 이용해 감싸는 이유는 padding을 넣기 위함. 직접적으로 padding을 넣으면 paddingLeft 값 때문에 텍스트가 영역을 삐져나감
  const textWrap = tagCreate("div", {});
  styleCreate(textWrap, {
    padding: "25px",
  });
  postWrap.appendChild(textWrap);

  // 텍스트가 표시될 영역, DB에서 게시글 내용 텍스트를 가져와서 표시하고 5줄을 넘기면 말줄임표로 표시되도록 구현함
  const textBox = tagCreate("p", {});
  // textBox.innerText = text;
  textBox.innerText = "DB에서 받아올 텍스트 영역 임시로 넣어둔 더미 텍스트 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  styleCreate(textBox, {
    border: "1px solid green",
    width: "450px", // 500px - 부모의 좌우 패딩 값
    display: "-webkit-box",
    webkitBoxOrient: "vertical",
    webkitLineClamp: "5",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre-wrap",
  })
  textWrap.appendChild(textBox);
  
  // 좋아요, 댓글, 구독(변경 예정) 버튼을 감싸는 div
  const postBtnWrap = tagCreate("div", {});
  styleCreate(postBtnWrap, {
    border: "1px solid red",
    width: "500px",
    height: "150px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  })
  postWrap.appendChild(postBtnWrap);

  // 각각의 버튼을 만드는 반복문
  for(let i = 0; i < 3; i++) {
    const postBtn = tagCreate("button", {});
    if(i === 0) {
      postBtn.innerText = "좋아요";
    } else if(i === 1) {
      postBtn.innerText = "댓글";
    } else {
      postBtn.innerText = "구독";
    }
    styleCreate(postBtn, {
      width: "60px",
      height: "60px"
    })
    postBtnWrap.appendChild(postBtn);
  }

  // 댓글 입력창 감싸는 div
  const commentWrap = tagCreate("div", {});
  styleCreate(commentWrap, {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  })
  postWrap.appendChild(commentWrap);

  // 댓글 입력할 textarea
  const commentInput = tagCreate("textarea", {});
  styleCreate(commentInput, {
    width: "85%"
  })
  commentWrap.appendChild(commentInput);

  // 댓글 작성 버튼
  const commentSubmit = tagCreate("button", {});
  styleCreate(commentSubmit, {
    width: "60px",
    height: "38px"
  })
  commentSubmit.innerText = "작성";
  commentWrap.appendChild(commentSubmit);

  // 최신 댓글 하나가 보여질 영역
  const commentViewWrap = tagCreate("div", {});
  postWrap.appendChild(commentViewWrap);

  // 최신 댓글의 프로필 이미지를 감싸는 div 영역
  const commentViewImgWrap = tagCreate("div", {})
  commentViewWrap.appendChild(commentViewImgWrap);

  // 최신 댓글의 프로필 이미지
  const commentViewImg = tagCreate("img", {})
  commentViewImgWrap.appendChild(commentViewImg);

  // 최신 댓글 내용을 표시할 영역
  const commentViewContentWrap = tagCreate("div", {})
  commentViewWrap.appendChild(commentViewContentWrap);

  // 최신 댓글 내용
  const commentViewContent = tagCreate("p", {})
  commentViewContentWrap.appendChild(commentViewContent);

  // 댓글 수정 / 삭제 버튼을 감싸는 div 영역
  const commentViewBtnWrap = tagCreate("div", {})
  commentViewWrap.appendChild(commentViewBtnWrap);

  // 댓글 수정 버튼
  const commentViewEdit = tagCreate("button", {})
  commentViewBtnWrap.appendChild(commentViewEdit);

  // 댓글 삭제 버튼
  const commentViewDelet = tagCreate("button", {})
  commentViewBtnWrap.appendChild(commentViewDelet);
}