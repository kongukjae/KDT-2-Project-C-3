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
    width300 : "300px",
    width90 : "90px",
    width40: "40px",
    width9: "9px",
  },
  height: {
    heightP100: "100%",
    height2000: "2000px",
    height1700: "1700px",
    height690: "690px",
    height500: "500px",
    height450: "450px",
    height300: "300px",
    height260: "260px",
    height140 : "140px",
    height130: "130px",
    height126: "126px",
    height90: "90px",
    height83: "83px",
    height80: "80px",
    height40: "40px",
    height30: "30px",
    height24: "24px",
    height9: "9px",
  },
  flexRowCenter : {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
  Shadow : {
    ShadowTypeA : "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.22)"
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
    // loginPage

    // dangMap

    // 
}}
console.log(targetStyle.topMenu);

const mypageStyle = {
  mypageRoot : {
    width : pageStyle.width.width500,
    height : pageStyle.height.height1700,
    margin : "auto",
    position : "relative",
    backgroundColor : pageStyle.colorTheme.beige,
    ...pageStyle.flexRowCenter
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
    ...pageStyle.flexRowCenter,
    flexDirection : "column",
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
    flexDirection : "column",
    ...pageStyle.flexRowCenter,
    backgroundColor : pageStyle.colorTheme.whiteTypeD,
    boxShadow : pageStyle.Shadow.ShadowTypeA,
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
    flexDirection : "column",
    ...pageStyle.flexRowCenter,
    backgroundColor : pageStyle.colorTheme.peach,
    boxShadow : pageStyle.Shadow.ShadowTypeA
  }

}