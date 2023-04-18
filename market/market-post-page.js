function marketPostPage(postImg, img, dogName, title, detail, date) {
  let root = tagCreate("div", { id: "root" });
  document.body.appendChild(root);
  styleCreate(root, market.marketPost);
  // styleCreate(root, targetStyle.mainRoot);

  let rootChild = [];
  for (let i = 0; i < 5; i++) {
    let child = tagCreate("div", { id: i });
    root.appendChild(child);
    rootChild.push(child);
  }

  // topMenu(rootChild);
  // styleCreate(rootChild[0], targetStyle.topMenu);

  styleCreate(rootChild[1], market.marketPostImageArea);
  rootChild[1].innerHTML = postImg
  styleCreate(rootChild[2], market.marketPostImgNameAdd);
  let imgNameAdd = [];
  let nameAdd = [];
  let dotdotdot = [];
  let detailComponent = [];

  for (let i = 0; i < 2; i++) {
    let imgNameAddChild = tagCreate("div", {});
    rootChild[2].appendChild(imgNameAddChild);
    imgNameAdd.push(imgNameAddChild);
  }

  for (let i = 0; i < 2; i++) {
    let nameAddChild = tagCreate("div", {});
    imgNameAdd[1].appendChild(nameAddChild);
    nameAdd.push(nameAddChild);
  }
  for (let i = 0; i < 3; i++) {
    let dot = tagCreate("div", {});
    nameAdd[1].appendChild(dot);
    dotdotdot.push(dot);
    styleCreate(dotdotdot[i], market.marketPostAddDot);
  }
  //게시자 프로필이미지
  styleCreate(imgNameAdd[0], market.marketPostImgStyle);
  imgNameAdd[0].innerHTML = img;
  styleCreate(imgNameAdd[1], market.marketPostnameAddStyle);
  //게시자 강아지 이름
  styleCreate(nameAdd[0], market.marketPostName);
  nameAdd[0].innerHTML = dogName;

  styleCreate(nameAdd[1], market.marketPostAdd);
  styleCreate(rootChild[3], market.marketPostComponent);
  for(let i = 0; i < 3; i++) {
    let deComponent = tagCreate('div', {});
    rootChild[3].appendChild(deComponent);
    detailComponent.push(deComponent);
  }
  //내용의 제목
  styleCreate(detailComponent[0], market.marketPostTitle);
  detailComponent[0].innerHTML = title;
  //내용
  styleCreate(detailComponent[1], market.marketPostDetail);
  detailComponent[1].innerHTML = detail;
  //날짜
  styleCreate(detailComponent[2], market.marketPostDate);
  detailComponent[2].innerHTML = date;


  // 모달창 생성
  const modal = document.createElement("div");
  modal.classList.add("modal");
  styleCreate(modal, market.marketPostAddModal);

  // 버튼 생성
  const profileBtn = document.createElement("div");
  profileBtn.textContent = "프로필 보기";
  const chatBtn = document.createElement("div");
  chatBtn.textContent = "채팅";
  const reportBtn = document.createElement("div");
  reportBtn.textContent = "신고";
  const exitBtn = document.createElement("div");
  exitBtn.innerHTML = "&#x2716;";
  styleCreate(exitBtn, {
    display: "flex",
    justifyContent: "end",
  });

  // 버튼을 모달창에 추가
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.appendChild(exitBtn);
  modalContent.appendChild(profileBtn);
  modalContent.appendChild(chatBtn);
  modalContent.appendChild(reportBtn);
  styleCreate(profileBtn, market.marketPostAddModalBtn);
  styleCreate(chatBtn, market.marketPostAddModalBtn);
  styleCreate(reportBtn, market.marketPostAddModalBtn);
  // 모달창에 모달컨텐츠 추가
  modal.appendChild(modalContent);

  exitBtn.addEventListener("mouseover", function () {
    exitBtn.style.cursor = "pointer";
  });

  nameAdd[1].addEventListener("click", function () {
    imgNameAdd[1].appendChild(modal);
  });
  exitBtn.addEventListener("click", function () {
    modal.remove();
  });

}

function secondHandPost(nth) {
  fetch(`http://localhost:2080/postSecondHand?nth=${nth}`)
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    return marketPostPage(result[0].image, result[0].img, result[0].dogName, result[0].title, result[0].detail, changeDate(result[0].date));
  });
}

secondHandPost(1);