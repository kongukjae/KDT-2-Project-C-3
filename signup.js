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
  styleCreate(root,targetStyle.signUpMain)
  let wrap = tagCreate("div",{id : "wrap"});
  styleCreate(wrap,targetStyle.signUpContainer)
  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<8;i++){
    let child = tagCreate("div",{});
    styleCreate(child,targetStyle.signUpListBox)
    wrap.appendChild(child);
    rootChild.push(child);
  }
  styleCreate(rootChild[0],targetStyle.signUpTitle)
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
    styleCreate(rootChild[i].children[0],targetStyle.signUpListWithoutID)
  }
  styleCreate(rootChild[1].children[0],targetStyle.signUpListID)
  let postForm = document.createElement("form");
  rootChild[7].appendChild(postForm);
  postForm.action = "/signUpResult";
  postForm.method = "post";
  postForm.id = "signUpForm";
  rootChild[0].innerText = "회원가입";
  let dupCheck =  tagCreate("div",{});
  styleCreate(dupCheck,targetStyle.signUpDupCheck)
  rootChild[1].appendChild(dupCheck);
  dupCheck.innerText = "중복확인";
  function dupCheckResultModalWindowNoDup(){
    let dupCheckResultModal =  tagCreate("div",{});
    styleCreate(dupCheckResultModal,targetStyle.signUpDupCheckModal)
    dupCheckResultModal.innerText = "중복된 아이디가 없습니다";
    wrap.appendChild(dupCheckResultModal);
    let okaybutton = tagCreate("div",{})
    styleCreate(okaybutton,targetStyle.signUpOKBtn)
    dupCheckResultModal.appendChild(okaybutton);
    okaybutton.innerText = "닫기";
    okaybutton.addEventListener("click",()=>{
      dupCheckResultModal.remove();
    })
  }
  function dupCheckResultModalWindowYesDup(){
    let dupCheckResultModal =  tagCreate("div",{});
    styleCreate(dupCheckResultModal,targetStyle.signUpDupCheckModal)
    dupCheckResultModal.innerText = "중복된 아이디가 있어 사용할 수 없습니다";
    wrap.appendChild(dupCheckResultModal);
    let okaybutton = tagCreate("div",{})
    styleCreate(okaybutton,targetStyle.signUpOKBtn)
    dupCheckResultModal.appendChild(okaybutton);
    okaybutton.innerText = "닫기";
    okaybutton.addEventListener("click",()=>{
      dupCheckResultModal.remove();
    })
  }
  dupCheck.addEventListener("click",()=>{
    let checkName = document.getElementById("idValueCheck")
    let xhr = new XMLHttpRequest();
      let _URL = `http://localhost:2080/dupCheck?id=${checkName.value}`;
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