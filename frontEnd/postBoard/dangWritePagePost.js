function keepDiary(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,keepStyle.pageRoot)
  let imageButtonFlag = false;

  let rootChild = [];
  for(let i = 0; i < 7; i++){
    let child = tagCreate("div",{id: i});
    root.appendChild(child);
    rootChild.push(child);
  }
  // 1.메뉴상단 부분 root 0  ==> 메뉴 최상단
  topMenu(rootChild[0]);
  createHamburger(root);
  // styleCreate(rootChild[0],keepStyle.pageTopMenu)
  // const logoLoginPage = tagCreate('img', '');
  // logoLoginPage.style.width = '28%';
  // logoLoginPage.src = './resource/MainLogo.png';
  // rootChild[0].appendChild(logoLoginPage); 

  
  rootChild[1].id = 'titleTextboxWrap'
//  2.  제목부분 root1 제목작성칸
  styleCreate(rootChild[1],keepStyle.pageTitleBox)
  const yastContentInput = document.createElement("textarea");
  yastContentInput.setAttribute("placeholder", "제목을 입력하세요");
  yastContentInput.setAttribute("focus", "none");
  yastContentInput.setAttribute("style", "width: 500px; height: 40px; resize: none; border: 3px solid #F7786B; border-radius: 9px; font-size: 20px");
  rootChild[1].appendChild(yastContentInput);

// 3. root2 업로드된 이미지 나오는 칸
  let postUploadImg = document.createElement("div");
  styleCreate(rootChild[2], keepStyle.pageuploadImg);
  rootChild[2].innerHTML = "업로드 된 이미지";
//  4.  root3 본문부분이다. 본문에 작성할 함수
  styleCreate(rootChild[3],keepStyle.pagemainTextBox)
  const postContentInput = document.createElement("textarea");
  postContentInput.setAttribute("placeholder", "글 작성 내용을 입력하세요");
  postContentInput.setAttribute("style", "width: 500px; height: 400px;resize: none; border: 3px solid #F7786B; border-radius: 9px; font-size: 20px");
  rootChild[3].appendChild(postContentInput);
  rootChild[2].style.position = 'relative'
  let uploadButton = tagCreate('div');
  rootChild[2].appendChild(uploadButton);
  styleCreate(uploadButton,keepStyle.addImageButton)
  uploadButton.innerText = '+'
  // 5. root4 카테고리, 사진업로드 버튼 
 


  uploadButton.addEventListener("click",()=>{
    uploadImage();
    imageButtonFlag = true;
  })
function uploadImage(){
  let uploadImageModal =  tagCreate("div",{});
  styleCreate(uploadImageModal,keepStyle.pageUploadModal)
  uploadImageModal.innerHTML = `<p1>이미지를 등록해주세요</p1>
  <form id = "uploadImageForm" action="/uploadImage" method="post" enctype="multipart/form-data">
    <input id ="myImage" type="file" name="myFile">
  </form>
  `;

  root.appendChild(uploadImageModal);
  let uploadImageForm = document.getElementById("uploadImageForm");
  uploadImageForm.style.width = "200px"


  let buttonWrap = tagCreate("div",{})
  styleCreate(buttonWrap,keepStyle.pageUploadModalButtonWrap)

  uploadImageModal.appendChild(buttonWrap);
  let submitbutton = tagCreate("div")
  submitbutton.form = uploadImageForm
  styleCreate(submitbutton,keepStyle.pageUploadModalButtonStyle)

  buttonWrap.appendChild(submitbutton);
  submitbutton.innerText = "업로드";
  let imageFormData = new FormData();
  let reader = new FileReader();
  let myImage = document.getElementById("myImage");
  reader.addEventListener("load",()=>{
    rootChild[2].innerHTML = '';
    rootChild[2].style.backgroundImage = `url(${reader.result})`
    uploadImageModal.style.display = 'none';
    
  })
  submitbutton.addEventListener("click",()=>{
    reader.readAsDataURL(myImage.files[0])
  });

  let okaybutton = tagCreate("div",{})
  styleCreate(okaybutton,keepStyle.pageUploadModalButtonStyle)
  buttonWrap.appendChild(okaybutton);
  okaybutton.innerText = "닫기";
  okaybutton.addEventListener("click",()=>{
    uploadImageModal.style.display = 'none';
  })
}

