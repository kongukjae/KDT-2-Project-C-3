function myPage() {
  let root = tagCreate("div", { id: "root" });
  document.body.appendChild(root);
  styleCreate(root, mypageStyle.mypageRoot);

  let rootChild = [];
  for (let i = 0; i < 8; i++) {
    let child = tagCreate("div", {});
    root.appendChild(child);
    rootChild.push(child);
  }
  topMenu(rootChild[0]);
  createHamburger(root);

  styleCreate(rootChild[1], mypageStyle.mypageTitle);
  rootChild[1].innerText = `마이 페이지`;

  styleCreate(rootChild[2], mypageStyle.mypageImageStyle);
  const cookieId = document.cookie.split("=")[1].split(";")[0];

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://43.201.52.54:2080/sendImage`);
  xhr.responseType = "blob";
  xhr.send(`type=proFile&id=${cookieId}`);
  xhr.addEventListener("load", function () {
    let imageFromServer = xhr.response;
    const resultURL = URL.createObjectURL(xhr.response);
    rootChild[2].style.backgroundImage = `url(${resultURL})`;
    console.log(imageFromServer);
    console.log("이미지 가져오기 완료");
  });
  styleCreate(rootChild[3], mypageStyle.mypageButtonWrap);
  // for (let i = 0; i < 2; i++) {
  let button = tagCreate("div");
  styleCreate(button, mypageStyle.mypageButton);
  button.style.width = "240px";
  rootChild[3].appendChild(button);
  // }
  rootChild[3].children[0].innerText = "사진 업로드";
  // rootChild[3].children[1].innerText = "개인정보 수정";

  styleCreate(rootChild[4], mypageStyle.mypageUserinfoBox);
  rootChild[4].style.height = "400px";
  for (let i = 0; i < 8; i++) {
    let infoTag = tagCreate("div");
    styleCreate(infoTag, mypageStyle.mypageUserinfoBoxInnerStyle);
    rootChild[4].appendChild(infoTag);
  }
  rootChild[4].children[0].innerText = `강아지 이름 : ${dogNameFromServer}`;
  if (dogageFromServer === "null") {
    rootChild[4].children[1].innerText = `나이 : 나이를 추가해주세요`;
  } else {
    rootChild[4].children[1].innerText = `나이 : ${dogageFromServer}`;
  }
  if (dogsizeFromServer === "null") {
    rootChild[4].children[2].innerText = `강아지 크기 : 강아지 사이즈를 추가해보세요`;
  } else if (dogsizeFromServer === "1") {
    rootChild[4].children[2].innerText = `강아지 크기 : 소형견`;
  } else if (dogsizeFromServer === "2") {
    rootChild[4].children[2].innerText = `강아지 크기 : 중형견`;
  } else if (dogsizeFromServer === "3") {
    rootChild[4].children[2].innerText = `강아지 크기 : 대형견`;
  }

  rootChild[4].children[3].innerText = `산책온도 :`;
  rootChild[4].children[4].innerText = `개인정보 수정/추가`;
  styleCreate(rootChild[4].children[4], mypageStyle.mypageUserEdit);
  if (dogGenderFromServer === "1") {
    rootChild[4].children[5].innerText = "성별 : 남자";
  } else {
    rootChild[4].children[5].innerText = "성별 : 여자";
  }
  if (introFromServer === "null") {
    rootChild[4].children[7].innerText = "소개글을 추가해보세요";
  } else {
    rootChild[4].children[7].innerText = introFromServer;
  }
  rootChild[4].children[6].innerText = `소개글`;

  rootChild[4].children[4].addEventListener("click", () => {
    userInfoUpdate();
  });

  styleCreate(
    rootChild[4].lastChild,
    mypageStyle.mypageUserinfoBoxSelfIntroduce
  );

  styleCreate(rootChild[5], mypageStyle.mypageCalender);
  rootChild[3].children[0].addEventListener("click", () => {
    uploadImage();
  });
  function uploadImage() {
    let uploadImageModal = tagCreate("div", {});
    styleCreate(uploadImageModal, mypageStyle.mypageUploadModal);
    uploadImageModal.innerHTML = `<p1>이미지를 등록해주세요</p1>
    <form id = "uploadImageForm" action="/uploadImage" method="post" enctype="multipart/form-data">
      <input id ="myImage" type="file" name="myFile">
    </form>
    `;

    root.appendChild(uploadImageModal);
    let uploadImageForm = document.getElementById("uploadImageForm");
    uploadImageForm.style.width = "200px";

    let buttonWrap = tagCreate("div", {});
    styleCreate(buttonWrap, mypageStyle.mypageUploadModalButtonWrap);

    uploadImageModal.appendChild(buttonWrap);
    let submitbutton = tagCreate("div");
    submitbutton.form = uploadImageForm;
    styleCreate(submitbutton, mypageStyle.mypageUploadModalButtonStyle);

    buttonWrap.appendChild(submitbutton);
    submitbutton.innerText = "업로드";
    let myImage = document.getElementById("myImage");
    let imageFormData = new FormData();
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      rootChild[2].style.backgroundImage = `url(${reader.result})`;
    });

    submitbutton.addEventListener("click", () => {
      reader.readAsDataURL(myImage.files[0]);
      imageFormData.append("id", cookieId);
      imageFormData.append("attachedImage", myImage.files[0]);
      fetch("http://43.201.52.54:2080/uploadImage", {
        method: "POST",
        body: imageFormData,
      })
        .then((res) => res)
        .then((result) => console.log("done"));
    });

    let okaybutton = tagCreate("div", {});
    styleCreate(okaybutton, mypageStyle.mypageUploadModalButtonStyle);
    buttonWrap.appendChild(okaybutton);
    okaybutton.innerText = "닫기";
    okaybutton.addEventListener("click", () => {
      uploadImageModal.remove();
    });
  }

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
      `http://43.201.52.54:2080/allloadMap?id=${cookieId}?first=${firstDayOfMonth}?last=${lastDayOfMonth}`
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

  // 마이페이지 내거 조회
  let tabMenuContainer = tagCreate("div", { id: "tabMenuContainer" });
  rootChild[6].appendChild(tabMenuContainer);
  styleCreate(tabMenuContainer, {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "50px",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
  });

  const tabNames = ["댕스타글", "댕마켓글", "내댓글"];

  // 탭 컨텐츠 생성
  const tabContents = ["", "", ""].map((content, index) => {
    let tabContent = tagCreate("div", { id: `tabContent-${index}` });
    tabContent.textContent = content;
    rootChild[6].appendChild(tabContent);

    styleCreate(tabContent, {
      display: "none", // 기본적으로 탭 컨텐츠 숨김
      width: "100%",
      height: "400px",
      backgroundColor: "#fff",
      padding: "20px",
      boxSizing: "border-box",
    });

    return tabContent;
  });

  const tabClickHandler = (selectedIndex) => {
    tabMenuContainer.childNodes.forEach((child) => {
      child.style.borderBottomColor = "transparent";
    });

    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    tabMenuContainer.childNodes[selectedIndex].style.borderBottomColor =
      "#007BFF";
    tabContents[selectedIndex].style.display = "block";
  };
  let userID = document.cookie.split("jwt=")[1];
  console.log(userID);

  tabNames.forEach((tabName, index) => {
    let tab = tagCreate("button", {});
    tab.textContent = tabName;
    tabMenuContainer.appendChild(tab);

    styleCreate(tab, {
      backgroundColor: "transparent",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      outline: "none",
      padding: "10px 20px",
      color: "#333",
      fontWeight: "bold",
      borderBottom: "2px solid transparent",
    });

    tab.addEventListener("click", () => {
      tabClickHandler(index);

      // 댕스타글 탭 이벤트 시작
      if (index === 0) {
        tabContents[index].innerHTML = "";
        const xhrr = new XMLHttpRequest();
        xhrr.open("post", `http://43.201.52.54:2080/thirdmyWrite`);
        xhrr.setRequestHeader("Content-Type", "application/json");
        xhrr.send(`userID=${userID}`);
        xhrr.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            console.log(data);
            if (data.length === 0) {
              tabContents[index].innerHTML = "작성한 글이 없습니다."; //
            }
            for (let i = 0; i < data.length; i++) {
              const postDetail = document.createElement("div");
              postDetail.innerHTML = `댕스타글: ${data[i].post_detail},<br>`; // 댕스타글 컨텐츠에 데이터 추가
              postDetail.addEventListener("click", function () {
                let detailForm = document.createElement("form");
                detailForm.method = "POST";
                detailForm.action = "/detailPostDangstar";
                let params = { postIndex: data[i].post_index };
                for (let key in params) {
                  let hiddenField = document.createElement("input");
                  hiddenField.setAttribute("type", "hidden");
                  hiddenField.setAttribute("name", key);
                  hiddenField.setAttribute("value", params[key]);
                  detailForm.appendChild(hiddenField);
                }
                document.body.appendChild(detailForm);
                detailForm.submit();
              });
              tabContents[index].appendChild(postDetail);
            }
          }
        };

        // postDetail.innerHTML = `내가쓴글: ${data[i].detail}<br>`;
        // tabContents[index].appendChild(postDetail);
      } else if (index === 1) {
        tabContents[index].innerHTML = "";
        const xhrr = new XMLHttpRequest();
        xhrr.open("post", `http://43.201.52.54:2080/secondmyWrite`);
        xhrr.setRequestHeader("Content-Type", "application/json");
        xhrr.send(`userID=${userID}`);
        xhrr.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            if (data.length === 0) {
              tabContents[index].innerHTML = "작성한 글이 없습니다.";
            } else {
              for (let i = 0; i < data.length; i++) {
                const postDetail = document.createElement("a");

                postDetail.href = `http://43.201.52.54:2080/secondHandPost?nth=${i}`;
                postDetail.style.color = "inherit"; // 링크의 색상을 부모 요소의 색상으로 설정
                postDetail.style.textDecoration = "none"; // 밑줄 제거
                postDetail.innerHTML = `내가쓴글: ${data[i].detail}<br>`;
                tabContents[index].appendChild(postDetail);
              }
            }
          }
        };
      } else if (index === 2) {
        tabContents[index].innerHTML = "";
        const xhrr = new XMLHttpRequest();
        xhrr.open("post", `http://43.201.52.54:2080/firstmyWrite`);
        xhrr.setRequestHeader("Content-Type", "application/json");
        xhrr.send(`userID=${userID}`);
        xhrr.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            const dataa = JSON.parse(this.responseText);
            console.log(dataa);
            if (dataa.length === 0) {
              tabContents[index].innerHTML = "작성한 댓글이 없습니다."; // 작성한 글이 없을 경우 처리
            }
            for (let i = 0; i < dataa.length; i++) {
              const postDetail = document.createElement("div");
              postDetail.innerHTML = `내가쓴글: ${dataa[i].cm_detail},<br>`; // 댕스타글 컨텐츠에 데이터 추가
              postDetail.addEventListener("click", function () {
                let detailForm = document.createElement("form");
                detailForm.method = "POST";
                detailForm.action = "/detailPostDangstar";
                let params = { postIndex: dataa[i].post_index };
                for (let key in params) {
                  let hiddenField = document.createElement("input");
                  hiddenField.setAttribute("type", "hidden");
                  hiddenField.setAttribute("name", key);
                  hiddenField.setAttribute("value", params[key]);
                  detailForm.appendChild(hiddenField);
                }
                document.body.appendChild(detailForm);
                detailForm.submit();
              });
              tabContents[index].appendChild(postDetail);
            }
          }
        };
      }
    });
  });

  btmMeun(rootChild[7]);
  function userInfoUpdate() {
    let infoWrap = tagCreate("div");
    styleCreate(infoWrap, {
      width: stylePropertyUnion.width.width450,
      height: "450px",
      margin: "auto",
      flexDirection: "column",
      position: "absolute",
      backgroundColor: stylePropertyUnion.colorTheme.peach,
      ...stylePropertyUnion.flexRowCenter,
      borderRadius: "10px",
      gap: "10px",
    });
    rootChild[4].appendChild(infoWrap);
    let infoChild = [];
    for (let i = 0; i < 6; i++) {
      let child = tagCreate("div");
      styleCreate(child, {
        width: "80%",
        height: "30px",
        backgroundColor: "white",
        borderRadius: "5px",
        paddingLeft: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      });
      infoWrap.appendChild(child);
      infoChild.push(child);
    }

    infoChild[0].innerHTML = '<p>강아지 이름 :</p> <input type="text">';
    infoChild[1].innerHTML = `<p>나이 :</p><input type="text" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"/>`;
    infoChild[2].innerHTML = `<p>강아지 크기 :</p><select name="size" id="size">
    <option value="null">크기를 선택해주세요</option>
    <option value="1">소형견</option>
    <option value="2">중형견</option>
    <option value="3">대형견</option>
    </select>`;
    infoChild[3].innerHTML = `<p>성별 :</p>
    <select name="gender" id="gender">
    <option value="null">성별을 선택해주세요</option>
    <option value="1">남자</option>
    <option value="2">여자</option>
    </select>
    `;
    infoChild[4].innerHTML = "<p>소개글</p><textarea></textarea>";
    infoChild[5].innerHTML = "<div>변경</div><div>취소</div>";

    infoChild[0].children[1].value = dogNameFromServer;
    if (dogageFromServer !== "null") {
      infoChild[1].children[1].value = dogageFromServer;
    }
    if (dogsizeFromServer !== "null") {
      infoChild[2].children[1].value = dogsizeFromServer;
    }
    if (dogGenderFromServer === "1") {
      infoChild[3].children[1].value = "1";
    } else {
      infoChild[3].children[1].value = "2";
    }
    if (introFromServer !== "null") {
      infoChild[4].children[1].value = introFromServer;
    }

    styleCreate(infoChild[4], {
      height: "200px",
      flexDirection: "column",
      alignItems: "flex-start",
    });
    styleCreate(infoChild[4].children[1], {
      width: "95%",
      alignSelf: "center",
      height: "150px",
      resize: "none",
    });
    styleCreate(infoChild[5], {
      justifyContent: "space-around",
    });
    for (let i of infoChild[5].children) {
      styleCreate(i, {
        backgroundColor: stylePropertyUnion.colorTheme.peach,
        color: "white",
        width: "100px",
        height: "25px",
        ...stylePropertyUnion.flexRowCenter,
        borderRadius: "5px",
        cursor: "pointer",
      });
    }
    infoChild[5].children[1].addEventListener("click", () => {
      infoWrap.remove();
    });
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    infoChild[5].children[0].addEventListener("click", () => {
      fetch(`http://43.201.52.54:2080/userinfoUpdate`, {
        method: "POST",
        body: JSON.stringify({
          jwt: token,
          dogName: infoChild[0].children[1].value,
          dogGender: infoChild[3].children[1].value,
          intro: infoChild[4].children[1].value,
          dogsize: infoChild[2].children[1].value,
          dogage: infoChild[1].children[1].value,
          originDogName: dogNameFromServer,
        }),
      }).then((res) => {
        location.reload();
      });
    });
  }
}

myPage();
