styleCreate(rootChild[0],{
  width : "100%",
  height : "126px",
  position : "relative",
  backgroundColor : "#F7786B",
  display : "flex",
  justifyContent: "center",
  alignItems : "center"

})
const logoLoginPage = tagCreate('img', '');
logoLoginPage.style.width = '28%';
logoLoginPage.src = './resource/MainLogo.png';
rootChild[0].appendChild(logoLoginPage);