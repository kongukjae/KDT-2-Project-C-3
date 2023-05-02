let trigger = false;
function dangstarInfinityScroll() {
  const dangstarRoot = document.getElementById('dangstarRoot');
  let cnt = 1;
  console.log(trigger)
  document.addEventListener('scroll', function() {
    console.log("trigger : " + trigger)
    let dangstarHeight = dangstarRoot.clientHeight;
    let dangstarScrollPosition = scrollY;
    // console.log(dangstarScrollPosition)
    let dangstarScrollHeight = dangstarHeight - dangstarScrollPosition;
    if(dangstarHeight/3 >= dangstarScrollHeight && trigger === false) {
      trigger = true;
      console.log("inner : " + trigger)
      console.log("cnt : " + cnt)
      console.log("페이지 로딩");
      loadDangstargram(cnt);
      cnt ++;
    }
  })
}

dangstarInfinityScroll();

loadDangstargram(0);

function loadDangstargram(nth) {
  console.log(trigger)
  trigger = false;
  const xhr = new XMLHttpRequest();
  // let result = {};
  xhr.open("GET", `http://localhost:2080/loadPostBoard?nth=${nth}`);
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
      }else{
        postCreate(postWrap, `/image/image/dangstar/${res[i].img}`, res[i].post_id, res[i].post_detail, i, res[i].post_index);
      }

      // postCreate(root, "/image/resource/MainDogImg.jpg", res[i].post_id, res[i].post_detail, i, res[i].post_index);
    }
  });
}
