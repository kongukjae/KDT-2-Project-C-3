let root = tagCreate("div", { id: "market" });
document.body.appendChild(root);
styleCreate(root, market.root);
let rootChild = [];
for (let i = 0; i < 3; i++) {
  let child = tagCreate("div", { id: i });
  root.appendChild(child);
  rootChild.push(child);
}
// 글쓰기 작성 페이지
let add = tagCreate("div", {});
rootChild[2].appendChild(add);
styleCreate(add, market.addWrite);
add.innerText = "✏"

add.addEventListener("click",() =>{

  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
 
  let addForm = document.createElement('form');
  addForm.method = "POST"
  addForm.action = "/mykoop";
  let params = {jwt:token, targetId:"mine"}
  for(let key in params){
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type","hidden");
    hiddenField.setAttribute("name",key);
    hiddenField.setAttribute("value",params[key]);
    addForm.appendChild(hiddenField);
}
document.body.appendChild(addForm);
addForm.submit();
}); 




topMenu(rootChild[0]);
createHamburger(root);

styleCreate(rootChild[1], market.listContainer);
function makeList(nth) {
  loadSecondHandBoard(nth);
}

makeList(0);

function createSecondHandList(result, count) {
  let child = tagCreate("a", {id: 'index'+count});
  child.href = `/secondHandPost?nth=${count}`;
  let mother = document.getElementById("1");
  mother.appendChild(child);
  styleCreate(child, market.listBox);

  let listImgChild = tagCreate("div", {});
  child.appendChild(listImgChild);
  styleCreate(listImgChild, market.listImg);

  let listTextChild = tagCreate("div", {});
  child.appendChild(listTextChild);
  styleCreate(listTextChild, market.listText);

  let title = tagCreate("div", {});
  listTextChild.appendChild(title);
  styleCreate(title, market.listTitle);
  title.innerText = result.title;

  let text = tagCreate("div", {});
  listTextChild.appendChild(text);
  styleCreate(text, market.listElementText);
  text.innerText = result.detail;
}

function loadSecondHandBoard(nth) {
  let nextIndex = (nth * 5) - 1;
  fetch(`http://localhost:2080/loadSecondHandBoard?nth=${nth}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      for (let i of result) {
        nextIndex = nextIndex + 1;
        createSecondHandList(i, nextIndex);
      }
    });
}
// 하단 메뉴바
btmMeun(rootChild[2])
