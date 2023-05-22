import fs from "fs";

const cmServer = {
  mysqlInfo: {
    host: "ls-c563867ad0aab9958d5e4cd2ec6442cff7d907e6.cmk3l6gajyrb.ap-northeast-2.rds.amazonaws.com",
    user: "dbmasteruser",
    password: "HDb$_A92aHV7PF9&P)N6Iu%t*G.4ebg7",
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
