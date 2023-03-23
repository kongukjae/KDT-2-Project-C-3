var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
  center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
  level: 3, // 지도의 확대 레벨
  mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
};
// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);