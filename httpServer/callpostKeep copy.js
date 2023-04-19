import htmlBox from "../common/htmlBox.js";
import mysql from "mysql";
import cmServer from "./commonServer.js";
import * as JWT from "./jsonwebtoken.js";

export default function dangMap(request, response) {
  if (request.url === "/mykeep") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      // body의 문자열을 & 기준으로 나누어 result 배열에 저장
      let result = body.split("&");
      // result 배열의 첫번째 요소를 "=" 기준으로 나누고, 변수에 저장
      // result[0]은 jwt = 뒤에 모든 부분이다.
      //즉, & 앞에 모든 부분이 result[0]인 것이다.
      // 그다음, split("=")[1]은 jwt=~~ 일때, jwt 부분이 [0], =~~ 부분이 [1]
      let jwtfromClient = result[0].split("=")[1];
       let mainText = result[0].split("=")[2];
       console.log('@@@@@@@@@@@@@@@@@@@@@')
      
       console.log(result)
      
      //  console.log(result[0]);
      console.log( result[0].split("=")[0]); //jwt

         console.log( result[0].split("=")[1]); // =eyjhbGcioi
         console.log( result[0].split("=")[2]);
      //   console.log( result[0].split("=")[3]);

      
      // let target = result[1].split("=")[1];
      // let mainText = result[2].split("=")[1];
      // let titleText =result[3].split("=")[1];
      // console.log(jwtfromClient)
      // console.log(target)
      // console.log(mainText)
      // console.log(titleText)


      
      let requestId = JWT.jwtCheck(jwtfromClient).id;
      let titleText = decodeURIComponent(result[0].split("=")[2]);
    //  let mainText = decodeURIComponent(result[0].split("=")[3]);
      // console.log(titleText);
      // console.log(mainText);

      let connection = mysql.createConnection(cmServer.mysqlInfo);
       connection.connect();
      //  if(target === "mine"){
       connection.query(
        `INSERT INTO second_hand (id, title, detail,img,date) VALUES ('${requestId}', '${titleText}', '${mainText}','image_url','2023-04-19')`,
        (error,) => {
          if (error) throw error;
        //  else {
        //   `SELECT * FROM second_hand where id='${requestId}'& title='${titleText}'&detail='${mainText}'`
        //   }
        }
       )
      // }
      connection.end();
       
  
            response.writeHead(200);
            response.write(htmlBox.htmlFunc(htmlBox.mykeep));
            response.end();
    
    });
  } 
  
}

