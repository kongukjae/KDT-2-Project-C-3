import mysql from "mysql";
import cmServer from "./commonServer.js";
import busboyImageSave from "./backend_module_busboy_image_save.js";
import busboy from 'busboy';


export default function callPostImage(request, response) {
  if(request.url.startsWith('/uploadImage')){
    let body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      console.log("image uploading")
      let result = body.split("\r\n")
      // const upload = multer({
      //   // 파일 저장 위치 (disk , memory 선택)
      //   storage: multer.diskStorage({
      //       destination: function (req, file, done) {
      //           done(null, '../image/userProfile/');
      //       },
      //       filename: function (req, file, done) {
      //           const ext = path.extname(file.originalname);
      //           done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      //       }
      //   }),
      //   // 파일 허용 사이즈 (5 MB)
      //   limits: { fileSize: 5 * 1024 * 1024 }
      // });
      
      console.log('업로드 시도');
      
      busboyImageSave(request, response,'../image/userProfile')
      // console.log('busboy모듈로 이미지 업로드 시작');
      // const bb = busboy({ headers: request.headers });
      // bb.on('file', (name, file, info) => {
      //   // const { filename, encoding, mimeType } = info;
      //   file.pipe(fs.createWriteStream(`../image/userProfile/${123}`));
      //   // console.log(
      //   //   `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      //   //   filename,
      //   //   encoding,
      //   //   mimeType
      //   // );
      //   file.on('data', (data) => {
      //     console.log(`File [${name}] got ${data.length} bytes`);
      //   })
      // });
      // bb.on('field', (name, val, info) => {
      //   console.log(`Field [${name}]: value: %j`, val);
      // });
      // bb.on('close', () => {
      //   console.log('이미지 저장 완료');
      // }); 
      // request.pipe(bb);
      // let connection = mysql.createConnection(cmServer.mysqlInfo);
      // connection.connect();
      // connection.query(`SELECT * FROM userimage WHERE id ='${result[3].slice(1).split(";")[0]}'`, (error, rows, fields) => {
      // if (error) throw error;
      // else{
      //   if(rows.length === 0){
      //     console.log("이전 이미지 없음")
      //     connection.query(`INSERT INTO userimage VALUES('${result[3].slice(1).split(";")[0]}','${result[7].slice(1)}')`, (error, rows, fields) => {
      //         if (error) throw error;
      //         else{
      //           response.writeHead(200);
      //           response.end();
      //           }
      //         });
      //         connection.end();
      //   }else{
      //     connection.query(`UPDATE userimage SET image='${result[7].slice(1)}' WHERE id='${result[3].slice(1).split(";")[0]}'`, (error, rows, fields) => {
      //         if (error) throw error;
      //         else{
      //           console.log("이미지 변경")
      //           response.writeHead(200);
      //           response.end();
      //           }
      //         });
      //         connection.end();
      //   }
      //   }
      // });
    })}
    if(request.url.startsWith('/sendUserImage'))
    {
      
      let body = '';
      request.on('data', function (data) {
        body = body + data;
      });
      request.on('end', function () {
        console.log("이미지 요청 받는 중")
        let connection = mysql.createConnection(cmServer.mysqlInfo);
        connection.connect();
        connection.query(`SELECT image FROM userimage WHERE id='${body.split("=")[1].split(";")[0]}'`, (error, rows, fields) => {
        if (error) throw error;
        else{
          response.writeHead(200);
          if(rows.length === 0){
            response.end(`https://i.ibb.co/8gB9yVS/img-546302.png`);
          }else{
            response.end(rows[0].image);
          }
        }
      });
      connection.end();
    })}
}