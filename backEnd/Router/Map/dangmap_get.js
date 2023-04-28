import htmlBox from "../../../common/htmlBox.js";
import fs from 'fs';

export default function dangmap_HTML(request, response) {

  if (request.url === "/map") {
    response.writeHead(200);
    response.write(htmlBox.htmlFunc(htmlBox.dangMap));
    response.end();
  }else if(request.url === '/publicChatLocation'){
    const dataResult = fs.readFileSync('./backEnd/module/dangmapPubilcChatListResult.json');    
    response.writeHead(200);
    response.end(JSON.stringify(JSON.parse(dataResult)));
  }
}