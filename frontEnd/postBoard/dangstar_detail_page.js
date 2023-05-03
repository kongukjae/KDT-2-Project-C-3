const root = tagCreate("div", { id: "root" });
styleCreate(root, dangstarStyle.dangstarRoot);
document.body.appendChild(root);

// 탑 메뉴
const topMenuWrap = tagCreate("div", {});
root.appendChild(topMenuWrap);
topMenu(topMenuWrap);
createHamburger(root);

const postWrap = tagCreate("div", {id: "dangstarRoot"});
styleCreate(postWrap, dangstarStyle.dangstarFeedListWrap);
root.appendChild(postWrap);

// 바텀 메뉴
const btmMeunWrap = tagCreate("div", {});
root.appendChild(btmMeunWrap);
btmMeun(btmMeunWrap);

console.log("dldkfkdkkd:: ", datas)
console.log("dldkfkdkkd:: ")

// dangstarDetail();

function dangstarDetail(){

  // console.log("dldkfkdkkd:: ", link, id, text, idx, postIdx)

  // let xhr = new XMLHttpRequest();
  //   xhr.open("GET", `http://localhost:2080//postDetailDangstar`)
  //   xhr.send();
  //   xhr.addEventListener('load', ()=>{
  //     //postCreate(postWrap, "/image/image/default/null.png", "asdasd123", "hello", 1, 7)
  //     console.log("잘 왔다아아아앙아아아아ㅏㅏ")
  //   })
  
}


