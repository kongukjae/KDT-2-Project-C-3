function tagCreate(tType, props) {
  let element = document.createElement(tType);
  for (let i in props) {
    element[i] = props[i];
  }
  return element;
}

function styleCreate(obj, styleOb) {
  for (i in styleOb) {
    obj.style[i] = styleOb[i];
  }
}

const pageStyle = {
  colorTheme: {
    peach: "#F7786B",
    beige: "#F3EDE8",
    lightGray: "#E6E6E6",
    blue: "#2353FF",
    gray: "gray",
    black: "black",
  },
  width: {
    widthP100: "100%",
    width500: "500px",
    width40: "40px",
    width9: "9px",
    // ------loginPage 추가분
    width390: "390px",
    width250: "250px",
    width180: "180px",
    width150: "150px",
  },
  height: {
    heightP100: "100%",
    height2000: "2000px",
    height690: "690px",
    height500: "500px",
    height260: "260px",
    height126: "126px",
    height90: "90px",
    height83: "83px",
    height40: "40px",
    height9: "9px",
    // ------loginPage 추가분
    heigthV100: "100vh",
    height100: "100px",
    height154: "154px",
    height150: "150px",
    height52: "52px",
  },
  flexRowCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
// ------loginPage 추가------------
  flexRowBetweenCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent : 'space-between',
    alignItems : 'center',
  },
  flexColumnTopCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
  },
  marginTop: {
    marginTop156: "156px",
    marginTop110: "110px",
    marginTop60: "60px"
  },
  marginBottom: {
    marginBottom80: "80px",
    marginBottom50: "50px",
  },
  borderRadius: {
    borderRadiusP50: "50%",
    borderRadius52: "52px",
    borderRadius15: "15px",
    borderRadius9: "9px",
  },
// ------loginPage 추가 끝----------
  fontSizeSet: {
    small: "16px",
    medium: "20px",
    mediumLarge: "30px",
    large: "42px",
  },
  transitionSet: {
    normal: "all ease 0.6s",
  },
  fontWeightSet: {
    thin: "200",
    regular: "400",
    bold: "700",
  },
};
const targetStyle = {
  topMenu: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height126,
    position: "relative",
    backgroundColor: pageStyle.colorTheme.peach,
    ...pageStyle.flexRowCenter,
  },
  bottomMenu: {
    width: pageStyle.width.width500,
    height: pageStyle.height.height90,
    position: "fixed",
    bottom: "0px",
    backgroundColor: pageStyle.colorTheme.peach,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: "2",
  },
  mainRoot: {
    width: pageStyle.width.width500,
    height: pageStyle.height.height2000,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  mainWeatherBanner: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height83,
    position: "relative",
    ...pageStyle.flexRowCenter,
    backgroundColor: pageStyle.colorTheme.beige,
    fontSize: pageStyle.fontSizeSet.medium,
    fontWeight: pageStyle.fontWeightSet.bold,
  },
  mainMap: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height500,
    position: "relative",
  },
  mainSlideWrap: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height260,
    position: "relative",
    overflow: "hidden",
    transition: pageStyle.transitionSet.normal,
  },
  mainFindingDogs: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height690,
    position: "relative",
  },
  mainSlideCover: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.heightP100,
    position: "relative",
    overflow: "hidden",
  },
  mainSlideLeftBtn: {
    position: "absolute",
    width: pageStyle.width.width40,
    height: pageStyle.height.height40,
    backgroundColor: pageStyle.colorTheme.black,
    opacity: "0.3",
    borderRadius: pageStyle.borderRadius.borderRadiusP50,
    top: "41%",
    left: "10px",
    cursor: "pointer",
    ...pageStyle.flexRowCenter,
    fontSize: pageStyle.fontSizeSet.mediumLarge,
    color: pageStyle.colorTheme.gray,
    zIndex: "1",
  },
  mainSlideRightBtn: {
    position: "absolute",
    width: pageStyle.width.width40,
    height: pageStyle.height.height40,
    backgroundColor: pageStyle.colorTheme.black,
    opacity: "0.3",
    borderRadius: pageStyle.borderRadius.borderRadiusP50,
    top: "41%",
    right: "10px",
    cursor: "pointer",
    ...pageStyle.flexRowCenter,
    fontSize: pageStyle.fontSizeSet.mediumLarge,
    color: pageStyle.colorTheme.gray,
    zIndex: "1",
  },
  mainSlideDotWrap: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "10px",
    display: "flex",
    gap: "10px",
    zIndex: "1",
  },
  mainSlideDot: {
    width: pageStyle.width.width9,
    height: pageStyle.height.height9,
    borderRadius: pageStyle.borderRadius.borderRadius9,
    backgroundColor: pageStyle.colorTheme.black,
    opacity: "0.4",
    cursor: "pointer",
    transition: pageStyle.transitionSet.normal,
    // loginPage

    // dangMap

    //
  },
};

