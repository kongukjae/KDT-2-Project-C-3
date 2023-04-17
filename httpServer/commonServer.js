import fs from "fs";


const cmServer = {
  mysqlInfo: {
    host: "192.168.0.93",
    user: "guest",
    password: "0000",
    database: "mungta",
  },
  fileDirectory: function(request, response) {
    //console.log('bbbbbb: ' + `../${request}`)
    fs.readFile(`./${request}`, function (err, data) {
      response.writeHead(200);
      response.write(data);
      response.end();
    });
  },
}

export default cmServer;