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

function resultWindow(){
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
    flexDirection : "column",
    backgroundColor : "#F7786B",
    gap : "10px",
    boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
  })

  root.appendChild(wrap);
  let rootChild = [];
  for(let i = 0;i<2;i++){
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
    fontSize : "23px",
    fontWeight : "700"
  })

  rootChild[0].innerText = "축하합니다 회원가입이 완료되었습니다";
  
  rootChild[1].innerText = "로그인 화면으로 돌아가기"
  styleCreate(rootChild[1],{
    color : "black",
    fontSize : "20px",
    cursor : "pointer",
    backgroundColor : "white",
    borderRadius : "10px",
    boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"

  })
  rootChild[1].addEventListener("click",()=>{
    window.location = 'http://localhost:2080/signUp';
  })
 

}

resultWindow()

