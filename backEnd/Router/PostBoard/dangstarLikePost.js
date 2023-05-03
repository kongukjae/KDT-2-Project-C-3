import cmServer from "../../commonServer.js";
import * as jwtFunc from "../../module/jsonWebToken.js"
import mysql from "mysql";
  
  
export default function postPostBoardLike(request, response) {
    if(request.url.startsWith('/dangstarLike')){
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

        let likeResult;
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
                likeResult = true;
                conn.query(`insert into alarm(id, postlike, comment_index, alarm_type) values ('${writeUser}', '${likeUser}', '${postNumber}', 'like')`)
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
                  likeResult = false;

                  //console.log("likeUser:::::: ", likeUser)
                  conn.query(`delete from alarm where id = '${writeUser}' and postlike = '${likeUser}' and comment_index = '${postNumber}'`);


                } 
                // 3. likeUser 배열에 존재하지 않는 경우 해당 값을 추가
                else {
                  conn.query(`
                    UPDATE dangstar 
                    SET post_like = JSON_ARRAY_APPEND(post_like, '$.likeUser', '${likeUser}')
                    WHERE post_index = '${postNumber}' AND post_id = '${writeUser}' AND post_like IS NOT NULL
                  `);
                  likeResult = true;
                  conn.query(`insert into alarm(id, postlike, comment_index, alarm_type) values ('${writeUser}', '${likeUser}', '${postNumber}', 'like')`)


                }
              }
              response.writeHead(200);
              if(likeResult){
                response.end('true');
              }
              else{
                response.end('false');
              }
            }
            conn.end();
          }
          
        );
      })
  }
  if(request.url === "/likeCheck"){
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      let splitBody = body.split("&");
      let writeUser = splitBody[0].split("=")[1]; //게시글 작성자 ID
      let postNumber = splitBody[1].split("=")[1]; //작성된 게시글 넘버
      let likeUser = splitBody[2].split("=")[1]; //게시글에 하트 누른 사용자 ID
      likeUser = jwtFunc.jwtCheck(likeUser).id;

      console.log("likeeeee: ", writeUser, postNumber, likeUser);

      let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
          `SELECT post_like FROM dangstar WHERE post_index = '${postNumber}'`,
          (err, data) => {
            if(err) throw err;
            else{
              const postLike = data[0].post_like;

              if(postLike === null || postLike.length === 0){
                console.log("값이 없거나 null입니다", postLike)
                response.writeHead(200);
                response.end('false');
              }
              else{
                const likeUserArr = JSON.parse(postLike).likeUser;
                console.log(likeUserArr)
                if (likeUserArr.includes(likeUser)) {
                  //let cnt = likeUserArr.indexOf(likeUser);
                  //console.log("cnt: ", cnt)
                  response.writeHead(200);
                  response.end('true');
                }
                else{
                  response.writeHead(200);
                  response.end('false');
                }
              }
            }
        });
        conn.end();
    });
  }
}

