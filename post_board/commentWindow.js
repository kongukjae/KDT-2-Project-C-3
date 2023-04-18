

//댓글 창 만드는 함수
function commentWindow(index, cmtNumber, root) {
  //console.log("ddddddddddddddddddddddd")
  let cmtModal = tagCreate("div", { id: "cmtModal" });
  root.children[index + 1].appendChild(cmtModal);
  styleCreate(cmtModal, {
    width: "500px",
    backgroundColor: "#E6E6E6",
    display: "none",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "100px",
  });

  let closeWrap = tagCreate("div", {});
  cmtModal.appendChild(closeWrap);
  styleCreate(closeWrap, {
    width: "100%",
    height: "15px",
  });

  let closeBtn = tagCreate("button", { id: "closeBtn" });
  cmtModal.appendChild(closeBtn);
  styleCreate(closeBtn, {
    width: "15px",
    height: "20px",
    backgroundColor: "#E6E6E6",
    lineHeight: 1,
    position: "absolute",
    top: "3px",
    right: "5px",
    border: "0px",
    appearance: "none",
    borderRadius: "4px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",
    fontWeight: "700",
  });
  closeBtn.innerText = "X";

  for (let i = 0; i < cmtNumber; i++) {
    let cmt = tagCreate("div", {});
    cmtModal.appendChild(cmt);
    styleCreate(cmt, {
      width: "100%",
      height: "80px",
      display: "flex",
      justifyContent: "spaceBetween",
      alignItems: "center",
      borderBottom: "1px solid black",
    });

    let imgChild = tagCreate("div", {});
    cmt.appendChild(imgChild);
    styleCreate(imgChild, {
      width: "15%",
      height: "95%",
      border: "1px solid black",
      margin: "10px",
      borderRadius: "50%",
    });

    let textChild = tagCreate("div", {});
    cmt.appendChild(textChild);
    styleCreate(textChild, {
      width: "80%",
      height: "95%",
      //border: "1px solid black",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    });

    let userName = tagCreate("div", {});
    textChild.appendChild(userName);
    styleCreate(userName, {
      width: "100%",
      height: "25px",
      //border: "1px solid black",
      padding: "5px",
      fontSize: "16px",
      fontWeight: "700",
    });
    userName.innerText = "몽뭉이";

    let comment = tagCreate("div", {});
    textChild.appendChild(comment);
    styleCreate(comment, {
      width: "100%",
      height: "65px",
      //border: "1px solid black",
      padding: "5px",
      fontSize: "12px",
    });
    comment.innerText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  }

  let commentBtn = document.getElementById(`index_${index}`);

  commentBtn.addEventListener("click", function () {
    cmtModal.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    console.log("닫기");
    cmtModal.style.display = "none";
  });
}
