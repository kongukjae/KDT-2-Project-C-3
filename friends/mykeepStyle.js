function keepDiary(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,keepStyle.pageRoot)

  let rootChild = [];
  for(let i = 0; i < 7; i++){
    let child = tagCreate("div",{id: i});
    root.appendChild(child);
    rootChild.push(child);
  }
  // 1.메뉴상단 부분 root 0  ==> 메뉴 최상단
  styleCreate(rootChild[0],keepStyle.pageTopMenu)
  const logoLoginPage = tagCreate('img', '');
  logoLoginPage.style.width = '28%';
  logoLoginPage.src = './resource/MainLogo.png';
  rootChild[0].appendChild(logoLoginPage); 

  
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


  // 5. root4 카테고리, 사진업로드 버튼 
  styleCreate(rootChild[4],keepStyle.pageButtonWrap)

  for(let i = 0; i < 2; i++){
    let button = tagCreate("div");
    styleCreate(button,keepStyle.pageButton)
    rootChild[4].appendChild(button)
  }
  
  rootChild[4].children[0].innerText=`사진업로드`;
  rootChild[4].children[1].innerText=`카테고리`;

rootChild[4].children[0].addEventListener("click",()=>{
  uploadImage()
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
  let myImage = document.getElementById("myImage");
  let imageFormData = new FormData();
  let reader = new FileReader();
  reader.addEventListener("load",()=>{
    
  })
  submitbutton.addEventListener("click",()=>{
    reader.readAsDataURL(myImage.files[0])
  });

  let okaybutton = tagCreate("div",{})
  styleCreate(okaybutton,keepStyle.pageUploadModalButtonStyle)
  buttonWrap.appendChild(okaybutton);
  okaybutton.innerText = "닫기";
  okaybutton.addEventListener("click",()=>{
    uploadImageModal.remove();
  })
}

// 게시판 선택 페이지 => '카테고리'
rootChild[4].children[1].addEventListener("click",()=>{
showcategory()
})
function showcategory(){
  let showCategoryModal = tagCreate("div", {});
  styleCreate(showCategoryModal, keepStyle.showCategoryModalbt);
  showCategoryModal.innerHTML = `<p1>어디에 쓰실건가요?</p1>`;

  // 버튼모둠 
  let buttonWrap = tagCreate("div", {});
  styleCreate(buttonWrap, keepStyle.showcategoryModalButtonWrap);

  // 카테고리 버튼 <중고게시판>
  const usedBtn = tagCreate("div", {
    textContent: "중고게시판"
  });  
  styleCreate(usedBtn, keepStyle.showcategoryModalButton);
// 카테고리 버튼<자랑게시판>
  const bragBtn = tagCreate("div", {
    textContent: "자랑게시판"
  });
  styleCreate(bragBtn, keepStyle.showcategoryModalButton);

  const closeButton = tagCreate("button", {
    textContent: "닫기"
  });
  styleCreate(closeButton,keepStyle.showcategoryclosebutton);

  
  showCategoryModal.appendChild(buttonWrap);
   root.appendChild(showCategoryModal);
buttonWrap.appendChild(usedBtn);
 buttonWrap.appendChild(bragBtn);
 buttonWrap.appendChild(closeButton);

 //중고게시판 "클릭시"
  usedBtn.addEventListener("click", () => {
 

  });
// "자랑게시판" 클릭시
  bragBtn.addEventListener("click", () => {
    
  });
// 닫기버튼
  closeButton.addEventListener("click", () => {
    showCategoryModal.remove();
  });
  
  let showcategorymodalBT = document.getElementById("showcategorymodalBT");
  showcategorymodalBT.style.width = "200px";
}

const cookieId = document.cookie.split("=")[1].split(';')[0];
const jwt = document.cookie.split("=")[2];
// 6.  root5, 제출버튼
  styleCreate(rootChild[5],keepStyle.pageSubmit)
  rootChild[5].innerText="제출하기";
  rootChild[5].addEventListener("click",()=>{
    console.log(yastContentInput.value)
    let titleText=yastContentInput.value;
    let mainText=postContentInput.value;
  
    let xhr = new XMLHttpRequest();
    if (window.location.href.includes("/mykeep")) {
     xhr.open("POST", "http://localhost:2080/postBoard", true);
     xhr.send(`id=${cookieId}&jwt=${jwt}&titleText=${titleText}&mainText=${mainText}`);
     window.location.href = "http://localhost:2080/postBoard";
   } else {
     xhr.open("POST", "http://localhost:2080/secondHand", true);
     xhr.send(`id=${cookieId}&jwt=${jwt}&titleText=${titleText}&mainText=${mainText}`);
     window.location.href = "http://localhost:2080/secondHand";
   }

    
    // xhr.addEventListener("load", () => {
    //   console.log(xhr.responseText); // 서버 응답을 콘솔에 출력합니다.
    // });
    window.location = "http://localhost:2080/secondHand"
    });

 // 7. root6 바텀메뉴, 맨 밑에 페이지 구간
  styleCreate(rootChild[6],targetStyle.bottomMenu)
  let menuChild = [];
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    rootChild[6].appendChild(child);
    styleCreate(child,{
      width : "59px",
      height : "59px",
      backgroundColor : "#FDFDFD",
      borderRadius : "5px",
      cursor : "pointer",
      boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      display:"flex",
      transition : "scale ease 0.3s",
      flexDirection: "row",
      justifyContent: "center",
      alignItems : "center",
      fontSize : "13px",
      fontWeight : "500"
    })
    child.onmouseover = ()=>{
      child.style.scale = "1.1"
    }
    child.onmouseout = ()=>{
      child.style.scale = "1"
    }
    menuChild.push(child);
  }
  menuChild[0].innerText = "댕댕마켓";
  menuChild[1].innerText = "댕자랑";
  menuChild[2].innerText = "댕맵";

  menuChild[3].innerText = "댕톡";
  menuChild[4].innerText = "댕프랜드";
  menuChild[2].addEventListener("click",()=>{
    window.location = "http://localhost:2080/map"
  })
}
keepDiary()


