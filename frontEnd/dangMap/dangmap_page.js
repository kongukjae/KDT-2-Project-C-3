let addFlag = false;
let addNewMarkerArr = []
let markers = [];
let markersObject = {
  userid : "",
  markers : {},
  position :[],
  markersArray : [],
  usersArray :[],
  publicChat : {detail:{},overlay:[]},
  todayCount : 0,
  //필요한 입력값 = [id, 4, marker];
  // arr[0] 값은 나와의 관계, 0 : 그냥친구, 1 : 즐찾친구, 2: 익명, 3: 본인
  set appendMarker(value){
    this.markersArray.push(value[2])
    this.usersArray.push(value[0])
    let todayNow = new Date();
    if(value[1]===3&&value[3].getFullYear()===todayNow.getFullYear()&&value[3].getMonth()===todayNow.getMonth()&&value[3].getDate()===todayNow.getDate()){
      this.todayCount ++;
    }
    

    if(markersObject.markers[value[0]] === undefined){
      markersObject.markers[value[0]] = [value[1],[[value[2],value[3]]]];
    }else{
      markersObject.markers[value[0]][1].push([value[2],value[3]]);
    }
  },
  set appendPosition(value){
    this.position.push(value);
  },
  set appendPublicChat(value){
    this.publicChat.detail[value[0]] = {overlay:value[1],name:value[2]};
  }
};
let overlayChecker = false;
function changeDate(date) {
  let nowDate = new Date(date);
  let formatDate = nowDate.toLocaleString();

  console.log(formatDate);

  return formatDate;
}


let kakaoMap = map();

//지도 사이드 버튼: 검색, 단톡 표시 버튼
let sideArr = sideButton(kakaoMap);




// //단체방 리스트 생성 함수
// const roomName = 'test1';
// createUserOrgchat(test, roomName);

// let ggg = document.getElementById('chatList')
// // ggg.style.display = 'none'
// let tg = true;

// test.addEventListener('click', function(test){
//   if(tg){
//     ggg.style.display = 'flex'
//     tg = false;
//   }
//   else if(!tg){
//     ggg.style.display = 'none'
//     tg = true;
//   }
// })



