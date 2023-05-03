let target = '2023. 5. 1. 오전 06:52:08'

let result = target.split(' ');
let answer = result[0].replace('.','-') + result[1].replace('.','-').padStart(3, '0') + result[2].replace('.',' ').padStart(3, '0')
let noon = 0
if(result[3] === '오후'){
  noon = 12;
}else if(result[3] ==='오전'){
  noon = 0;
}
let time = result[4].split(':');
answer += (Number(time[0]) + noon).toString().padStart(2, '0') + ':' + time[1].padStart(2, '0') + ':' + time[2].padStart(2, '0')

console.log(answer)

// 영어이름 한글로 바꾸기
// 영어 소문자 대문자로 바꾸기