var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
  center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
  level: 3, // 지도의 확대 레벨
  mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
};
// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);

//  이미지 링크 생성을 해서 넣으니까 되었다.
let imageSrc = 'https://i.ibb.co/nrCwxNc/pngfind-10.png', // 마커이미지의 주소입니다    
imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
// imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다.
imageOption = {offset: new kakao.maps.Point(15, 15)}; // 마커이미지의 옵션입니다.
  
// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
markerPosition = new kakao.maps.LatLng(36.35, 127.385); // 마커가 표시될 위치입니다

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
var markers = [];
// var latlng = mouseEvent.latLng;
let result = [];
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
  // 클릭한 위치에 마커를 표시합니다
  let latlng = mouseEvent.latLng;
  let wrap = [];
  addMarker(latlng);
  wrap.push(latlng.getLat(), latlng.getLng())
  result.push(wrap);
  console.log(result);
});


// 마커 하나를 지도위에 표시합니다 
// addMarker(new kakao.maps.LatLng(33.450701, 126.570667));

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
  
  // 생성된 마커를 배열에 추가합니다
  markers.push(marker);

  // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
  function setMarkers(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}
}

