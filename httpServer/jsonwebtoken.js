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
console.log(jwtCheck(token.token))

// console.log(accessToken);

// 이 코드는 jsonwebtoken 패키지를 사용하여 JWT(JSON Web Token)를 생성하고 검증하는 기능을 구현한 코드입니다. 해당 코드에서는 다음과 같은 기능들이 구현되어 있습니다.

// jwtinfo 객체: JWT에 대한 설정 정보를 저장하고 있습니다. secretKey는 서명을 생성할 때 사용되는 키이며, option에는 알고리즘, 토큰의 유효 기간, 발행자 정보가 포함되어 있습니다.

// jwtCreate 함수: 인자로 받은 값(value)을 이용해 JWT를 생성합니다. 생성된 토큰은 result 객체에 저장되며, 이를 반환합니다.

// jwtCheck 함수: 인자로 받은 값(value)이 유효한 JWT인지 검사합니다. 만료된 토큰이나 유효하지 않은 토큰의 경우 적절한 에러 메시지를 반환하고, 유효한 토큰일 경우 디코드된 정보를 반환합니다.

// 마지막 부분의 코드는 jwtCreate 함수를 사용해 토큰을 생성하고, 생성된 토큰을 jwtCheck 함수를 사용해 검증하는 예시를 보여줍니다.