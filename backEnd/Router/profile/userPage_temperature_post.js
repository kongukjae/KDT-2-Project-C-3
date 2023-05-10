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
      conn.query(
        `select temp, goodTemp, badTemp from temperature where id = '${yourId}'`,
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
      conn.query(
        `select temp, goodTemp, badTemp from temperature where id = '${youreId}'`,
        (err, data) => {
          if (err) throw err;
          else {
            console.log(data);
            let temp = data[0].temp;
            let resultTemp;
            const good = JSON.parse(data[0].goodTemp);
            const bad = JSON.parse(data[0].badTemp);
            if (good === null && bad === null) {
              // good과 bad 둘다 null 일 때 -> 최초 동작
              console.log("null값입니다 null값입니다 null값입니다 ");
              console.log("최초 양쪽 다 null 값일 경우 동작");
              conn.query(`UPDATE temperature SET goodTemp = JSON_OBJECT('goodUser', JSON_ARRAY('${myId}')), temp = '${temp + 0.5}' WHERE id = '${youreId}'`);
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
              // good이 null이고 bad가 null이 아닐 때
              if (good === null && bad !== null) {
                badArr = JSON.parse(data[0].badTemp).badUser;
                if(badArr.includes(myId)) {
                  // badArr에 내 id가 있을 때
                  let cnt = badArr.indexOf(myId);
                  conn.query(`UPDATE temperature SET badTemp = JSON_REMOVE(badTemp, '$.badUser[${cnt}]') WHERE id = '${youreId}'`);
                  conn.query(`UPDATE temperature SET goodTemp = JSON_OBJECT('goodUser', JSON_ARRAY('${myId}')), temp = '${temp + 1}' WHERE id = '${youreId}'`);
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
                } else if(!badArr.includes(myId)) {
                  // badArr에 내 id가 없을 때
                  conn.query(`UPDATE temperature SET goodTemp = JSON_OBJECT('goodUser', JSON_ARRAY('${myId}')), temp = '${temp + 0.5}' WHERE id = '${youreId}'`);
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
                }
              } else if(good !== null && bad === null) {
                // good이 null이 아니고 bad가 null일 때
                goodArr = JSON.parse(data[0].goodTemp).goodUser;
                if (goodArr.includes(myId)) {
                  // goodArr에 내 id가 있을 때
                  console.log("이미 추천 함!");
                  response.writeHead(200);
                  response.end("false");
                  conn.end();
                } else if(!goodArr.includes(myId)) {
                  // goodArr에 내 id가 없을 때
                  conn.query(`UPDATE temperature SET goodTemp = JSON_ARRAY_APPEND(goodTemp, '$.goodUser', '${myId}'), temp = '${temp + 0.5}' WHERE id = '${youreId}'`);
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
                }
              } else if(good !== null && bad !== null) {
                // good과 bad 둘 다 null이 아닐 때
                goodArr = JSON.parse(data[0].goodTemp).goodUser;
                badArr = JSON.parse(data[0].badTemp).badUser;
                if(goodArr.includes(myId)) {
                  // goodArr에 내 id가 있을 때
                  console.log("이미 추천 함!");
                  response.writeHead(200);
                  response.end("false");
                  conn.end();
                } else if(badArr.includes(myId)) {
                  // badArr에 내 id가 있을 때
                  let cnt = badArr.indexOf(myId);
                  conn.query(`UPDATE temperature SET badTemp = JSON_REMOVE(badTemp, '$.badUser[${cnt}]') WHERE id = '${youreId}'`);
                  conn.query(`UPDATE temperature SET goodTemp = JSON_ARRAY_APPEND(goodTemp, '$.goodUser', '${myId}'), temp = '${temp + 1}' WHERE id = '${youreId}'`);
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
                } else if(!goodArr.includes(myId) && !badArr.includes(myId)) {
                  // goodArr와 badArr 둘 다 내 id가 없을 때
                  conn.query(`UPDATE temperature SET goodTemp = JSON_ARRAY_APPEND(goodTemp, '$.goodUser', '${myId}'), temp = '${temp + 0.5}' WHERE id = '${youreId}'`);
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
                }
              }
            }
          }
        }
      );
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
      conn.query(
        `select temp, goodTemp, badTemp from temperature where id = '${youreId}'`,
        (err, data) => {
          if (err) throw err;
          else {
            console.log(data);
            let temp = data[0].temp;
            let resultTemp;
            const good = JSON.parse(data[0].goodTemp);
            const bad = JSON.parse(data[0].badTemp);
            if (good === null && bad === null) {
              // good과 bad 둘다 null 일 때 -> 최초 동작
              console.log("null값입니다 null값입니다 null값입니다 ");
              console.log("최초 양쪽 다 null 값일 경우 동작");
              conn.query(
                `UPDATE temperature SET badTemp = JSON_OBJECT('badUser', JSON_ARRAY('${myId}')), temp = '${temp - 0.5}' WHERE id = '${youreId}'`);
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
              // good이 null이 아니고 bad가 null일 때
              if (good !== null && bad === null) {
                goodArr = JSON.parse(data[0].goodTemp).goodUser;
                if(goodArr.includes(myId)) {
                  // goodArr에 내 id가 있을 때
                  let cnt = goodArr.indexOf(myId);
                  conn.query(`UPDATE temperature SET goodTemp = JSON_REMOVE(goodTemp, '$.goodUser[${cnt}]') WHERE id = '${youreId}'`);
                  conn.query(`UPDATE temperature SET badTemp = JSON_OBJECT('badUser', JSON_ARRAY('${myId}')), temp = '${temp - 1}' WHERE id = '${youreId}'`);
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
                } else if(!goodArr.includes(myId)) {
                  // goodArr에 내 id가 없을 때
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
                }
              } else if(good === null && bad !== null) {
                // good이 null이고 bad가 null이 아닐 때
                badArr = JSON.parse(data[0].badTemp).badUser;
                if (badArr.includes(myId)) {
                  // badArr에 내 id가 있을 때
                  console.log("이미 비추천 함!");
                  response.writeHead(200);
                  response.end("false");
                  conn.end();
                } else if(!badArr.includes(myId)) {
                  // badArr에 내 id가 없을 때
                  conn.query(`UPDATE temperature SET badTemp = JSON_ARRAY_APPEND(badTemp, '$.badUser', '${myId}'), temp = '${temp - 0.5}' WHERE id = '${youreId}'`);
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
                }
              } else if(good !== null && bad !== null) {
                // good과 bad 둘 다 null이 아닐 때
                goodArr = JSON.parse(data[0].goodTemp).goodUser;
                badArr = JSON.parse(data[0].badTemp).badUser;
                if(badArr.includes(myId)) {
                  // badArr에 내 id가 있을 때
                  console.log("이미 비추천 함!");
                  response.writeHead(200);
                  response.end("false");
                  conn.end();
                } else if(goodArr.includes(myId)) {
                  // goodArr에 내 id가 있을 때
                  let cnt = goodArr.indexOf(myId);
                  conn.query(`UPDATE temperature SET goodTemp = JSON_REMOVE(goodTemp, '$.goodUser[${cnt}]') WHERE id = '${youreId}'`);
                  conn.query(`UPDATE temperature SET badTemp = JSON_ARRAY_APPEND(badTemp, '$.badUser', '${myId}'), temp = '${temp - 1}' WHERE id = '${youreId}'`);
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
                } else if(!goodArr.includes(myId) && !badArr.includes(myId)) {
                  // goodArr와 badArr 둘 다 내 id가 없을 때
                  conn.query(`UPDATE temperature SET badTemp = JSON_ARRAY_APPEND(badTemp, '$.badUser', '${myId}'), temp = '${temp - 0.5}' WHERE id = '${youreId}'`);
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
                }
              }
            }
          }
        }
      );
    });
  }
}
