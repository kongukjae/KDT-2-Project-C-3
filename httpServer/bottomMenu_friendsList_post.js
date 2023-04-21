import cmServer from "./commonServer.js";
import mysql from "mysql";
import * as jwtFunc from "./jsonwebtoken.js"

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
        console.log("댕프렌드 유저ID", userID)

        let conn = mysql.createConnection(cmServer.mysqlInfo);
        let starFriends = [];
        let stdFriends = [];
        let friend = {};

        conn.connect();
        conn.query(`select fr_id from fr_list where user_id = '${userID}' and star = '1'`, 
        (err, data) => {
          if(err) throw err;
          else{
            data.forEach(element => {
              starFriends.push(element.fr_id);
            });
          }
          conn.query(`select fr_id from fr_list where user_id = '${userID}' and star = '0'`, 
          (err, data) => {
            if(err) throw err;
            else{
              data.forEach(element => {
                stdFriends.push(element.fr_id);
              });
            }
            // console.log("star: ", starFriends)
            // console.log("std: ", stdFriends)

            // starFriends.forEach(element => {
              friend['starFriends'] = starFriends;
              friend['stdFriends'] = stdFriends;
            // });
            // friend.push(starFriends)
            console.log("친구목록: ", friend)
            response.writeHead(200)
            response.end(JSON.stringify(friend))
          });
        });
        


      })
    // let nth = request.url.split("=")[1];
    // console.log(nth)

  }
}
