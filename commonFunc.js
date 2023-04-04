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
    white: "white"
  },
  width: {
    widthP100: "100%",
    width500: "500px",
    width450: "450px",
    width300: "300px",
    width200: "450px",
    width90: "90px",
    width40: "40px",
    width9: "9px",

  },
  height: {
    heightP100: "100%",
    height2000: "2000px",
    height1000: "1000px",
    height690: "690px",
    height500: "500px",
    height260: "260px",
    height140: "140px",
    height126: "126px",
    height90: "90px",
    height70: "70px",
    height83: "83px",
    height40: "40px",
    height30: "30px",
    height9: "9px",
  },
  flexRowCenter : {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  fontSizeSet : {
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
      backgroundColor : pageStyle.colorTheme.peach,
      gap : "10px",
      boxShadow : pageStyle.defaultBoxShadow.ConBoxSdw
    },
    signUpListBox: {
      width : pageStyle.width.widthP100,
      height : pageStyle.height.height70,
      position : "relative",
      ...pageStyle.flexRowCenter,
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
      top : "17%",
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
    }

}
console.log(targetStyle.topMenu);