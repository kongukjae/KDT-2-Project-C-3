
function findWindow(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,signupPageStyle.findUserInfoRoot)
  let wrap = tagCreate("div",{id : "wrap"});
  styleCreate(wrap,signupPageStyle.findUserInfoWrap)

  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    styleCreate(child,signupPageStyle.signupResultMent)
    wrap.appendChild(child);
    rootChild.push(child);
  }

  
  // styleCreate(rootChild[0],{
  //   color : "white",
  //   fontSize : "23px",
  //   fontWeight : "700"
  // })

  rootChild[0].innerText = "비밀번호 찾기";
  rootChild[1].innerHTML =`<input type="text" id="idValueCheck" name="signUpId" placeholder="아이디를 입력하세요">`;
  rootChild[2].innerHTML =`<select name="signUpQuestion">
  <option value="none">본인 확인 질문을 선택하세요</option>
  <option value="1">나의 고향은?</option>
  <option value="2">나의 초등학교는?</option>
  <option value="3">우리 어머니의 고향은?</option>
  <option value="4">우리집 첫번째 강아지의 이름은?</option>
  <option value="5">나의 흑역사는?</option>
  </select>`
  rootChild[3].innerHTML = `<input type="text" name="signUpAnswer" placeholder="본인 확인 질문 답변을 입력하세요">`;
  rootChild[4].innerText = "제출"



  styleCreate(rootChild[1].firstChild,signupPageStyle.findUserInfoInput);
  styleCreate(rootChild[2].firstChild,signupPageStyle.findUserInfoInput);
  styleCreate(rootChild[3].firstChild,signupPageStyle.findUserInfoInput);
  styleCreate(rootChild[4],signupPageStyle.signupResultBackBtn);
  rootChild[4].addEventListener("click",()=>{
    let data = new FormData;
    data.append("id",rootChild[1].firstChild.value);
    data.append("question",rootChild[2].firstChild.value);
    data.append("answer",rootChild[3].firstChild.value);
    fetch("http://43.201.52.54:2080/findUserInfoCheck",{
      method : "POST",
      body : data
    })
    .then((response) => response.json())
    .then((result) => {
      if(Object.keys(result).includes('token')){
        console.log({...result, pw : "123"});
        updatePW(result.token);
      }else{
        alert("일치하는 가입 정보를 찾을 수 없습니다")
      }
    })
  })
}

findWindow()

function updatePW(token){
  let dupCheckResultModal =  tagCreate("div",{});
  styleCreate(dupCheckResultModal,signupPageStyle.findUserInfoUpdatePWModal)
  dupCheckResultModal.innerHTML = `<p>새 비밀번호를 입력해주세요<p>
  <input type="text" id="newPW" name="newPW" placeholder="비밀번호">`;
  let newPW = dupCheckResultModal.children[1].children[0]
  styleCreate(newPW,signupPageStyle.findUserInfoInput);
  wrap.appendChild(dupCheckResultModal);
  let okaybutton = tagCreate("div",{})
  styleCreate(okaybutton,signupPageStyle.signUpOKBtn)
  dupCheckResultModal.appendChild(okaybutton);
  okaybutton.innerText = "완료";
  okaybutton.addEventListener("click",()=>{
    fetch("http://43.201.52.54:2080/updatepassword",{
      method : "POST",
      body : JSON.stringify({token, newpassword : newPW.value})
    })
    .then((result) => {
      alert("비밀번호 변경을 완료했습니다.");
      window.location= '/';
    })
  })
}
