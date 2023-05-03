function sideButton(map){
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

  function clearMarkers(arr) {
      for (let i of arr) {
        i.setMap(null);
      }
    }
    
    //키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        let bounds = new kakao.maps.LatLngBounds();
        clearMarkers(searchMarkers);
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
    
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
    let searchMarkers = [];
    
    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      searchMarkers.push(marker);
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
    
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    let ps = new kakao.maps.services.Places();
    const targetSearchBar = document.getElementById('searchBar');
    const targetSearchButton = document.getElementById('searchButton');
    
    
    targetSearchButton.addEventListener("click", () => {
      // 키워드로 장소를 검색합니다
      ps.keywordSearch(searchBar.value, placesSearchCB);
    
    });
    targetSearchBar.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        ps.keywordSearch(searchBar.value, placesSearchCB);
    
      }
    });
    
  

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
  
    
  })
  
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
  


  return [serch,orgChat];
}


 
