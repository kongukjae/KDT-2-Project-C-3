import * as jwtFunc from "./jsonwebtoken.js"
import cmServer from "./commonServer.js";
import mysql from "mysql";
  
  
export default function postPostBoardLike(request, response) {
    if(request.url.startsWith('/postBoardLike')){
      // if(splitURL === 'postBoardLike'){
        console.log("postBoardLike 진입")
        let body = "";
      
        request.on('data', function(data){
          body += data;
        })
        request.on("end", function(){ 
          //console.log(body)
          let splitBody = body.split("&");
          let writeUser = splitBody[0].split("=")[1]; //게시글 작성자 ID
          let postNumber = splitBody[1].split("=")[1]; //작성된 게시글 넘버
          let likeUser = splitBody[2].split("=")[1]; //게시글에 하트 누른 사용자 ID
          likeUser = jwtFunc.jwtCheck(likeUser).id;
          console.log(likeUser)
          // console.log(jwtFunc.jwtCheck(likeUser).id);
  
          let likeResult = {re: false};
          let conn = mysql.createConnection(cmServer.mysqlInfo);
          conn.connect();
          conn.query(
            `SELECT * FROM dangstar WHERE post_index = '${postNumber}'`, 
            (error, data) => {

              console.log("aa: ", postNumber, writeUser, likeUser, data)

              if (error) throw error;
              else {
                const postLike = data[0].post_like;

                console.log(data[0].post_like);

               // 1. post_like가 null일 경우 새로운 배열을 생성하여 likeUser 추가
                if (!postLike) {
                  conn.query(`
                    UPDATE dangstar 
                    SET post_like = JSON_OBJECT('likeUser', JSON_ARRAY('${likeUser}'))
                    WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' AND post_like IS NULL
                  `);

                  likeResult['re'] = true;
                  response.writeHead(200);
                  response.write(JSON.stringify(likeResult));
                  response.end();
                } 
                else {
                  const likeUserArr = JSON.parse(postLike).likeUser;

                  console.log(likeUserArr)

                  // 2. likeUser 배열에 이미 존재하는 경우 해당 값을 삭제
                  if (likeUserArr.includes(likeUser)) {
                    let cnt = likeUserArr.indexOf(likeUser);
                    console.log(cnt);
                    conn.query(`
                    UPDATE dangstar SET post_like = JSON_REMOVE(post_like, '$.likeUser[${cnt}]') 
                      WHERE post_index = '${postNumber}' AND post_id = '${writeUser}'
                    `);
                    likeResult['re'] = false;
                    response.writeHead(200);
                    response.write(JSON.stringify(likeResult));
                    response.end();

                  } 
                  // 3. likeUser 배열에 존재하지 않는 경우 해당 값을 추가
                  else {
                    conn.query(`
                      UPDATE dangstar 
                      SET post_like = JSON_ARRAY_APPEND(post_like, '$.likeUser', '${likeUser}')
                      WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' AND post_like IS NOT NULL
                    `);

                    likeResult['re'] = true;
                    response.writeHead(200);
                    response.write(JSON.stringify(likeResult));
                    response.end();
                  }
                }
              }
              conn.end();
            }
            
          );
        })
      }
    }