function map() {
  let root = tagCreate("div", { id: "root" });
  document.body.appendChild(root);
  styleCreate(root, dangMapStyle.menuMapRoot);


  let rootChild = [];
  for (let i = 0; i < 3; i++) {
    let child = tagCreate("div", {});
    root.appendChild(child);
    rootChild.push(child);
  }

  styleCreate(rootChild[0], dangMapStyle.menuMap);
  rootChild[0].id = "map";

  styleCreate(rootChild[1], dangMapStyle.menuMapSlide);
  rootChild[1].id = "slide";

  styleCreate(rootChild[2], dangMapStyle.bottomMenu);


  let mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(36.35, 127.385), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

  mapContainer.addEventListener("wheel", function (e) {
    // 지도 위에서 휠 이벤트가 발생했을 때
    e.preventDefault();
    //console.log(e.deltaY); // e.deltaY => 휠 방향 감지[양수: 휠 내림 / 음수: 휠 올림]
    let mapLevel = map.getLevel(); // 지도의 현재 확대 레벨을 가져옴
    //console.log(mapLevel);

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
  //console.log(mapOption.level);
 // 지도를 생성한다
  let map = new kakao.maps.Map(mapContainer, mapOption);
  map.setZoomable(false);

  //  이미지 링크 생성을 해서 넣으니까 되었다.
  let imageSrc = "https://i.ibb.co/r3LdZHX/dogpaw.png";
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

  //남은 발자국 개수 박스
  let countFootprintBox = tagCreate("div", {});
  styleCreate(countFootprintBox, dangMapStyle.countFootprintBox);
  root.appendChild(countFootprintBox);

  let countFootprintText = tagCreate("div", {});
  styleCreate(countFootprintText, dangMapStyle.countFootprintText);
  countFootprintBox.appendChild(countFootprintText);
  countFootprintText.innerHTML = `오늘 찍을 수 있는 발자국 수`;

  let countFootprintCount = tagCreate("div", {});
  styleCreate(countFootprintCount, dangMapStyle.countFootprintCount);
  countFootprintBox.appendChild(countFootprintCount);
  

  // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
  let markers = [];
  // let latlng = mouseEvent.latLng;
  //let result = [];
  let resultObject = {};
  const cookieId = document.cookie.split("=")[1].split(";")[0];
  // map에 클릭 시 마커를 추가하고 데이터를 서버로 전송하는 함수
  let textCount;
  // console.log(textCount);
  

  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    if(addFlag){
      resultCount = 1;
      let wrap = [];
      // console.log("클릭 시 : " + overlayChecker);
      // 오버레이 창이 비활성화 되있을 경우에 동작
      if (overlayChecker === false) {
        // 클릭한 위치에 마커를 표시합니다
        let latlng = mouseEvent.latLng;

        const httpRequest = new XMLHttpRequest();

        //result.push(wrap);
        // console.log(wrap);
        //console.log("result: " + result);
        // resultObject[cnt] = wrap;
        // countResult = markersObject.markers[markersObject.userid][1].length;
        console.log(textCount);
        textCount -= resultCount;
        countFootprintCount.innerText = textCount;
        if(textCount < 10 && textCount >= 0) {
          addMarker(latlng);
          wrap.push(latlng.getLat(), latlng.getLng(), cookieId);
          resultObject[0] = wrap;
          addNewMarkerArr.push(resultObject);
          countFootprintCount.innerText = textCount;
          httpRequest.open("POST", `http://15.164.63.222:2080/menuMap`, true);
          httpRequest.send(JSON.stringify(resultObject)); //객체를 json으로 변환해서 서버로 전송
        } else if(textCount < 0) {
          alert(`오늘은 더 이상 마커를 찍을 수 없습니다.`);
          countFootprintCount.innerText = 0;
        }
        
        //cnt++;
        //console.log("cnt = " + cnt);
        // httpRequest.send(`re1=${result[0]}`);
      }}
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
      //console.log("이동 전 lat " + dragStartLat);
      //console.log("이동 전 lng " + dragStartLng);
    });

    kakao.maps.event.addListener(marker, "dragend", function () {
      // 드래그가 끝나는 시점에 동작
      // 드래그가 끝난 지점의 좌표를 불러옴
      let latlng = marker.getPosition();
      //console.log("이동 후 lat " + latlng.getLat());
      //console.log("이동 후 lng " + latlng.getLng());
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
      httpRequest.open("POST", `http://15.164.63.222:2080/dragMarker`, true);
      // 객체를 JSON 형식으로 바꿔서 서버로 전송
      httpRequest.send(JSON.stringify(resultObject));
    });
    return marker;
  }

  


  // 하단 메뉴
  let menuChild2 = [];
  btmMeun(rootChild[2], menuChild2);
  const gotop = document.getElementById('goTop');
  gotop.style.display = "none";

  //console.dir(rootChild[2]);
  //console.dir(rootChild[2].children[3]);
  rootChild[2].children[3].addEventListener('click', function(){
    //console.log(markers);
    setMarkers(null);
  });


  function setMarkers(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  const markersImage = {
    0: "https://i.ibb.co/K0rMQBg/fr-dogpaw.png",
    1: "https://i.ibb.co/B3Ynt89/star-dogpaw.png",
    2: "https://i.ibb.co/H7Dfx8v/ot-dogpaw.png",
    3 : "https://i.ibb.co/r3LdZHX/dogpaw.png"}
  const getURL = {
    0: "frFootprint",
    1: "starFootprint",
    2: "otFootprint",
    3: "loadMap",
  };

  const targetId = document.cookie.split("=")[1].split(";")[0];
  markersObject.userid = targetId;
  function allAddMarker(position, imageType) {
    let marker = new kakao.maps.Marker({
      // map: map,
      position: position,
      image: new kakao.maps.MarkerImage(
        markersImage[imageType],
        imageSize,
        imageOption
      ),
    });
    // marker.setMap(map);
    return marker;
  }
  function allMarker(callback, type) {
    return new Promise(function (resolve, reject) {
      fetch(`http://15.164.63.222:2080/${getURL[type]}?id=${targetId}`)
      .then((response) => response.json())
      .then((result) =>{
        //console.log(result)
        for (const key in result) {
          countResult = Object.keys(result).length;
          //console.log(typeof(parseFloat(res['0'][0])))
          let markerNow = callback(
            new kakao.maps.LatLng(
              parseFloat(result[key][0]),
              parseFloat(result[key][1])
            ), type
          );
          markersObject.appendMarker = [result[key][2],type,markerNow,new Date(result[key][3])]
          markersObject.appendPosition = {lat:result[key][0],lng:result[key][1]}
          createOverlay(result[key][2],map,markerNow,result[key][0],result[key][1],changeDate(result[key][3]));
          
        }
      //console.log(markersObject);
      console.log("정상적임");
      })
      .then(()=>{
        resolve("end")
      })
    })
  };
  // 추가zz
  function countMarkersDate() {
    let markersDateCount = 10; // 전날보다 이전 - 이후 +
    let markersTodayData = markersObject.markers[markersObject.userid][1];
    const startToday = new Date(new Date().setHours(0, 0, 0, 0));

    for (i in markersTodayData) {
      if(new Date(markersTodayData[i][1]).getDate() !== startToday.getDate()) {
        markersDateCount += 0;
        console.log(markersDateCount);
      } else if(new Date(markersTodayData[i][1]).getDate() === startToday.getDate()){
        markersDateCount -= 1;
        console.log(markersDateCount);
      }
    }
    console.log(startToday.getDate());
    console.log(new Date(markersTodayData[0][1]).getDate());
    countFootprintCount.innerText = markersDateCount;

  }

  async function getMarkersObject(){ 
    await allMarker(allAddMarker,3)
    await allMarker(allAddMarker,1)
    await allMarker(allAddMarker,2)
    await allMarker(allAddMarker,0)
    console.log("await 발자국 확인 중");
    console.log(markersObject);
    if(markersObject.markers.hasOwnProperty(markersObject.userid) === false) {
      countFootprintCount.innerText = 10;
    } else {
      countMarkersDate();
    
    }

    textCount = Number(countFootprintCount.innerText);
    // console.log(parseInt(countFootprintCount.innerText));
    console.log(markersObject)
    putUserProfile(markersObject.markers)
    
    let clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      markers: markersObject.markersArray,
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 5, // 클러스터 할 최소 지도 레벨
      disableClickZoom: true, // 클러스터 클릭 시 줌인 방지
      //   styles: [{
        //     width : '53px', height : '52px',
        //     background: 'url(cluster.png) no-repeat',
        //     color: '#fff',
        //     textAlign: 'center',
    //     lineHeight: '54px'
    // }]
  });
  
