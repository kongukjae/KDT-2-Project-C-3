let trigger = false;
function dangstarInfinityScroll() {
  let cnt = 1;
  function dangstarScroll() {
    console.log("스크롤 함수 진입");
    let dangstarWindowHeight = window.innerHeight;
    // console.log("dangstarWindowHeight : " + dangstarWindowHeight)
    let dangstarDocumentHeight = document.documentElement.scrollHeight;
    // console.log("dangstarDocumentHeight : " + dangstarDocumentHeight)
    let dangstarScrollPosition = scrollY;
    // console.log("dangstarScrollPosition : " + dangstarScrollPosition)
    // console.log(dangstarDocumentHeight - (dangstarWindowHeight + dangstarScrollPosition))
    // console.log("trigger : " + trigger)
    if(dangstarDocumentHeight - (dangstarWindowHeight + dangstarScrollPosition) <= 100 && trigger === false) {
      trigger = true;
      // console.log("inner : " + trigger)
      // console.log("cnt : " + cnt)
      // console.log("페이지 로딩");
      loadDangstargram(cnt);
      cnt ++;
    }
  }
  document.addEventListener('scroll', throttle(dangstarScroll, 500));
}

dangstarInfinityScroll();


loadDangstargram(0);

function loadDangstargram(nth) {
  const xhr = new XMLHttpRequest();
  // let result = {};
  xhr.open("GET", `http://ec2-3-37-160-130.ap-northeast-2.compute.amazonaws.com/loadPostBoard?nth=${nth}`);
  xhr.send();
  xhr.addEventListener("load", function () {
    let res = JSON.parse(xhr.response);
    for (let i = 0; i < res.length; i++) {
      console.log(res[i]);
      console.log("resres resres");
      // postCreate(부모요소, src_link(이미지 링크), writerNickname(작성자 이름), text(게시글 내용), index(인덱싱), postIndex(DB인덱싱))
      // postCreate(root, "../resource/MainDogImg.jpg", res[i].post_id, res[i].post_detail, "../resource/MainDogImg.jpg", res[i].cm_id, res[i].cm_detail, i, res[i].post_index);
      if(res[i].img === 'null'){
        postCreate(postWrap, "/image/image/default/null.png", res[i].post_id, res[i].post_detail, i, res[i].post_index);
      }
      else{
        postCreate(postWrap, `/image/image/dangstar/${res[i].img}`, res[i].post_id, res[i].post_detail, i, res[i].post_index);
      }
    }
  });
  trigger = false;
}

