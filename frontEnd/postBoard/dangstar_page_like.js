
function dangstarLike(postIndex, index, writerNickname){
  const like = document.getElementById(`like_${postIndex}_${index}`);
  const cookie = document.cookie.split("=")[2];
  let heartImage;
  let likeCount;

  const likeXhr = new XMLHttpRequest();
  const _URL = `http://43.201.52.54:2080/likeCheck`;
  const likeURL = 'http://43.201.52.54:2080/dangstarLike';

  likeXhr.open("POST", _URL, true);
  likeXhr.send(`writerNickname=${writerNickname}&postLikeIdx=${postIndex}&cookie=${cookie}`);
  likeXhr.addEventListener("load", function () {
    res = JSON.parse(likeXhr.response);
    // heartImage = JSON.parse(likeXhr.response);
    likeCount = res["cnt"]
    heartImage = res["type"];

    const likeCnt = tagCreate("div", {})
    like.appendChild(likeCnt);
    styleCreate(likeCnt, {
      position: "relative",
      bottom: "10px",
      right: "1px",
      fontWeight: stylePropertyUnion.fontWeightSet.bold

    })
    likeCnt.innerText = likeCount;

    if(!heartImage){
      like.children[0].src = '/image/resource/emptyHeart.png';

    }
    if(heartImage){
      like.children[0].src = '/image/resource/fullHeart.png';
      // styleCreate(likeCnt, {
      //   color: "white"
      // })
    }
  })



  like.addEventListener('click', function(){
    console.log(writerNickname, postIndex, document.cookie)
    //console.log(cookie)
    const xhr = new XMLHttpRequest();
    // xhr.open("POST", `http://43.201.52.54:2080/postBoard/postBoardLike`, true);
    xhr.open("POST", likeURL, true);
    xhr.send(`writerNickname=${writerNickname}&postLikeIdx=${postIndex}&cookie=${cookie}`);
    xhr.addEventListener("load", function () {
      let res = JSON.parse(xhr.response);
      // heartImage = JSON.parse(likeXhr.response);
      likeCount = res["cnt"]
      likeVal = res["type"];

      like.children[1].innerText = likeCount;
      console.log("like: ", likeVal, likeCount)
      if(likeVal){
        like.children[0].src = '/image/resource/fullHeart.png';
      }
      if(!likeVal){
        like.children[0].src = '/image/resource/emptyHeart.png';
  
      }
    })
  })

}