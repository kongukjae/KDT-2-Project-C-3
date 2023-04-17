function marketPostPage() {
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

  styleCreate(rootChild[2], market.marketPostImgNameAdd);
  let imgNameAdd = [];
  let nameAdd = [];
  let dotdotdot = [];

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
  styleCreate(imgNameAdd[0], market.marketPostImgStyle);
  styleCreate(imgNameAdd[1], market.marketPostnameAddStyle);
  styleCreate(nameAdd[0], market.marketPostName);
  nameAdd[0].innerText = "뭉뭉";
  styleCreate(nameAdd[1], market.marketPostAdd);
  styleCreate(rootChild[3], market.marketPostDetail);

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
  const exitBtn = document.createElement('div');
  exitBtn.innerHTML = "&#x2716;";
  styleCreate(exitBtn, {
    display: 'flex',
    justifyContent: 'end'
  })

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
  styleCreate(modalContent, {gap: '10px'});

  nameAdd[1].addEventListener("click", function() {
    nameAdd[1].appendChild(modal);
  });
  exitBtn.addEventListener('mouseover', function() {
    exitBtn.style.cursor = 'pointer';
  })
  exitBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  })
}
marketPostPage();
