let markers = [];
let markersObject = {
  userid : "",
  markers : {},
  //필요한 입력값 = [id, 4, marker];
  // arr[0] 값은 나와의 관계, 0 : 그냥친구, 1 : 즐찾친구, 2: 익명, 3: 본인
  set appendMarker(value){
    if(markersObject.markers[value[0]] === undefined){
      markersObject.markers[value[0]] = [value[1],[[value[2],value[3]]]];
    }else{
      markersObject.markers[value[0]][1].push([value[2],value[3]]);
    }
  }
};
let overlayChecker = false
function changeDate(date) {
  let nowDate = new Date(date);
  let formatDate = nowDate.toLocaleString();

  return formatDate;
}



function map() {
  let root = tagCreate("div", { id: "root" });
  document.body.appendChild(root);
  styleCreate(root, targetStyle.menuMapRoot);


  let rootChild = [];
  for (let i = 0; i < 3; i++) {
    let child = tagCreate("div", {});
    root.appendChild(child);
    rootChild.push(child);
  }

  styleCreate(rootChild[0], targetStyle.menuMap);
  rootChild[0].id = "map";
  styleCreate(rootChild[1], targetStyle.menuMapSlide);

  rootChild[1].id = "slide";
  styleCreate(rootChild[2], targetStyle.bottomMenu);


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
 let imageSrc = "https://i.ibb.co/zR5p1G9/dogpaw.png";
 (imageSize = new kakao.maps.Size(30, 30)), // 마커이미지의 크기입니다
   // imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다.
   (imageOption = { offset: new kakao.maps.Point(15, 15) }); // 마커이미지의 옵션입니다.

 // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
 let markerImage = new kakao.maps.MarkerImage(
   imageSrc,
   imageSize,
   imageOption
 );

  markerPosition = new kakao.maps.LatLng(36.35, 127.385); // 마커가 표시될 위치입니다

  // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
  let markers = [];
  // let latlng = mouseEvent.latLng;
  //let result = [];
  let resultObject = {};
  const cookieId = document.cookie.split("=")[1].split(";")[0];

  // map에 클릭 시 마커를 추가하고 데이터를 서버로 전송하는 함수
  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    // console.log("클릭 시 : " + overlayChecker);
    // 오버레이 창이 비활성화 되있을 경우에 동작
    if (overlayChecker === false) {
      // 클릭한 위치에 마커를 표시합니다
      let latlng = mouseEvent.latLng;
      let wrap = [];
      addMarker(latlng);
      wrap.push(latlng.getLat(), latlng.getLng(), cookieId);
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
    }
  });

  // 마커를 생성하고 지도위에 표시하는 함수입니다
  overlayChecker = false;
  function addMarker(position) {
    // 오버레이 창 열림/닫힘 체크 변수

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position, // 마커를 표시할 위치
      image: markerImage,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 생성된 마커를 배열에 추가
    markers.push(marker);
    // 마커가 드래그 가능하도록 설정
    marker.setDraggable(true);


//==============================================================================================
  


    



//=============================================================================================

    let dragStartLat;
    let dragStartLng;
    // 마커를 이동시켰을 때 마커의 좌표가 변경 되도록 설정
    // 1. 마커를 드래그 시킬 때 드래그 되는 마커가 어떤 마커인지 식별 필요
    // 2. 마커를 드래그해서 mouseup 되는 순간 식별된 마커의 좌표값을 update
    kakao.maps.event.addListener(marker, "dragstart", function () {
      // 드래그가 시작되는 시점에 동작
      // 마커의 현재 좌표를 저장
      let latlng = marker.getPosition();
      dragStartLat = latlng.getLat().toFixed(13);
      dragStartLng = latlng.getLng().toFixed(13);
      console.log("이동 전 lat " + dragStartLat);
      console.log("이동 전 lng " + dragStartLng);
    });

    kakao.maps.event.addListener(marker, "dragend", function () {
      // 드래그가 끝나는 시점에 동작
      // 드래그가 끝난 지점의 좌표를 불러옴
      let latlng = marker.getPosition();
      console.log("이동 후 lat " + latlng.getLat());
      console.log("이동 후 lng " + latlng.getLng());
      let wrap = [];
      // 배열에 [이동된 위도 좌표, 이동된 경도 좌표, 사용자id, 이동하기 전 위도 좌표, 이동하기 전 경도 좌표] 를 저장
      wrap.push(
        latlng.getLat().toFixed(13),
        latlng.getLng().toFixed(13),
        cookieId,
        dragStartLat,
        dragStartLng
      );
      // 배열을 객체에 담음
      resultObject[0] = wrap;

      const httpRequest = new XMLHttpRequest();
      httpRequest.open("POST", `http://localhost:2080/dragMarker`, true);
      // 객체를 JSON 형식으로 바꿔서 서버로 전송
      httpRequest.send(JSON.stringify(resultObject));
    });
    return marker;
  }

  

 
  // 검색창
  let searchBarWrap = tagCreate("div");
  styleCreate(searchBarWrap, targetStyle.menuMapSearchBarWrap);
  root.appendChild(searchBarWrap);
  let searchBar = tagCreate("input", { type: "text" });
  searchBarWrap.appendChild(searchBar);
  styleCreate(searchBar, targetStyle.menuMapSearchBar);
  let searchButton = tagCreate("div", { innerText: "search" });
  searchBarWrap.appendChild(searchButton);
  styleCreate(searchButton, targetStyle.menuMapSearchButton);
  let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  let ps = new kakao.maps.services.Places();

  function clearMarkers(arr) {
    for (let i of arr) {
      i.setMap(null);
    }
  }

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
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
  searchButton.addEventListener("click", () => {
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchBar.value, placesSearchCB);
  });
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      ps.keywordSearch(searchBar.value, placesSearchCB);
    }
  });

  // 하단 메뉴
  let menuChild2 = [];
  btmMeun(rootChild[2], menuChild2);

  
  console.dir(rootChild[2]);
  console.dir(rootChild[2].children[3]);
  rootChild[2].children[3].addEventListener('click', function(){
    console.log(markers);
    setMarkers(null);
  })

  function setMarkers(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  const markersImage = {
   0: "https://i.ibb.co/xCWmVQg/fr-dogpaw.png",
   1: "https://i.ibb.co/nwQPZS9/star-dogpaw.png",
   2: "https://i.ibb.co/7KX3D8w/ot-dogpaw.png",
   3 : "https://i.ibb.co/zR5p1G9/dogpaw.png"}
  const getURL = {
    0: 'frFootprint',
    1: 'starFootprint',
    2: 'otFootprint',
    3: 'loadMap'
  }
  
  const targetId = document.cookie.split("=")[1].split(";")[0];
  markersObject.userid = targetId;
  function allAddMarker(position, imageType) {
    let marker = new kakao.maps.Marker({
      map: map,
      position: position,
      image: new kakao.maps.MarkerImage(
        markersImage[imageType],
        imageSize,
        imageOption
      ),
    });
    marker.setMap(map);
    return marker;
  }
  function allMarker(callback, type) {
    return new Promise(function(resolve, reject){
      fetch(`http://localhost:2080/${getURL[type]}?id=${targetId}`)
      .then((response) => response.json())
      .then((result) =>{
        console.log(result)
        for (const key in result) {
          //console.log(typeof(parseFloat(res['0'][0])))
          let markerNow = callback(
            new kakao.maps.LatLng(
              parseFloat(result[key][0]),
              parseFloat(result[key][1])
            ), type
          );
          markersObject.appendMarker = [result[key][2],type,[markerNow],new Date(result[key][3])]
          
          createOverlay(result[key][2],map,markerNow,result[key][0],result[key][1],changeDate(result[key][3]));
        
          
        }
      console.log(markersObject);
      console.log("정상적임");
      })
      .then(()=>{
        resolve("end")
      })
    })
  };
  
  async function getMarkersObject(){
    await allMarker(allAddMarker,0)
    await allMarker(allAddMarker,1)
    await allMarker(allAddMarker,2)
    await allMarker(allAddMarker,3)
    console.log("await 발자국 확인 중");
    console.log(markersObject)
    putUserProfile(Object.keys(markersObject.markers))
    
  };
  
  getMarkersObject();

}
map();

