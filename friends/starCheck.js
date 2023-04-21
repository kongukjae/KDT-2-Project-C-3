// 즐겨찾기
function starChecker(parent) {
  let star = tagCreate("button", { id: "star" });
  styleCreate(star, {
    display: "none",
    position: "absolute",
    top: "0px",
    right: "0px",
    width: "50px",
    height: "50px",
    cursor: "pointer",
    border: "1px solid black",
  });
  parent.appendChild(star);
  star.addEventListener("click", () => {
    console.log("click");
    console.log(targetIdFromServer);
    let userID = document.cookie.split("jwt=")[1];
    console.log(userID);
    let fr_id = targetIdFromServer;
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