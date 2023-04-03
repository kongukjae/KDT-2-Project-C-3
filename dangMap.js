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
  styleCreate(root,{
    width : "500px",
    height : "100vh",
    margin : "auto",
    display : "flex",
    flexDirection : "column",
    position : "relative"
  })


  let rootChild = [];
  for(let i = 0;i<3;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }

  styleCreate(rootChild[0],{
    width : "100%",
    height : "85vh",
    position : "relative",

  })
  rootChild[0].id = "map"
  styleCreate(rootChild[1],{
    width : "100%",
    height : "15vh",
    position : "relative",
    backgroundColor : "lightgray"
  })
  styleCreate(rootChild[2],{
    width : "500px",
    height : "90px",
    position : "fixed",
    bottom : "0px",
    backgroundColor : "#F7786B",
    display : "flex",
    justifyContent: "space-around",
    alignItems : "center",
    zIndex : "2"
  })

let mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
  center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
  level: 7, // 지도의 확대 레벨
  mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
};
// 지도를 생성한다
let map = new kakao.maps.Map(mapContainer, mapOption);

//  이미지 링크 생성을 해서 넣으니까 되었다.
let imageSrc = 'https://i.ibb.co/zR5p1G9/dogpaw.png', // 마커이미지의 주소입니다    
imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
// imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다.
imageOption = {offset: new kakao.maps.Point(15, 15)}; // 마커이미지의 옵션입니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
markerPosition = new kakao.maps.LatLng(36.35, 127.385); // 마커가 표시될 위치입니다

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
  console.log("latlng 확인");
  console.dir(latlng);
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
  console.log("marker 찍을 때 좌표");
  console.dir(marker.n);

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
  // 마커를 드래그 가능하도록 설정
  marker.setDraggable(true);
  
  // 생성된 마커를 배열에 추가합니다
  // markers.push(marker);

  // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
  // function setMarkers(map) {
    // for (let i = 0; i < markers.length; i++) {
        // markers[i].setMap(map);
    // }            
  // }
  // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
  const iwContent = '<div style="padding:5px;">HTML 이용해서 오버레이 구현</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
  
  // 인포윈도우를 생성합니다
  let infowindow = new kakao.maps.InfoWindow({
  content : iwContent,
  removable : iwRemoveable
  });
  
  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function() {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow.open(map, marker);  
  });

  let dragLat;
  let dragLng;
  // 마커를 이동시켰을 때 마커의 좌표가 변경 되도록 설정
  // 1. 마커를 드래그 시킬 때 드래그 되는 마커가 어떤 마커인지 식별 필요
  // 2. 마커를 드래그해서 mouseup 되는 순간 식별된 마커의 좌표값을 update
  kakao.maps.event.addListener(marker, 'dragstart', function() { // 드래그가 시작되는 시점에 동작
    // 마커의 현재 좌표를 저장
    let latlng = marker.getPosition();
    dragStartLat = latlng.getLat();
    dragStartLng = latlng.getLng();
  });

  kakao.maps.event.addListener(marker, 'dragend', function() { // 드래그가 끝나는 시점에 동작
    // 드래그가 끝난 지점의 좌표를 불러옴
    let latlng = marker.getPosition();
    let wrap = [];
    // 배열에 [이동된 위도 좌표, 이동된 경도 좌표, 사용자id, 이동하기 전 위도 좌표, 이동하기 전 경도 좌표] 를 저장
    wrap.push(latlng.getLat(), latlng.getLng(), cookieId, dragStartLat, dragStartLng);
    // 배열을 객체에 담음
    resultObject[0] = wrap;

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", `http://localhost:2080/dragMarker`, true);
    // 객체를 JSON 형식으로 바꿔서 서버로 전송
    httpRequest.send(JSON.stringify(resultObject));
  });
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


  // 검색창
  let searchBarWrap = tagCreate("div");
  styleCreate(searchBarWrap, {
    width : "300px",
    height : "40px",
    top : "45px",
    left: "50%",
    position : "absolute",
    marginLeft: "-150px",
    zIndex : "3",
    display : "flex",
    alignItems : "center"
  })
  root.appendChild(searchBarWrap)
  let searchBar = tagCreate("input",{type : "text"});
  searchBarWrap.appendChild(searchBar);
  styleCreate(searchBar, {
    width : "100%",
    height : "100%",
    border : "1px lightgray solid",
    paddingLeft : "20px",
    paddingright : "50px",
    borderRadius : "20px",
    backgroundColor : "white",
    position : "absolute"
  })
  let searchButton = tagCreate("div",{innerText : "search"});
  searchBarWrap.appendChild(searchButton);
  styleCreate(searchButton, {
    width : "80px",
    height : "30px",
    borderRadius : "15px",
    backgroundColor : "#F7786B",
    position : "relative",
    left : "210px",
    color : "white",
    cursor : "pointer",
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
    paddingBottom : "3px"
  })
  // searchButton.addEventListener("click",()=>{
  //   searchBarFunc()
  // })
  // function searchBarFunc(searchValue){
  //   // 장소 검색 객체를 생성합니다
  //   var ps = new kakao.maps.services.Places(); 
  
  //   // 키워드로 장소를 검색합니다
  //   ps.keywordSearch(searchValue, placesSearchCB); 
  // }

  // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  // function placesSearchCB (data, status, pagination) {
  //     if (status === kakao.maps.services.Status.OK) {

  //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //         // LatLngBounds 객체에 좌표를 추가합니다
  //         var bounds = new kakao.maps.LatLngBounds();

  //         for (var i=0; i<data.length; i++) {
  //             displayMarker(data[i]);    
  //             bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //         }       

  //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //         map.setBounds(bounds);
  //     } 
  // }

  // // 지도에 마커를 표시하는 함수입니다
  // function displayMarker(place) {
      
  //     // 마커를 생성하고 지도에 표시합니다
  //     var marker = new kakao.maps.Marker({
  //         map: map,
  //         position: new kakao.maps.LatLng(place.y, place.x) 
  //     });

  //     // 마커에 클릭이벤트를 등록합니다
  //     kakao.maps.event.addListener(marker, 'click', function() {
  //         // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
  //         infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
  //         infowindow.open(map, marker);
  //     });
  // }


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