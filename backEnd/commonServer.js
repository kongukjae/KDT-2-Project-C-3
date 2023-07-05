import fs from "fs";

const cmServer = {
  mysqlInfo: {
    host: "ls-6bea7511e7ffc979da579d43bcfde558eabe8cb3.cmk3l6gajyrb.ap-northeast-2.rds.amazonaws.com",
    user: "dbmasteruser",
    password: "}3lMm%E<%SwwKq21<tWC~o0]Iacd?q$H",
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
