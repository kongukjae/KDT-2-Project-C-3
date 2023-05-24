const slide = document.getElementById("slide");

const element = document.createElement("div");
slide.appendChild(element);
styleCreate(slide.children[0], dangMapStyle.menuMapSlideBar);

let sw = true;
let move;
let down = true;
slide.style.transition = "cubic-bezier(0.07,0.6,0.71,0.97) 0.7s";


slideEvent(); //마우스 이벤트를 이용해 구현

function slideEvent() {

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
styleCreate(slideWrap, dangMapStyle.menuMapSlideContainer);
slide.appendChild(slideWrap);
// slideWrap.innerHTML = `test`;

const slideWrapInnerDiv = tagCreate("div", {});
styleCreate(slideWrapInnerDiv, dangMapStyle.menuMapSlideWrap);
slideWrap.appendChild(slideWrapInnerDiv);

// 발자국이 찍힌 사람이 총 몇명인지 서버에서 변수로 받아와서 반복문을 돌려야 할 것으로 생각 됨
// 임시로 최대치인 31을 넣어 둠
for (let i = 0; i < 30; i++) {
  const slideElement = tagCreate("div", {});
  styleCreate(slideElement, dangMapStyle.menuMapSlideItems);
  // slideElement.innerText = `test${i}`;
  slideWrapInnerDiv.appendChild(slideElement);
}

//======================================================================================

//슬라이드 메뉴 - 팔로우 검색 창
const search = tagCreate("div", {});
slide.appendChild(search);
styleCreate(slide.children[2], dangMapStyle.menuMapSlideSearch)

//팔로우 검색창 - 검색 bar
slide.children[2].appendChild(tagCreate("input", {name: "followSearch", type: "text" }));
styleCreate(slide.children[2].children[0], dangMapStyle.menuMapSlideSearchBar);

//팔로우 검색창 - 검색 button
slide.children[2].appendChild(tagCreate("div", {innerText: "search"}));
styleCreate(slide.children[2].children[1], dangMapStyle.menuMapSlideSearchButton);

//팔로우 ID 검색한 값 표시해줄 영역
let searchResult = tagCreate("div", {});
slide.appendChild(searchResult);
styleCreate(slide.children[3], dangMapStyle.menuMapSlideSearchResult)
styleCreate(slide.children[3], {display: "none"})


//팔로우 검색 버튼 클릭 시 동작 함수
slide.children[2].children[1].addEventListener('click', function(){
  let res;
  let findVal = slide.children[2].children[0].value;
  const cookieId = document.cookie.split("=")[1];
  //console.log("쿠키: " + cookieId)

  
  styleCreate(slide.children[3], {display: ""})
  //슬라이드 메뉴 높이 값 조정
  styleCreate(slide, {height: stylePropertyUnion.height.height450});


  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://43.201.52.54:2080/followSearch`, true);
  // httpRequest.send(`re1=${result[0]}`);
  //console.log(cookieId)
  xhr.send(`searchValue=${findVal}&id=${cookieId}`); 

  xhr.addEventListener('load', function(){
    res = JSON.parse(xhr.response);

  let searchList; //찾은 팔로우 ID값 리스트로 담아 둠.
    for(const key in res){
      searchList += `<option value="${res[key]}">${res[key]}</option>`;
      //console.log(`값: ${key}, ${res[key]}`)
    }
    slide.children[3].innerHTML = `<select id="searchResult" onchange="searchResultChooseValue()">
    <option value="none">검색 결과</option>
    ${searchList}
    </select>`;

    styleCreate(slide.children[3].children[0], dangMapStyle.menuMapSlideSearchResultList)
  });

  
})

//검색된 팔로우 ID 리스트에서 선택했을 때 동작되는 함수
function searchResultChooseValue(){
  let choose = document.getElementById("searchResult")
  console.log(`친구 선택: ${choose.options[choose.selectedIndex].value}`)

  //검색된 팔로우 선택하면 기존 창으로 되돌아 감
  styleCreate(slide.children[3], {display: "none"});
  styleCreate(slide, {height: stylePropertyUnion.height.height308});
}
//=============================================================================================

// 슬라이드 스와이프 시 옆으로 이동
// 마우스 다운한 지점과 마우스 이동한 곳의 좌표값을 비교하여 음수인지 양수인지로 어느 방향으로 이동했는지 판별
// 한계값을 설정하고 그 이하일 경우에는 이동한 값 만큼 marginLeft 또는 marginRight를 이용하여 실시간 슬라이드 구현
slide.children[1].children[0].addEventListener("mousedown", function (e) {
  let mDown = true;
  let startX = e.clientX;

  let widthValue  = slideWidthValueCalculate(slide.children[1].children[0])
  let marginLeftValue = slide.children[1].children[0].style.marginLeft;
  let marginLeftNumValue = Number(marginLeftValue.split("p")[0]);
  let marginLeftCalcValue;
  
  // console.log("startPoint : " + startPoint);
  console.log("startX : " + startX);
  slide.children[1].children[0].addEventListener("mousemove", function (event) {
    if (mDown) {
      console.log("mDown : " + mDown);
      let deltaX = startX - event.clientX;
      console.log("deltaX : " + deltaX);
      console.log("startX : " + startX + " clientX : " + event.clientX);
      if(deltaX > 0) {
        if (marginLeftNumValue > 0) {
          slide.children[1].children[0].style.marginLeft = 0;
          changeSliderValueMarginLeft(slide.children[1], 0);
        } else {
          console.log(widthValue);
          marginLeftCalcValue = calculateMoveSlideValue(marginLeftNumValue, deltaX, widthValue);
          slide.children[1].children[0].style.marginLeft = `${marginLeftCalcValue}px`;
        }
      } 
      else {
        if (marginLeftNumValue > 0) {
          slide.children[1].children[0].style.marginLeft = 0;
          changeSliderValueMarginLeft(slide.children[1], 0);
        } else {
          marginLeftCalcValue = calculateMoveSlideValue(marginLeftNumValue, deltaX, widthValue);
          slide.children[1].children[0].style.marginLeft = `${marginLeftCalcValue}px`;
        }
      }
    }
  });
  slide.children[1].children[0].addEventListener("mouseup", function () {
    mDown = false;
    changeSliderValueMarginLeft(slide.children[1].children[0], marginLeftCalcValue);
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
    // 슬라이더가 오른쪽 끝일 경우 더이상 오른쪽으로 이동하지 않도록 값을 고정 / 이후 동적으로 넓이
    value = -maxWidth;
  }
  console.log("value : " + value);
  return value;
}


let makeControlBtnsArr = makeControlBtns();
// 내 프로필을 눌렀을 때 버튼이 나오도록 하는 함수
// 버튼들을 토글시키기 위한 변수
let controlToggle = false;

function makeControlBtns() {
  let controlbtnsWrap = tagCreate("div", {});

  controlbtnsWrap.id='controlbtnsWrap';
  // 버튼들의 wrap의 스타일 값
  styleCreate(controlbtnsWrap, dangMapStyle.controlbtnsWrap);

  // 내 프로필 클릭 시 버튼's 생성 / 삭제
  slide.children[1].children[0].children[0].addEventListener("click", () => {
    if (controlToggle) {
      slide.removeChild(controlbtnsWrap);
      controlToggle = false;
    } else {
      slide.appendChild(controlbtnsWrap);
      controlToggle = true;
      testFunc();
    }
  });
  let buttonArr = [];
  // 3개의 버튼을 만들기 위한 반복문

  
// 배열을 먼저 준다.
  for (let i = 0; i < 3; i++) {
    let controlbtns = tagCreate("button", {});
    if (i === 1) {
      controlbtns.innerText = "추가";
      controlbtns.addEventListener("click", () => {
        console.log("추가 버튼이 클릭되었습니다.");
      });
    } else if (i === 2) {
      controlbtns.innerText = "수정";
      controlbtns.addEventListener("click", () => {
        console.log("수정 버튼이 클릭되었습니다.");
      });
    } else {
      controlbtns.innerText = "삭제";
      controlbtns.addEventListener("click", () => {
        console.log("삭제 버튼이 클릭되었습니다.");
      });
    }
    buttonArr.push(controlbtns)
    
  
    // 버튼들의 스타일 값
    styleCreate(controlbtns, {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      cursor: "pointer",
    });
    controlbtnsWrap.appendChild(controlbtns);
  }
  // 리턴을 해준다. 그렇다면 0번째 삭제, 첫번째 추가..
  return buttonArr
}


function testFunc(){
  console.log("test함수 진입함");
  console.log("controlToggle: " + controlToggle);
  if(controlToggle) {
    console.log("조건문 진입")
    slide.children[slide.children.length - 1].children[2].addEventListener('click', () => {
      // 목표 : 내 발자국만 남기고 다른 사람들의 발자국 비활성화
      // dangMap.js의 마커의 배열을 이용하여 내 발자국 이외의 사람들의 발자국을 숨김
      console.log(markers);
    })
  }
}
