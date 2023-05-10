let re = [];

re = [[1,2], [3,4]];
console.log(re);


const httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function(event) {
  if (httpRequest.readyState == 4){
    if(httpRequest.status == 200 ) {
      console.log(httpRequest.responseText);
      let json = JSON.parse(httpRequest.responseText)
      console.log(json)
    };
  };
}
httpRequest.open("POST", `http://3.37.160.130:2080:2080/test`, true);
httpRequest.send(re[0][0],re[0][1]);
