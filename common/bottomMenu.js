// btmMenu는 들어가야할 div 인자로 받고 그 인자를 직접 수정하는 함수
//  예시 : btmMeun(rootChild[6]);
function btmMeun(rootChild) {
  let menuChild = [];
  styleCreate(rootChild, targetStyle.bottomMenu);

  for (let i = 0; i < 6; i++) {
    let child = tagCreate("div", {});
    rootChild.appendChild(child);
    if(i === 5) {
      styleCreate(child, {
        width: "50px",
        height: "50px",
        backgroundColor: "#F7786B",
        color: "white",
        borderRadius: "50%",
        cursor: "pointer",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "200",
        right: "20px",
        top: "-100%",
        transform: "translate(0, 50%)",
        position: "absolute",
      });
      child.onclick = () => {
        window.scrollTo(0, 0);
      }
    } else {
      styleCreate(child, {
        width: "59px",
        height: "59px",
        backgroundColor: "#FDFDFD",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        transition: "scale ease 0.3s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "13px",
        fontWeight: "500",
        position: "relative",
      });
      child.onmouseover = () => {
        child.style.scale = "1.1";
      };
      child.onmouseout = () => {
        child.style.scale = "1";
      };
    }
    menuChild.push(child);
  }
  menuChild[2].id = "mapBtn";
  menuChild[5].id = "goTop";

  menuChild[0].innerText = "댕댕마켓";
  menuChild[1].innerText = "댕스타";
  menuChild[2].innerText = "댕맵";
  menuChild[3].innerText = "댕톡";
  menuChild[4].innerText = "댕프랜드";
  menuChild[5].innerText = "⇧";

  menuChild[3].id='dangtalkButton'

  const jwt = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  fetch("http://43.201.52.54:2080/bottomMenuUnreadCircle", {
    method: "POST",
    body: jwt,
  })
    .then((response) => response.json())
    .then((result) => {
      let cnt = 0;
      for (let i of result) {
        cnt += i.unread;
      }
      if (cnt > 0) {
        let unread = tagCreate("div");
        styleCreate(unread, targetStyle.unreadCircle);
        menuChild[3].appendChild(unread);
        unread.innerText = cnt;
      }
    });

  menuChild[0].addEventListener("click", () => {
    window.location = "/secondHand";
  });
  menuChild[1].addEventListener("click", () => {
    window.location = "/dangstar";
  });
  menuChild[2].addEventListener("click", () => {
    window.location = "/map";
  });
  menuChild[3].addEventListener("click", () => {
    window.location = "/dangTalkChatList";
  });
  menuChild[4].addEventListener("click", () => {
    window.location = "/friendsList";
  });
}
