import htmlBox from "../../../common/htmlBox.js";
import cmServer from "../../commonServer.js";
import mysql from "mysql";

export default function dangstarPageDetail(request, response) {
  if (request.url.startsWith("/detailPostDangstar")) {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      console.log("댕스타 상세 페이지 진입이이이이이ㅣ이잉", body);
      let index = body.split("=")[1];
      console.log(index);

      let conn = mysql.createConnection(cmServer.mysqlInfo);
      conn.connect();
      conn.query(
        `select * from dangstar where post_index = ${index}`,
        (err, data) => {
          if (err) throw err;
          else {
            console.log(data);
            // splitData.forEach((value) => {
            //   parm.push(value.split('=')[1]);
            // });
            // console.log(parm)

            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(`<script>
            const link = '${data[0].img}';
            const id = '${data[0].post_id}';
            const text = '${data[0].post_detail}';
            const idx = '${0}';
            const postIdx = '${data[0].post_index}';</script>`);
            response.write(htmlBox.htmlFunc(htmlBox.postDetail));
            response.end();
          }
          conn.end();
        }
      );
    });
  }
}
