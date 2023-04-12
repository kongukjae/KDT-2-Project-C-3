function myPage(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,mypageStyle.mypageRoot)

  let rootChild = [];
  for(let i = 0;i<7;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }

  styleCreate(rootChild[0],mypageStyle.mypageTopMenu)
  const logoLoginPage = tagCreate('img', '');
  logoLoginPage.style.width = '28%';
  logoLoginPage.src = './resource/MainLogo.png';
  rootChild[0].appendChild(logoLoginPage);


  styleCreate(rootChild[1],mypageStyle.mypageTitle)
  rootChild[1].innerText = `마이 페이지`;

  styleCreate(rootChild[2],mypageStyle.mypageImageStyle)
  const cookieId = document.cookie.split("=")[1]
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendUserImage`);
  xhr.send(`id=${cookieId}`); 
  xhr.addEventListener('load', function(){
      let imageFromServer = xhr.response;
      rootChild[2].style.backgroundImage = `url(${imageFromServer})`
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

      let img = new Image();
      img.src = reader.result;
      img.onload = function(){
        const MAX_WIDTH = 100;
        const MAX_HEIGHT = 100;
        let targetWidth = img.width;
        let targetHeight = img.height;
        if (targetWidth  > targetHeight) {
          if (targetWidth  > MAX_WIDTH) {
              targetHeight *= MAX_WIDTH / targetWidth ;
              targetWidth  = MAX_WIDTH;
          }
        } else {
          if (targetHeight > MAX_HEIGHT) {
              targetWidth  *= MAX_HEIGHT / targetHeight;
              targetHeight = MAX_HEIGHT;
          }
        }
        let imageCanvas = document.createElement("canvas");
        imageCanvas.setAttribute("width", `${targetWidth}px`);
        imageCanvas.setAttribute("height", `${targetHeight}px`);
        let context = imageCanvas.getContext("2d");
        context.drawImage(img,0,0,targetWidth,targetHeight);
        let dataURL = imageCanvas.toDataURL("image/png",0.5);
        console.log(dataURL);
        imageFormData.append("id", cookieId);
        imageFormData.append("attachedImage", dataURL);
        rootChild[2].style.backgroundImage = `url(${dataURL})`
        fetch('http://localhost:2080/uploadImage', {
          method: 'POST',
          body: imageFormData
        }).then(res => res)
        .then(result => console.log("done"))
      }
    })
    submitbutton.addEventListener("click",()=>{
      reader.readAsDataURL(myImage.files[0])
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
      transition : "scale ease 0.3s",
      display : "flex",
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

myPage()