// 1. 추가버튼을 클릭했을때, 
makeControlBtnsArr[1].addEventListener("click", () => {
  let controlbtnsWrap = document.getElementById('controlbtnsWrap');
  controlbtnsWrap.style.display='none'

  let target = [];
  for(let i = 0; i< markersObject.usersArray
    .length;i++){
    if(markersObject.usersArray[i]===markersObject.userid){
      target.push(markersObject.markersArray[i]);
    }else{
      break;
    }
  }
  clusterer.clear(); //사라짐
  for (let i of target) {
    i.setMap(map);
  }
  addFlag = true;
  let sideBtn = document.getElementById('sideBtn');
  sideBtn.style.display = 'none';
  let buttonWrap = tagCreate('div')
  let finishBtn = tagCreate('div')
  let btnStyle = {width:'50px',height:'50px',backgroundColor:'white',borderRadius:'5px',marginTop:'10px',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:"center",fontSize:'15px'}

  buttonWrap.id = 'buttonWrap'
  styleCreate(buttonWrap,{position:'absolute',zIndex :'2',right:'20px',top:'20px'})
  styleCreate(finishBtn,btnStyle)
  let mapdiv = document.getElementById('map');
  mapdiv.appendChild(buttonWrap);
  buttonWrap.appendChild(finishBtn);

  finishBtn.innerText='완료'


  finishBtn.addEventListener('click',()=>{
    location.reload();
  })
});
//2. 삭제버튼을 클릭했을때,
makeControlBtnsArr[0].addEventListener("click", () => {
  overlayChecker = true;
  let controlbtnsWrap = document.getElementById('controlbtnsWrap');
  controlbtnsWrap.style.display='none'
  let target = [];
  for(let i = 0; i< markersObject.usersArray
    .length;i++){
    if(markersObject.usersArray[i]===markersObject.userid){
      target.push(markersObject.markersArray[i]);
    }else{
      break;
    }
  }
  clusterer.clear(); //사라짐
  let deleteTarget = []
  for (let i of target) {
    i.setMap(map);
    kakao.maps.event.addListener(i, 'click', function() {
      const id = markersObject.userid;
      const dateTime = markersObject.markers[markersObject.userid][1][target.indexOf(i)][1];
      i.setMap(null);
      deleteTarget.push({ id: id, date: dateTime })
    });
  }
  
  let sideBtn = document.getElementById('sideBtn');
  sideBtn.style.display = 'none';
  let buttonWrap = tagCreate('div')
  let finishBtn = tagCreate('div')
  let cancelBtn = tagCreate('div')
  let btnStyle = {width:'50px',height:'50px',backgroundColor:'white',borderRadius:'5px',marginTop:'10px',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:"center",fontSize:'15px'}

  buttonWrap.id = 'buttonWrap'
  styleCreate(buttonWrap,{position:'absolute',zIndex :'2',right:'20px',top:'20px'})
  styleCreate(finishBtn,btnStyle)
  styleCreate(cancelBtn,btnStyle)
  let mapdiv = document.getElementById('map');
  mapdiv.appendChild(buttonWrap);
  buttonWrap.appendChild(finishBtn);
  buttonWrap.appendChild(cancelBtn);

  finishBtn.innerText='완료'
  cancelBtn.innerText='취소'

  cancelBtn.addEventListener('click',()=>{
    location.reload();
  })
  finishBtn.addEventListener('click',()=>{
    for(let i of deleteTarget){
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `http://15.164.63.222:2080/mapDelete`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(i));
    }
    location.reload();
  })

});
makeControlBtnsArr[2].addEventListener("click", () => {
  let controlbtnsWrap = document.getElementById('controlbtnsWrap');
  controlbtnsWrap.style.display='none'
  let dragTarget = [];
  let target = [];

  for(let i = 0; i< markersObject.usersArray
    .length;i++){
    if(markersObject.usersArray[i]===markersObject.userid){
      target.push(markersObject.markersArray[i]);
    }else{
      break;
    }
  }
  clusterer.clear(); //사라짐
  for (let i of target) {
    i.setMap(map);
    i.setDraggable(true);

    let dragStartLat;
    let dragStartLng;
    // 마커를 이동시켰을 때 마커의 좌표가 변경 되도록 설정
    // 1. 마커를 드래그 시킬 때 드래그 되는 마커가 어떤 마커인지 식별 필요
    // 2. 마커를 드래그해서 mouseup 되는 순간 식별된 마커의 좌표값을 update
    kakao.maps.event.addListener(i, "dragstart", function () {
      // 드래그가 시작되는 시점에 동작
      // 마커의 현재 좌표를 저장
      let latlng = i.getPosition();
      dragStartLat = latlng.getLat().toFixed(13);
      dragStartLng = latlng.getLng().toFixed(13);
      //console.log("이동 전 lat " + dragStartLat);
      //console.log("이동 전 lng " + dragStartLng);
    });

    kakao.maps.event.addListener(i, "dragend", function () {
      // 드래그가 끝나는 시점에 동작
      // 드래그가 끝난 지점의 좌표를 불러옴
      let latlng = i.getPosition();
      //console.log("이동 후 lat " + latlng.getLat());
      //console.log("이동 후 lng " + latlng.getLng());
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
      dragTarget.push({0:wrap});
      // const httpRequest = new XMLHttpRequest();
      // httpRequest.open("POST", `http://15.164.63.222:2080/dragMarker`, true);
      // // 객체를 JSON 형식으로 바꿔서 서버로 전송
      // console.log(resultObject);
      // httpRequest.send(JSON.stringify(resultObject));
    });
  }

  let sideBtn = document.getElementById('sideBtn');
  sideBtn.style.display = 'none';
  let buttonWrap = tagCreate('div')
  let finishBtn = tagCreate('div')
  let cancelBtn = tagCreate('div')
  let btnStyle = {width:'50px',height:'50px',backgroundColor:'white',borderRadius:'5px',marginTop:'10px',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:"center",fontSize:'15px'}

  buttonWrap.id = 'buttonWrap'
  styleCreate(buttonWrap,{position:'absolute',zIndex :'2',right:'20px',top:'20px'})
  styleCreate(finishBtn,btnStyle)
  styleCreate(cancelBtn,btnStyle)
  let mapdiv = document.getElementById('map');
  mapdiv.appendChild(buttonWrap);
  buttonWrap.appendChild(finishBtn);
  buttonWrap.appendChild(cancelBtn);

  finishBtn.innerText='완료'
  cancelBtn.innerText='취소'

  cancelBtn.addEventListener('click',()=>{
    location.reload();
  })
  
  finishBtn.addEventListener('click',()=>{
    console.log(dragTarget);
    for(let i of dragTarget){
      const httpRequest = new XMLHttpRequest();
      httpRequest.open("POST", `http://15.164.63.222:2080/dragMarker`, true);
      // 객체를 JSON 형식으로 바꿔서 서버로 전송
      console.log(i);
      httpRequest.send(JSON.stringify(i));
    }
    location.reload();
  })

});

    markersObject['clusterer'] = clusterer;

    
  }
    
  getMarkersObject();
  publicTalkAsync()

  async function publicTalkAsync(){
    let publicTalkList = await fetch('http://15.164.63.222:2080/publicChatLocation')
      .then((res)=>{return res.json()})
      .then((result)=>{
        let publicTalkIconArr = []
        let geocoder = new kakao.maps.services.Geocoder();
        for(let i of result){
          const positionNow = new kakao.maps.LatLng(i.split('&')[0], i.split('&')[1]); //인포윈도우 표시 위치입니다
          let publicTalkIcon = tagCreate('img')
          styleCreate(publicTalkIcon,{
            width : '45px',
            height : '45px'
          })
          publicTalkIcon.src = '/image/resource/publicTalk.png'
          const customOverlay = new kakao.maps.CustomOverlay({
          position: positionNow,
          content: publicTalkIcon,
          xAnchor: 0.3,
          yAnchor: 0.91,
          });
          
          publicTalkIconArr.push(customOverlay)

          let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
              let roomNameArr = result[0].address.address_name.split(' ')
              markersObject['appendPublicChat'] = ['!public!'+i,customOverlay,roomNameArr[roomNameArr.length - 2] +" "+roomNameArr[roomNameArr.length - 1]]
              let publicChatRoomList = createUserOrgchat(positionNow, roomNameArr[roomNameArr.length - 2] +" "+roomNameArr[roomNameArr.length - 1], '!public!'+i)

              publicTalkIcon.addEventListener('click',()=>{
                publicChatRoomList.setMap(map);

              })
            }
          };
          geocoder.coord2Address(positionNow.getLng(), positionNow.getLat(), callback);
        }
        markersObject.publicChat['array'] = publicTalkIconArr;
        return publicTalkIconArr;
      })
      let publicTalkFlag = false;
      sideArr[1].addEventListener('click',()=>{
        if(!publicTalkFlag){
          for(let i of publicTalkList){
            i.setMap(map);
          }
          markersObject.clusterer.clear();
          publicTalkFlag = true;
        }else{
          for(let i of publicTalkList){
            i.setMap(null);
          }
          markersObject.clusterer.addMarkers(markersObject.markersArray)
          publicTalkFlag = false;
        }
      })
    };  
    return map;
  }
  
  

