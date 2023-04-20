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
  
          let postLike = [];
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
                    WHERE post_index = '${postNumber}' AND post_id = '${writeUser}'
                  `);
                } 
                else {
                  const likeUserArr = JSON.parse(postLike).likeUser;

                  console.log(likeUserArr)

                  // 2. likeUser 배열에 이미 존재하는 경우 해당 값을 삭제
                  if (likeUserArr.includes(likeUser)) {
                    let cnt = likeUserArr.indexOf(likeUser);
                    console.log(cnt);
                    conn.query(`
                    UPDATE dangstar SET post_like = JSON_REMOVE(post_like, '$.likeUser[1]')`);

                  } 
                  // 3. likeUser 배열에 존재하지 않는 경우 해당 값을 추가
                  else {
                    conn.query(`
                      UPDATE dangstar 
                      SET post_like = JSON_ARRAY_APPEND(post_like, '$.likeUser', '${likeUser}')
                      WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' AND post_like IS NOT NULL
                    `);
                  }
                }
              }
            }
            
          );
          /*
          conn.query(
            `SELECT * FROM dangstar WHERE post_index = '${postNumber}'`, 
            (error, data) => {
              if (error) throw error;
              else {
                //if (data.length === 0) {
                  console.log("좋아요 개수: 0",writeUser, data)
                  conn.query(`
                  UPDATE dangstar SET post_like = JSON_OBJECT('likeUser', JSON_ARRAY('${likeUser}'))
                  WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' and post_like IS NULL
                  `);
                  //conn.end();
                //} else {
                  conn.query(`SELECT * FROM dangstar WHERE JSON_CONTAINS(post_like->'$.likeUser', 'euni123')`,
                  (error, data) =>{
                    if (error) throw error;
                    else {
                      if (data.length === 0) {
                        conn.query(`UPDATE dangstar SET post_like = JSON_REMOVE(post_like, CONCAT('$.likeUser[', JSON_SEARCH(post_like, 'all', '${likeUser}'), ']')) WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' and post_like IS NOT NULL`);
                      }
                      else{
                        conn.query(`UPDATE dangstar SET post_like = JSON_ARRAY_APPEND(post_like, '$.likeUser', '${likeUser}') WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' and post_like IS NOT NULL`);
                        
                      }
  
                    }
                  });
  
                  conn.query(`UPDATE dangstar SET post_like = JSON_REMOVE(post_like, CONCAT('$.likeUser[', JSON_SEARCH(post_like, 'all', '${likeUser}'), ']')) WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' and post_like IS NOT NULL`);
  
                  conn.query(`
                  UPDATE dangstar SET post_like = JSON_REMOVE(post_like, CONCAT('$.likeUser[', JSON_SEARCH(post_like, 'one', '${likeUser}'), ']'))
                  WHERE post_index = '${postNumber}' AND post_id = '${writeUser}'`);
  
                  UPDATE dangstar SET post_like = JSON_REMOVE(post_like, REPLACE(JSON_SEARCH(post_like, 'one', '${likeUser}'), '.', '')) WHERE post_index = '${postNumber}' AND post_id = '${writeUser}'`);
  
                }
              }
            }
          );*/
          
  
          // conn.end();
  
          // conn.query(`select post_like from dangstar where post_index = '${postNumber}'`,
          // (error, data) => {
          //   if(error) throw error;
          //   else{
          //     //console.log(data)
          //     for(let row of data) {
          //       let postLikeJson = row.post_like;
          //       let postLikeArray = JSON.parse(postLikeJson).likeUser;
          //       postLike = postLike.concat(postLikeArray);
          //     }
          //     //console.log(postLike);
          //     for(let i = 0; i < postLike.length; i++){
          //       //if(postLike[i] === likeUser){
          //         conn.query(`UPDATE dangstar SET post_like = JSON_REMOVE(post_like, JSON_UNQUOTE(json_extract(post_like, '$.likeUser[${i}]')), 'all', '${likeUser}') WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' and post_like is not null`)
  
                  
                  // conn.query(`UPDATE dangstar SET post_like = JSON_REMOVE(post_like, JSON_UNQUOTE(JSON_SEARCH(post_like->'$.likeUser', 'one', 'euni123'))) WHERE JSON_SEARCH(post_like->'$.likeUser', 'one', 'euni123') IS NOT NULL`)
                  // `UPDATE dangstar SET post_like = JSON_REMOVE(post_like, CONCAT('$.likeUser[', JSON_SEARCH(post_like, 'one', '${likeUser}'), ']'))
                  // WHERE post_index = '${postNumber}'`
                //}
          //     }
              
          //   }
          // });
          // )
          
        })
      }
    }

