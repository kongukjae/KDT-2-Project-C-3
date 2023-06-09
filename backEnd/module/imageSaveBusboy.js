import fs from "fs";
import busboy from 'busboy';
import putUserImageDirectoryOnMySQL from './imageWriteMySQL.js'

//네임 테일은 이름 정할 때 아이디 뒤에 들어갈 이미지 이름 넣어주는 곳
//없다면 '.'만 넣으면 됌
export {SaveRequestedProfileImagewithBusboy, SaveRequestedPostBoardImagewithBusboy}
function SaveRequestedProfileImagewithBusboy(request, response, imageDirectory, nameTail){
  console.log('busboy모듈로 이미지 업로드 시작');
  let finalFileName = '';
  let userId = ''
  const bb = busboy({ headers: request.headers });
  bb.on('field', (name, val, info) => {
    console.log('필드')
    console.log(`Field [${name}]: value: %j`, val);
    if(name==='id'){
      userId = val.split(';')[0];
      finalFileName = userId;
      finalFileName += nameTail;
    }
  });
  bb.on('file', (name, file, info) => {
    console.log('파일')
    const { filename, encoding, mimeType } = info;
    finalFileName += filename.split('.')[1];

    file.pipe(fs.createWriteStream(`${imageDirectory}${finalFileName}`));
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    file.on('data', (data) => {
      console.log(`File [${name}] got ${data.length} bytes`);
    })
  });
  bb.on('close', () => {
    console.log('이미지 저장 완료');
    putUserImageDirectoryOnMySQL(request, response, 'userimage','*',userId, finalFileName)
  }); 
  request.pipe(bb);
  return [userId, finalFileName];
}

function SaveRequestedPostBoardImagewithBusboy(request, response, imageDirectory){
  console.log('busboy모듈로 이미지 업로드 시작');
  let imageName = 'notnamed.jpg'
  const bb = busboy({ headers: request.headers });
  bb.on('field', (name, val, info) => {
    console.log('필드')
    console.log(`Field [${name}]: value: %j`, val);
    if(name==='name'){
      imageName = val;
      console.log('이미지 이름 설정 중 : ' + val);

    }
  });
  bb.on('file', (name, file, info) => {
    console.log('파일')
    const { filename, encoding, mimeType } = info;

    file.pipe(fs.createWriteStream(`${imageDirectory}${imageName}`));
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    file.on('data', (data) => {
      console.log(`File [${name}] got ${data.length} bytes`);
    })
  });
  bb.on('close', () => {
    console.log('이미지 저장 완료');
  }); 
  request.pipe(bb);
}