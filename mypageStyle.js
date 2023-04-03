function tagCreate(tType,props){
  let element = document.createElement(tType);
  for(let i in props){
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj,styleOb){
  for(i in styleOb){
    obj.style[i] = styleOb[i];
  }
}

function yourPage(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,{
    width : "500px",
    height : "1700px",
    margin : "auto",
    display : "flex",
    flexDirection : "column",
    position : "relative",
    backgroundColor : "#F3EDE8",
    display : "flex",
    flexDirection : "column",
    alignItems : "center"

  })

  let rootChild = [];
  for(let i = 0;i<7;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }

  styleCreate(rootChild[0],{
    width : "100%",
    height : "126px",
    position : "relative",
    backgroundColor : "#F7786B",
    display : "flex",
    justifyContent: "center",
    alignItems : "center"

  })
  const logoLoginPage = tagCreate('img', '');
  logoLoginPage.style.width = '28%';
  logoLoginPage.src = './resource/MainLogo.png';
  rootChild[0].appendChild(logoLoginPage);


  styleCreate(rootChild[1],{
    width : "100%",
    height : "80px",
    position : "relative",
    marginTop : "30px",
    display : "flex",
    justifyContent: "center",
    alignItems : "center",
    fontSize : "30px",
    fontWeight : "700"
  })
  rootChild[1].innerText = `${targetIdFromServer}님의 페이지`;
  styleCreate(rootChild[2],{
    width : "300px",
    height : "300px",
    backgroundColor : "#E6E6E6",
    borderRadius : "50%",
    position : "relative",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    marginTop : "20px",
    fontSize : "20px",
    fontWeight : "700"
  })
  styleCreate(rootChild[3],{
    width : "60%",
    height : "30px",
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-around",
    alignItems : "center",
    backgroundColor : "#E6E6E6"
  })
  for(let i = 0; i < 2; i++){
    let button = tagCreate("div");
    styleCreate(button,{
      width : "40%",
      height : "70%",
      backgroundColor : "#F8F8F8",
      cursor : "pointer",
      borderRadius : "5px",
      display : "flex",
      justifyContent : "center",
      alignItems : "center",
    })
    rootChild[3].appendChild(button)
  }
  rootChild[3].children[0].innerText = "팔로우";
  rootChild[3].children[1].innerText = "쪽지";
  const cookieId = document.cookie.split("=")[1]
  rootChild[3].children[0].addEventListener("click",()=>{
    let xhr = new XMLHttpRequest();
      let _URL = `http://localhost:2080/followRequest?i=${cookieId}&you=${targetIdFromServer}`;
      xhr.open("GET",_URL);
      xhr.send();
      xhr.addEventListener("load",()=>{
        alert(`${targetIdFromServer}님을 팔로우 했습니다`)
      })
  })

  styleCreate(rootChild[4],{
    width : "90%",
    height : "300px",
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    display : "flex",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",
    gap : "10px",
    backgroundColor : "#E6E6E6"
  })
  for(let i = 0; i < 5;i++){
    let infoTag = tagCreate("div");
    styleCreate(infoTag,{
      width : "90%",
      height : "24px",
      borderRadius : "5px",
      paddingLeft : "10px",
      paddingRight : "10px",
    })
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


  styleCreate(rootChild[4].lastChild,{
    height : "130px",
    backgroundColor : "#F9F9F9"
  })

  styleCreate(rootChild[5],{
    width : "90%",
    height : "450px",
    backgroundColor : "#E6E6E6",
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    display : "flex",
    justifyContent : "center",
    alignItems : "center"
  })
  rootChild[5].innerText = "종윤씨가 좌표에 날짜 새기는 거 완료하면 만들어질 캘린더 자리"



  styleCreate(rootChild[6],{
    width : "500px",
    height : "90px",
    position : "fixed",

    bottom : "0px",
    backgroundColor : "#F7786B",
    display : "flex",
    justifyContent: "space-around",
    alignItems : "center",
    zIndex : "2"
  })

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
function myPage(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,{
    width : "500px",
    height : "1700px",
    margin : "auto",
    display : "flex",
    flexDirection : "column",
    position : "relative",
    backgroundColor : "#F3EDE8",
    display : "flex",
    flexDirection : "column",
    alignItems : "center"

  })

  let rootChild = [];
  for(let i = 0;i<7;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }

  styleCreate(rootChild[0],{
    width : "100%",
    height : "126px",
    position : "relative",
    backgroundColor : "#F7786B",
    display : "flex",
    justifyContent: "center",
    alignItems : "center"

  })
  const logoLoginPage = tagCreate('img', '');
  logoLoginPage.style.width = '28%';
  logoLoginPage.src = './resource/MainLogo.png';
  rootChild[0].appendChild(logoLoginPage);


  styleCreate(rootChild[1],{
    width : "100%",
    height : "80px",
    position : "relative",
    marginTop : "30px",
    display : "flex",
    justifyContent: "center",
    alignItems : "center",
    fontSize : "30px",
    fontWeight : "700"
  })
  rootChild[1].innerText = `마이 페이지`;
  styleCreate(rootChild[2],{
    width : "300px",
    height : "300px",
    backgroundColor : "#E6E6E6",
    borderRadius : "50%",
    position : "relative",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    marginTop : "20px",
    fontSize : "20px",
    fontWeight : "700"
  })
  styleCreate(rootChild[3],{
    width : "60%",
    height : "30px",
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-around",
    alignItems : "center",
    backgroundColor : "#E6E6E6"
  })
  for(let i = 0; i < 2; i++){
    let button = tagCreate("div");
    styleCreate(button,{
      width : "40%",
      height : "70%",
      backgroundColor : "#F8F8F8",
      cursor : "pointer",
      borderRadius : "5px",
      display : "flex",
      justifyContent : "center",
      alignItems : "center",
    })
    rootChild[3].appendChild(button)
  }
  rootChild[3].children[0].innerText = "사진 업로드";
  rootChild[3].children[1].innerText = "개인정보 수정";
  
  styleCreate(rootChild[4],{
    width : "90%",
    height : "300px",
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    display : "flex",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",
    gap : "10px",
    backgroundColor : "#E6E6E6"
  })
  for(let i = 0; i < 5;i++){
    let infoTag = tagCreate("div");
    styleCreate(infoTag,{
      width : "90%",
      height : "24px",
      borderRadius : "5px",
      paddingLeft : "10px",
      paddingRight : "10px",
    })
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


  styleCreate(rootChild[4].lastChild,{
    height : "130px",
    backgroundColor : "#F9F9F9"
  })

  styleCreate(rootChild[5],{
    width : "90%",
    height : "450px",
    backgroundColor : "#E6E6E6",
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    display : "flex",
    justifyContent : "center",
    alignItems : "center"
  })
  rootChild[3].children[0].addEventListener("click",()=>{
    uploadImage()
  })
  function uploadImage(){
    let uploadImageModal =  tagCreate("div",{});
    styleCreate(uploadImageModal,{
      width : "300px",
      height : "140px",
      padding : "10px",
      borderRadius : "10px",
      display : "flex",
      flexDirection : "column",
      justifyContent : "center",
      alignItems : "center",
      backgroundColor : "#F3EDE8",
      boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
      position : "absolute",
      top : "550px",
      left: "50%",
      gap : "10px",
      marginLeft: "-150px",
    })
    uploadImageModal.innerHTML = `<p1>이미지를 등록해주세요</p1>
    <form id = "uploadImageForm" action="/uploadImage" method="post" enctype="multipart/form-data">
      <input id ="myImage" type="file" name="myFile">
    </form>
    `;

    root.appendChild(uploadImageModal);
    let uploadImageForm = document.getElementById("uploadImageForm");
    uploadImageForm.style.width = "200px"

    let buttonWrap = tagCreate("div",{})
    styleCreate(buttonWrap,{
      display : "flex",
      gap : "10px"
    })

    uploadImageModal.appendChild(buttonWrap);
    let submitbutton = tagCreate("div")
    submitbutton.form = uploadImageForm
    styleCreate(submitbutton,{
      border : "0px",
      width : "90px",
      height : "30px",
      padding : "10px",
      fontSize : "12px",
      color : "white",
      borderRadius : "10px",
      cursor : "pointer",
      display : "flex",
      flexDirection : "column",
      justifyContent : "center",
      alignItems : "center",
      backgroundColor : "#F7786B",
      boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
    })
    const cookieId = document.cookie.split("=")[1]
    buttonWrap.appendChild(submitbutton);
    submitbutton.innerText = "업로드";
    let myImage = document.getElementById("myImage");
    let imageFormData = new FormData();
    submitbutton.addEventListener("click",()=>{
      imageFormData.append("attachedImage", myImage.files[0]);
      console.log(imageFormData.get("attachedImage"))
      fetch('http://localhost:2080/uploadImage', {
        method: 'POST',
        body: JSON.stringify({
          id : cookieId,
          image : imageFormData})
      }).then(res => res)
      .then(result => console.log("done"))

    });

    let okaybutton = tagCreate("div",{})
    styleCreate(okaybutton,{
      width : "90px",
      height : "30px",
      padding : "10px",
      fontSize : "12px",
      color : "white",
      borderRadius : "10px",
      cursor : "pointer",
      display : "flex",
      flexDirection : "column",
      justifyContent : "center",
      alignItems : "center",
      backgroundColor : "#F7786B",
      boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
    })
    buttonWrap.appendChild(okaybutton);
    okaybutton.innerText = "닫기";
    okaybutton.addEventListener("click",()=>{
      uploadImageModal.remove();
    })
  }

  rootChild[5].innerText = "종윤씨가 좌표에 날짜 새기는 거 완료하면 만들어질 캘린더 자리"



  styleCreate(rootChild[6],{
    width : "500px",
    height : "90px",
    position : "fixed",

    bottom : "0px",
    backgroundColor : "#F7786B",
    display : "flex",
    justifyContent: "space-around",
    alignItems : "center",
    zIndex : "2"
  })

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


if(document.cookie.split("=")[1] === targetIdFromServer){
  myPage()
}else{
  yourPage()
}
