
function tagCreate(tType,props){
  let element = document.createElement(tType);
  for(let i in props){
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj,styleOb){
  for(i in styleOb){
    obj.style[i] = styleOb[i];
  }
}

function map(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,targetStyle.menuMapRoot)


  let rootChild = [];
  for(let i = 0;i<3;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }

  styleCreate(rootChild[0],targetStyle.menuMap)
  rootChild[0].id = "map"
  styleCreate(rootChild[1],targetStyle.menuMapSlide)

  rootChild[1].id = "slide"
  styleCreate(rootChild[2],targetStyle.bottomMenu)

let mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
  center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
  level: 7, // 지도의 확대 레벨
  mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
};
// 지도를 생성한다
let map = new kakao.maps.Map(mapContainer, mapOption);

//  이미지 링크 생성을 해서 넣으니까 되었다.
let imageSrc = 'https://i.ibb.co/zR5p1G9/dogpaw.png'; // 마커이미지의 주소입니다
let frImageSrc = 'https://i.ibb.co/3FMRQCr/fr-dogpaw.png'
imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
// imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다.
imageOption = {offset: new kakao.maps.Point(15, 15)}; // 마커이미지의 옵션입니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
let frMarkerImage = new kakao.maps.MarkerImage(frImageSrc, imageSize, imageOption);
// markerPosition = new kakao.maps.LatLng(36.35, 127.385); // 마커가 표시될 위치입니다

  // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
  let markers = [];
  // let latlng = mouseEvent.latLng;
  //let result = [];
  let resultObject = {};
  let cnt = 0;
  const cookieId = document.cookie.split("=")[1];
  kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    // 클릭한 위치에 마커를 표시합니다
    let latlng = mouseEvent.latLng;
    let wrap = [];
    addMarker(latlng);
    wrap.push(latlng.getLat(), latlng.getLng(), cookieId)
    //result.push(wrap);
    //console.log("result: " + result);
    // resultObject[cnt] = wrap;
    resultObject[0] = wrap;
    //console.log(resultObject);
    //cnt++;
    //console.log("cnt = " + cnt);

  const httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", `http://localhost:2080/menuMap`, true);
  // httpRequest.send(`re1=${result[0]}`);
  httpRequest.send(JSON.stringify(resultObject)); //객체를 json으로 변환해서 서버로 전송
});



loadMarker(addMarker);
frMarker(frAddMarker);


  // 마커 하나를 지도위에 표시합니다 
  //addMarker(new kakao.maps.LatLng(33.450701, 126.570667));

  // 마커를 생성하고 지도위에 표시하는 함수입니다
  function addMarker(position) {
    
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position, // 마커를 표시할 위치
      image: markerImage
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    // 마커가 드래그 가능하도록 설정
    marker.setDraggable(true); 
    
    // 생성된 마커를 배열에 추가합니다
    markers.push(marker);

  // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
  function setMarkers(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
  }

  /* 오버레이 구현중
  kakao.maps.event.addListener(marker, 'click', function() {
    console.log("오버레이 실행");

    let content = `
  <div class="wrap" style="position: absolute;left: 0;bottom: 10px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;"> 
    <div class="info" style="width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;">
      <div class="title" style="padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;">
        강아지 이름
        <button class="close" title="닫기" style="position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px; cursor: pointer;">X</button>
      </div>
      <div class="body" style="border: 0;box-shadow: 0px 1px 2px #888; position: relative;overflow: hidden;">
        <div class="img">
          <img src="" alt="강아지 사진" width="70" height="70" border-radius="35">
        </div> 
        <div class="desc" stlye="position: relative;margin: 13px 0 0 90px;height: 75px;">
          <p class="ellipsis">xx분 전</p>
          <button>프로필 보기</button>
          <button>팔로우</button>
        </div>
      </div>
    </div>
  </div>`;
  const closeBtn = document.querySelector('close');
  console.dir(closeBtn);

  let overlay = new kakao.maps.CustomOverlay({
    content: content,
    // map: map,
    position: marker.getPosition()       
  });

  overlay.setMap(map);

  function closeOverlay() {
    overlay.setMap(null);     
  }

  // kakao.maps.event.addListener(map, 'click', function() {
  //   content = ``;
  // })

  // root.child[0].addEventListener('click', function() {
  //   content = ``;
  // });

  }); */

  let dragStartLat;
  let dragStartLng;
  // 마커를 이동시켰을 때 마커의 좌표가 변경 되도록 설정
  // 1. 마커를 드래그 시킬 때 드래그 되는 마커가 어떤 마커인지 식별 필요
  // 2. 마커를 드래그해서 mouseup 되는 순간 식별된 마커의 좌표값을 update
  kakao.maps.event.addListener(marker, 'dragstart', function() { // 드래그가 시작되는 시점에 동작
    // 마커의 현재 좌표를 저장
    let latlng = marker.getPosition();
    dragStartLat = latlng.getLat().toFixed(13);
    dragStartLng = latlng.getLng().toFixed(13);
    console.log('이동 전 lat 2 =' + dragStartLat);
    console.log('이동 전 lng 2 =' + dragStartLng);
  });

  kakao.maps.event.addListener(marker, 'dragend', function() { // 드래그가 끝나는 시점에 동작
    // 드래그가 끝난 지점의 좌표를 불러옴
    let latlng = marker.getPosition();
    console.log('이동 후 lat ' + latlng.getLat().toFixed(17))
    console.log('이동 후 lng ' + latlng.getLng().toFixed(17))
    let wrap = [];
    // 배열에 [이동된 위도 좌표, 이동된 경도 좌표, 사용자id, 이동하기 전 위도 좌표, 이동하기 전 경도 좌표] 를 저장
    wrap.push(latlng.getLat().toFixed(13), latlng.getLng().toFixed(13), cookieId, dragStartLat, dragStartLng);
    // 배열을 객체에 담음
    resultObject[0] = wrap;

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", `http://localhost:2080/dragMarker`, true);
    // 객체를 JSON 형식으로 바꿔서 서버로 전송
    httpRequest.send(JSON.stringify(resultObject));
  });

}

