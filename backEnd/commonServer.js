import fs from "fs";

const cmServer = {
  mysqlInfo: {
    host: "ls-414dd39cdb7215ba67853172200804032eca5c10.cjlhhn5kbuqa.ap-northeast-2.rds.amazonaws.com",
    user: "root",
    password: "00000000",
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
