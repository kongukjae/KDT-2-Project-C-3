function marketPostPage(id ,postImg, img, dogName, title, detail, date) {
  let root = tagCreate("div", { id: "root" });
  document.body.appendChild(root);
  styleCreate(root, dangMarketStyle.marketPost);
  // styleCreate(root, targetStyle.mainRoot);

  let rootChild = [];
  for (let i = 0; i < 5; i++) {
    let child = tagCreate("div", { id: i });
    root.appendChild(child);
    rootChild.push(child);
  }
  topMenu(rootChild[0]);
  createHamburger(root);

  styleCreate(rootChild[1], dangMarketStyle.marketPostImageArea);
  if(postImg === 'null.png'){
    rootChild[1].innerHTML = `<img id = 'image' src="/image/image/default/null.png"/>`
  }else{
    rootChild[1].innerHTML = `<img id = 'image' src="/image/image/dangMarket/${postImg}"/>`
  }
  let imagetag = document.getElementById('image');
  styleCreate(imagetag,{
    width:'100%',
    height:'100%',
    borderRadius : '10px'
  })
  styleCreate(rootChild[2], dangMarketStyle.marketPostImgNameAdd);
  let imgNameAdd = [];
  let nameAdd = [];
  let dotdotdot = [];
  let detailComponent = [];
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  
  let mypageForm = document.createElement('form');
    
  mypageForm.method = "POST";
  mypageForm.action = "/mypage";
  let params = {jwt:token, targetId:id}
  for(let key in params){
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type","hidden");
    hiddenField.setAttribute("name",key);
    hiddenField.setAttribute("value",params[key]);
    mypageForm.appendChild(hiddenField);
  }

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
    styleCreate(dotdotdot[i], dangMarketStyle.marketPostAddDot);
  }
  //게시자 프로필이미지
  styleCreate(imgNameAdd[0], dangMarketStyle.marketPostImgStyle);
  const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://15.165.220.45:2080/sendImage`);
    xhr.responseType = "blob";
    xhr.send(`type=proFile&id=${id}`);
    xhr.addEventListener("load", function () {
      let imageFromServer = URL.createObjectURL(xhr.response);
      imgNameAdd[0].style.backgroundImage = `url(${imageFromServer})`;
      console.log("이미지 가져오기 완료");
    });
  styleCreate(imgNameAdd[1], dangMarketStyle.marketPostnameAddStyle);
  //게시자 강아지 이름
  styleCreate(nameAdd[0], dangMarketStyle.marketPostName);
  nameAdd[0].innerHTML = dogName;

  styleCreate(nameAdd[1], dangMarketStyle.marketPostAdd);
  styleCreate(rootChild[3], dangMarketStyle.marketPostComponent);
  for(let i = 0; i < 3; i++) {
    let deComponent = tagCreate('div', {});
    rootChild[3].appendChild(deComponent);
    detailComponent.push(deComponent);
  }
  //내용의 제목
  styleCreate(detailComponent[0], dangMarketStyle.marketPostTitle);
  detailComponent[0].innerHTML = title;
  //내용
  styleCreate(detailComponent[1], dangMarketStyle.marketPostDetail);
  detailComponent[1].innerHTML = detail;
  //날짜
  styleCreate(detailComponent[2], dangMarketStyle.marketPostDate);
  detailComponent[2].innerHTML = date;

  btmMeun(rootChild[4]);

  // 모달창 생성
  const modal = document.createElement("div");
  modal.classList.add("modal");
  styleCreate(modal, dangMarketStyle.marketPostAddModal);

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

  chatBtn.addEventListener('click',()=>{
    const jwt = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    
    fetch('http://15.165.220.45:2080/createChatRoomRequest', {
      method: 'POST',
      body: JSON.stringify({jwt:jwt,targetId:id})
    }).then((result)=>{
      console.log(result);
      let chatBoxForm = document.createElement('form');
      chatBoxForm.method = "POST"
      chatBoxForm.action = "/dangTalkChatRoom";
      let params = {jwt:jwt, targetId:id};
      for(let key in params){
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type","hidden");
        hiddenField.setAttribute("name",key);
        hiddenField.setAttribute("value",params[key]);
        chatBoxForm.appendChild(hiddenField);
      }
      document.body.appendChild(chatBoxForm);
      chatBoxForm.submit();
    })
  })


  // 버튼을 모달창에 추가
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.appendChild(exitBtn);
  modalContent.appendChild(profileBtn);
  modalContent.appendChild(chatBtn);
  modalContent.appendChild(reportBtn);
  modalContent.appendChild(mypageForm);

  styleCreate(profileBtn, dangMarketStyle.marketPostAddModalBtn);
  styleCreate(chatBtn, dangMarketStyle.marketPostAddModalBtn);
  styleCreate(reportBtn, dangMarketStyle.marketPostAddModalBtn);
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

  profileBtn.addEventListener("click",()=>{
    mypageForm.submit();
  })

}
// id ,postImg, img, dogName, title, detail, date
function secondHandPost(nth) {
  fetch(`http://15.165.220.45:2080/postSecondHand?nth=${nth}`)
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result)
    return marketPostPage(result[0].id,result[0].img, result[0].image, result[0].dogName, result[0].title, result[0].detail, changeDate(result[0].date));
  });
}

secondHandPost(nthfromserver);