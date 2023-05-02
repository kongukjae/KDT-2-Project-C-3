function dangstarInfinityScroll() {
  const dangstarRoot = document.getElementById('dangstarRoot');
  document.addEventListener('scroll', function() {
    let dangstarHeight = dangstarRoot.clientHeight;
    console.log(dangstarHeight);
    console.log("dangstarHeight : " + dangstarHeight);
    let dangstarScrollPosition = scrollY;
    console.log(dangstarScrollPosition);
    console.log("dangstarScrollPosition : " + dangstarScrollPosition);
    let dangstarScrollHeight = dangstarHeight - dangstarScrollPosition;
    console.log(dangstarScrollHeight);
    console.log("dangstarScrollHeight : " + dangstarScrollHeight)
    console.log("scroll Bottom : " + (dangstarScrollPosition - dangstarScrollHeight))
    if(dangstarScrollHeight <= (dangstarScrollHeight * 1.5)) {
      console.log("페이지 로딩");
    }
  })
}

dangstarInfinityScroll();