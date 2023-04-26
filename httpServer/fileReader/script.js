import fs from 'fs';

function fileReadAndSend (directory, request, response) {
  fs.readFile(`${directory}`, function (err, data) {
    response.writeHead(200);
    response.write(data);
    response.end();
  });
};

export default function fileReaderScriptRouter(request, response){
  if(request.url.startsWith("/script")){
    console.log(request.url);
    let fileLocation = request.url.replace('/script','');
    fileReadAndSend( `.${fileLocation}`,request, response)
  }
}
