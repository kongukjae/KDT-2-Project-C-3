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

