function mywrite(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root. myWriteStyle.mywriteRoot)

  let rootChild = [];
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }

// 1. 최상위 상단에 해당하는 메뉴 공간이다.
  styleCreate(rootChild[0],myWriteStyle.WriteTopMenu)
  const logoLoginPage = tagCreate('img', '');
  logoLoginPage.style.width = '28%';
  logoLoginPage.src = './resource/MainLogo.png';
  rootChild[0].appendChild(logoLoginPage);




// // 2. 제목입력 칸
//   styleCreate(rootChild[1],myWriteStyle.WriteTitle)
//   rootChild[1].innerText = `글 작성 페이지`





//   // 3. 내용입력칸
// styleCreate(rootChild[2],myWriteStyle.Writemain)
// rootChild[2].innerText = `여기는 내용입력칸`





// // 4. 카테고리 창 및 사진 업로드 
// styleCreate(rootChild[3],myWriteStyle.WritepageButtonWrap)
// for(let i = 0; i < 2; i++){
//   let button = tagCreate("div");
//   styleCreate(button,myWriteStyle.WritepageButtonWrap)
//   rootChild[3].appendChild(button)
// }
// rootChild[3].children[0].innerText = "카테고리 선택창";
// rootChild[3].children[1].innerText = "사진 업로드 칸";

// // 카테고리 선택창 버튼 클릭 시 동작할 함수
// function openCategoryModal() {
//   let categoryModal = tagCreate("div", {});
//   styleCreate(categoryModal, myWriteStyle.WriteCategoryModal);

//   // 중고거래 버튼
//   let usedTradeButton = tagCreate("div", {});
//   styleCreate(usedTradeButton, myWriteStyle.WriteCategoryButton);
//   usedTradeButton.innerText = "중고거래";
//   usedTradeButton.addEventListener("click", () => {
//     selectedCategory = "중고거래";
//     categoryModal.remove();
//   });
//   categoryModal.appendChild(usedTradeButton);

//   // 자랑게시판 버튼
//   let bragBoardButton = tagCreate("div", {});
//   styleCreate(bragBoardButton, myWriteStyle.WriteCategoryButton);
//   bragBoardButton.innerText = "자랑게시판";
//   bragBoardButton.addEventListener("click", () => {
//     selectedCategory = "자랑사랑자랑";
//     categoryModal.remove();
//   });
//   categoryModal.appendChild(bragBoardButton);

//   root.appendChild(categoryModal);
// }

// // 카테고리 선택창 버튼 추가
// styleCreate(rootChild[3], myWriteStyle.WritepageButtonWrap);
// for (let i = 0; i < 2; i++) {
//   let button = tagCreate("div");
//   styleCreate(button, myWriteStyle.WritepageButtonWrap);
//   rootChild[3].appendChild(button);
// }

// rootChild[3].children[0].innerText = "카테고리 선택창";
// rootChild[3].children[0].addEventListener("click", () => {
//   openCategoryModal();
// });

// // 사진업로드 버튼 클릭시 ==>
// rootChild[3].children[1].addEventListener("click",()=>{
//   uploadImage()
// })

// // 업로드 이미지 구간
// function uploadImage(){
//   let uploadImageModal =  tagCreate("div",{});
//   styleCreate(uploadImageModal,myWriteStyle.myWriteUploadModal)
//   uploadImageModal.innerHTML = `<p1>이미지를 등록해주세요</p1>
//   <form id = "uploadImageForm" action="/uploadImage" method="post" enctype="multipart/form-data">
//     <input id ="myImage" type="file" name="myFile">
//   </form>
//   `;

//   root.appendChild(uploadImageModal);
//   let uploadImageForm = document.getElementById("uploadImageForm");
//   uploadImageForm.style.width = "200px"

//   let buttonWrap = tagCreate("div",{})
//   styleCreate(buttonWrap,mypageStyle.mypageUploadModalButtonWrap)

