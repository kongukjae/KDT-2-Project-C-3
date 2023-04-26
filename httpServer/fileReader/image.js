// import fs from 'fs';

// function fileReadAndSend (directory, request, response) {
//   fs.readFile(`${directory}`, function (err, data) {
//     response.writeHead(200);
//     response.write(data);
//     response.end();
//   });
// };

// export default function fileReaderImageRouter(request, response){
//   if(request.url.startsWith("/image")){
//     console.log(request.url);
//     let fileLocation = request.url.replace('/image','');
//     fileReadAndSend( `.${fileLocation}`,request, response)
//   }
// }

