function main(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,signupPageStyle.signUpMain)
  let wrap = tagCreate("div",{id : "wrap"});
  styleCreate(wrap,signupPageStyle.signUpContainer)
  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<8;i++){
    let child = tagCreate("div",{});
    styleCreate(child,signupPageStyle.signUpListBox);
    wrap.appendChild(child);
    rootChild.push(child);
  }
  styleCreate(rootChild[0],signupPageStyle.signUpTitle)
  rootChild[1].innerHTML = `<input type="text" id="idValueCheck" name="signUpId" placeholder="아이디를 입력하세요" form="signUpForm">`
  ;
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
  rootChild[7].innerHTML = `<div>제출</div>`
  for(let i = 2;i<8;i++){
    styleCreate(rootChild[i].children[0],signupPageStyle.signUpListWithoutID)
  }
  styleCreate(rootChild[1].children[0],signupPageStyle.signUpListID)
  let postForm = document.createElement("form");
  rootChild[7].appendChild(postForm);
  postForm.action = "/signUpResult";
  postForm.method = "post";
  postForm.id = "signUpForm";

  styleCreate(rootChild[7].children[0],{
    backgroundColor : "white",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  })
  let dupCheckFlag = false;
  let idFlag = false;
  let pwFlag = false;
  let questionFlag = false;
  let answerFlag = false;
  let dogNameFlag = false;
  let dogGenderFlag = false;

  rootChild[7].children[0].addEventListener("click",()=>{
    if(!dupCheckFlag){
      alert("아이디 중복 확인을 해주세요")
    }
    else if(idFlag && pwFlag && questionFlag && answerFlag && dogNameFlag && dogGenderFlag){
      postForm.submit();
    }
    else{
      alert("유효하지 않은 입력입니다. 입력 조건을 확인해주세요")
    }
  })
  rootChild[0].innerText = "회원가입";
  let dupCheck =  tagCreate("div",{});
  styleCreate(dupCheck,signupPageStyle.signUpDupCheck)
  rootChild[1].appendChild(dupCheck);
  dupCheck.innerText = "중복확인";
  for(let i = 1; i < 7; i++){
    let validity = tagCreate("div", {innerText : "❌입력값이 유효하지 않습니다"})
    styleCreate(validity,{
      width : "300px",
      height : "20px",
      color : "white",
      fontSize : "12px",
      paddingLeft : "10px"
    })
    rootChild[i].appendChild(validity);
  }


  function dupCheckResultModalWindow(value){
    let dupCheckResultModal =  tagCreate("div",{});
    styleCreate(dupCheckResultModal,signupPageStyle.signUpDupCheckModal)
    dupCheckResultModal.innerText = value
    wrap.appendChild(dupCheckResultModal);
    let okaybutton = tagCreate("div",{})
    styleCreate(okaybutton,signupPageStyle.signUpOKBtn)
    dupCheckResultModal.appendChild(okaybutton);
    okaybutton.innerText = "닫기";
    okaybutton.addEventListener("click",()=>{
      dupCheckResultModal.remove();
    })
  }
  dupCheck.addEventListener("click",()=>{
    let checkName = document.getElementById("idValueCheck")
    let xhr = new XMLHttpRequest();
      let _URL = `http://3.37.160.130:2080/dupCheck?id=${checkName.value}`;
      xhr.open("GET",_URL);
      xhr.send();
      xhr.addEventListener("load",()=>{
        let resultFromServer = xhr.response;
        if(resultFromServer.length === 0){
          dupCheckFlag = true;
          dupCheckResultModalWindow("중복된 아이디가 없습니다");
        }else{
          dupCheckResultModalWindow("중복된 아이디가 있어 사용할 수 없습니다");
        };
      })
  })
  let asciiObject = {
    lowerCase: {min : 97, max : 122},
    upperCase: {min : 65, max : 90},
    number: {min : 48, max : 57},
    length: {min: 7, max: 14},
    nonUse: ['`', '~', '!','@','#','$','%','^','&','*','(',')','_','-','=','+',';',':',"'",'"',',','.','<','>','/','?','{','}', '[', ']', '|'],
  }
  function idChecker(value){
    let validityFlag = true;
    let validityText = "";
    if(value.length < asciiObject.length.min || value.length > asciiObject.length.max){
      validityFlag = false;
      validityText = `❌길이는 ${asciiObject.length.min}이상 ${asciiObject.length.max}이하`;
      return [validityFlag, validityText];
    }
    let specialCheck = true;
    for(let i = 0; i < value.length; i++){
      let target = value.charCodeAt(i);
      if(!(( target>= asciiObject.number.min && target<=asciiObject.number.max) || (target >= asciiObject.upperCase.min && target<=asciiObject.upperCase.max) || (target >= asciiObject.lowerCase.min && target<=asciiObject.lowerCase.max))){
        specialCheck = false;
        break
      };
    }
    if(!specialCheck){
      validityText = "❌숫자, 영문 이외의 값은 사용하실 수 없습니다";
      return [false, validityText];
    }else if(validityFlag){
      validityText = "✅유효한 값입니다";
      return [true, validityText];
    }else{
      validityText = "❌error type1";
      return [false, validityText]
    }
  }
  function pwChecker(value){
    let validityFlag = true;
    let validityText = "✅유효한 값입니다";
    if(value.length < asciiObject.length.min || value.length > asciiObject.length.max){
      validityFlag = false;
      validityText = `❌길이는 ${asciiObject.length.min}이상 ${asciiObject.length.max}이하`;
      return [validityFlag, validityText];
    }
    let checkerSpc = true; //특수기호
    let checkerNum = false; // 슷지
    let checkerStr = false; // 문자열

    for(let i = 0; i < value.length; i++){
      let target = value.charCodeAt(i);
      if(target >= asciiObject.number.min && target <= asciiObject.number.max){
        checkerNum = true;
      }
      else if ((target >= asciiObject.upperCase.min && target <= asciiObject.upperCase.max) || (target >= asciiObject.lowerCase.min && target <= asciiObject.lowerCase.max)){
        checkerStr = true;
      }
      if(!(( target>= asciiObject.number.min && target <= asciiObject.number.max) || (target >= asciiObject.upperCase.min && target <= asciiObject.upperCase.max) || (target >= asciiObject.lowerCase.min && target <= asciiObject.lowerCase.max)))
      {
        checkerSpc = false;
        break
      }
    }
    if(!checkerNum){
      validityText = "❌적어도 한개의 숫자가 필요합니다."
    }else if(!checkerStr){
      validityText = "❌적어도 한개의 영문이 필요합니다."
    }else if(!checkerSpc){
      validityText = "❌특수문자는 사용하실 수 없습니다."
    }
    return [checkerNum&&checkerStr&&checkerSpc, validityText]

  }
  function lengthCheck(value){
    let validityFlag = true;
    let validityText = "";
    let noUse = [';','?','*','/','<','>',]
    if(value.length < 1 || value.length > 20){
      validityFlag = false;
      validityText = `❌길이는 ${1}이상 ${20}이하`;
      return [validityFlag, validityText];
    }
    else{
      for(let i = 0; i < value.length; i++){
        let target = value[i];
        if(noUse.includes(target)){
          validityFlag = false;
          validityText = "❌;, ?, *, /, <, > 는 사용하실 수 없습니다.";
          return [validityFlag, validityText];
        };
      }
    }
    validityText = "✅유효한 값입니다";
    return [validityFlag, validityText];

  }
  function selectorChecker(value){
    let validityFlag = true;
    let validityText = "";
    if(value === "none"){
      validityText = "❌선택지를 골라주세요";
      validityFlag = false;
    }else{
      validityText = "✅유효한 값입니다";
      validityFlag = true;
    };
    return [validityFlag, validityText];
  }


  rootChild[1].children[0].addEventListener("keyup", (event) => {
    console.log(rootChild[1].children[0].value);
    dupCheckFlag = false;
    let idCheckerResult = idChecker(rootChild[1].children[0].value);
    idFlag = idCheckerResult[0]
    rootChild[1].lastChild.innerText = idCheckerResult[1]
  });
  rootChild[2].children[0].addEventListener("keyup", (event) => {
    console.log(rootChild[2].children[0].value);
    let pwCheckerResult = pwChecker(rootChild[2].children[0].value);
    pwFlag = pwCheckerResult[0]
    rootChild[2].lastChild.innerText = pwCheckerResult[1]
  });
  rootChild[3].children[0].addEventListener("click", (event) => {
    let questionCheckerResult = selectorChecker(rootChild[3].children[0].value);
    questionFlag = questionCheckerResult[0]
    rootChild[3].lastChild.innerText = questionCheckerResult[1]
  });
  rootChild[4].children[0].addEventListener("keyup", (event) => {
    let answerCheckerResult = lengthCheck(rootChild[4].children[0].value);
    answerFlag = answerCheckerResult[0]
    rootChild[4].lastChild.innerText = answerCheckerResult[1]
  });
  rootChild[5].children[0].addEventListener("keyup", (event) => {
    let dogNameCheckerResult = lengthCheck(rootChild[5].children[0].value);
    dogNameFlag = dogNameCheckerResult[0]
    rootChild[5].lastChild.innerText = dogNameCheckerResult[1]
  });
  rootChild[6].children[0].addEventListener("click", (event) => {
    let dogGenderCheckerResult = selectorChecker(rootChild[6].children[0].value);
    dogGenderFlag = dogGenderCheckerResult[0]
    rootChild[6].lastChild.innerText = dogGenderCheckerResult[1]
  });
  
}
main()