function frAddMarker(position) {
  
  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: position, // 마커를 표시할 위치
    image: frMarkerImage
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
  
  // 생성된 마커를 배열에 추가합니다
  markers.push(marker);

  // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
  function setMarkers(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
  }
}

  function loadMarker(callback){
    let res;
    const xhr = new XMLHttpRequest();
    const cookieId = document.cookie.split("=")[1];
    xhr.open("GET", `http://localhost:2080/loadMap?id=${cookieId}`);
    // httpRequest.send(`re1=${result[0]}`);
    xhr.send(); 
    xhr.addEventListener('load', function(){
      res = JSON.parse(xhr.response);
      //res = xhr.response;
      for(const key in res){
        //console.log(typeof(parseFloat(res['0'][0])))
        callback(new kakao.maps.LatLng(parseFloat(res[key][0]), parseFloat(res[key][1])));
      }
        
        console.log("정상적으로 지도에 표시됨");
      });
    }

  function frMarker(callback){
    let res2;
    const xhr = new XMLHttpRequest();
    const cookieId = document.cookie.split("=")[1];
    xhr.open("GET", `http://localhost:2080/frFootprint?id=${cookieId}`);
    // httpRequest.send(`re1=${result[0]}`);
    xhr.send(); 
    xhr.addEventListener('load', function(){
      res2 = JSON.parse(xhr.response); // 응답
      let frResult = {};
      console.log(res2);
      // for(let i of res2){
      //   let frWrap = [];
      //   frWrap.push(i.latitude, i.longitude)
      //   console.log(frWrap);
      //   callback(new kakao.maps.LatLng(parseFloat(frWrap[i][0]), parseFloat(frWrap[i][1])));
      //   frResult[0] = frWrap;
      //   console.log(frResult);
      // }
      // //res = xhr.response;
      for(const key in res2){
        //console.log(typeof(parseFloat(res['0'][0])))
        callback(new kakao.maps.LatLng(parseFloat(res2[key][0]), parseFloat(res2[key][1])));
        if(res2[key][2] !== cookieId) {
          imageSrc = "#abbbbb";
        }
      }
        
      console.log("정상적");
    });
    
    }


  // 검색창
  let searchBarWrap = tagCreate("div");
  styleCreate(searchBarWrap, targetStyle.menuMapSearchBarWrap)
  root.appendChild(searchBarWrap)
  let searchBar = tagCreate("input",{type : "text"});
  searchBarWrap.appendChild(searchBar);
  styleCreate(searchBar, targetStyle.menuMapSearchBar)
  let searchButton = tagCreate("div",{innerText : "search"});
  searchBarWrap.appendChild(searchButton);
  styleCreate(searchButton, targetStyle.menuMapSearchButton)
  let infowindow = new kakao.maps.InfoWindow({zIndex:1});
  let ps = new kakao.maps.services.Places(); 

  function clearMarkers(arr){
    for(let i of arr){
      i.setMap(null);
    }
  }

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          let bounds = new kakao.maps.LatLngBounds();
          clearMarkers(searchMarkers);
          for (let i=0; i<data.length; i++) {
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
          position: new kakao.maps.LatLng(place.y, place.x) 
      });
      searchMarkers.push(marker);
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          infowindow.open(map, marker);
      });
  }
  searchButton.addEventListener("click",()=>{
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchBar.value, placesSearchCB); 
  })
  searchBar.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
      ps.keywordSearch(searchBar.value, placesSearchCB); 
    };
  })

  // 하단 메뉴
  let menuChild = [];
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    rootChild[2].appendChild(child);
    styleCreate(child,{
      width : "59px",
      height : "59px",
      backgroundColor : "#FDFDFD",
      borderRadius : "5px",
      cursor : "pointer",
      boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      transition : "scale ease 0.3s",
      display : "flex",
      justifyContent: "center",
      alignItems : "center",
      fontSize : "13px",
      fontWeight : "500"
    })
    child.onmouseover = ()=>{
      child.style.scale = "1.1"
    }
    child.onmouseout = ()=>{
      child.style.scale = "1"

    }
    menuChild.push(child);
  }
  menuChild[0].innerText = "댕댕마켓";
  menuChild[1].innerText = "댕자랑";
  menuChild[2].innerText = "댕맵";
  menuChild[3].innerText = "댕톡";
  menuChild[4].innerText = "댕프랜드";

}


map()
