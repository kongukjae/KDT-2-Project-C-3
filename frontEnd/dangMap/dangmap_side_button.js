function sideButton(){
  const root = document.getElementById('root');

  const sideBtn = tagCreate("div", {});
  root.appendChild(sideBtn);
  styleCreate(sideBtn, dangMapStyle.sideBtnStyle);

  const serch = tagCreate("div", {});
  const orgChat = tagCreate("div", {id:'SideButtonforPublicTalk'});

  styleCreate(serch, dangMapStyle.serchBtnStyle)
  serch.innerText = "검색"
  styleCreate(orgChat, dangMapStyle.orgChatBtnStyle)
  orgChat.innerText = "단톡"


  //검색창 레이아웃
  let searchBarWrap = tagCreate("div");
  styleCreate(searchBarWrap, dangMapStyle.menuMapSearchBarWrap);
  root.appendChild(searchBarWrap);
  let searchBar = tagCreate("input", { id: 'searchBar', type: "text" });
  searchBarWrap.appendChild(searchBar);
  styleCreate(searchBar, dangMapStyle.menuMapSearchBar);
  let searchButton = tagCreate("div", { id: 'searchButton', innerText: "search" });
  searchBarWrap.appendChild(searchButton);
  styleCreate(searchButton, dangMapStyle.menuMapSearchButton);

  searchBarWrap.style.display = 'none';


  let tg = true;
  sideBtn.addEventListener('click', function(){
    if(tg){
      sideBtn.appendChild(serch);
      sideBtn.appendChild(orgChat);

      tg = false;
    }
    else if(!tg){
      sideBtn.removeChild(serch);
      sideBtn.removeChild(orgChat);
      tg = true;
    }

  })
  
  serch.addEventListener('click', function(){
    root.children[3].style.display = 'none';
    searchBarWrap.style.display = ''

    searchButton.addEventListener("click", () => {
      // 키워드로 장소를 검색합니다
      //ps.keywordSearch(searchBar.value, placesSearchCB);
      root.children[3].style.display = '';
      root.children[3].children[1].style.marginTop = "5px",

      root.children[5].style.display = 'none';
    
    });
    searchBar.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        //ps.keywordSearch(searchBar.value, placesSearchCB);
        root.children[3].style.display = '';
        root.children[5].style.display = 'none';
    
      }
    });
    
  })
  return [serch,orgChat];
}

