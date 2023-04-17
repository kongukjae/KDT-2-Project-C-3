//  import 예정 함수들, 임시로 불러옴
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
document.body.appendChild(root);

const topMenuWrap = tagCreate("div",{});
topMenuWrap.innerText = "탑메뉴 영역";
root.appendChild(topMenuWrap);

// 탑 메뉴
// topMenu(topMenuWrap);

// 게시글 영역
postCreate(root, "../resource/MainDogImg.jpg");


// 바텀 메뉴
const btmMeunWrap = tagCreate("div", {});
btmMeunWrap.innerText = "바텀메뉴 영역";
root.appendChild(btmMeunWrap);
// btmMeun(rootChild[5], menuChild);

// 게시글 생성 함수
function postCreate(parent, src_link) {
  // 게시글 전체를 감싸는 div
  const postWrap = tagCreate("div", {});
  styleCreate(postWrap, {
    border: "1px solid black",
    width: "500px",
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

  // 이미지
  const postImg = tagCreate("img", {src:src_link});
  styleCreate(postImg, {
    height: "100%",
  })
  postImgWrap.appendChild(postImg);
  
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
    postBtnWrap.appendChild(postBtn)
  }
  
  const textWrap = tagCreate("div", {});
  styleCreate(textWrap, {
    border: "1px solid green",
    width: "500px",
    height: "150px",
  })
  postWrap.appendChild(textWrap);
}