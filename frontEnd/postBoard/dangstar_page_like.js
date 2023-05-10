
function dangstarLike(postIndex, index, writerNickname){
  const like = document.getElementById(`like_${postIndex}_${index}`);
  const cookie = document.cookie.split("=")[2];
  let heartImage;

  const likeXhr = new XMLHttpRequest();
  const _URL = `http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/likeCheck`;
  const likeURL = 'http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/dangstarLike';

  likeXhr.open("POST", _URL, true);
  likeXhr.send(`writerNickname=${writerNickname}&postLikeIdx=${postIndex}&cookie=${cookie}`);
  likeXhr.addEventListener("load", function () {
    heartImage = JSON.parse(likeXhr.response);

    if(!heartImage){
      like.children[0].src = '/image/resource/emptyHeart.png';

    }
    if(heartImage){
      like.children[0].src = '/image/resource/fullHeart.png';

    }
  })



  like.addEventListener('click', function(){
    console.log(writerNickname, postIndex, document.cookie)
    //console.log(cookie)
    const xhr = new XMLHttpRequest();
    // xhr.open("POST", `http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/postBoard/postBoardLike`, true);
    xhr.open("POST", likeURL, true);
    xhr.send(`writerNickname=${writerNickname}&postLikeIdx=${postIndex}&cookie=${cookie}`);
    xhr.addEventListener("load", function () {
      let likeVal = JSON.parse(xhr.response);
      
      console.log("like: ", likeVal)
      if(likeVal){
        like.children[0].src = '/image/resource/fullHeart.png';
      }
      if(!likeVal){
        like.children[0].src = '/image/resource/emptyHeart.png';
  
      }
    })
  })

}