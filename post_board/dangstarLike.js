
function dangstarLike(postIndex, index, writerNickname){
  const like = document.getElementById(`like_${postIndex}_${index}`);

  like.addEventListener('click', function(){
    //console.log("like:", like)
    console.log(writerNickname, postIndex, document.cookie)

    const cookie = document.cookie.split("=")[2];
    //console.log(cookie)
    const xhr = new XMLHttpRequest();
    // xhr.open("POST", `http://localhost:2080/postBoard/postBoardLike`, true);
    xhr.open("POST", `http://localhost:2080/postBoardLike`, true);
    xhr.send(`writerNickname=${writerNickname}&postLikeIdx=${postIndex}&cookie=${cookie}`);
    xhr.addEventListener("load", function () {
      let likeVal = JSON.parse(xhr.response);
      
      console.log("like: ", likeVal)
      const heartImage = document.getElementById('heartImage');

      if(likeVal){
        heartImage.src = '/fullHeartImage';
      }
      else if(!likeVal){
        heartImage.src = '/emptyHeartImage';
      }
    })
  })

}