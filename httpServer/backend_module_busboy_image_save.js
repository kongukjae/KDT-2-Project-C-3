import fs from "fs";
import busboy from 'busboy';

export default function SaveRequestedImagewithBusboy(request, response, imageDirectory){
  console.log('busboy모듈로 이미지 업로드 시작');
  const bb = busboy({ headers: request.headers });
  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    file.pipe(fs.createWriteStream(`${imageDirectory}${filename}`));
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
  bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
  });
  bb.on('close', () => {
    console.log('이미지 저장 완료');
  }); 
  request.pipe(bb);
}