// 게시판 선택 페이지 => '카테고리'
// rootChild[4].children[1].addEventListener("click",()=>{
// showcategory()
// })
// function showcategory(){
//   let showCategoryModal = tagCreate("div", {});
//   styleCreate(showCategoryModal, keepStyle.showCategoryModalbt);
//   showCategoryModal.innerHTML = `<p1>어디에 쓰실건가요?</p1>`;

//   // 버튼모둠 
//   let buttonWrap = tagCreate("div", {});
//   styleCreate(buttonWrap, keepStyle.showcategoryModalButtonWrap);

//   // 카테고리 버튼 <중고게시판>
//   const usedBtn = tagCreate("div", {
//     textContent: "중고게시판"
//   });  
//   styleCreate(usedBtn, keepStyle.showcategoryModalButton);
// // 카테고리 버튼<자랑게시판>
//   const bragBtn = tagCreate("div", {
//     textContent: "자랑게시판"
//   });
//   styleCreate(bragBtn, keepStyle.showcategoryModalButton);

//   const closeButton = tagCreate("button", {
//     textContent: "닫기"
//   });
//   styleCreate(closeButton,keepStyle.showcategoryclosebutton);

  
//   showCategoryModal.appendChild(buttonWrap);
//    root.appendChild(showCategoryModal);
// buttonWrap.appendChild(usedBtn);
//  buttonWrap.appendChild(bragBtn);
//  buttonWrap.appendChild(closeButton);

//  //중고게시판 "클릭시"
//   usedBtn.addEventListener("click", () => {
 

//   });
// // "자랑게시판" 클릭시
//   bragBtn.addEventListener("click", () => {
    
//   });
// // 닫기버튼
//   closeButton.addEventListener("click", () => {
//     showCategoryModal.remove();
//   });
  
//   let showcategorymodalBT = document.getElementById("showcategorymodalBT");
//   showcategorymodalBT.style.width = "200px";
// }

const cookieId = document.cookie.split("=")[1].split(';')[0];
const jwt = document.cookie.split("=")[2];
// 6.  root5, 제출버튼
  styleCreate(rootChild[5],keepStyle.pageSubmit)
  rootChild[5].innerText="제출하기";
  rootChild[5].addEventListener("click",()=>{
    let targetImage = document.getElementById('myImage')
    // console.log(targetImage);
    uploadPost(postBoardType);
    
    
  });

  async function uploadPost(type){
    let moveToURL = '';
    let body = {}
    let imageType = null
    let imageNameFromServer = '';
    let targetImage = document.getElementById('myImage')
    if(!imageButtonFlag){
      console.log('이미지 없음')
    }else if(imageButtonFlag&&targetImage.files.length>0){
      imageType = targetImage.files[0].name.split('.').slice(-1)[0];
      console.log('이미지 있음')
    }else{
      console.log('이미지 없음')
    }
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let imageFormData = new FormData();
    
    
    if(type === 'dangStar'){
      moveToURL = '/dangstar';
      body = {jwt:token,mainText:postContentInput.value,imageType:imageType};
    }else{
      moveToURL = '/secondHand'
      body = {jwt:token,titleText:yastContentInput.value,mainText:postContentInput.value,imageType:imageType};
    }
    await fetch(`http://15.164.63.222:2080/${type}WriteSubmit`, {
      method: 'POST',
      body: JSON.stringify(body)
    }).then(res => res.text())
    .then((result) => {
      imageNameFromServer = result;
      imageFormData.append("name", imageNameFromServer);
      if(imageButtonFlag){
        imageFormData.append("attachedImage", myImage.files[0]);
      }else{
        imageFormData.append("attachedImage", 'null')
      }
      })
    await fetch(`http://15.164.63.222:2080/${type}ImageSubmit`, {
      method: 'POST',
      body: imageFormData
    }).then(res => res)
    .then((result) => {
      console.log('게시글 업로드 완료')
      window.location = moveToURL;
    })
  }
 // 7. root6 바텀메뉴, 맨 밑에 페이지 구간
  btmMeun(rootChild[6]);
  
}
keepDiary()


