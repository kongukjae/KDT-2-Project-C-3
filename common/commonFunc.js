function tagCreate(tType, props) {
  let element = document.createElement(tType);
  for (let i in props) {
    element[i] = props[i];
  }
  return element;
};

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
    gray : "gray",
    black : "black",
    white: "white",
    whiteTypeA : "#F8F8F8",
    whiteTypeB : "#E6E6E6",
    whiteTypeC : "#F9F9F9",
    whiteTypeD : "#F3EDE8",

  },
  width: {
    widthP100: "100%",
    widthP90: "90%",
    widthP60: "60%",
    widthP40: "40%",
    width500: "500px",
    width450: "450px",
    width390: "390px",
    width300: "300px",
    width288: "288px",
    width250: "250px",
    width200: "200px",
    width180: "180px",
    width150: "150px",
    width80: "80px",
    width90: "90px",
    width40: "40px",
    width25: "25px",
    width9: "9px",
  },
  height: {
    height100vh: "100vh",
    height85vh: "85vh",
    heightP100: "100%",
    height2000: "2000px",
    height1700: "1700px",
    height1000: "1000px",
    height690: "690px",
    height500: "500px",
    height450: "450px",
    height308: "308px",
    height300: "300px",
    height260: "260px",
    height154: "154px",
    height150: "150px",
    height140: "140px",
    height132: "132px",
    height130: "130px",
    height126: "126px",
    height100: "100px",
    height90: "90px",
    height70: "70px",
    height83: "83px",
    height80: "80px",
    height52: "52px",
    height40: "40px",
    height30: "30px",
    height24: "24px",
    height9: "9px",
    height3: "3px",
  },
  flexRowCenter : {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  flexColCenter : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
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
  marginLeft:{
    marginLeft_144: "-144px",
  },
  borderRadius: {
    borderRadiusP50: "50%",
    borderRadius52: "52px",
    borderRadius15: "15px",
    borderRadius9: "9px",
  },
  fontSizeSet : {
    smaller : "12px",
    small : "16px",
    medium : "20px",
    mediumLarge : "30px",
    large : "42px"
  },
  transitionSet : {
    normal : "all ease 0.6s"
  },
  fontWeightSet : {
    thin : "200",
    regular : "400",
    bold : "700"

  },
  defaultBoxShadow: {
    ConBoxSdw: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    defBoxSdw: "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)"
  }
}
const targetStyle = {
  
  topMenu: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height126,
    position: "relative",
    backgroundColor: pageStyle.colorTheme.peach,
    ...pageStyle.flexRowCenter
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
    zIndex: "2"
  },
  mainRoot: {
    width: pageStyle.width.width500,
    height: pageStyle.height.height2000,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  mainWeatherBanner: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height83,
    position: "relative",
    ...pageStyle.flexRowCenter,
    backgroundColor: pageStyle.colorTheme.beige,
    fontSize: pageStyle.fontSizeSet.medium,
    fontWeight: pageStyle.fontWeightSet.bold
  },
  mainMap: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height500,
    position: "relative"
  },
  mainSlideWrap: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height260,
    position: "relative",
    overflow: "hidden",
    transition: pageStyle.transitionSet.normal
  },
  mainFindingDogs: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.height690,
    position: "relative"
  },
  mainSlideCover: {
    width: pageStyle.width.widthP100,
    height: pageStyle.height.heightP100,
    position: "relative",
    overflow: "hidden"
  },
  mainSlideLeftBtn: {
    position: "absolute",
    width: pageStyle.width.width40,
    height: pageStyle.height.height40,
    backgroundColor: pageStyle.colorTheme.black,
    opacity: "0.3",
    borderRadius: "50%",
    top: "41%",
    left: "10px",
    cursor: "pointer",
    ...pageStyle.flexRowCenter,
    fontSize: pageStyle.fontSizeSet.mediumLarge,
    color: pageStyle.colorTheme.gray,
    zIndex: "1"
  },
  mainSlideRightBtn: {
    position: "absolute",
    width: pageStyle.width.width40,
    height: pageStyle.height.height40,
    backgroundColor: pageStyle.colorTheme.black,
    opacity: "0.3",
    borderRadius: "50%",
    top: "41%",
    right: "10px",
    cursor: "pointer",
    ...pageStyle.flexRowCenter,
    fontSize: pageStyle.fontSizeSet.mediumLarge,
    color: pageStyle.colorTheme.gray,
    zIndex: "1"
  },
  mainSlideDotWrap: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "10px",
    display: "flex",
    gap: "10px",
    zIndex: "1"
  },
  mainSlideDot: {
    width: pageStyle.width.width9,
    height: pageStyle.height.height9,
    borderRadius: "9px",
    backgroundColor: pageStyle.colorTheme.black,
    opacity: "0.4",
    cursor: "pointer",
    transition: pageStyle.transitionSet.normal
  },
  // loginPage

  // dangMap
  menuMapRoot: {
    width : pageStyle.width.width500,
    height : pageStyle.height.height100vh,
    margin : "auto",
    display : "flex",
    flexDirection : "column",
    position : "relative",
    overflow : "hidden"
  },
  menuMap: {
    width : pageStyle.width.widthP100,
    height : pageStyle.height.height85vh,
    position : "relative",
  },
  // 댕맵 하단 슬라이드 바
  menuMapSlide: {
    width : pageStyle.width.widthP100,
    height : pageStyle.height.height308,
    position : "relative",
    backgroundColor : "lightgray",
    display : "flex",
    justifyContent : "flex-start",
    position : "absolute",
    zIndex : "1",
    bottom : "-155px"
  },

  menuMapSlideBar: {
    width : pageStyle.width.width25,
    height : pageStyle.height.height3,
    backgroundColor : pageStyle.colorTheme.gray,
    position: "absolute",
    top : "8px",
    left : "50%",
    transform: "translateX(-50%)",
  },
  menuMapSlideWrap: {
    // width: pageStyle.width.widthP100,
    // height: pageStyle.height.heightP100,
    marginTop: "18px",
    // marginLeft: "0",
    padding: "0px 10px 10px 10px",
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "repeat(16, 160px)",
    gridTemplateRows: "repeat(2, 140px)",
  },
  menuMapSlideItems: {
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  //댕맵 검색창
  menuMapSearchBarWrap: {
    width : pageStyle.width.width300,
    height : pageStyle.height.height40,
    top : "45px",
    left: "50%",
    position : "absolute",
    marginLeft: "-150px",
    zIndex : "3",
    display : "flex",
    alignItems : "center"
  },
  menuMapSearchBar : {
    width : pageStyle.width.widthP100,
    height : pageStyle.height.heightP100,
    border : `1px ${pageStyle.colorTheme.lightGray} solid`,
    paddingLeft : "20px",
    paddingright : "50px",
    borderRadius : "20px",
    backgroundColor : pageStyle.colorTheme.white,
    position : "absolute"
  },
  menuMapSearchButton: {
    width : pageStyle.width.width80,
    height : pageStyle.height.height30,
    borderRadius : "15px",
    backgroundColor : pageStyle.colorTheme.peach,
    position : "relative",
    left : "210px",
    color : pageStyle.colorTheme.white,
    cursor : "pointer",
    ...pageStyle.flexRowCenter,
    paddingBottom : "3px"
  },

  //회원가입 결과창
  signupResultRoot: {
    width : pageStyle.width.width500,
    height : pageStyle.height.height1000,
    margin : "auto",
    ...pageStyle.flexColCenter,
    position : "relative",
    backgroundColor : pageStyle.colorTheme.beige,
  },
  signupResultWrap: {
    width : pageStyle.width.width450,
    padding : pageStyle.height.height30,
    borderRadius : "10px",
    display : "flex",
    flexDirection : "column",
    backgroundColor : pageStyle.colorTheme.peach,
    gap : "10px",
    boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
    color : pageStyle.colorTheme.white,
    // fontSize : "23px",
    fontSize : pageStyle.fontSizeSet.medium,
    fontWeight : pageStyle.fontWeightSet.bold
  },
  signupResultMent: {
    width : pageStyle.width.widthP100,
    height : pageStyle.height.height70,
    position : "relative",
    ...pageStyle.flexRowCenter
  },
  signupResultBackBtn: {
    color : pageStyle.colorTheme.black,
    fontSize : pageStyle.fontSizeSet.medium,
    cursor : "pointer",
    backgroundColor : pageStyle.colorTheme.white,
    borderRadius : "10px",
    boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"

  },
    // signUp
    signUpMain: {
      width : pageStyle.width.width500,
        height : pageStyle.height.height1000,
        margin : "auto",
        flexDirection : "column",
        position : "relative",
        backgroundColor : pageStyle.colorTheme.beige,
        ...pageStyle.flexRowCenter,
    },
    signUpContainer: {
      width : pageStyle.width.width450,
      padding : "30px",
      borderRadius : "10px",
      display : "flex",
      position: "relative",
      flexDirection : "column",
      justifyContent : "center",
      alignItems : "center",
      backgroundColor : pageStyle.colorTheme.peach,
      gap : "2px",
      boxShadow : pageStyle.defaultBoxShadow.ConBoxSdw
    },
    signUpListBox: {
      width : pageStyle.width.width300,
      height : pageStyle.height.height70,
      position : "relative",
      ...pageStyle.flexRowCenter,
      flexWrap : "wrap"
    },
    signUpTitle: {
      color : pageStyle.colorTheme.white,
      fontSize : pageStyle.fontSizeSet.large,
      fontWeight : pageStyle.fontWeightSet.bold
    },
    signUpListWithoutID: {
      width : pageStyle.width.width300,
      height : pageStyle.height.height40,
      cursor : "pointer",
      borderRadius : "10px",
      padding : "5px",
      paddingLeft : "20px",
      paddingRight : "20px",
      border : "0px",
      boxShadow : pageStyle.defaultBoxShadow.defBoxSdw,
    },
    signUpListID: {
      width : pageStyle.width.width200,
      height : pageStyle.height.height40,
      cursor : "pointer",
      borderRadius : "10px",
      padding : "5px",
      paddingLeft : "20px",
      paddingRight : "20px",
      border : "0px",
      boxShadow : pageStyle.defaultBoxShadow.defBoxSdw,
    },
    signUpDupCheck: {
      width : pageStyle.width.width90,
      height : pageStyle.height.height40,
      marginLeft : "10px",
      fontSize : pageStyle.fontSizeSet.small,
      cursor : "pointer",
      ...pageStyle.flexRowCenter,
      borderRadius : "10px",
      padding : "5px",
      border : "0px",
      backgroundColor : pageStyle.colorTheme.white,
      boxShadow : pageStyle.defaultBoxShadow.defBoxSdw,
    },
    signUpDupCheckModal: {
      width : pageStyle.width.width300,
      height : pageStyle.height.height140,
      padding : "10px",
      borderRadius : "10px",
      flexDirection : "column",
    ...pageStyle.flexRowCenter,
      backgroundColor : pageStyle.colorTheme.beige,
      boxShadow : pageStyle.defaultBoxShadow.defBoxSdw,
      position : "absolute",
      top : "16%",
      left: "50%",
      gap : "30px",
      marginLeft: "-150px",
    },
    signUpOKBtn: {
      width : pageStyle.width.width90,
      height : pageStyle.height.height30,
      padding : "10px",
      fontSize : pageStyle.fontSizeSet.small,
      color : pageStyle.colorTheme.white,
      borderRadius : "10px",
      cursor : "pointer",
      ...pageStyle.flexRowCenter,
      alignItems : "center",
      backgroundColor : pageStyle.colorTheme.peach,
      boxShadow : pageStyle.defaultBoxShadow.defBoxSdw,
    },
    // 댕맵 오버레이
    dangMapOverlayWrap: {
      position: "absolute",
      left: "0",
      bottom: "10px",
      width: pageStyle.width.width288,
      height: pageStyle.height.height132,
      marginLeft: pageStyle.marginLeft.marginLeft_144,
      textAlign: "left",
      overflow: "hidden",
      fontSize: pageStyle.fontSizeSet.smaller,
    },
    dangMapOverlayInfo: {
      width: "286px",
      height: "120px",
      borderRadius: "5px",
      borderBottom: "2px solid #ccc",
      borderRight: "1px solid #ccc",
      overflow: "hidden",
      backgroundColor: "#fff",
    },
    dangMapOverlayTitle: {
      padding: "5px 0 0 10px",
      height: "30px",
      backgroundColor: "#eee",
      borderBottom: "1px solid #ddd",
      fontSize: "18px",
      fontWeight: "bold",
    },
    dangMapOverlayBody: {
      border: "0",
      boxShadow: "0px 1px 2px #888",
      position: "relative",
      overflow: "hidden",
      display: "flex",
    },
    dangMapOverlayDesc: {
      position: "relative",
      margin: "13px 0 0 90px",
      height: "75px",
    },
    findUserInfoRoot: {
      width : pageStyle.width.width500,
      height : pageStyle.height.height1000,
      margin : "auto",
      ...pageStyle.flexColCenter,
      position : "relative",
      backgroundColor : pageStyle.colorTheme.beige,
    },
    findUserInfoWrap: {
      width : pageStyle.width.width450,
      height : pageStyle.height.height500,
      padding : pageStyle.height.height30,
      borderRadius : "10px",
      display : "flex",
      flexDirection : "column",
      backgroundColor : pageStyle.colorTheme.peach,
      gap : "10px",
      boxShadow : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)",
      color : pageStyle.colorTheme.white,
      // fontSize : "23px",
      fontSize : pageStyle.fontSizeSet.medium,
      fontWeight : pageStyle.fontWeightSet.bold
    },
    findUserInfoInput: {
      width : "100%",
      height : "50px",
      border : "0px",
      paddingLeft : "14px",
      color : pageStyle.colorTheme.black,
      fontSize : pageStyle.fontSizeSet.smaller,
      backgroundColor : pageStyle.colorTheme.white,
      borderRadius : "10px",
      boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
  
    },
    findUserInfoUpdatePWModal: {
      width : pageStyle.width.width390,
      height : pageStyle.height.height450,
      padding : "10px",
      borderRadius : "10px",
      flexDirection : "column",
    ...pageStyle.flexRowCenter,
      backgroundColor : pageStyle.colorTheme.beige,
      color : pageStyle.colorTheme.black,
      boxShadow : pageStyle.defaultBoxShadow.defBoxSdw,
      position : "absolute",
      top : "50%",
      left: "50%",
      gap : "30px",
      marginTop: "-225px",
      marginLeft: "-195px",
    },

}
console.log(targetStyle.topMenu);

