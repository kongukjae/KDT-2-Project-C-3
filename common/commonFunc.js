function tagCreate(tType, props) {
  let element = document.createElement(tType);
  for (let i in props) {
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj, styleOb) {
  for (i in styleOb) {
    obj.style[i] = styleOb[i];
  }
}
// 로컬 날짜 변환
function changeDate(date) {
  let nowDate = new Date(date);
  let formatDate = nowDate.toLocaleString();
  return formatDate;
}

// UTC 날짜 변환
function changeDateUTC(date) {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())).toISOString();
  return utcDate;
}

// 쓰로틀링 함수
function throttle(func, delay) {
  let throttleCheck;
  return function() {
    if(!throttleCheck) {
      throttleCheck = true;
      setTimeout(() => {
        // func.apply(this)에서 this는 func의 상위 객체를 가리키고, func는 인자로 받아 실행 할 함수를 가리킨다.
        // 즉, 상위 객체에서 func라는 함수를 실행한다는 뜻으로 그냥 func 함수를 실행한다는 것과 같다.
        func.apply(this)
        throttleCheck = false;
      }, delay)
    }
  }
}