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

        conn.connect();
        conn.query(`select fr_id from fr_list where user_id = '${userID}' and star = '1'`, 
        (err, data) => {
          if(err) throw err;
          else{
            console.log("내 친구: ", data);
          }
        });


        response.writeHead(200, { "Content-Type": "text/html" })
        response.end()

      })
    // let nth = request.url.split("=")[1];
    // console.log(nth)

  }
}
