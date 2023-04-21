function myPage(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,mypageStyle.mypageRoot)

  let rootChild = [];
  for(let i = 0;i<8;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }
  topMenu(rootChild[0]);
  createHamburger(root);


  styleCreate(rootChild[1],mypageStyle.mypageTitle)
  rootChild[1].innerText = `마이 페이지`;

  styleCreate(rootChild[2],mypageStyle.mypageImageStyle)
  const cookieId = document.cookie.split("=")[1].split(";")[0]
  
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${cookieId}`); 
  xhr.addEventListener('load', function(){
      let imageFromServer = xhr.response;
      const resultURL = URL.createObjectURL(xhr.response);
      rootChild[2].style.backgroundImage = `url(${resultURL})`
      console.log(imageFromServer);
      console.log("이미지 가져오기 완료");
  });
  styleCreate(rootChild[3],mypageStyle.mypageButtonWrap)
  for(let i = 0; i < 2; i++){
    let button = tagCreate("div");
    styleCreate(button,mypageStyle.mypageButton)
    rootChild[3].appendChild(button)
  }
  rootChild[3].children[0].innerText = "사진 업로드";
  rootChild[3].children[1].innerText = "개인정보 수정";



  styleCreate(rootChild[4],mypageStyle.mypageUserinfoBox)
  for(let i = 0; i < 5;i++){
    let infoTag = tagCreate("div");
    styleCreate(infoTag,mypageStyle.mypageUserinfoBoxInnerStyle)
    rootChild[4].appendChild(infoTag)
  }
  rootChild[4].children[0].innerText = `강아지 이름 : ${dogNameFromServer}`
  rootChild[4].children[1].innerText = "나이"
  if(dogGenderFromServer === '1'){
    rootChild[4].children[2].innerText = "성별 : 남자"
  }else{
    rootChild[4].children[2].innerText = "성별 : 여자"
  }
  rootChild[4].children[3].innerText = "소개글"


  styleCreate(rootChild[4].lastChild,mypageStyle.mypageUserinfoBoxSelfIntroduce)

  styleCreate(rootChild[5],mypageStyle.mypageCalender)
  rootChild[3].children[0].addEventListener("click",()=>{
    uploadImage()
  })
  function uploadImage(){
    let uploadImageModal =  tagCreate("div",{});
    styleCreate(uploadImageModal,mypageStyle.mypageUploadModal)
    uploadImageModal.innerHTML = `<p1>이미지를 등록해주세요</p1>
    <form id = "uploadImageForm" action="/uploadImage" method="post" enctype="multipart/form-data">
      <input id ="myImage" type="file" name="myFile">
    </form>
    `;

    root.appendChild(uploadImageModal);
    let uploadImageForm = document.getElementById("uploadImageForm");
    uploadImageForm.style.width = "200px"

    let buttonWrap = tagCreate("div",{})
    styleCreate(buttonWrap,mypageStyle.mypageUploadModalButtonWrap)

    uploadImageModal.appendChild(buttonWrap);
    let submitbutton = tagCreate("div")
    submitbutton.form = uploadImageForm
    styleCreate(submitbutton,mypageStyle.mypageUploadModalButtonStyle)
 
    buttonWrap.appendChild(submitbutton);
    submitbutton.innerText = "업로드";
    let myImage = document.getElementById("myImage");
    let imageFormData = new FormData();
    let reader = new FileReader();
    reader.addEventListener("load",()=>{
      rootChild[2].style.backgroundImage = `url(${reader.result})`
    })

    
    
    submitbutton.addEventListener("click",()=>{
      reader.readAsDataURL(myImage.files[0])
      imageFormData.append("id", cookieId);
      imageFormData.append("attachedImage", myImage.files[0]);
      fetch('http://localhost:2080/uploadImage', {
          method: 'POST',
          body: imageFormData
        }).then(res => res)
        .then(result => console.log("done"))
    });

    let okaybutton = tagCreate("div",{})
    styleCreate(okaybutton,mypageStyle.mypageUploadModalButtonStyle)
    buttonWrap.appendChild(okaybutton);
    okaybutton.innerText = "닫기";
    okaybutton.addEventListener("click",()=>{
      uploadImageModal.remove();
    })
  }

  rootChild[5].innerText = "종윤씨가 좌표에 날짜 새기는 거 완료하면 만들어질 캘린더 자리"


  
  


// 6.  root5, 제출버튼
// styleCreate(rootChild[5],keepStyle.pageSubmit)
// rootChild[5].innerText="제출하기";
// rootChild[5].addEventListener("click",()=>{
//   console.log(yastContentInput.value)
//   let titleText=yastContentInput.value;
//   let mainText=postContentInput.value;

//   let xhr = new XMLHttpRequest();
//   if (window.location.href.includes("/mykeep")) {
//    xhr.open("POST", "http://localhost:2080/postBoard", true);
//    xhr.send(`id=${cookieId}&jwt=${jwt}&titleText=${titleText}&mainText=${mainText}`);
//    window.location.href = "http://localhost:2080/postBoard";
//  } else {
//    xhr.open("POST", "http://localhost:2080/secondHand", true);
//    xhr.send(`id=${cookieId}&jwt=${jwt}&titleText=${titleText}&mainText=${mainText}`);
//    window.location.href = "http://localhost:2080/secondHand";
//  }

  
  // xhr.addEventListener("load", () => {
  //   console.log(xhr.responseText); // 서버 응답을 콘솔에 출력합니다.
  // });
  // window.location = "http://localhost:2080/secondHand"
  // });





  const jwt = document.cookie.split("=")[2];

  styleCreate(rootChild[6],mypageStyle.mypageMywriteWrap)
  // let mainBox=tagCreate("div");
  rootChild[6].addEventListener("click",()=>{
    const xhrr = new XMLHttpRequest();
    xhrr.open('POST', `http://localhost:2080/second`);
    xhrr.send(`id=${cookieId}&jwt=${jwt}`);

    xhrr.onreadystatechange = () => {
      if (xhrr.readyState === 4 && xhrr.status === 200) {
        const responseData = JSON.parse(xhrr.responseText);
        displayResults(responseData);
      }
    };

    
    // 요청을 할때의 URL 주소는 내가 임의대로 지을수있다.
    //  즉, form tag로 작성했을때 action 부분과 동일하다.
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', `http://localhost:2080/second`);
    // xhr.send(`id=${cookieId}&jwt=${jwt}`);
  })

  function displayResults(data) {
    data.forEach(item => {
      // HTML 요소를 생성합니다 (예: div, p, span 등)
      const resultElement = document.createElement("div");
      resultElement.textContent = `id:${item.id}, detail: ${item.detail}`;
      styleCreate(clickButton, mypageStyle.mypageWriteButton, resultElement);
      // 생성한 요소를 페이지에 추가합니다.
    });
  }
  

  // for(let i = 0; i < 2; i++){
  //   let clickButton = tagCreate("div");
  //  styleCreate(clickButton,mypageStyle.mypageWriteButton)
  //   rootChild[6].appendChild(clickButton)
  //  }
  // styleCreate(mainBox,mypageStyle.mypageWriteBox)
  // rootChild[6].appendChild(mainBox)
  // for(let i = 0; i < 2; i++){
  //   let clickButton = tagCreate("div");
  //   styleCreate(clickButton,mypageStyle.mypageWriteButton)
  //   rootChild[6].appendChild(clickButton)
  // }
  // rootChild[6].children[2].innerText = "내가쓴댓글";
  // rootChild[6].children[1].innerText = "내가쓴 글";

  











  
  // styleCreate(rootChild[2],mypageStyle.mypageImageStyle)
  // const cookieId = document.cookie.split("=")[1].split(";")[0]
  
  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', `http://localhost:2080/sendImage`);
  // xhr.responseType = 'blob';
  // xhr.send(`type=proFile&id=${cookieId}`); 
  // xhr.addEventListener('load', function(){
  //     let imageFromServer = xhr.response;
  //     const resultURL = URL.createObjectURL(xhr.response);
  //     rootChild[2].style.backgroundImage = `url(${resultURL})`
  //     console.log(imageFromServer);
  //     console.log("이미지 가져오기 완료");
  // });





  



  btmMeun(rootChild[7]);


}

myPage()