function putUserProfile(object){
  let arr = Object.keys(object);
  let filterArr = arr.filter(function(data) {
    return data !== markersObject.userid;
  });
  console.log(markersObject.userid)
  let targetArr = [markersObject.userid, ...filterArr];
  let slide = document.getElementById("slideWrap");
  for(let i = 0;i < targetArr.length;i++){
    slide.children[0].children[i].innerText = '';
  
    let profileWrap = tagCreate('div');
    let imageDiv = tagCreate('div');
    let imageDivWrap = tagCreate('div');
    let name = tagCreate('p');
    let postRequest = targetArr[i];
    profileWrap.style.cursor = "pointer"
    styleCreate(profileWrap,dangMapStyle.menuMapSlideUserBox);
    styleCreate(imageDiv,dangMapStyle.menuMapSlideImageStyle);
    styleCreate(imageDivWrap,dangMapStyle.menuMapSlideImageWrapStyle);
    styleCreate(name,dangMapStyle.menuMapSlideTextStyle);
    imageDivWrap.appendChild(imageDiv);
    profileWrap.appendChild(imageDivWrap);
    profileWrap.appendChild(name);
    name.innerText = targetArr[i];
    slide.children[0].children[i].appendChild(profileWrap);
    
    console.log(targetArr[i]);
    let frType
    if(i === 0){
      frType = 3;
    }else{
      frType = object[targetArr[i]][0];
    }
    console.log('here')
    console.log(frType)
    if(frType === 0){
      imageDivWrap.style.backgroundColor = '#1ea1ff';
    }else if(frType === 1){
      imageDivWrap.style.backgroundColor = '#fdbc0b';
    }
    else if(frType === 2){
      imageDivWrap.style.backgroundColor = '#7c8487';
    }
    else if(frType === 3){
      imageDivWrap.style.backgroundColor = '#ffa485';
    }



    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://15.164.63.222:2080/sendImage`);
    xhr.responseType = "blob";
    xhr.send(`type=proFile&id=${targetArr[i]}`);
    xhr.addEventListener("load", function () {
      let imageFromServer = URL.createObjectURL(xhr.response);
      imageDiv.style.backgroundImage = `url(${imageFromServer})`;
      console.log("이미지 가져오기 완료");
    });
    if (i > 0) {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      let mypageForm = document.createElement("form");

      mypageForm.method = "POST";
      mypageForm.action = "/mypage";
      let params = { jwt: token, targetId: postRequest };
      for (let key in params) {
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        mypageForm.appendChild(hiddenField);
      }
      document.body.appendChild(mypageForm);
      profileWrap.addEventListener("click", () => {
        mypageForm.submit();
      });
    }
  }
  console.log("프로필 개수 체크")
  console.log(Object.keys(markersObject.markers).length);
  let userCount = Object.keys(markersObject.markers).length;
  let arrUserCount = Object.keys(markersObject.markers);
  console.log(arrUserCount)
  console.log(markersObject.userid)
  if(arrUserCount.includes(markersObject.userid)) {
    if(userCount % 2 === 1) {
      userCount = (userCount / 2) + 0.5;
      console.log("홀수", userCount);
      slideWrapInnerDiv.style.gridTemplateColumns =  `repeat(${userCount}, 160px)`;
    } else {
      userCount = userCount / 2;
      console.log("짝수", userCount);
      slideWrapInnerDiv.style.gridTemplateColumns =  `repeat(${userCount}, 160px)`;
    }
  } else {
    if(userCount % 2 === 1) {
      userCount = (userCount / 2) + 1.5;
      console.log("홀수", userCount);
      slideWrapInnerDiv.style.gridTemplateColumns =  `repeat(${userCount}, 160px)`;
    } else {
      userCount = (userCount / 2) + 1;
      console.log("짝수", userCount);
      slideWrapInnerDiv.style.gridTemplateColumns =  `repeat(${userCount}, 160px)`;
    }
  }
}
function createOverlay(id, mapNow, markerNow, lat, lng, time) {
  // 오버레이 내부 구성 요소들
  const content = tagCreate("div", { id: "overlayWrap" });
  styleCreate(content, dangMapStyle.overlayWrap);

  const overlayInfo = tagCreate("div", {});
  content.appendChild(overlayInfo);
  styleCreate(overlayInfo, dangMapStyle.overlayInfo);

  const overlayTitle = tagCreate("div", {});
  overlayInfo.appendChild(overlayTitle);
  styleCreate(overlayTitle, dangMapStyle.overlayTitle);
  overlayTitle.innerHTML = `${id}`;

  const overlayBody = tagCreate("div", {});
  overlayInfo.appendChild(overlayBody);
  styleCreate(overlayBody, dangMapStyle.overlayBody);

  const overlayImg = tagCreate("div", {});
  overlayBody.appendChild(overlayImg);
  styleCreate(overlayImg, dangMapStyle.overlayImage);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://15.164.63.222:2080/sendImage`);
  xhr.responseType = "blob";
  xhr.send(`type=proFile&id=${id}`);
  xhr.addEventListener("load", function () {
    const resultURL = URL.createObjectURL(xhr.response);
    overlayImg.innerHTML = `<img src=${resultURL} alt="강아지 사진" width=70 height=70>`;
  });

  const overlayDesc = tagCreate("div", {});
  overlayBody.appendChild(overlayDesc);
  styleCreate(overlayDesc, dangMapStyle.overlayDesc);

  const overlayEllipsis = tagCreate("p", {});
  overlayDesc.appendChild(overlayEllipsis);
  overlayEllipsis.innerHTML = `${time}`;

  const overlayBtnWrap = tagCreate("div", {});
  overlayDesc.appendChild(overlayBtnWrap);
  styleCreate(overlayBtnWrap, { margin: "5px 0 0 0" });

  const overlayProfileBtn = tagCreate("button", {});
  overlayBtnWrap.appendChild(overlayProfileBtn);
  styleCreate(overlayProfileBtn, dangMapStyle.overlayBtnStyle);
  overlayProfileBtn.innerText = "프로필 보기";



  
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  let mypageForm = document.createElement("form");

  mypageForm.method = "POST";
  mypageForm.action = "/mypage";
  let params = { jwt: token, targetId: id };
  for (let key in params) {
    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    mypageForm.appendChild(hiddenField);
  }
  document.body.appendChild(mypageForm);
  overlayProfileBtn.addEventListener("click", () => {
    mypageForm.submit();
  });

  const overlayfollowBtn = tagCreate("button", {});
  overlayBtnWrap.appendChild(overlayfollowBtn);
  styleCreate(overlayfollowBtn, dangMapStyle.overlayBtnStyle)
  styleCreate(overlayfollowBtn, {margin: "0 0 0 5px", width: "65px"})
  overlayfollowBtn.innerText = "팔로우";

  const JWT = document.cookie.split("=")[2]
  let followRequestURL = 'http://15.164.63.222:2080/followRequest'
  let followRequestMessage = '팔로우'
  
  if(markersObject.markers[id][0] === 0 || markersObject.markers[id][0] === 1){
      followRequestURL = 'http://15.164.63.222:2080/unFollowRequest'
      followRequestMessage = '팔로우 취소'
      overlayfollowBtn.innerText = "팔로우 취소";
  }

  overlayfollowBtn.addEventListener("click",()=>{
    let xhr = new XMLHttpRequest();
      xhr.open("POST",followRequestURL);
      xhr.send(JSON.stringify({jwt:JWT,you:id}));
      xhr.addEventListener("load",()=>{
        alert(`${id}님을 ${followRequestMessage} 했습니다`);
        location.reload();
      })
  })
  if(id===markersObject.userid){
    overlayfollowBtn.remove()
    overlayProfileBtn.innerText = "마이페이지 보기";
    overlayProfileBtn.style.width = '130px'
  }


  // 오버레이 창 닫기 버튼
  const closeBtn = tagCreate("button", {});
  content.appendChild(closeBtn);
  styleCreate(closeBtn, dangMapStyle.overlayClose);
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
    if (!overlayChecker) {
      customOverlay.setMap(mapNow);
      let now = new Date();

      // console.log(Date.parse(time));
      overlayEllipsis.innerHTML = `${time}`;
    }
    // 오버레이가 열려있는지 닫혀있는지 확인하는 변수
    overlayChecker = true;
  });
  return customOverlay;
}

