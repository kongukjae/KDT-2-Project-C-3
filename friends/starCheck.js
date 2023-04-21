// 즐겨찾기
function starCheck(parent) {
  console.log("starCheck 진입")
  let userID = document.cookie.split("jwt=")[1];
  let fr_id = targetIdFromServer;

  // 즐겨찾기 버튼을 만들기 전 상대방을 즐겨찾기 등록을 했는지 안했는지 판단
  let starValue;
  const starXhr = new XMLHttpRequest();
  starXhr.open('POST', `http://localhost:2080/starLoad`)
  starXhr.send(`userID=${userID}&fr_id=${fr_id}`);
  starXhr.addEventListener('load', function() {
    console.log("star load 응답");
    let starLoadRes = JSON.parse(starXhr.response);
    starValue = starLoadRes;
    console.log(starValue);
    starBtnCreate(parent, starValue, userID, fr_id);
  })

  // console.log("로딩 후 star Load 값 : " + starValue);
}

function starBtnCreate(parent, starValue, userID, fr_id) {
  console.log("starBtnCreate 진입")
  let star = tagCreate("button", { id: "star" });
  styleCreate(star, {
    position: "absolute",
    top: "0px",
    right: "0px",
    width: "50px",
    height: "50px",
    cursor: "pointer",
    border: "1px solid black",
  });
  if(starValue) {
    star.style.backgroundColor = "yellow";
  } else {
    star.style.backgroundColor = "lightBlue";
  }
  parent.appendChild(star);
  console.log("btn 생성 완료")
  star.addEventListener("click", () => {
    console.log("click");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:2080/starCheck`);
    xhr.send(`userID=${userID}&fr_id=${fr_id}`);
    xhr.addEventListener("load", function () {
      let starRes = JSON.parse(xhr.response);
      if (starRes === true) {
        console.log("꽉 찬 별");
        star.style.backgroundColor = "yellow";
      } else {
        console.log("속 빈 별");
        star.style.backgroundColor = "lightBlue";
      }
    });
  });
}