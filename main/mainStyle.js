function main(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,targetStyle.mainRoot)
  let rootChild = [];
  for(let i = 0;i<6;i++){
    let child = tagCreate("div",{id:i});
    root.appendChild(child);
    rootChild.push(child);
  }

  //상단메뉴바 commonFunc로 이동
  rootChild[2].id = "map"
  topMenu(rootChild);

   // ----햄버거 버튼 구역입니다.----

// 루트 오버플로우
styleCreate(root, {
  overflow: "hidden",
});

// 햄버거 설정 이곳이 메뉴 공간
  let hamburger = tagCreate("div",{});
 rootChild[0].appendChild(hamburger);
  styleCreate(hamburger,{
    width: "30px",
  height: "22.5px",
  position: "absolute",
  top: "50px",
  left: "15px",
  cursor: "pointer"
  })
  
  hamburger.addEventListener("click", () => {
    menuSlide.style.left = "0";
  });
// 햄버거 바 생성
let bar1 = tagCreate("div", {});
let bar2 = tagCreate("div", {});
let bar3 = tagCreate("div", {});
hamburger.appendChild(bar1);
hamburger.appendChild(bar2);
hamburger.appendChild(bar3);
styleCreate(bar1, {
  width: "100%",
  height: "4.5px",
  backgroundColor: "#fff",
  borderRadius: "5px",
  position: "absolute",
  top: "0px",
  left: "0px",
});
styleCreate(bar2, {
  width: "100%",
  height: "4.5px",
  backgroundColor: "#fff",
  borderRadius: "5px",
  position: "absolute",
  top: "9px",
  left: "0px",
});
styleCreate(bar3, {
  width: "100%",
  height: "4.5px",
  backgroundColor: "#fff",
  borderRadius: "5px",
  position: "absolute",
  top: "18px",
  left: "0px",
});

// 메뉴 슬라이드 요소
let menuSlide = tagCreate("div", {id: 'hamburgerSlide'});
root.appendChild(menuSlide);
styleCreate(menuSlide, {
  width: "300px",
  height: "100%",
  backgroundColor: "#F7786B",
  position: "absolute",
  left: "-600px",
  top: "0",
  transition: "left 0.6s ease",
  zIndex: 1
});
// 햄버거 빵, 고기, 빵 이벤트 요소
// bar1.addEventListener("click", () => {
//   menuSlide.style.left = "0";
// });
// bar2.addEventListener("click", () => {
//   menuSlide.style.left = "0";
// });
// bar3.addEventListener("click", () => {
//   menuSlide.style.left = "0";
// });

// X버튼 요소
let closeButton = tagCreate("div", {});
menuSlide.appendChild(closeButton);
styleCreate(closeButton, {
  width: "30px",
  height: "30px",
  backgroundColor: pageStyle.colorTheme.peach,
  borderRadius: "50%",
  position: "absolute",
  top: "20px",
  right: "15px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
 
});

closeButton.innerHTML = "&#x2716;"; // X 모양 아이콘


// x모양 메뉴슬라이드 클릭시,슬라이드 없어짐
closeButton.addEventListener("click", () => {
  menuSlide.style.left = "-600px";
});
// 다른 곳 클릭시, 슬라이드 사라짐
 rootChild[1].addEventListener("click",() =>{
  menuSlide.style.left = "-600px";
});

// 마이페이지 버튼을 만들어준다.
let myPageBtn = tagCreate("button", {});
menuSlide.appendChild(myPageBtn);
styleCreate(myPageBtn, {
  width: "100px",
  height: "30px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  position: "absolute",
  top: "20px",
  left: "20px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  color: "#F7786B"
});
myPageBtn.innerText = "마이페이지";

// 로그아웃 버튼을 만들어준다.
let logoutBtn = tagCreate("button", {});
menuSlide.appendChild(logoutBtn);
styleCreate(logoutBtn, {
  width: "100px",
  height: "30px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  position: "absolute",
  top: "20px",
  left: "140px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  color: "#F7786B"
});
logoutBtn.innerText = "로그아웃";

