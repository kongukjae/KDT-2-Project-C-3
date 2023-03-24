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
  addMarker(latlng);
  let wrap = [];
  wrap.push(latlng.getLat(), latlng.getLng());
  result.push(wrap);

  const xhr = new XMLHttpRequest(); //XMLHttpRequest 객체 생성
  xhr.open("POST", "https://localhost:2080/postcheck"); //HTTP Method, URL 정의
  xhr.setRequestHeader("content-type", "application/json; charset=UTF-8"); //헤더 값 중 content-type 정의
  xhr.send(result); // 요청 전송
  xhr.onload = () => {
    if (xhr.status === 201) {
      // POST 요청이 정상적으로 성공이 되면 201
      const res = JSON.parse(xhr.response); // 응답 데이터를 JSON.parse 함수로 JSON 객체로 변경
      console.log(res); //
    } 
    else {
      // 에러 발생
      console.error(xhr.status, xhr.statusText); //응답 상태와 응답 메시지를 출력
    }
  };
});

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
console.log(result);