import fs from "fs";
import mysql from "mysql";
import cmServer from "../commonServer.js";

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
function publicChatGenerator(id, lat, lag, date){
  let PublicChatRoom = locationAverageStringInput(lat.toString()) + '&' + locationAverageStringInput(lag.toString());
  const data = fs.readFileSync('dangmapPubilcChatList.json');
  let publlicChatList = JSON.parse(data)
  if(publlicChatList[PublicChatRoom] === undefined){
    publlicChatList[PublicChatRoom] = [id];
  }else{
    publlicChatList[PublicChatRoom].push(id);
    if(publlicChatList[PublicChatRoom].length===10){
      console.log('------------------------')
      console.log('단톡방이 생성되었습니다.')
      console.log('초대 알림 맴버 : ' + publlicChatList[PublicChatRoom])
      console.log('------------------------')

    }
    if(publlicChatList[PublicChatRoom].length>10 && !chatRoomList.includes(PublicChatRoom)){
      chatRoomList.push(PublicChatRoom);
    }
  }
  fs.writeFileSync('dangmapPubilcChatList.json', JSON.stringify(publlicChatList));
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
let connection = mysql.createConnection(cmServer.mysqlInfo);
connection.connect();
connection.query(`SELECT * FROM map_tables`, (error, rows, fields) => {
  if (error) throw error;
  else{
    for(let i of rows){
      publicChatGenerator(i.id, i.latitude, i.longitude, i.addData)
    }
    console.log(chatRoomList)
}})
connection.end();