myPageBtn.addEventListener("click", () => {
  // 1. 토큰이 유효한지 검사한다.
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  let mypageForm = document.createElement('form');
// form 태그 작성하는 곳  ----- 
// form 
  mypageForm.method = "POST"
  mypageForm.action = "/mypage";
  let params = {jwt:token, targetId:"mine"}
  for(let key in params){
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type","hidden");
    hiddenField.setAttribute("name",key);
    hiddenField.setAttribute("value",params[key]);
    mypageForm.appendChild(hiddenField);
  }
  document.body.appendChild(mypageForm);
  mypageForm.submit();
// // 2. 폼데이터에 JWT와 targetID 값을 추가한다.
//   const formData = new FormData();
//   formData.append("jwt", token);
//   formData.append("targetId", "mine");

// // 3. XMLhttpRequest 방식 사용해서 POST 방식으로 요청한다.
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "/mypage");
//   xhr.send(formData);

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//       console.log(xhr.response);
//     }
//   };
});



logoutBtn.addEventListener("click", () => {

  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location = "/";
});


// 윤이의 비밀공간 이라는 버튼을 생성한다.
// 버튼을 클릭하면, /write 경로로 post 요청을 보낸다.
// 요청에는 jwt 토큰 값과 targetid 값이 함께 전송된다.
// 
let mywritebtn = tagCreate("button", {});
menuSlide.appendChild(mywritebtn);
styleCreate(mywritebtn, {
  width: "100px",
  height: "30px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  position: "absolute",
  top: "150px",
  left: "20px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  color: "#F7786B"
});
mywritebtn.innerText = "윤이비밀공간";


