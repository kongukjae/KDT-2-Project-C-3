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

function main(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,{
    width : "500px",
    height : "1000px",
    margin : "auto",
    display : "flex",
    flexDirection : "column",
    position : "relative",
    backgroundColor : "#F3EDE8",
    justifyContent : "center",
    alignItems : "center"
  })
  let wrap = tagCreate("div",{id : "wrap"});
  styleCreate(wrap,{
    width : "450px",
    padding : "30px",
    borderRadius : "10px",
    display : "flex",
    position: "relative",
    flexDirection : "column",
    backgroundColor : "#F7786B",
    gap : "10px",
    boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
  })

  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<8;i++){
    let child = tagCreate("div",{});
    styleCreate(child,{
      width : "100%",
      height : "70px",
      position : "relative",
      display : "flex",
      justifyContent : "center",
      alignItems : "center"
    })
    wrap.appendChild(child);
    rootChild.push(child);
  }

  
  styleCreate(rootChild[0],{
    color : "white",
    fontSize : "50px",
    fontWeight : "700"
  })

  rootChild[1].innerHTML = `<input type="text" id="idValueCheck" name="signUpId" placeholder="아이디를 입력하세요" form="signUpForm">`;
  rootChild[2].innerHTML = `<input type="text" name="signUpPW" placeholder="비밀번호를 입력하세요" form="signUpForm">`;
  rootChild[3].innerHTML = `<select name="signUpQuestion" form="signUpForm">
  <option value="none">본인 확인 질문을 선택하세요</option>
  <option value="1">나의 고향은?</option>
  <option value="2">나의 초등학교는?</option>
  <option value="3">우리 어머니의 고향은?</option>
  <option value="4">우리집 첫번째 강아지의 이름은?</option>
  <option value="5">나의 흑역사는?</option>
  </select>`;

  rootChild[4].innerHTML = `<input type="text" name="signUpAnswer" placeholder="본인 확인 질문 답변을 입력하세요" form="signUpForm">`;
  rootChild[5].innerHTML = `<input type="text" name="signUpDogName" placeholder="강아지 이름을 입력하세요" form="signUpForm">`;
  rootChild[6].innerHTML = `<select name="signUpDogGender" form="signUpForm">
  <option value="none">강아지 성별을 선택하세요</option>
  <option value="1">남자</option>
  <option value="2">여자</option>
  </select>`;
  rootChild[7].innerHTML = `<input type="submit" form="signUpForm">`


  for(let i = 2;i<8;i++){
    styleCreate(rootChild[i].children[0],{
      height : "40px",
      width : "300px",
      cursor : "pointer",
      borderRadius : "10px",
      padding : "5px",
      paddingLeft : "20px",
      paddingRight : "20px",
      border : "0px",
      boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
    })
  }
  styleCreate(rootChild[1].children[0],{
    height : "40px",
    width : "200px",
    cursor : "pointer",
    borderRadius : "10px",
    padding : "5px",
    paddingLeft : "20px",
    paddingRight : "20px",
    border : "0px",
    boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
  })

  let postForm = document.createElement("form");
  rootChild[7].appendChild(postForm);
  postForm.action = "/signUpResult";
  postForm.method = "post";
  postForm.id = "signUpForm";
  rootChild[0].innerText = "회원가입";

  let dupCheck =  tagCreate("div",{});
  styleCreate(dupCheck,{
    height : "40px",
    width : "90px",
    marginLeft : "10px",
    fontSize : "14px",
    cursor : "pointer",
    display :"flex",
    justifyContent : "center",
    alignItems : "center",
    borderRadius : "10px",
    padding : "5px",
    border : "0px",
    backgroundColor : "white",
    boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
  })
  rootChild[1].appendChild(dupCheck);
  dupCheck.innerText = "중복확인";
  function dupCheckResultModalWindowNoDup(){
    let dupCheckResultModal =  tagCreate("div",{});
    styleCreate(dupCheckResultModal,{
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
      top : "17%",
      left: "50%",
      gap : "30px",
      marginLeft: "-150px",
    })
    dupCheckResultModal.innerText = "중복된 아이디가 없습니다";
    wrap.appendChild(dupCheckResultModal);
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
    dupCheckResultModal.appendChild(okaybutton);
    okaybutton.innerText = "닫기";
    okaybutton.addEventListener("click",()=>{
      console.log("close");
      dupCheckResultModal.remove();
    })
  }
  function dupCheckResultModalWindowYesDup(){
    let dupCheckResultModal =  tagCreate("div",{});
    styleCreate(dupCheckResultModal,{
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
      top : "17%",
      left: "50%",
      gap : "30px",
      marginLeft: "-150px",
    })
    dupCheckResultModal.innerText = "중복된 아이디가 있어 사용할 수 없습니다";
    wrap.appendChild(dupCheckResultModal);
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
    dupCheckResultModal.appendChild(okaybutton);
    okaybutton.innerText = "닫기";
    okaybutton.addEventListener("click",()=>{
      console.log("close");
      dupCheckResultModal.remove();
    })
  }
  dupCheck.addEventListener("click",()=>{
    let checkName = document.getElementById("idValueCheck")
    let xhr = new XMLHttpRequest();
      let _URL = `http://localhost:2085/dupCheck?id=${checkName.value}`;
      xhr.open("GET",_URL);
      xhr.send();
      xhr.addEventListener("load",()=>{
        let resultFromServer = xhr.response;
        if(resultFromServer.length === 0){
          dupCheckResultModalWindowNoDup();
        }else{
          dupCheckResultModalWindowYesDup();
        };
      })
    
    
  })
}

main()

