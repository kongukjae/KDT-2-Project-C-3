import cmServer from "../../commonServer.js";
import mysql from "mysql";
import * as jwtFunc from "../../module/jsonWebToken.js"

export default function postPostBoardLike(request, response) {
  if (request.url.startsWith("/loadFriendsList")) {
    console.log("댕프렌드 진입", request.url);
    let body = "";
    
      request.on('data', function(data){
        body += data;
      })
      request.on("end", function(){
        // console.log("ddd", body)
        let userID = body.split("=")[1]
        userID = userID.split("}")[0]
        // console.log(userID)
        userID = jwtFunc.jwtCheck(userID).id;
        // console.log("댕프렌드 유저ID", userID)

        let conn = mysql.createConnection(cmServer.mysqlInfo);
        
        //즐겨찾기 팔로우 정보담는 변수
        let starFriendsID = [];
        let starFriendsDogName = [];
        let starFriendsIntro = [];

        //일반 팔로우 정보담는 변수
        let stdFriendsID = [];
        let stdFriendsDogName = [];
        let stdFriendsIntro = [];

        //최종 즐겨찾기, 일반 팔로우 정보
        let friend = {};

        conn.connect();
        conn.query(`select id, dogName, intro from userinfo join fr_list on fr_list.fr_id = userinfo.id where user_id = '${userID}' and star = '1'`, 
        (err, data) => {
          if(err) throw err;
          else{
            data.forEach(element => {
              starFriendsID.push(element.id);
              starFriendsDogName.push(element.dogName);

              if(element.intro === null){
                starFriendsIntro.push(" ");
              }
              else{
                starFriendsIntro.push(element.intro);
              }
            });
            friend['starId'] = starFriendsID;
            friend['starDogName'] = starFriendsDogName;
            friend['starIntro'] = starFriendsIntro;
          }
        });
        conn.query(`select id, dogName, intro from userinfo join fr_list on fr_list.fr_id = userinfo.id where user_id = '${userID}' and star = '0'`, 
        (err, data) => {
          if(err) throw err;
          else{
            data.forEach(element => {
              stdFriendsID.push(element.id);
              stdFriendsDogName.push(element.dogName);

              if(element.intro === null){
                stdFriendsIntro.push(" ");
              }
              else{
                stdFriendsIntro.push(element.intro);
              }
            });
            friend['stdId'] = stdFriendsID;
            friend['stdDogName'] = stdFriendsDogName;
            friend['stdIntro'] = stdFriendsIntro;
          }
          console.log("친구목록: ", friend);
          response.writeHead(200)
          response.end(JSON.stringify(friend))
        });
        conn.end();
      })
  }
}
