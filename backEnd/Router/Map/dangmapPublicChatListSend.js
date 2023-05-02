// import fs from "fs";
// import mysql from "mysql";
// import cmServer from "../../commonServer.js";

// let chatRoomList = [];
// function publicChatGenerator(id, lat, lag, date){
//   let PublicChatRoom = locationAverageStringInput(lat.toString()) + '&' + locationAverageStringInput(lag.toString());
//   const data = fs.readFileSync('dangmapPubilcChatListCheck.json');
//   let publlicChatList = JSON.parse(data)
//   if(publlicChatList[PublicChatRoom] === undefined){
//     publlicChatList[PublicChatRoom] = [id];
//   }else{
//     publlicChatList[PublicChatRoom].push(id);
//     if(publlicChatList[PublicChatRoom].length===7){
//       console.log('------------------------')
//       console.log('단톡방이 생성되었습니다.')
//       console.log('초대 알림 맴버 : ' + publlicChatList[PublicChatRoom])
//       console.log('------------------------')
//       chatRoomList.push(PublicChatRoom);
//       const dataResult = fs.readFileSync('dangmapPubilcChatListResult.json');
//       let publlicChatListResult = JSON.parse(dataResult);
//       publlicChatListResult.push(PublicChatRoom)
//       fs.writeFileSync('dangmapPubilcChatListResult.json', JSON.stringify(publlicChatListResult));

//     }
 
//   }
//   fs.writeFileSync('dangmapPubilcChatListCheck.json', JSON.stringify(publlicChatList));
// }



// function locationAverageStringInput(value){
//   let result = ''
//   if(value.includes('.')){
//     result = value.split('.')[0] + '.';
//     let tail = value.split('.')[1].padEnd(4,'0');
//     let checkNum = Number(tail.slice(2))
//     if(checkNum.toString().length>2){
//       checkNum = Number(tail.slice(2,4) + '.' + tail.slice(4))
//     }
//     if(checkNum<25){
//       result = result + tail.slice(0,2) + '0'
//     }else if(checkNum<75){
//       result = result + tail.slice(0,2) + '5'
//     }else if(checkNum <= 99){
//       result = (Number(result + tail.slice(0,2)) + 0.01).toString() + '0';
//     }
//     return result.split('.')[0] +'.' +result.split('.')[1].padEnd(3,'0').slice(0,3)

    

//   }else{
//     result = value + '.000'
//     return result
//   }

// }

// // console.log(locationAverageStringInput('127.38'));
// // let connection = mysql.createConnection(cmServer.mysqlInfo);
// // connection.connect();
// // connection.query(`SELECT * FROM map_tables`, (error, rows, fields) => {
// //   if (error) throw error;
// //   else{
// //     for(let i of rows){
// //       publicChatGenerator(i.id, i.latitude, i.longitude, i.addData)
// //     }
// //     console.log(chatRoomList)
// // }})
// // connection.end();