mywritebtn.addEventListener("click", () => {
  // 1. 토큰이 유효한지 검사한다.
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  let mywriteForm = document.createElement('form');

  mywriteForm.method = "POST"
  mywriteForm.action = "/mykeep";
  let params = {jwt:token, targetId:"mine"}
  for(let key in params){
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type","hidden");
    hiddenField.setAttribute("name",key);
    hiddenField.setAttribute("value",params[key]);
    mywriteForm.appendChild(hiddenField);
  }
  document.body.appendChild(mywriteForm);
  mywriteForm.submit();
});










  //날씨 메뉴 commonFunc로 이동
  styleCreate(rootChild[1],targetStyle.mainWeatherBanner)
  rootChild[1].innerText = "날씨 정보를 불러오는 중입니다...";
  styleCreate(rootChild[2],targetStyle.mainMap)
  styleCreate(rootChild[3],targetStyle.mainSlideWrap)
  styleCreate(rootChild[4],targetStyle.mainFindingDogs)

  // 하단 메뉴바 common.js
  let menuChild = [];
  btmMeun(rootChild[5], menuChild);


  let slideCover = tagCreate("div",{});
  rootChild[3].appendChild(slideCover);
  styleCreate(slideCover,targetStyle.mainSlideCover)
   

  menuChild[2].id = "mapBtn";

  let slideChild = [];
  let slideColor = ["#245953","#408E91","#E49393", "#D8D8D8","#867070"];
  let slidePosition = [-1,0,1,1,1];
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    slideCover.appendChild(child);
    styleCreate(child,{
      width : "500px",
      height : "260px",
      backgroundColor : slideColor[i],
      position : "absolute",
      color : "white",
      fontSize : "30px",
      fontWeight : "500",
      display : "flex",
      justifyContent : "center",
      alignItems : "center",
      transition : "0.6s ease"


    })
    child.innerText = "이번주 인기 게시글 " + i;
    slideChild.push(child);
  }
  function setSlidePosition(childArr){
    for(let i =0; i<childArr.length;i++){
      childArr[i].style.left = `${slidePosition[i] * 100}%`
    }
  }
  setSlidePosition(slideCover.children)
  
  let leftButton = tagCreate("div",{id : "leftButton"});
  styleCreate(leftButton,targetStyle.mainSlideLeftBtn)
  rootChild[3].appendChild(leftButton);
  leftButton.textContent = "<";
  let rightButton = tagCreate("div",{id : "rightButton"});
  styleCreate(rightButton,targetStyle.mainSlideRightBtn)
  rootChild[3].appendChild(rightButton);
  rightButton.textContent = ">";
  
  let dotsWrap = tagCreate("div",{id : "dotsWrap"});
  rootChild[3].appendChild(dotsWrap)
  styleCreate(dotsWrap,targetStyle.mainSlideDotWrap)


  for(let slide = 0; slide<5;slide++){
    let dot = document.createElement("div");
    styleCreate(dot,targetStyle.mainSlideDot)
    dotsWrap.appendChild(dot);
  }
  let dot = dotsWrap.children;
  
  function dotwide(nth){
    for(let indexWidth = 0; indexWidth<dot.length; indexWidth++){
      if(nth === indexWidth){
        dot[indexWidth].style.width = "70px"
      }else{
        dot[indexWidth].style.width = "9px"
      }
    }
  };
  dotwide(0)
  let dotCnt = 0;
  
  function rightMove(){
    slideCover.appendChild(slideCover.firstChild);
    setSlidePosition(slideCover.children);
    dotCnt ++;
    dotCnt %= 5;
    dotwide(dotCnt);
  };
  function leftMove(){
    slideCover.prepend(slideCover.lastChild);
    setSlidePosition(slideCover.children);
    if(dotCnt===0){
      dotCnt = 4;
    }else{
      dotCnt --;
    };
    dotwide(dotCnt);
  };

  setInterval(() => {
    rightMove();
    
  }, 5000);

  leftButton.addEventListener("click",()=>{
    leftMove();
  });
  rightButton.addEventListener("click",()=>{
    rightMove();
  });
  for(let i = 0; i < dotsWrap.children.length;i++){
    dotsWrap.children[i].addEventListener("click", ()=>{
      let gap = Math.abs(i - dotCnt);
      if(i>dotCnt){
        for(let i = 0;i<gap;i++){
          rightMove();
        }
      }else{
        for(let i = 0;i<gap;i++){
          leftMove();
        }
      }
    })
  }



}

main()

/*
async function getWeatherAsync() {
  let result = [];
  let today = new Date();   
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let targetDay = String(year)+String(month).padStart(2, "0")+String(date);

  let hours = today.getHours() - 1; // 시간에 1 뺀 수 예보이기때문에 1을 빼야함
  let temp = await fetch(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=a71YfWfLciBMXYG2e5zc9D1hNlQM29N7TICbhuOzOXtUnxJIGZjs0FWWuENqX%2FGdMEvpH%2B7eH1AZ2mhnfQmmiA%3D%3D&base_date=${targetDay}&pageNo=3&base_time=${hours}30&nx=67&ny=100&dataType=JSON`)
    .then(response => response.json())
  let sky = await fetch(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=a71YfWfLciBMXYG2e5zc9D1hNlQM29N7TICbhuOzOXtUnxJIGZjs0FWWuENqX%2FGdMEvpH%2B7eH1AZ2mhnfQmmiA%3D%3D&base_date=${targetDay}&pageNo=2&base_time=${hours}30&nx=67&ny=100&dataType=JSON`)
    .then(response => response.json())
  result.push(temp.response.body.items.item[4].fcstValue)
  if(sky.response.body.items.item[8].fcstValue<6){
      result.push("맑음");
    }
    else if(sky.response.body.items.item[8].fcstValue<9){
      result.push("구름많음");
    }
    else{
      result.push("흐림");
    }
  console.log(result);
  let weatherWindow = document.getElementById("root").children[1];
  weatherWindow.innerText = `오늘의 날씨는 ${result[0]}도 ${result[1]}입니다`;
  return result;
}

getWeatherAsync()
*/