import fs from "fs";

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

function publicChatGenerater(){

  fs.readFile('dangmapPubilcChatList.json', (err, data) => {
    if (err) throw err
    let publlicChatList = JSON.parse(data)

    fs.writeFile('dangmapPubilcChatList.json', JSON.stringify(publlicChatList), (err) => console.log(err));
  })
}


function locationAverage(value){
  return value
}