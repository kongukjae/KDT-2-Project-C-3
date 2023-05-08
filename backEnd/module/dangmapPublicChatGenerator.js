import fs from "fs";
import mysql from "mysql";
import cmServer from "../commonServer.js";
export {publicChatGenerator};

const korea = {
  point :{
    west : [37.969444, 124.61],
    east : [37.240778, 131.869556],
    south : [33.111944, 126.268611],
    north : [38.611111, 128.364167]
  },
  squire : {
    west:124.61,
    east:131.869556,
    south : 33.111944,
    north : 38.611111
  },
  demention : {
    height : 5.499167,
    width : 7.259556,
  },
  dementionBlock : {
    height : 5499.167,
    width : 7259.556
  }

}

let chatRoomList = [];
// function publicChatGenerator(id, lat, lag, date, list, room){
//   let PublicChatRoom = locationAverageStringInput(lat.toString()) + '&' + locationAverageStringInput(lag.toString());
//   const data = fs.readFileSync(list);
//   let publlicChatList = JSON.parse(data)
//   if(publlicChatList[PublicChatRoom] === undefined){
//     publlicChatList[PublicChatRoom] = [id];
//   }else{
//     publlicChatList[PublicChatRoom].push(id);
//     if(publlicChatList[PublicChatRoom].length===15){
//       console.log('------------------------')
//       console.log('단톡방이 생성되었습니다.')
//       console.log('초대 알림 맴버 : ' + publlicChatList[PublicChatRoom])
//       console.log('------------------------')
//       chatRoomList.push(PublicChatRoom);
//       const dataResult = fs.readFileSync(room);
//       let publlicChatListResult = JSON.parse(dataResult);
//       publlicChatListResult.push(PublicChatRoom)
//       fs.writeFileSync(room, JSON.stringify(publlicChatListResult));

//     }
 
//   }
//   fs.writeFileSync(list, JSON.stringify(publlicChatList));
// }
function publicChatGenerator(id, lat, lag, date){
  let PublicChatRoom = locationAverageStringInput(lat.toString()) + '&' + locationAverageStringInput(lag.toString());
  // const data = fs.readFileSync(list);
  let connection = mysql.createConnection(cmServer.mysqlInfo);
  connection.connect();
  connection.query(`SELECT value FROM public_chat_list where type='targetMarker'`, (error, rows, fields) => {
  if (error) throw error;
  else{
    console.log('발자국 디비에 넣는 중')
    let publlicChatList = JSON.parse(rows[0].value)
    if(publlicChatList[PublicChatRoom] === undefined){
      publlicChatList[PublicChatRoom] = [id];
      connection.query(`UPDATE public_chat_list SET value = '${JSON.stringify(publlicChatList)}' where type='targetMarker'`, (error, rows, fields) => {
        if (error) throw error;
        else{console.log('추가완료')}})
        connection.end();
    }else{
      publlicChatList[PublicChatRoom].push(id);
      if(publlicChatList[PublicChatRoom].length===15){
        console.log('------------------------')
        console.log('단톡방이 생성되었습니다.')
        console.log('초대 알림 맴버 : ' + publlicChatList[PublicChatRoom])
        console.log('------------------------')
        connection.query(`insert into alarm(id,public_chat,alarm_type) values('${id}','${PublicChatRoom}','public_chat');`, (error, rows, fields) => {
          if (error) throw error;
          else{
          connection.query(`SELECT value FROM public_chat_list where type='chatList'`, (error, rows, fields) => {
            if (error) throw error;
            else{
              let chatList = JSON.parse(rows[0].value);
              chatList.push(PublicChatRoom);
              connection.query(`UPDATE public_chat_list SET value = '${JSON.stringify(chatList)}' where type='chatList'`, (error, rows, fields) => {
                if (error) throw error;
                else{
                  connection.query(`UPDATE public_chat_list SET value = '${JSON.stringify(publlicChatList)}' where type='targetMarker'`, (error, rows, fields) => {
                    if (error) throw error;
                    else{console.log('추가완료')}})
                    connection.end();
                }})
            }})
          }}) 
            // chatRoomList.push(PublicChatRoom);
            // const dataResult = fs.readFileSync(room);
            // let publlicChatListResult = JSON.parse(dataResult);
            // publlicChatListResult.push(PublicChatRoom)
            // fs.writeFileSync(room, JSON.stringify(publlicChatListResult));
            
      }else{
        connection.query(`UPDATE public_chat_list SET value = '${JSON.stringify(publlicChatList)}' where type='targetMarker'`, (error, rows, fields) => {
          if (error) throw error;
          else{console.log('추가완료')}})
          connection.end();
      }
  
    }
}})
}



function locationAverageStringInput(value){
  let result = ''
  if(value.includes('.')){
    result = value.split('.')[0] + '.';
    let tail = value.split('.')[1].padEnd(4,'0');
    let checkNum = Number(tail.slice(2))
    if(checkNum.toString().length>2){
      checkNum = Number(tail.slice(2,4) + '.' + tail.slice(4))
    }
    if(checkNum<25){
      result = result + tail.slice(0,2) + '0'
    }else if(checkNum<75){
      result = result + tail.slice(0,2) + '5'
    }else if(checkNum <= 99){
      result = (Number(result + tail.slice(0,2)) + 0.01).toString() + '0';
    }
    return result.split('.')[0] +'.' +result.split('.')[1].padEnd(3,'0').slice(0,3)

    

  }else{
    result = value + '.000'
    return result
  }

}

// console.log(locationAverageStringInput('127.38'));
// let connection = mysql.createConnection(cmServer.mysqlInfo);
// connection.connect();
// connection.query(`SELECT * FROM map_tables WHERE addData >= '2023-5-2 00:00:00' LIMIT 300;`, (error, rows, fields) => {
//   if (error) throw error;
//   else{
//     for(let i of rows){
//       publicChatGenerator(i.id, i.latitude, i.longitude, i.addData)
//     }
//     // console.log(chatRoomList)
// }})
// connection.end();

// let connection = mysql.createConnection(cmServer.mysqlInfo);
// connection.connect();
// connection.query(`SELECT value FROM public_chat_list where type='targetMarker'`, (error, rows, fields) => {
// if (error) throw error;
// else{
//   let chatRoomList = JSON.parse(rows[0].value)
  
//   if(publlicChatList[PublicChatRoom] === undefined){
//       publlicChatList[PublicChatRoom] = [id];
//     }else{
//       publlicChatList[PublicChatRoom].push(id);
//       if(publlicChatList[PublicChatRoom].length===15){
//         console.log('------------------------')
//         console.log('단톡방이 생성되었습니다.')
//         console.log('초대 알림 맴버 : ' + publlicChatList[PublicChatRoom])
//         console.log('------------------------')
//         chatRoomList.push(PublicChatRoom);
//         const dataResult = fs.readFileSync(room);
//         let publlicChatListResult = JSON.parse(dataResult);
//         publlicChatListResult.push(PublicChatRoom)
//         fs.writeFileSync(room, JSON.stringify(publlicChatListResult));
  
//       }
   
//     }
//     fs.writeFileSync(list, JSON.stringify(publlicChatList));


// }})
// connection.end();

// publicChatGenerator('asdasd123', 36.35008667194413000, 127.39089294935074000, '2023-04-12 14:49:54')