//   uploadImageModal.appendChild(buttonWrap);
//   let submitbutton = tagCreate("div")
//   submitbutton.form = uploadImageForm
//   styleCreate(submitbutton,myWriteStyle.mywriteloadModalButtonStyle)

//   buttonWrap.appendChild(submitbutton);
//   submitbutton.innerText = "업로드";
//   let myImage = document.getElementById("myImage");
//   let imageFormData = new FormData();
//   let reader = new FileReader();
//   reader.addEventListener("load",()=>{

//     let img = new Image();
//     img.src = reader.result;
//     img.onload = function(){
//       const MAX_WIDTH = 100;
//       const MAX_HEIGHT = 100;
//       let targetWidth = img.width;
//       let targetHeight = img.height;
//       if (targetWidth  > targetHeight) {
//         if (targetWidth  > MAX_WIDTH) {
//             targetHeight *= MAX_WIDTH / targetWidth ;
//             targetWidth  = MAX_WIDTH;
//         }
//       } else {
//         if (targetHeight > MAX_HEIGHT) {
//             targetWidth  *= MAX_HEIGHT / targetHeight;
//             targetHeight = MAX_HEIGHT;
//         }
//       }
//       let imageCanvas = document.createElement("canvas");
//       imageCanvas.setAttribute("width", `${targetWidth}px`);
//       imageCanvas.setAttribute("height", `${targetHeight}px`);
//       let context = imageCanvas.getContext("2d");
//       context.drawImage(img,0,0,targetWidth,targetHeight);
//       let dataURL = imageCanvas.toDataURL("image/png",0.5);
//       console.log(dataURL);
//       imageFormData.append("id", cookieId);
//       imageFormData.append("attachedImage", dataURL);
//       rootChild[2].style.backgroundImage = `url(${dataURL})`
//       fetch('http://localhost:2080/uploadImage', {
//         method: 'POST',
//         body: imageFormData
//       }).then(res => res)
//       .then(result => console.log("done"))
//     }
//   })
//   submitbutton.addEventListener("click",()=>{
//     reader.readAsDataURL(myImage.files[0])
//   });

//   let okaybutton = tagCreate("div",{})
//   styleCreate(okaybutton,myWriteStyle.myWriteUploadModalButtonStyle)
//   buttonWrap.appendChild(okaybutton);
//   okaybutton.innerText = "닫기";
//   okaybutton.addEventListener("click",()=>{
//     uploadImageModal.remove();
//   })
// }
}

mywrite()





















































// // 5. 제출기능 버튼
// styleCreate(rootChild[4], myWriteStyle.WriteSubmit);
// let submitButton = tagCreate("div");
// styleCreate(submitButton, myWriteStyle.WriteSubmit);
// rootChild[4].appendChild(submitButton);



// //6. 하단 댕맵 버튼들
// styleCreate(rootChild[5],targetStyle.bottomMenu)

// let menuChild = [];
// for(let i = 0;i<5;i++){
//   let child = tagCreate("div",{});
//   rootChild[5].appendChild(child);
//   styleCreate(child,{
//     width : "59px",
//     height : "59px",
//     backgroundColor : "#FDFDFD",
//     borderRadius : "5px",
//     cursor : "pointer",
//     boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
//     transition : "scale ease 0.3s",
//     display : "flex",
//     justifyContent: "center",
//     alignItems : "center",
//     fontSize : "13px",
//     fontWeight : "500"
//   })
//   child.onmouseover = ()=>{
//     child.style.scale = "1.1"
//   }
//   child.onmouseout = ()=>{
//     child.style.scale = "1"

//   }
//   menuChild.push(child);
// }
// menuChild[0].innerText = "댕댕마켓";
// menuChild[1].innerText = "댕자랑";
// menuChild[2].innerText = "댕맵";

// menuChild[3].innerText = "댕톡";
// menuChild[4].innerText = "댕프랜드";
// menuChild[2].addEventListener("click",()=>{
//   window.location = "http://localhost:2080/map"
// })
// }










