
function dangstarLike(postIndex, index, writerNickname){
  const like = document.getElementById(`like_${postIndex}_${index}`);
  const cookie = document.cookie.split("=")[2];
  let heartImage;

  const likeXhr = new XMLHttpRequest();
  const _URL = `http://3.37.160.130:2080/likeCheck`;
  const likeURL = 'http://3.37.160.130:2080/dangstarLike';

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
    // xhr.open("POST", `http://3.37.160.130:2080/postBoard/postBoardLike`, true);
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