const mypageStyle = {
  mypageRoot : {
    width : pageStyle.width.width500,
    height : pageStyle.height.height1700,
    margin : "auto",
    position : "relative",
    backgroundColor : pageStyle.colorTheme.beige,
    display : "flex",
    flexDirection : "column",
    alignItems : "center"
  },
  mypageTopMenu : {
    width : pageStyle.width.widthP100,
    height : pageStyle.height.height126,
    position : "relative",
    backgroundColor : pageStyle.colorTheme.peach,
    ...pageStyle.flexRowCenter

  },
  mypageTitle : {
    width : pageStyle.width.widthP100,
    height : pageStyle.height.height80,
    position : "relative",
    marginTop : "30px",
    ...pageStyle.flexRowCenter,
    fontSize : pageStyle.fontSizeSet.mediumLarge,
    fontWeight : pageStyle.fontWeightSet.bold
  },
  mypageImageStyle : {
    width : pageStyle.width.width300,
    height : pageStyle.height.height300,
    backgroundColor : pageStyle.colorTheme.lightGray,
    borderRadius : "50%",
    position : "relative",
    ...pageStyle.flexRowCenter,
    marginTop : "20px",
    fontSize : pageStyle.fontSizeSet.medium,
    fontWeight : pageStyle.fontWeightSet.bold,
    overflow : "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  mypageButtonWrap : {
    width : pageStyle.width.widthP60,
    height : pageStyle.height.height30,
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-around",
    alignItems : "center",
    backgroundColor : pageStyle.colorTheme.lightGray
  },
  mypageButton : {
    width : pageStyle.width.widthP40,
    height : "70%",
    backgroundColor : pageStyle.colorTheme.whiteTypeA,
    cursor : "pointer",
    borderRadius : "5px",
    ...pageStyle.flexRowCenter
  },
  mypageUserinfoBox :{
    width : pageStyle.width.widthP90,
    height : pageStyle.height.height300,
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    ...pageStyle.flexColCenter,
    gap : "10px",
    backgroundColor : pageStyle.colorTheme.whiteTypeB
  },
  mypageUserinfoBoxInnerStyle : {
    width : pageStyle.width.widthP90,
    height : pageStyle.height.height24,
    borderRadius : "5px",
    paddingLeft : "10px",
    paddingRight : "10px",
  },
  mypageUserinfoBoxSelfIntroduce : {
    height : pageStyle.height.height130,
    backgroundColor : pageStyle.colorTheme.whiteTypeC
  },
  mypageCalender : {
    width : pageStyle.width.widthP90,
    height : pageStyle.height.height450,
    backgroundColor : pageStyle.colorTheme.whiteTypeB,
    marginTop : "40px",
    position : "relative",
    borderRadius : "10px",
    ...pageStyle.flexRowCenter
  },
  mypageUploadModal : {
    width : pageStyle.width.width300,
    height : pageStyle.height.height140,
    padding : "10px",
    borderRadius : "10px",
    ...pageStyle.flexColCenter,
    backgroundColor : pageStyle.colorTheme.whiteTypeD,
    boxShadow : pageStyle.defaultBoxShadow.defBoxSdw,
    position : "absolute",
    top : "550px",
    left: "50%",
    gap : "10px",
    marginLeft: "-150px",
  },
  mypageUploadModalButtonWrap : {
    display : "flex",
    gap : "10px"
  },
  mypageUploadModalButtonStyle : {
    border : "0px",
    width : pageStyle.width.width90,
    height : pageStyle.height.height30,
    padding : "10px",
    fontSize : pageStyle.fontSizeSet.smaller,
    color : pageStyle.colorTheme.whiteTypeA,
    borderRadius : "10px",
    cursor : "pointer",
    ...pageStyle.flexColCenter,
    backgroundColor : pageStyle.colorTheme.peach,
    boxShadow : pageStyle.defaultBoxShadow.defBoxSdw
  },
};

const loginPageStyle = {
  loginPageRoot: {
    width: pageStyle.width.width500,
    height: pageStyle.height.height100vh,
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
    backgroundColor : '#D9D9D9',
    color : pageStyle.colorTheme.black,
    textDecoration : 'none',
    width : pageStyle.width.width180,
    height : pageStyle.height.height52,
    ...pageStyle.flexRowCenter,
    fontSize : pageStyle.fontSizeSet.medium,
    cursor : 'pointer',
  },
  loginPageFormBtnFindUserInfo: {
    marginTop : "10px",
    border : '1px solid #999',
    borderRadius : pageStyle.borderRadius.borderRadius15,
    backgroundColor : '#D9D9D9',
    color : pageStyle.colorTheme.black,
    textDecoration : 'none',
    width : pageStyle.width.width390,
    height : pageStyle.height.height24,
    ...pageStyle.flexRowCenter,
    fontSize : pageStyle.fontSizeSet.smaller,
    cursor : 'pointer',
  }
};