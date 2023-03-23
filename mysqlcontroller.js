import mysql from "mysql";
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'signup'
});
connection.connect();

connection.query(`INSERT INTO userInfo(id,PW,question,answer,dogName,dogGender) values("hj","123",1,"daejeon","uno",1)`
, (error) => {
  if (error) throw error;
  console.log("정상작동");
});

connection.query('SELECT * FROM userInfo', (error, rows, fields) => {
  if (error) throw error;
  else{
    console.log(rows);
  }
});

connection.end();