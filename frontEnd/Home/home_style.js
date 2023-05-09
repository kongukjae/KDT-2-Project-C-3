function main() {
  let root = tagCreate("div", { id: "root" });
  document.body.appendChild(root);
  styleCreate(root, targetStyle.mainRoot);
  let rootChild = [];
  for (let i = 0; i < 6; i++) {
    let child = tagCreate("div", { id: i });
    root.appendChild(child);
    rootChild.push(child);
  }

  //상단메뉴바 commonFunc로 이동
  rootChild[2].id = "map";
  topMenu(rootChild[0]);
  createHamburger(root);

  //날씨 메뉴 commonFunc로 이동
  styleCreate(rootChild[1], targetStyle.mainWeatherBanner);
  styleCreate(rootChild[2], targetStyle.mainMap);
  styleCreate(rootChild[3], targetStyle.mainSlideWrap);
  styleCreate(rootChild[4], targetStyle.mainFindingDogs);

  // 하단 메뉴바 common.js
  btmMeun(rootChild[5]);
  const gotop = document.getElementById("goTop");
  gotop.style.display = "none";

  // 슬라이드 시작부분

  function sendRequest(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("hi");
        callback(JSON.parse(xhr.responseText));
      }
    };
    let targeNumber = [];
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(targeNumber));
    console.log(targeNumber);
  }

  // 2. 슬라이드 생성함수이다. 여기서 함수를 가져와서 해당 URL에 요청한다.
  function createSlide(rootChild) {
    sendRequest("http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/slidePlease", (responseData) => {
      for (let i = 0; i < responseData.length; i++) {
        console.log(responseData[i].img);
        slideChild[i].children[0].innerText = responseData[i].post_detail;
        slideChild[i].style.cursor = 'pointer'
        slideChild[i].addEventListener('click',()=>{
          let detailForm = document.createElement("form");
          detailForm.method = "POST";
          detailForm.action = "/detailPostDangstar";
          let params = {postIndex:responseData[i].post_index}
          for (let key in params) {
            let hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            detailForm.appendChild(hiddenField);
          }
          document.body.appendChild(detailForm);
          detailForm.submit();
        })

        if (responseData[i].img === "null") {
          slideChild[i].children[1].style.backgroundImage = `url(/image/image/default/null.png)`;
        } else {
          slideChild[i].children[1].style.backgroundImage = `url(/image/image/dangstar/${responseData[i].img})`;
        }
      }
    });

    let slideCover = tagCreate("div", {});
    rootChild.appendChild(slideCover);
    styleCreate(slideCover, targetStyle.mainSlideCover);

    let slideChild = [];
    let slideColor = ["#245953", "#408E91", "#E49393", "#D8D8D8", "#867070"];
    let slidePosition = [-1, 0, 1, 1, 1];
    for (let i = 0; i < 5; i++) {
      let child = tagCreate("div", {});
      slideCover.appendChild(child);
      styleCreate(child, {
        width: "500px",
        height: "260px",
        backgroundColor: slideColor[i],
        position: "absolute",
        color: "white",
        fontSize: "30px",
        fontWeight: "500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "0.6s ease",
      });

      let leftTextContainer = tagCreate("div", {});
      styleCreate(leftTextContainer, {
        width: "40%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
      child.appendChild(leftTextContainer);

      let rightImageContainer = tagCreate("div", {});
      styleCreate(rightImageContainer, {
        width: "40%",
        height: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
      });
      rightImageContainer.style.backgroundImage = `url('이미지_URL_${i}')`;
      child.appendChild(rightImageContainer);

      slideChild.push(child);
    }
    function setSlidePosition(childArr) {
      for (let i = 0; i < childArr.length; i++) {
        childArr[i].style.left = `${slidePosition[i] * 100}%`;
      }
    }
    setSlidePosition(slideCover.children);

    let leftButton = tagCreate("div", { id: "leftButton" });
    styleCreate(leftButton, targetStyle.mainSlideLeftBtn);
    rootChild.appendChild(leftButton);
    leftButton.textContent = "<";
    let rightButton = tagCreate("div", { id: "rightButton" });
    styleCreate(rightButton, targetStyle.mainSlideRightBtn);
    rootChild.appendChild(rightButton);
    rightButton.textContent = ">";

    let dotsWrap = tagCreate("div", { id: "dotsWrap" });
    rootChild.appendChild(dotsWrap);
    styleCreate(dotsWrap, targetStyle.mainSlideDotWrap);

    for (let slide = 0; slide < 5; slide++) {
      let dot = document.createElement("div");
      styleCreate(dot, targetStyle.mainSlideDot);
      dotsWrap.appendChild(dot);
    }
    let dot = dotsWrap.children;

    function dotwide(nth) {
      for (let indexWidth = 0; indexWidth < dot.length; indexWidth++) {
        if (nth === indexWidth) {
          dot[indexWidth].style.width = "70px";
        } else {
          dot[indexWidth].style.width = "9px";
        }
      }
    }
    dotwide(0);
    let dotCnt = 0;

    function rightMove() {
      slideCover.appendChild(slideCover.firstChild);
      setSlidePosition(slideCover.children);
      dotCnt++;
      dotCnt %= 5;
      dotwide(dotCnt);
    }
    function leftMove() {
      slideCover.prepend(slideCover.lastChild);
      setSlidePosition(slideCover.children);
      if (dotCnt === 0) {
        dotCnt = 4;
      } else {
        dotCnt--;
      }
      dotwide(dotCnt);
    }

    setInterval(() => {
      rightMove();
    }, 5000);

    leftButton.addEventListener("click", () => {
      leftMove();
    });
    rightButton.addEventListener("click", () => {
      rightMove();
    });
    for (let i = 0; i < dotsWrap.children.length; i++) {
      dotsWrap.children[i].addEventListener("click", () => {
        let gap = Math.abs(i - dotCnt);
        if (i > dotCnt) {
          for (let i = 0; i < gap; i++) {
            rightMove();
          }
        } else {
          for (let i = 0; i < gap; i++) {
            leftMove();
          }
        }
      });
    }
  }
  createSlide(rootChild[3]);
  console.log(rootChild[3]);
}

main();

getWeatherAsync();
