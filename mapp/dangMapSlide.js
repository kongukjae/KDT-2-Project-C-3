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
// console.log(slide.children[1].style.marginLeft);
// let a = slide.children[1].style.marginLeft;
// console.log(a);
// let b = a.split("p")[0];
// console.log(b);

// 슬라이드 스와이프 시 옆으로 이동
// 마우스 다운한 지점과 마우스 이동한 곳의 좌표값을 비교하여 음수인지 양수인지로 어느 방향으로 이동했는지 판별
// 한계값을 설정하고 그 이하일 경우에는 이동한 값 만큼 marginLeft 또는 marginRight를 이용하여 실시간 슬라이드 구현
slide.children[1].addEventListener("mousedown", function (e) {
  let mDown = true;
  let startX = e.clientX;

  let a = slide.children[1].style.marginLeft;
  console.log(a);
  let b = Number(a.split("p")[0]);
  console.log("b : " + b);
  
  console.log("다운시 값 : " + slide.children[1].style.marginLeft)
  
  // console.log("startPoint : " + startPoint);
  console.log("startX : " + startX);
  slide.children[1].addEventListener("mousemove", function (event) {
    if (mDown) {
      console.log("mDown : " + mDown);
      let deltaX = startX - event.clientX;
      console.log("deltaX : " + deltaX);
      console.log("startX : " + startX + " clientX : " + event.clientX);
      if(deltaX > 0) {
        if (slide.children[1].style.marginLeft > 0) {
          console.log("+마진값 > 0 : " + slide.children[1].style.marginLeft);
          // slide.children[1].style.marginLeft = 0;
        } else {
          slide.children[1].style.marginLeft = `-${deltaX}px`;
          console.log("+마진값 < 0 : " + slide.children[1].style.marginLeft);
        }
      } 
      else {
        if (slide.children[1].style.marginLeft < 0) {
          // slide.children[1].style.marginLeft = 0;
        } else {
          slide.children[1].style.marginLeft = `-${deltaX}px`;
          console.log("-마진값 : " + slide.children[1].style.marginLeft);
        }
      }
    }
  });
  slide.children[1].addEventListener("mouseup", function () {
    mDown = false;
  });
});
