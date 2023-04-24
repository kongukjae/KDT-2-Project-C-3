let marker = {name:'yooni'};
let markercopy1 = {name:'yooni'};
let markercopy2 = marker;
let markercopy3 = {color:'black'};
let crazyboy= markercopy3;
markercopy2['type'] = 'cute';
console.log(marker);
console.log(markercopy2);
markercopy1 = marker;
console.log(markercopy1);
markercopy1['map'] = 'kakaoMap';

console.log(marker);
console.log(markercopy1);
console.log(markercopy2);
markercopy2['map'] = 'null';
console.log(marker);
console.log(markercopy1);
console.log(markercopy2);

marker['supercute']='yoon';
console.log(marker);
console.log(markercopy1);
console.log(markercopy2);

markercopy2['age']='63';

console.log(marker);
console.log(markercopy1);
console.log(markercopy2);

markercopy1['college']='non';
// console.log(marker);
// console.log(markercopy1);
// console.log(markercopy2);
console.log(markercopy3);
console.log(crazyboy);
