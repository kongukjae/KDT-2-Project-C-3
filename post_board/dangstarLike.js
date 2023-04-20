
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

  })

}