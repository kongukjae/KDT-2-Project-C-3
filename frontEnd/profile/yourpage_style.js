function yourPage(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root, mypageStyle.mypageRoot)

  let rootChild = [];
  for(let i = 0;i<7;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }
  topMenu(rootChild[0]);
  createHamburger(root);
  // styleCreate(rootChild[0],mypageStyle.mypageTopMenu)
  // const logoLoginPage = tagCreate('img', '');
  // logoLoginPage.style.width = '28%';
  // logoLoginPage.src = './resource/MainLogo.png';
  // rootChild[0].appendChild(logoLoginPage);


  styleCreate(rootChild[1], mypageStyle.mypageTitle)
  rootChild[1].innerText = `${targetIdFromServer}님의 페이지`;
  
  styleCreate(rootChild[2], mypageStyle.mypageImageStyle);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:2080/sendImage`);
  xhr.responseType = 'blob';
  xhr.send(`type=proFile&id=${targetIdFromServer}`); 
  xhr.addEventListener('load', function(){
      let imageFromServer = URL.createObjectURL(xhr.response);
      rootChild[2].style.backgroundImage = `url(${imageFromServer})`
      console.log("이미지 가져오기 완료");
  });


  styleCreate(rootChild[3], mypageStyle.mypageButtonWrap)
  for(let i = 0; i < 2; i++){
    let button = tagCreate("div");
    styleCreate(button, mypageStyle.mypageButton)
    rootChild[3].appendChild(button)
  }
  rootChild[3].children[0].innerText = "팔로우";
  rootChild[3].children[1].innerText = "채팅";
  const JWT = document.cookie.split("=")[2]
  let followCheckXhr = new XMLHttpRequest();
  let _URL = `http://localhost:2080/followCheck`;
  let followRequestURL = 'http://localhost:2080/followRequest'
  let followRequestMessage = '팔로우'
  followCheckXhr.open("POST",_URL);
  followCheckXhr.send(JSON.stringify({jwt:JWT,you:targetIdFromServer}));
  followCheckXhr.addEventListener("load",()=>{
    if(followCheckXhr.response === 'yes'){
      starCheck(rootChild[2]);
      followRequestURL = 'http://localhost:2080/unFollowRequest'
      followRequestMessage = '팔로우 취소'
      rootChild[3].children[0].innerText = "팔로우 취소";
    }
  })

  rootChild[3].children[0].addEventListener("click",()=>{
    let xhr = new XMLHttpRequest();
      xhr.open("POST",followRequestURL);
      xhr.send(JSON.stringify({jwt:JWT,you:targetIdFromServer}));
      xhr.addEventListener("load",()=>{
        alert(`${targetIdFromServer}님을 ${followRequestMessage} 했습니다`);
        location.reload();
      })
  })
  rootChild[3].children[1].addEventListener('click',()=>{
    const jwt = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    
    fetch('http://localhost:2080/createChatRoomRequest', {
      method: 'POST',
      body: JSON.stringify({jwt:jwt,targetId:targetIdFromServer})
    }).then((result)=>{
      console.log(result);
      let chatBoxForm = document.createElement('form');
      chatBoxForm.method = "POST"
      chatBoxForm.action = "/dangTalkChatRoom";
      let params = {jwt:jwt, targetId:targetIdFromServer};
      for(let key in params){
        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type","hidden");
        hiddenField.setAttribute("name",key);
        hiddenField.setAttribute("value",params[key]);
        chatBoxForm.appendChild(hiddenField);
      }
      document.body.appendChild(chatBoxForm);
      chatBoxForm.submit();
    })
  })


  styleCreate(rootChild[4], mypageStyle.mypageUserinfoBox)
  for(let i = 0; i < 7;i++){
    let infoTag = tagCreate("div");
    styleCreate(infoTag, mypageStyle.mypageUserinfoBoxInnerStyle)
    rootChild[4].appendChild(infoTag)
  }
  rootChild[4].children[0].innerText = `강아지 이름 : ${dogNameFromServer}`
  if(dogageFromServer === 'null'){
    rootChild[4].children[1].innerText = `나이 : 나이 정보가 없습니다`
  }else{
    rootChild[4].children[1].innerText = `나이 : ${dogageFromServer}`
  }
  if(dogsizeFromServer === 'null'){
    rootChild[4].children[2].innerText = `강아지 크기 : 강아지 크기정보가 없습니다`
  }else if(dogsizeFromServer === '1'){
    rootChild[4].children[2].innerText = `강아지 크기 : 소형견`
  }else if(dogsizeFromServer === '2'){
    rootChild[4].children[2].innerText = `강아지 크기 : 중형견`
  }else if(dogsizeFromServer === '3'){
    rootChild[4].children[2].innerText = `강아지 크기 : 대형견`
  }
  

  rootChild[4].children[3].innerText = `산책온도 :`
  if(dogGenderFromServer === '1'){
    rootChild[4].children[4].innerText = "성별 : 남자"
  }else{
    rootChild[4].children[4].innerText = "성별 : 여자"
  }
  if(introFromServer === 'null'){
    rootChild[4].children[6].innerText = '소개글이 없습니다'
  }else{
    rootChild[4].children[6].innerText = introFromServer;
  }
  rootChild[4].children[5].innerText = `소개글`

  rootChild[4].style.height = '400px'
  styleCreate(rootChild[4].lastChild, mypageStyle.mypageUserinfoBoxSelfIntroduce)

  // styleCreate(rootChild[5], mypageStyle.mypageCalender)
  // rootChild[5].innerText = "종윤씨가 좌표에 날짜 새기는 거 완료하면 만들어질 캘린더 자리"

  