let test = tagCreate("div", {})
document.body.appendChild(test);
styleCreate(test, {
  width: "50px",
  height: "50px",
  zindex: '3',
  position: 'relative',
  backgroundColor: "black",
  bottom: '1000px'
})

//단체방 리스트 생성 함수
createUserOrgchat(test);

let ggg = document.getElementById('chatList')
ggg.style.display = 'none'

let tg = true;

test.addEventListener('click', function(test){

  if(tg){
    ggg.style.display = ''
    tg = false;
  }
  else if(!tg){
    ggg.style.display = 'none'
    tg = true;
  }

let chatImage = document.getElementById('chatImage_0')

  let target = markersObject.userid;
  console.log("cookie: ", target);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${target}`); 
  xhr.addEventListener('load', function(){
    let imageFromServer = URL.createObjectURL(xhr.response);
    chatImage.style.backgroundImage = `url(${imageFromServer})`
    console.log("이미지 가져오기 완료");
  });

})

function putUserProfile(arr){
  let slide = document.getElementById("slideWrap");
  for(let i = 0;i < arr.length;i++){
    slide.children[0].children[i].innerText = '';
    let target = '';
    let profileWrap = tagCreate('div');
    let imageDiv = tagCreate('div');
    let name = tagCreate('p');
    let postRequest = arr[i];
    profileWrap.style.cursor = "pointer"
    styleCreate(profileWrap,pageStyle.flexColCenter)
    styleCreate(imageDiv,targetStyle.menuMapSlideImageStyle)
    profileWrap.appendChild(imageDiv);
    profileWrap.appendChild(name);
    if(arr[i] === 'undefined'){
      target = markersObject.userid;
      postRequest = 'mine';
    }
    else{
      target = arr[i]
    };
    name.innerText = target;
    slide.children[0].children[i].appendChild(profileWrap);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:2080/sendImage`);
    xhr.responseType = 'blob';
    xhr.send(`type=proFile&id=${target}`); 
    xhr.addEventListener('load', function(){
        let imageFromServer = URL.createObjectURL(xhr.response);
        imageDiv.style.backgroundImage = `url(${imageFromServer})`
        console.log("이미지 가져오기 완료");
    });
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let mypageForm = document.createElement('form');
    
    mypageForm.method = "POST";
    mypageForm.action = "/mypage";
    let params = {jwt:token, targetId:postRequest}
    for(let key in params){
      let hiddenField = document.createElement("input");
      hiddenField.setAttribute("type","hidden");
      hiddenField.setAttribute("name",key);
      hiddenField.setAttribute("value",params[key]);
      mypageForm.appendChild(hiddenField);
    }
    document.body.appendChild(mypageForm);
    profileWrap.addEventListener("click",()=>{
      mypageForm.submit();
    }
    )
  }
  
}
function createOverlay(id,mapNow, markerNow, lat, lng, time){

    
  // 오버레이 내부 구성 요소들
  const content = tagCreate("div", {id: "overlayWrap"});
  styleCreate(content, dangMapOverlay.wrap);

  const overlayInfo = tagCreate("div", {});
  content.appendChild(overlayInfo);
  styleCreate(overlayInfo, dangMapOverlay.info);

  const overlayTitle = tagCreate("div", {});
  overlayInfo.appendChild(overlayTitle);
  styleCreate(overlayTitle, dangMapOverlay.title);
  overlayTitle.innerHTML = `${id}`; 

  const overlayBody = tagCreate("div", {});
  overlayInfo.appendChild(overlayBody);
  styleCreate(overlayBody, dangMapOverlay.body);

  const overlayImg = tagCreate("div", {});
  overlayBody.appendChild(overlayImg);
  styleCreate(overlayImg, dangMapOverlay.image);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${id}`); 
  xhr.addEventListener('load', function(){
      const resultURL = URL.createObjectURL(xhr.response);
      overlayImg.innerHTML = `<img src=${resultURL} alt="강아지 사진" width=70 height=70>`;;
  });




  const overlayDesc = tagCreate("div", {});
  overlayBody.appendChild(overlayDesc);
  styleCreate(overlayDesc, dangMapOverlay.desc);

  const overlayEllipsis = tagCreate("p", {});
  overlayDesc.appendChild(overlayEllipsis);
  overlayEllipsis.innerHTML = `${time}`;

  const overlayBtnWrap = tagCreate("div", {});
  overlayDesc.appendChild(overlayBtnWrap);
  styleCreate(overlayBtnWrap, {margin: "5px 0 0 0"})

  const overlayProfileBtn = tagCreate("button", {});
  overlayBtnWrap.appendChild(overlayProfileBtn);
  styleCreate(overlayProfileBtn, dangMapOverlay.btnStyle)
  overlayProfileBtn.innerText = "프로필 보기";
  
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  let mypageForm = document.createElement('form');
    
  mypageForm.method = "POST";
  mypageForm.action = "/mypage";
  let params = {jwt:token, targetId:id}
  for(let key in params){
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type","hidden");
    hiddenField.setAttribute("name",key);
    hiddenField.setAttribute("value",params[key]);
    mypageForm.appendChild(hiddenField);
  }
  document.body.appendChild(mypageForm);
  overlayProfileBtn.addEventListener("click",()=>{
    mypageForm.submit();
  })
  
  
  

  const overlayfollowBtn = tagCreate("button", {});
  overlayBtnWrap.appendChild(overlayfollowBtn);
  styleCreate(overlayfollowBtn, dangMapOverlay.btnStyle)
  styleCreate(overlayfollowBtn, {margin: "0 0 0 5px", width: "50px"})
  overlayfollowBtn.innerText = "팔로우";


  // 오버레이 창 닫기 버튼
  const closeBtn = tagCreate("button", {});
  content.appendChild(closeBtn);
  styleCreate(closeBtn, dangMapOverlay.close)
  closeBtn.innerText = "X";
  const positionNow = new kakao.maps.LatLng(lat, lng); //인포윈도우 표시 위치입니다

  const customOverlay = new kakao.maps.CustomOverlay({
    position: positionNow,
    content: content,
    xAnchor: 0.3,
    yAnchor: 0.91,
  });
  // 닫기 버튼 클릭 시 열려있는 오버레이 창 닫힘
  closeBtn.onclick = function () {
    customOverlay.setMap(null);
    overlayChecker = false; 
  };
  // 마커 클릭 시 오버레이를 표시
  kakao.maps.event.addListener(markerNow, "click", function () {
    if(!overlayChecker){
      customOverlay.setMap(mapNow);
      let now = new Date()

      // console.log(Date.parse(time));
      overlayEllipsis.innerHTML = `${time}`
    }
    // 오버레이가 열려있는지 닫혀있는지 확인하는 변수
    overlayChecker = true;
  });
  return customOverlay;
  }