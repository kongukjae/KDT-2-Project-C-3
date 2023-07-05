let mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
    level: 5, // 지도의 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };



mapContainer.addEventListener("wheel", function (e) {
  // 지도 위에서 휠 이벤트가 발생했을 때
  e.preventDefault();
  console.log(e.deltaY); // e.deltaY => 휠 방향 감지[양수: 휠 내림 / 음수: 휠 올림]
  let mapLevel = map.getLevel(); // 지도의 현재 확대 레벨을 가져옴
  console.log(mapLevel);

  if (e.deltaY > 0) {
    // 휠을 내릴 때 => 지도를 축소 할 때
    if (mapLevel >= 6) {
      // 지도의 확대 레벨이 6보다 크거나 같으면
      map.setLevel(6); // 확대/축소 제한
    } else {
      // 지도의 확대 레벨이 6보다 작으면 확대/축소 제한 없음
      map.setLevel(mapLevel + 1);
    }
  } else {
    // 휠을 올릴 때 => 지도를 확대 할 때
    map.setLevel(mapLevel - 1); // 확대/축소 제한 없음
  }
});
console.log(mapOption.level);
// 지도를 생성한다
let map = new kakao.maps.Map(mapContainer, mapOption);
map.setZoomable(false);

//  이미지 링크 생성을 해서 넣으니까 되었다.
let imageSrc = 'https://i.ibb.co/r3LdZHX/dogpaw.png';
let otImageSrc = 'https://i.ibb.co/H7Dfx8v/ot-dogpaw.png';

// 마커이미지의 주소입니다    
imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
// imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다.
imageOption = {offset: new kakao.maps.Point(15, 15)}; // 마커이미지의 옵션입니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
let otMarkerImage = new kakao.maps.MarkerImage(otImageSrc, imageSize, imageOption);
markerPosition = new kakao.maps.LatLng(36.35, 127.385); // 마커가 표시될 위치입니다

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
let markers = [];
// let latlng = mouseEvent.latLng;
//let result = [];
let resultObject = {};
let cnt = 0;
const cookieId = document.cookie.split("=")[1].split(";")[0];
// kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
//   // 클릭한 위치에 마커를 표시합니다
//   let latlng = mouseEvent.latLng;
//   let wrap = [];
//   addMarker(latlng);
//   wrap.push(latlng.getLat(), latlng.getLng(), cookieId);
//   //result.push(wrap);
//   //console.log("result: " + result);
//   // resultObject[cnt] = wrap;
//   resultObject[0] = wrap;
//   //console.log(resultObject);
//   //cnt++;
//   //console.log("cnt = " + cnt);

//   const httpRequest = new XMLHttpRequest();
//   httpRequest.open("POST", `http://15.165.220.45:2080/menuMap`, true);
//   // httpRequest.send(`re1=${result[0]}`);
//   httpRequest.send(JSON.stringify(resultObject)); //객체를 json으로 변환해서 서버로 전송
// });

loadMarker(addMarker);
wholeMarker(wholeAddMarker);


// 마커 하나를 지도위에 표시합니다
//addMarker(new kakao.maps.LatLng(33.450701, 126.570667));

// 마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position) {
  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: position, // 마커를 표시할 위치
    image: markerImage,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 생성된 마커를 배열에 추가합니다
  // markers.push(marker);

  // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
  function setMarkers(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
}

function wholeAddMarker(position) {
  
  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: position, // 마커를 표시할 위치
    image: otMarkerImage
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

function loadMarker(callback) {
  let res;
  const xhr = new XMLHttpRequest();
  const cookieId = document.cookie.split("=")[1].split(";")[0];
  xhr.open("GET", `http://15.165.220.45:2080/loadMap?id=${cookieId}`);
  // httpRequest.send(`re1=${result[0]}`);
  xhr.send();
  xhr.addEventListener("load", function () {
    res = JSON.parse(xhr.response);
    // res = xhr.response;
    for (const key in res) {
      // console.log(res);
      callback(
        new kakao.maps.LatLng(parseFloat(res[key][0]), parseFloat(res[key][1]))
      );
    }
    console.log(res);
    console.log("정상적으로 지도에 표시됨");
  });
}

  
  function wholeMarker(callback){
    let wres;
    const xhr = new XMLHttpRequest();
    const cookieId = document.cookie.split("=")[1].split(";")[0];
    xhr.open("GET", `http://15.165.220.45:2080/wholeFootprint?id=${cookieId}`);
    // httpRequest.send(`re1=${result[0]}`);
    xhr.send(); 
    xhr.addEventListener('load', function(){
      wres = JSON.parse(xhr.response); // 응답
      let wholeResult = {};
      console.log(wres);
      for(const key in wres){
        //console.log(typeof(parseFloat(res['0'][0])))
        callback(new kakao.maps.LatLng(parseFloat(wres[key][0]), parseFloat(wres[key][1])));
        if(wres[key][2] !== cookieId) {
          imageSrc = "#abbbbb";
        }
      }
        
      console.log("정상적임");
    });
    
  }
// ----- dangMap.js에 내 발자국만 출력되서 임시로 map.js에서 실험

// 토글용 변수
// let toggleVar = false;

// 테스트용 임시 버튼
// let testDiv = tagCreate("div", {});
// styleCreate(testDiv, {
//   width: "50px",
//   height: "50px",
//   position: "absolute",
//   top: "0",
//   left: "0",
//   backgroundColor: "black",
//   zIndex: "10",
// })
// mapContainer.appendChild(testDiv);

// 임시 버튼이 눌렸을 경우 setMarkers()를 이용해 마커를 숨기거나 표시함
// testDiv.addEventListener('click', function(){
// if(toggleVar){
//     setMarkers(map);
//     toggleVar = false;
//   } else {
//     setMarkers(null);
//     toggleVar = true;
//   }
// })

// 사용 안하고 있던 markers 배열 사용
// 내 발자국의 경우 마커가 찍힐 때 markers에 push하지 않음
// 친구 발자국 및 타인 발자국의 경우 마커가 찍힐 때 markers에 push함
// markers 배열에는 내 발자국을 제외한 친구 + 타인의 발자국의 정보만 들어있음 => 반복문을 통해 setMap(null) 혹은 setMap(map)으로 숨기거나 표시함 
// function setMarkers(map) {
//   for (let i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//   }
// }