//*--------캘린더 자리----------------

//! 마이페이지 캘린더 부분

  // * 지금이 몇 년도 몇 월인지 판단하기 위한 전역 변수
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;

  function calendar(now) {
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1;
    let nowDate = now.getDate();

    let dateres;
    let dateData = [];

    const monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (nowYear % 400 === 0) {
      monthArray[1] = 29;
    } else if (nowYear % 4) {
      monthArray[1] = 29;
    } else if (nowYear % 100) {
      monthArray[1] = 28;
    }

    // let lastDate = monthArray[now.getMonth()];

    let monthOfLastDate = new Date(nowYear, nowMonth, 0);
    let nowMonthOfLastDate = monthOfLastDate.getDate();
    // * 이번 달의 마지막 날의 23:59:59를 찍기 어려워서 다음 달 1일의 00:00:00을 사용
    let lastDay = new Date(nowYear, nowMonth, 1);

    let firstDay = new Date(nowYear, now.getMonth(), 1); //! 지금 현재 날짜의 첫번째 날짜
    // console.log("firstDay");
    // console.log(firstDay);
    // console.log(changeDateUTC(firstDay));
    // console.log(monthOfLastDate);
    // console.log(changeDateUTC(monthOfLastDate));
    let monthOfFirstDay = firstDay.getDay(); //! 월의 첫번째 날짜의 요일
    let weekCount = Math.ceil((monthOfFirstDay + nowMonthOfLastDate) / 7); //!(주의 수) 월의 시작 요일과 마지막 날짜를 더해서 7로 나눠준다.

    // * 발자국 찍힌 날짜를 중복 제거하고 담기 위해 dateList 집합 생성
    const dateListSet = new Set();
    // * 서버에 날짜 데이터 요청 보내기 -> firsDay와 monthOfLastDate 변수를 사용하고자 위치 변경, 요청할때 서버로 이번 달의 1일과 마지막날을 같이 보냄
    const xhr = new XMLHttpRequest();
    const cookieId = document.cookie.split("=")[1].split(";")[0];
    const firstDayOfMonth = changeDateUTC(firstDay);
    const lastDayOfMonth = changeDateUTC(lastDay);
    console.log(lastDayOfMonth);
    console.log("마지막 날");
    xhr.open(
      "GET",
      `http://localhost:2080/allloadMap?id=${targetIdFromServer}?first=${firstDayOfMonth}?last=${lastDayOfMonth}`
    );
    xhr.send();
    xhr.addEventListener("load", function () {
      console.log("캘린더 요청 보냄");
      dateres = JSON.parse(xhr.response);
      console.log(dateres);
      for (const key in dateres) {
        dateData.push(dateres[key][1]);
        // dateData.push([new Date(dateres[key][1]).getMonth() + 1, new Date(dateres[key][1]).getDate()]);
        // dateData.push(new Date(dateres[key][1]).getMonth() + 1);
      }
      console.log(dateData);
      for (let i = 0; i < dateData.length; i++) {
        if (dateListSet.has(dateData[i].split("T")[0]) === false) {
          dateListSet.add(dateData[i].split("T")[0]);
        }
      }
      // * 발자국 찍힌 날짜만 출력 성공
      console.log(dateListSet);
      // * Set 집합을 배열로 변환
      const dateListArr = Array.from(dateListSet);
      console.log(dateListArr); // * ex) ['2023-04-12', '2023-04-13', '2023-04-21', '2023-04-24', '2023-04-25', '2023-04-26']
      // * 배열의 길이만큼 반복문 실행
      for (let i = 0; i < dateListArr.length; i++) {
        // * 캘린더의 년도, 달이 발자국 찍힌 년도, 달과 일치 할 때
        if (
          Number(dateListArr[i].split("-")[0]) === nowYear &&
          Number(dateListArr[i].split("-")[1]) === nowMonth
        ) {
          // * 발자국 찍힌 날짜에 표시
          // document.getElementById(`day${Number(dateListArr[i].split('-')[2])}`).style.color = 'lightSalmon';
          const calendarStamp = tagCreate("img");
          styleCreate(calendarStamp, mypageStyle.mypageCalendarStamp);
          calendarStamp.src = "/image/resource/stamp.png";
          document
            .getElementById(`day${Number(dateListArr[i].split("-")[2])}`)
            .appendChild(calendarStamp);
        }
      }
    });
    // console.log(dateListArr)

    let monthOfName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let weekOfName = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

    let root = tagCreate("div", { id: "root" });
    rootChild[5].appendChild(root);
    styleCreate(root, mypageStyle.mypageCalendarRoot);
    rootChild[5].style.marginTop = '50px'
    let monthOfNameBox = tagCreate("div", { id: "month" });
    root.appendChild(monthOfNameBox);
    styleCreate(monthOfNameBox, mypageStyle.mypageCalendarMonthOfNameBox);
    let beforeMonthBtn = tagCreate("div", { id: "before" });
    monthOfNameBox.appendChild(beforeMonthBtn);
    beforeMonthBtn.innerText = "<";
    styleCreate(beforeMonthBtn, mypageStyle.mypageCalendarBeforeNextMonthBtn);

    let monthBox = tagCreate("div");
    monthOfNameBox.appendChild(monthBox);
    monthBox.innerText = monthOfName[now.getMonth()];
    styleCreate(monthBox, mypageStyle.myPageCalendarMonthBox);

    // * 년도 표시용 div 추가
    let yearBox = tagCreate("div");
    monthBox.appendChild(yearBox);
    yearBox.innerText = nowYear;
    styleCreate(yearBox, mypageStyle.myPageCalendarYearBox);

    let nextMonthBtn = tagCreate("div", { id: "next" });
    monthOfNameBox.appendChild(nextMonthBtn);
    nextMonthBtn.innerText = ">";
    styleCreate(nextMonthBtn, mypageStyle.mypageCalendarBeforeNextMonthBtn);

    let weekNameBox = tagCreate("div");
    root.appendChild(weekNameBox);
    styleCreate(weekNameBox, mypageStyle.mypageCalendarWeekNameBox);

    let weekName = [];

    for (i in weekOfName) {
      weekName[i] = tagCreate("div");
      weekNameBox.appendChild(weekName[i]);
      weekName[i].innerText = weekOfName[i];
      weekName[i].style.width = "40px";
      weekName[i].style.textAlign = "center";
      weekName[i].style.justifyContent = "center";
      weekName[i].style.fontSize = "20px";
      weekName[i].style.fontWeight = "700";
    }

    let table = tagCreate("table", { id: "table" });
    root.appendChild(table);
    styleCreate(table, mypageStyle.mypageCalendarTable);

    let weekIndex = [];
    let dayIndex = [];

    let countOfWeek = 0;
    let countOfDay = 0;

    for (let i = 0; i < weekCount; i++) {
      weekIndex[i] = tagCreate("tr", { id: `week${i}` });
      table.appendChild(weekIndex[i]);
      for (let j = 0; j < 7; j++) {
        dayIndex[j] = tagCreate("td");
        weekIndex[i].appendChild(dayIndex[j]);
        styleCreate(dayIndex[j], mypageStyle.mypageCalendarDayIndex);
        if (monthOfFirstDay <= countOfWeek && countOfDay < nowMonthOfLastDate) {
          countOfDay++;
          dayIndex[j].innerText = countOfDay;
          dayIndex[j].id = "day" + countOfDay;
          // * if(countOfDay === nowDate)에서 캘린더에 표시되는 Year, Month와 현재 시각 Year, Month가 일치할 때만 오늘이라는 표시를 하도록 변경
          if (
            countOfDay === nowDate &&
            currentMonth === nowMonth &&
            currentYear === nowYear
          ) {
            styleCreate(dayIndex[j], mypageStyle.mypageCalendarNowDayIndex);
          }
        }
        countOfWeek++;
      }
    }

    let beforeMonth = new Date(now.setMonth(now.getMonth() - 1));
    let nextMonth = new Date(now.setMonth(now.getMonth() + 1));

    beforeMonthBtn.addEventListener("click", function () {
      console.log("이전 달");
      console.log(currentMonth);
      beforeMonth = new Date(now.setMonth(now.getMonth() - 1));
      rootChild[5].innerHTML = "";
      calendar(beforeMonth);
    });

    nextMonthBtn.addEventListener("click", function () {
      console.log("다음 달");
      console.log(currentMonth);
      nextMonth = new Date(now.setMonth(now.getMonth() + 1));
      rootChild[5].innerHTML = "";
      calendar(nextMonth);
    });
  }

  calendar(new Date());










//*-------------------------------


  
  btmMeun(rootChild[6]);

  // for(let i = 0;i<5;i++){
  //   let child = tagCreate("div",{});
  //   rootChild[6].appendChild(child);
  //   styleCreate(child,{
  //     width : "59px",
  //     height : "59px",
  //     backgroundColor : "#FDFDFD",
  //     borderRadius : "5px",
  //     cursor : "pointer",
  //     boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  //     transition : "scale ease 0.3s",
  //     display : "flex",
  //     justifyContent: "center",
  //     alignItems : "center",
  //     fontSize : "13px",
  //     fontWeight : "500"
  //   })
  //   child.onmouseover = ()=>{
  //     child.style.scale = "1.1"
  //   }
  //   child.onmouseout = ()=>{
  //     child.style.scale = "1"

  //   }
  //   menuChild.push(child);
  // }
  // menuChild[0].innerText = "댕댕마켓";
  // menuChild[1].innerText = "댕자랑";
  // menuChild[2].innerText = "댕맵";

  // menuChild[3].innerText = "댕톡";
  // menuChild[4].innerText = "댕프랜드";
  // menuChild[2].addEventListener("click",()=>{
  //   window.location = "http://localhost:2080/map"
  // })
}
yourPage()
