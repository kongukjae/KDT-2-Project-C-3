import fs from "fs";

const cmServer = {
  mysqlInfo: {
    host: "ls-18c0a3161a42306c507774c12bbc12651e33aa85.cjtascdyo8ci.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "123123123",
    database: "mungta",
  },
  fileDirectory: function (request, response) {
    console.log("bbbbbb: " + `../${request}`);
    console.log("cccccc: " + `${request}`);
    fs.readFile(`./${request}`, function (err, data) {
      response.writeHead(200);
      response.write(data);
      response.end();
    });
  },
};

export default cmServer;
