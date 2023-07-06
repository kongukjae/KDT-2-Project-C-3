async function getWeatherAsync() {
  let result = [];
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let targetDay = String(year) + String(month).padStart(2, "0") + String(date).padStart(2, "0");
  let weatherWindow = document.getElementById("root").children[1];
  styleCreate(weatherWindow, targetStyle.mainWeatherBanner)
  let weatherIcon = tagCreate("img", {id : "icon"});
  weatherWindow.appendChild(weatherIcon);
  styleCreate(weatherIcon, targetStyle.mainWeatherIcon);
  
  let weatherInfor = tagCreate("div", {id: "infor"});
  weatherWindow.appendChild(weatherInfor);
  styleCreate(weatherInfor, targetStyle.mainWeatherInfor);

  let hours = String(today.getHours() - 1).padStart(2, "0"); // 시간에 1 뺀 수 예보이기때문에 1을 빼야함

  // let rainOrSnow = await fetch(
  //   `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=a71YfWfLciBMXYG2e5zc9D1hNlQM29N7TICbhuOzOXtUnxJIGZjs0FWWuENqX%2FGdMEvpH%2B7eH1AZ2mhnfQmmiA%3D%3D&base_date=${targetDay}&pageNo=1&base_time=${hours}30&nx=67&ny=100&dataType=JSON`
  // ).then((response) => response.json());
  // let temp = await fetch(
  //   `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=a71YfWfLciBMXYG2e5zc9D1hNlQM29N7TICbhuOzOXtUnxJIGZjs0FWWuENqX%2FGdMEvpH%2B7eH1AZ2mhnfQmmiA%3D%3D&base_date=${targetDay}&pageNo=3&base_time=${hours}30&nx=67&ny=100&dataType=JSON`
  // ).then((response) => response.json());
  // let sky = await fetch(
  //   `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=a71YfWfLciBMXYG2e5zc9D1hNlQM29N7TICbhuOzOXtUnxJIGZjs0FWWuENqX%2FGdMEvpH%2B7eH1AZ2mhnfQmmiA%3D%3D&base_date=${targetDay}&pageNo=2&base_time=${hours}30&nx=67&ny=100&dataType=JSON`
  // ).then((response) => response.json());
  // result.push(temp.response.body.items.item[4].fcstValue);
  // if (sky.response.body.items.item[8].fcstValue < 6) {
  //   result.push("맑음");
  //   weatherIcon.src = "https://i.ibb.co/Stfvkfn/clear.png";
  // } else if (sky.response.body.items.item[8].fcstValue < 9) {
  //   result.push("구름많음");
  //   weatherIcon.src = "https://i.ibb.co/x2rVDZC/cloud.png";
  // } else {
  //   result.push("흐림");
  //   weatherIcon.src = "https://i.ibb.co/QpxCvky/lotsofcloud.png";
  // }

  // switch (rainOrSnow.response.body.items.item[6].fcstValue) {
  //   case "0": 
  //     result.push("")
  //   break;
  //   case "1":
  //   case "5": 
  //     result.push("비")
  //     weatherIcon.src = "https://i.ibb.co/Y230gfR/rain.png";
  //   break;
  //   case "3":
  //   case "7": 
  //     result.push("눈")
  //     weatherIcon.src = "https://i.ibb.co/GHhbwPM/snow.png";
  //   break;
  //   case "2": 
  //   case "6": 
  //     result.push("비 또는 눈");
  //     weatherIcon.src = "https://i.ibb.co/nM2K2wb/rainorsnow.png";
  //   break;
  // }
  // console.log(rainOrSnow.response.body.items.item[6].fcstValue);
  // console.log(rainOrSnow.response);
  // console.log(temp.response);
  // console.log(sky.response);
  // console.log(result);
  // console.log(targetDay);
  // weatherInfor.innerText = `오늘의 날씨는 ${result[2]} ${result[0]}도 ${result[1]}입니다`;

  //? API 안될경우
  weatherInfor.innerText = `오늘의 날씨는 29도 구름많음 입니다`;

  weatherIcon.src = "https://i.ibb.co/x2rVDZC/cloud.png";

  return result;
}
// getWeatherAsync()
