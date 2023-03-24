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
    height : "2000px",
    margin : "auto",
    display : "flex",
    flexDirection : "column",
    position : "relative"
  })

  let rootChild = [];
  for(let i = 0;i<6;i++){
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
    height : "83px",
    position : "relative",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : "#F3EDE8",
    fontSize : "20px",
    fontWeight : "700"

  })
  rootChild[1].innerText = "날씨 정보를 불러오는 중입니다...";
  styleCreate(rootChild[2],{
    width : "100%",
    height : "500px",
    position : "relative"
  })
  styleCreate(rootChild[3],{
    width : "100%",
    height : "260px",
    position : "relative",
    overflow : "hidden",
    transition : "all ease 0.6s"

  })
  styleCreate(rootChild[4],{
    width : "100%",
    height : "690px",
    position : "relative"
  })
  styleCreate(rootChild[5],{
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
  rootChild[2].id = "map"

  let menuChild = [];
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    rootChild[5].appendChild(child);
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

  let slideCover = tagCreate("div",{});
  rootChild[3].appendChild(slideCover);
  styleCreate(slideCover,{
    width : "100%",
    height : "100%",
    position : "relative",
    overflow : "hidden"
  })
   

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
  styleCreate(leftButton,{
    position : "absolute",
    width : "40px",
    height : "40px",
    backgroundColor : "black",
    opacity : "0.3",
    borderRadius : "50%",
    top : "41%",
    left : "10px",
    cursor : "pointer",
    display : "flex",
    justifyContent :"center",
    alignItems :"center",
    fontSize : "30px",
    color : "gray",
    zIndex : "1"
  })
  rootChild[3].appendChild(leftButton);
  leftButton.textContent = "<";
  let rightButton = tagCreate("div",{id : "rightButton"});
  styleCreate(rightButton,{
    position : "absolute",
    width : "40px",
    height : "40px",
    backgroundColor : "black",
    opacity : "0.3",
    borderRadius : "50%",
    top : "41%",
    right : "10px",
    cursor : "pointer",
    display : "flex",
    justifyContent :"center",
    alignItems :"center",
    fontSize : "30px",
    color : "gray",
    zIndex : "1"
  })
  rootChild[3].appendChild(rightButton);
  rightButton.textContent = ">";
  
  let dotsWrap = tagCreate("div",{id : "dotsWrap"});
  rootChild[3].appendChild(dotsWrap)
  styleCreate(dotsWrap,{
    position : "absolute",
    left : "50%",
    transform : "translateX(-50%)",
    bottom : "10px",
    display : "flex",
    gap : "10px",
    zIndex : "1"
    
  })


  for(let slide = 0; slide<5;slide++){
    let dot = document.createElement("div");
    dot.style.width = "9px";
    dot.style.height = "9px";
    dot.style.borderRadius = "9px";
    dot.style.backgroundColor = "black";
    dot.style.opacity = "0.4";
    dot.style.cursor = "pointer";
    dot.style.transition = "all ease 0.6s"
    
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