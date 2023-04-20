import jwt from "jsonwebtoken";
export {jwtCreate, jwtCheck};
// import randToken from "rand-token"
// 일단 구현용이기 때문에 gitignore에 넣을 거 안넣을 거 구분없이 만드는 중

const jwtinfo = {

  secretKey : 'mungTaDDukSang', // 원하는 시크릿 키
  option : {
      algorithm : "HS256", // 해싱 알고리즘
      expiresIn : "30m",  // 토큰 유효 기간
      issuer : "bigbowltakestime" // 발행자
  }
}

function jwtCreate(value){
  const result = {
    token : jwt.sign(value, jwtinfo.secretKey, jwtinfo.option)
    // refreshToken : randToken.uid(256)
    // refreshToken 아직 구현 못함 -> 구현하면 jwt 만료되었을 때 refreshToken 유효성 검사를 통해 갱신시켜줄 수 있음
  }
  return result;
}

function jwtCheck(value){
  let decoded;
  try{
    decoded = jwt.verify(value,jwtinfo.secretKey)
  } catch(err) {
    if (err.message === 'jwt expired') {
      console.log('expired token');
      return "TOKEN_EXPIRED";
    } else if (err.message === 'invalid token') {
      console.log('invalid token');
      console.log("TOKEN_INVALID");
      return "TOKEN_INVALID";
    } else {
      console.log("invalid token");
      return "TOKEN_INVALID";
    }
  }
  return decoded;
}

// const accessToken = jwt.sign( {name: "asdasd123"},'mungTaDDukSang', { expiresIn: 60 * 60});
let token = jwtCreate({id:"asdasd123"});

console.log(token);
// console.log(jwt.verify(token.token,jwtinfo.secretKey))
console.log(jwtCheck(token.token).id)

// console.log(accessToken);