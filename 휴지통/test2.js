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
httpRequest.open("POST", `http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com:2080/test`, true);
httpRequest.send(re[0][0],re[0][1]);
