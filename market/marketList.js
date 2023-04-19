function tagCreate(tType, props) {
  let element = document.createElement(tType);
  for (let i in props) {
    element[i] = props[i];
  }
  return element;
}

function styleCreate(obj, styleOb) {
  for (i in styleOb) {
    obj.style[i] = styleOb[i];
  }
}

//댕댕마켓 게시글 리스트 스타일
// const marketListStyle = {
//   root: {
//     width: '500px',
//     height: '1000px',
//     margin: "auto",
//     display: "flex",
//     flexDirection: "column",
//     //position: "relative"
//   }
// }

let root = tagCreate("div", { id: "market" });
document.body.appendChild(root);
styleCreate(root, marketListStyle.root);
let rootChild = [];
for (let i = 0; i < 3; i++) {
  let child = tagCreate("div", { id: i });
  root.appendChild(child);
  rootChild.push(child);
}

let add = tagCreate("div", {});
root.appendChild(add);
styleCreate(add, {
  width: "50px",
  height: "50px",
  position: "relative",
  backgroundColor: "#F7786B",
  bottom: "60px",
  left: "430px",
  zIndex: "2",
  borderRadius: "30px",
  textAlign: "center",
})
add.innerText = "글"

topMenu(rootChild[0]);
createHamburger(root);


styleCreate(rootChild[1], {
  width: "100%",
  height: "730px",
  border: "1px solid red",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  zIndex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
// function makeList(nth) {
//   loadSecondHandBoard(nth);
// }
loadSecondHandBoard(0);

// makeList(0);

function createSecondHandList(result, count) {
  let child = tagCreate("div", {id : 'selectIndex'+count});
  let mother = document.getElementById("1");
  mother.appendChild(child);
  styleCreate(child, {
    width: "80%",
    height: "200px",
    border: "1px solid black",
    margin: "10px 0 10px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  let listImgChild = tagCreate("div", {});
  child.appendChild(listImgChild);
  styleCreate(listImgChild, {
    width: "100px",
    height: "100px",
    border: "1px solid black",
    margin: "5px",
  });
  let listTextChild = tagCreate("div", {});
  child.appendChild(listTextChild);
  styleCreate(listTextChild, {
    width: "300px",
    height: "100px",
    //border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });


  let title = tagCreate("div", {});
  listTextChild.appendChild(title);
  styleCreate(title, {
    width: "95%",
    height: "30%",
    //border: "1px solid black",
    margin: "3px 0 3px 0",
    fontSize: "20px",
    fontWeight: "700",
  });
  title.innerText = result.title;

  let text = tagCreate("div", {});
  listTextChild.appendChild(text);
  styleCreate(text, {
    width: "95%",
    height: "70%",
    //border: "1px solid black",
    marginBottom: "3px",
  });
  text.innerText = result.detail;
}

function loadSecondHandBoard(nth) {
  let countIndex = -1;
  fetch(`http://localhost:2080/loadSecondHandBoard?nth=${nth}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result)
      for (let i of result) {
        countIndex = countIndex + 1;
        createSecondHandList(i, countIndex);
      }
    });
}

// function selectSecondHandPost(nth, index) {
//   fetch(`http://localhost:2080/secondHandPost?nth=${nth}&index=${index}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       return result;
//     })
// }


// 하단 메뉴바
styleCreate(rootChild[2], {
  width: "500px",
  height: "90px",
  position: "fixed",
  bottom: "0px",
  backgroundColor: "#F7786B",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  zIndex: "2",
});
