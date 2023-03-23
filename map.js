let mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
  center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
  level: 3, // 지도의 확대 레벨
  mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
};
// 지도를 생성한다
let map = new kakao.maps.Map(mapContainer, mapOption);



//  이미지 링크 생성을 해서 넣으니까 되었다.
let imageSrc = 'https://i.ibb.co/nrCwxNc/pngfind-10.png', // 개 발바닥 주소입니다.    
imageSize = new kakao.maps.Size(64, 69), // 개 발바닥의 크기입니다
imageOption = {offset: new kakao.maps.Point(27, 69)}; // 개 발의 옵션입니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
markerPosition = new kakao.maps.LatLng(37.56682, 126.97865); // 마커가 표시될 위치입니다



kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
  // 클릭한 위치에 마커를 표시합니다 
  addMarker(mouseEvent.latLng);             
});

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
let markers = [];

// 마커 하나를 지도위에 표시합니다 
addMarker(new kakao.maps.LatLng(33.450701, 126.570667));


// 마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position) {


  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: position, // 마커를 표시할 위치
    image: markerImage  // 개 발바닥 
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 생성된 마커를 배열에 추가합니다
  // markers 서버로..
  markers.push(marker);
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
  for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
  }            
}