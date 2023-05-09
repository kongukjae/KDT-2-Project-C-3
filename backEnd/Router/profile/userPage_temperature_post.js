import cmServer from "../../commonServer.js";
import * as JWT from "../../module/jsonWebToken.js";
import mysql from "mysql";

export default function tempeCheck(request, response) {
  if (request.url.startsWith("/temperature")) {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log("산책 온도 식별러러러러ㅓ러럴111111");
      const splitVal = body.split("&");

      const myId = JWT.jwtCheck(splitVal[0].split("=")[1]).id;
      const yourId = splitVal[1].split("=")[1];
      console.log("넘어 온 값은???????? ", myId, yourId);
      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(`select temp, goodTemp, badTemp from temperature where id = '${yourId}'`,
        (err, data) => {
          if (err) throw err;
          else {
            let tempResult = {};

            if (data.length === 0) {
              console.log("데이터 없음::", data);
              tempResult["re"] = false;
              tempResult["temp"] = "";
              response.writeHead(200);
              response.end(JSON.stringify(tempResult));
            } else {
              console.log("데이터 있음::", data[0].temp);
              tempResult["re"] = true;
              tempResult["temp"] = data[0].temp;
              tempResult["up"] = data[0].UpTemp;
              tempResult["down"] = data[0].DownTemp;
              response.writeHead(200);
              response.end(JSON.stringify(tempResult));
            }
          }
        }
      );
      conn.end();
    });
  }
  if (request.url === "/UpTemp") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log("산책 온도 Up 산책 온도 Up 산책 온도 Up");
      console.log(body);
      const splitBody = body.split("&");

      const myId = JWT.jwtCheck(splitBody[0].split("=")[1]).id;
      const youreId = splitBody[1].split("=")[1];
      console.log("넘어온 값은 ? ", myId, youreId);

      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(`select temp, goodTemp, badTemp from temperature where id = '${youreId}'`, (err, data) => {
        if(err) throw err;
        else {
          console.log(data);
          let temp = data[0].temp;
          let resultTemp;
          const good = JSON.parse(data[0].goodTemp);
          const bad = JSON.parse(data[0].badTemp);
          if(good === null && bad === null) {
            console.log("null값입니다 null값입니다 null값입니다 ")
            conn.query(`UPDATE temperature SET goodTemp = JSON_OBJECT('goodUser', JSON_ARRAY('${myId}')), temp = '${temp + 0.5}' WHERE id = '${youreId}'`);
            conn.query(`SELECT temp FROM temperature`, (err, row) => {
              if(err) throw err;
              else {
                console.log(row);
                console.log(row[0].temp);
                resultTemp = row[0].temp;
                response.writeHead(200);
                response.end(JSON.stringify(resultTemp));
                conn.end();
              }
            })
          } else {
            let goodArr = [];
            let badArr = [];
            if(good !== null) {
              goodArr = JSON.parse(data[0].goodTemp).goodUser;
              console.log(goodArr);
            }
            if(bad !== null) {
              badArr = JSON.parse(data[0].badTemp).badUser;
              console.log(badArr);
            }
            console.log("test ? ", goodArr)
            console.log("test ! ", badArr)
            if(goodArr.includes(myId)) {
              console.log("이미 추천 함!");
              response.writeHead(200);
              response.end("false");
              conn.end();
            }
            if(!goodArr.includes(myId) && (!badArr.includes(myId) || bad === null)) {
              conn.query(`UPDATE temperature SET goodTemp = JSON_ARRAY_APPEND(goodTemp, '$.goodUser', '${myId}'), temp = '${temp + 0.5}' WHERE id = '${youreId}'`)
              conn.query(`SELECT temp FROM temperature`, (err, row) => {
                if(err) throw err;
                else {
                  console.log(row);
                  console.log(row[0].temp);
                  resultTemp = row[0].temp;
                  response.writeHead(200);
                  response.end(JSON.stringify(resultTemp));
                  conn.end();
                }
              })
            }
            console.log("length test ", badArr.length)
            console.log(typeof(badArr.length));
            if(badArr.length !== 0) {
              if(badArr.includes(myId)) {
                console.log(badArr);
                let cnt = badArr.indexOf(myId)
                console.log(cnt);
                conn.query(`UPDATE temperature SET badTemp = JSON_REMOVE(badTemp, '$.badUser[${cnt}]') WHERE id = '${youreId}'`);
                conn.query(`UPDATE temperature SET goodTemp = JSON_ARRAY_APPEND(goodTemp, '$.goodUser', '${myId}'), temp = '${temp + 1}' WHERE id = '${youreId}'`)
                conn.query(`SELECT temp FROM temperature`, (err, row) => {
                  if(err) throw err;
                  else {
                    console.log(row);
                    console.log(row[0].temp);
                    resultTemp = row[0].temp;
                    response.writeHead(200);
                    response.end(JSON.stringify(resultTemp));
                    conn.end();
                  }
                })
              }
            }
          }
        }
      })
    });
  }
  if (request.url === "/DownTemp") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log("산책 온도 Down 산책 온도 Down 산책 온도 Down");
      console.log(body);
      const splitBody = body.split("&");

      const myId = JWT.jwtCheck(splitBody[0].split("=")[1]).id;
      const youreId = splitBody[1].split("=")[1];
      console.log("넘어온 값은 ? ", myId, youreId);

      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(`select temp, goodTemp, badTemp from temperature where id = '${youreId}'`, (err, data) => {
          if (err) throw err;
          else {
            console.log(data);
            let temp = data[0].temp;
            let resultTemp;
            const good = JSON.parse(data[0].goodTemp);
            const bad = JSON.parse(data[0].badTemp);
            if (good === null && bad === null) {
              console.log("null값입니다 null값입니다 null값입니다 ");
              conn.query(`UPDATE temperature SET badTemp = JSON_OBJECT('badUser', JSON_ARRAY('${myId}')), temp = '${temp - 0.5}' WHERE id = '${youreId}'`);
              conn.query(`SELECT temp FROM temperature`, (err, row) => {
                if (err) throw err;
                else {
                  console.log(row);
                  console.log(row[0].temp);
                  resultTemp = row[0].temp;
                  response.writeHead(200);
                  response.end(JSON.stringify(resultTemp));
                  conn.end();
                }
              });
            } else {
              let goodArr = [];
              let badArr = [];
              if (good !== null) {
                goodArr = JSON.parse(data[0].goodTemp).goodUser;
                console.log(goodArr);
              }
              if (bad !== null) {
                badArr = JSON.parse(data[0].badTemp).badUser;
                console.log(badArr);
              }
              if (badArr.includes(myId)) {
                console.log("이미 비추천 함!");
                response.writeHead(200);
                response.end("false");
                conn.end();
              }
              if (
                !badArr.includes(myId) &&
                (!goodArr.includes(myId) || good === null)
              ) {
                conn.query(`UPDATE temperature SET badTemp = JSON_ARRAY_APPEND(badTemp, '$.badUser', '${myId}'), temp = '${temp - 0.5}' WHERE id = '${youreId}'`);
                conn.query(`SELECT temp FROM temperature`, (err, row) => {
                  if(err) throw err;
                  else {
                    console.log(row);
                    console.log(row[0].temp);
                    resultTemp = row[0].temp;
                    response.writeHead(200);
                    response.end(JSON.stringify(resultTemp));
                    conn.end();
                  }
                })
              }
            console.log("length test ", goodArr.length)
            console.log(typeof(goodArr.length));
              if(goodArr.length !== 0) {
                if (goodArr.includes(myId)) {
                  console.log(badArr);
                  let cnt = badArr.indexOf(myId);
                  console.log(cnt);
                  conn.query(`UPDATE temperature SET goodTemp = JSON_REMOVE(goodTemp, '$.goodUser[${cnt}]') WHERE id = '${youreId}'`);
                  conn.query(`UPDATE temperature SET badTemp = JSON_ARRAY_APPEND(badTemp, '$.badUser', '${myId}), temp = '${temp - 1}' WHERE id = '${youreId}'`);
                  conn.query(`SELECT temp FROM temperature`, (err, row) => {
                    if(err) throw err;
                    else {
                      console.log(row);
                      console.log(row[0].temp);
                      resultTemp = row[0].temp;
                      response.writeHead(200);
                      response.end(JSON.stringify(resultTemp));
                      conn.end();
                    }
                  })
                }
              }
            }
          }
        }
      );
    });
  }
  //     conn.query(`select temp, UpTemp, DownTemp from temperature where id = '${myId}' and fr_id = '${youreId}'`,
  //       (err, data) => {
  //         if (err) throw err;
  //         else {
  //           console.log(data);
  //           let temp = data[0].temp;
  //           let UpTemp = data[0].UpTemp;
  //           let DownTemp = data[0].DownTemp;
  //           let resultTemp;
  //           if (DownTemp === 0 && UpTemp === 0) {
  //             conn.query(`update temperature SET temp = '${temp - 0.5}', DownTemp = '1' where id = '${myId}' and fr_id = '${youreId}'`);
  //             conn.query(`select temp from temperature where id = '${myId}' and fr_id = '${youreId}'`,
  //               (err, row) => {
  //                 if (err) throw err;
  //                 console.log(row);
  //                 resultTemp = row[0].temp;
  //                 response.writeHead(200);
  //                 response.end(JSON.stringify(resultTemp));
  //                 conn.end();
  //               }
  //             );
  //           } else if (DownTemp === 0 && UpTemp === 1) {
  //             conn.query(`update temperature SET temp = '${temp - 1}', UpTemp = '0', DownTemp = '1' where id = '${myId}' and fr_id = '${youreId}'`);
  //             conn.query(`select temp from temperature where id = '${myId}' and fr_id = '${youreId}'`,
  //               (err, row) => {
  //                 if (err) throw err;
  //                 console.log(row);
  //                 resultTemp = row[0].temp;
  //                 response.writeHead(200);
  //                 response.end(JSON.stringify(resultTemp));
  //                 conn.end();
  //               }
  //             );
  //           } else if (DownTemp === 1) {
  //             console.log("이미 비추천 함!");
  //             response.writeHead(200);
  //             response.end("false");
  //           }
  //         }
  //       }
  //     );
  //   });
  // }

  if (request.url === "/checkTemperature") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log("산책 온도 식별러러러러ㅓ러럴");
      const splitVal = body.split("&");

      const myId = JWT.jwtCheck(splitVal[0].split("=")[1]).id;
      const yourId = splitVal[1].split("=")[1];
      const type = splitVal[2].split("=")[1];
      const typeVal = splitVal[3].split("=")[1];
      console.log("넘어 온 값은???????? ", myId, yourId, type, typeVal);

      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(`select temp from temperature where id = '${myId}' and fr_id = '${yourId}'`,
        (err, data) => {
          if (err) throw err;
          else {
            let temp = data[0].temp;
            // console.log("temp값은 ? 1", temp)

            if (type === "true") {
              // console.log("temp값은 ? 2", temp)
              if (typeVal === "0") {
                //추천 버튼을 처음 클릭했을 때
                temp += 0.5;
                // temp = 38.5;
                console.log("temp값은 ? 3", temp);
                conn.query(`update temperature set temp = ${temp} where id = '${myId}' and fr_id = '${yourId}'`);

                response.writeHead(200);
                response.end(JSON.stringify(temp));
                conn.end();
              } else if (typeVal === "1") {
                //추천 버튼을 한번 더 클릭했을 때
                temp -= 0.5;
                console.log("temp값은 ? 4", temp);
                conn.query(`update temperature set temp = ${temp} where id = '${myId}' and fr_id = '${yourId}'`);

                response.writeHead(200);
                response.end(JSON.stringify(temp));
                conn.end();
              }
            } else if (type === "false") {
              if (typeVal === "0") {
                //비추천 버튼을 처음 클릭했을 때
                temp -= 0.5;
                console.log("temp값은 ? ? ?5", temp);
                conn.query(`update temperature set temp = ${temp} where id = '${myId}' and fr_id = '${yourId}'`);

                response.writeHead(200);
                response.end(JSON.stringify(temp));
                conn.end();
              } else if (typeVal === "1") {
                //비추천 버튼을 한번 더 클릭했을 때
                temp += 0.5;
                console.log("temp값은 ? ? 6", temp);
                conn.query(`update temperature set temp = ${temp} where id = '${myId}' and fr_id = '${yourId}'`);

                response.writeHead(200);
                response.end(JSON.stringify(temp));
                conn.end();
              }
            }
          }
        }
      );
    });
  }
}