const loginPageStyle = {
  loginPageRoot: {
    width: pageStyle.width.width500,
    height: pageStyle.height.heigthV100,
    ...pageStyle.flexColumnTopCenter,
    backgroundColor: pageStyle.colorTheme.peach,
    margin: "auto",
  },
  loginPageLogoWrap: {
    width : pageStyle.width.width250,
    height : pageStyle.height.height100,
    marginTop : pageStyle.marginTop.marginTop156,
  },
  loginPageLogo:{
    width : pageStyle.width.widthP100,
  },
  loginPageImgWarp: {
    width : pageStyle.width.width150,
    height : pageStyle.height.height150,
    marginTop : pageStyle.marginTop.marginTop60,
    borderRadius : pageStyle.borderRadius.borderRadiusP50,
    backgroundColor : pageStyle.colorTheme.lightGray,
    ...pageStyle.flexRowCenter,
    overflow : 'hidden',
  },
  loginPageImg: {
    height: pageStyle.height.heightP100,
  },
  loginPageFormWrap: {
    width : pageStyle.width.width390,
    height : pageStyle.height.height154,
  },
  loginPageForm: {
    display : 'flex',
    flexDirection : 'column',
    marginTop : pageStyle.marginTop.marginTop110,
  },
  loginPageFormId: {
    marginBottom : pageStyle.marginBottom.marginBottom50,
    height : pageStyle.height.height52,
    borderRadius : pageStyle.borderRadius.borderRadius52,
    border : 'none',
    paddingLeft : '25px',
    fontSize : pageStyle.fontSizeSet.medium,
  },
  loginPageFormPw: {
    marginBottom : pageStyle.marginBottom.marginBottom80,
    height : pageStyle.height.height52,
    borderRadius : pageStyle.borderRadius.borderRadius52,
    border : 'none',
    paddingLeft : '25px',
    fontSize : pageStyle.fontSizeSet.medium,
  },
  loginPageFormBtnWrap: {
    ...pageStyle.flexRowBetweenCenter
  },
  loginPageFormBtnLogin: {
    border : '1px solid #999',
    borderRadius : pageStyle.borderRadius.borderRadius15,
    width : pageStyle.width.width180,
    height : pageStyle.height.height52,
    cursor : 'pointer',
    fontSize : pageStyle.fontSizeSet.medium,
  },
  loginPageFormBtnSignup: {
    border : '1px solid #999',
    borderRadius : pageStyle.borderRadius.borderRadius15,
    backgroundColor : '#d9d9d9',
    color : pageStyle.colorTheme.black,
    textDecoration : 'none',
    width : pageStyle.width.width180,
    height : pageStyle.height.height52,
    ...pageStyle.flexRowCenter,
    fontSize : pageStyle.fontSizeSet.medium,
    cursor : 'pointer',
  }
};
console.log(targetStyle.topMenu);
