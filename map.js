var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
  center: new kakao.maps.LatLng(37.56682, 126.97865), // 지도의 중심좌표
  level: 3, // 지도의 확대 레벨
  mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
};
// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);

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
  var marker = new kakao.maps.Marker({
      position: position
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
  
  // 생성된 마커를 배열에 추가합니다
  markers.push(marker);
}

