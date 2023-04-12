const slide = document.getElementById("slide");

const element = document.createElement("div");
slide.appendChild(element);
styleCreate(slide.children[0], targetStyle.menuMapSlideBar);

let sw = true;
let move;
let down = true;
slide.style.transition = "cubic-bezier(0.07,0.6,0.71,0.97) 0.7s";

// 객체의 drag를 이용해 구현
/*
slide.draggable = "true";

slide.addEventListener('dragend', function(){
  if(sw){
    slide.style.bottom = '90px';
    sw = false;
  }
  else if(!sw){
  slide.style.bottom = '-155px';
    sw = true;
  }
})
*/

slideEvent(); //마우스 이벤트를 이용해 구현

function slideEvent() {
  // slide.onmousedown = function(){
  //   down = true;
  //   return down;
  // }
  // slide.onmousemove = function(){
  //   if(down){
  //     move = true;
  //     return move;
  //   }
  // }
  // slide.onmouseup = function(){
  //   if(move){
  //     if(sw){
  //       slide.style.bottom = '90px';
  //       sw = false;
  //     }
  //     else if(!sw){
  //     slide.style.bottom = '-155px';
  //       sw = true;
  //     }
  //     console.log(down)
  //     console.log(move)

  //   }
  //   move = false;
  //   down = false;

  // }
  slide.children[0].addEventListener("click", function () {
    if (down) {
      slide.style.bottom = "90px";
      down = false;
    } else {
      slide.style.bottom = "-155px";
      down = true;
    }
  });
}

// 슬라이드 안쪽 구성
const slideWrap = tagCreate("div", { id: "slideWrap" });
slide.appendChild(slideWrap);
// slideWrap.innerHTML = `test`;
styleCreate(slideWrap, targetStyle.menuMapSlideWrap);

// 발자국이 찍힌 사람이 총 몇명인지 서버에서 변수로 받아와서 반복문을 돌려야 할 것으로 생각 됨
// 임시로 최대치인 31을 넣어 둠
for (let i = 0; i < 31; i++) {
  const slideElement = tagCreate("div", {});
  styleCreate(slideElement, targetStyle.menuMapSlideItems);
  slideElement.innerText = `test${i}`;
  slideWrap.appendChild(slideElement);
}
console.dir(slide.children[1]);

// 슬라이드 스와이프 시 옆으로 이동
// 마우스 다운한 지점과 마우스 이동한 곳의 좌표값을 비교하여 음수인지 양수인지로 어느 방향으로 이동했는지 판별
// 한계값을 설정하고 그 이하일 경우에는 이동한 값 만큼 marginLeft 또는 marginRight를 이용하여 실시간 슬라이드 구현
slide.children[1].addEventListener("mousedown", function (e) {
  let mDown = true;
  let startX = e.clientX;
  let widthValue = slideWidthValueCalculate(slide.children[1]);

  let marginLeftValue = slide.children[1].style.marginLeft;
  let marginLeftNumValue = Number(marginLeftValue.split("p")[0]);
  let marginLeftCalcValue;
  
  // console.log("startPoint : " + startPoint);
  console.log("startX : " + startX);
  slide.children[1].addEventListener("mousemove", function (event) {
    if (mDown) {
      console.log("mDown : " + mDown);
      let deltaX = startX - event.clientX;
      console.log("deltaX : " + deltaX);
      console.log("startX : " + startX + " clientX : " + event.clientX);
      if(deltaX > 0) {
        if (marginLeftNumValue > 0) {
          slide.children[1].style.marginLeft = 0;
          changeSliderValueMarginLeft(slide.children[1], 0);
        } else {
          marginLeftCalcValue = calculateMoveSlideValue(marginLeftNumValue, deltaX, widthValue);
          slide.children[1].style.marginLeft = `${marginLeftCalcValue}px`;
        }
      } 
      else {
        if (marginLeftNumValue > 0) {
          slide.children[1].style.marginLeft = 0;
          changeSliderValueMarginLeft(slide.children[1], 0);
        } else {
          marginLeftCalcValue = calculateMoveSlideValue(marginLeftNumValue, deltaX, widthValue);
          slide.children[1].style.marginLeft = `${marginLeftCalcValue}px`;
        }
      }
    }
  });
  slide.children[1].addEventListener("mouseup", function () {
    mDown = false;
    changeSliderValueMarginLeft(slide.children[1], marginLeftCalcValue);
  });
});

// 슬라이드 가능 넓이를 계산하기 위한 함수
// 동적으로 만들어진 slideWrap의 넓이 - 화면 넓이(현재: 500)
function slideWidthValueCalculate(target) {
  let value = target.clientWidth - 500;
  return value;
}

// 계산된 값을 marginLeft 값으로 적용시키는 함수
function changeSliderValueMarginLeft(target, value) {
  target.style.marginLeft = `${value}px`;
}

// 마우스 다운 된 위치와 마우스 포인터가 움직인 위치를 통해 이동값을 실시간으로 계산하는 함수
function calculateMoveSlideValue(before, after, maxWidth) {
  let value = before - after;
  if(value > 0) {
    // 슬라이더가 왼쪽 끝일 경우 더이상 이동되지 않도록 0값으로 변경
    value = 0;
  } else if(value < -maxWidth) {
    // 슬라이더가 오른쪽 끝일 경우 더이상 오른쪽으로 이동하지 않도록 값을 고정 / 이후 동적으로 넓ㅇ
    value = -maxWidth;
  }
  console.log("value : " + value);
  return value;
}

// slide.children[1].children[0] => 내 프로필 위치
// slide.children[1].children[0].addEventListener('click', function(){
//   let res;
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", `http://localhost:2080/myMarker`);
//   xhr.send();
// })

// 내 프로필을 눌렀을 때 버튼이 나오도록 하는 함수
makeControlBtns();
function makeControlBtns() {
  let controlbtnsWrap = tagCreate("div", {});
  styleCreate(controlbtnsWrap, {
    position: "absolute",
    top: "-180px",
    left: "0",
    width: "60px",
    height: "160px",
    border: "1px solid black",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
  });
  let controlToggle = false;
  slide.children[1].children[0].addEventListener("click", () => {
    if (controlToggle) {
      slide.children[1].children[0].removeChild(controlbtnsWrap);
      controlToggle = false;
    } else {
      slide.children[1].children[0].appendChild(controlbtnsWrap);
      controlToggle = true;
    }
  });

  for (let i = 0; i < 3; i++) {
    let controlbtns = tagCreate("button", {});
    if (i === 1) {
      controlbtns.innerText = "추가";
    } else if (i === 2) {
      controlbtns.innerText = "수정";
    } else {
      controlbtns.innerText = "삭제";
    }
    styleCreate(controlbtns, {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      cursor: "pointer",
    });
    controlbtnsWrap.appendChild(controlbtns);
  }
}