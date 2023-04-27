function commentRecent(postWrap, src_comment_link, textName, cmText){
  // 최신 댓글 하나가 보여질 영역
  const commentViewWrap = tagCreate("div", {});
  styleCreate(commentViewWrap, {
    position: "relative",
    width: "100%",
    height: "100px",
    padding: "10px",
  });
  postWrap.appendChild(commentViewWrap);

  // 최신 댓글 프로필 이미지와 내용을 한줄로 넣기 위한 wrap
  const commentImgContentWrap = tagCreate("div", {});
  styleCreate(commentImgContentWrap, {
    width: "100%",
    height: "100%",
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
  });
  commentViewWrap.appendChild(commentImgContentWrap);

  // 최신 댓글의 프로필 이미지를 감싸는 div 영역
  const commentViewImgWrap = tagCreate("div", {});
  styleCreate(commentViewImgWrap, {
    width: "60px",
    height: "60px",
    border: "1px solid red",
    borderRadius: "50%",
    overflow: "hidden",
    marginRight: "10px",
    position: "relative",
  });
  commentImgContentWrap.appendChild(commentViewImgWrap);

  // 최신 댓글의 프로필 이미지
  const commentViewImg = tagCreate("img", { src: src_comment_link });
  styleCreate(commentViewImg, {
    height: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });
  commentViewImgWrap.appendChild(commentViewImg);

  // 최신 댓글 내용을 표시할 영역
  const commentViewContentWrap = tagCreate("div", {});
  commentImgContentWrap.appendChild(commentViewContentWrap);

  // 최신 댓글 닉네임 표시
  const commentViewName = tagCreate("p", {});
  styleCreate(commentViewName, {
    fontWeight: "bold",
    maxWidth: "400px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  });
  commentViewName.innerText = textName;
  // commentViewName.innerText = "댓글 닉네임 DB에서 가져올 데이터";
  commentViewContentWrap.appendChild(commentViewName);

  // 최신 댓글 내용
  const commentViewContent = tagCreate("p", {});
  commentViewContent.innerText = cmText;
  // commentViewContent.innerText =
    // "DB에서 가져올 데이터 임시로 입력해둔 더미 텍스트 Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  styleCreate(commentViewContent, {
    width: "400px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });
  commentViewContentWrap.appendChild(commentViewContent);

  commentUpdateDelete(commentViewWrap)

}