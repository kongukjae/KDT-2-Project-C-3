import fs from "fs";
import busboy from 'busboy';
import uploadImageDirectoryOnMySQL from './backend_module_put_image_directory_on_mySQL_upload.js'

//네임 테일은 이름 정할 때 아이디 뒤에 들어갈 이미지 이름 넣어주는 곳
//없다면 '.'만 넣으면 됌
export default function uploadRequestedImagewithBusboy(request, response, imageDirectory, nameTail){
  console.log('busboy모듈로 이미지 업로드 시작');
  let finalFileName = '';
  let userId = ''
  let table = ''
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
    console.log('업로드 이미지 저장 완료');
    uploadImageDirectoryOnMySQL(request, response, 'post_upload','*',userId, finalFileName)
  }); 
  request.pipe(bb);
  return [userId, finalFileName];
}