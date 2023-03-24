function tagCreate(tType,props){
  let element = document.createElement(tType);
  for(let i in props){
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj,styleOb){
  for(i in styleOb){
    obj.style[i] = styleOb[i];
  }
}

function main(){
  let root = tagCreate("div",{id:"root"});
  document.body.appendChild(root);
  styleCreate(root,{
    width : "500px",
    height : "2000px",
    margin : "auto",
    display : "flex",
    flexDirection : "column",
    position : "relative"
  })

  let rootChild = [];
  for(let i = 0;i<6;i++){
    let child = tagCreate("div",{});
    root.appendChild(child);
    rootChild.push(child);
  }

  styleCreate(rootChild[0],{
    width : "100%",
    height : "126px",
    position : "relative",
    backgroundColor : "#F7786B"

  })
  styleCreate(rootChild[1],{
    width : "100%",
    height : "83px",
    position : "relative"
  })
  styleCreate(rootChild[2],{
    width : "100%",
    height : "500px",
    position : "relative"
  })
  styleCreate(rootChild[3],{
    width : "100%",
    height : "260px",
    position : "relative"
  })
  styleCreate(rootChild[4],{
    width : "100%",
    height : "690px",
    position : "relative"
  })
  styleCreate(rootChild[5],{
    width : "500px",
    height : "90px",
    position : "fixed",
    bottom : "0px",
    backgroundColor : "#F7786B",
    display : "flex",
    justifyContent: "space-around",
    alignItems : "center"
  })
  rootChild[2].id = "map"

  let menuChild = [];
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    rootChild[5].appendChild(child);
    styleCreate(child,{
      width : "59px",
      height : "59px",
      backgroundColor : "#FDFDFD",
      borderRadius : "5px",
      cursor : "pointer",
      boxShadow : "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      transition : "scale ease 0.3s"
    })
    child.onmouseover = ()=>{
      child.style.scale = "1.1"
    }
    child.onmouseout = ()=>{
      child.style.scale = "1"

    }
    menuChild.push(child);
  }

  menuChild[2].id = "mapBtn";

  let slideChild = [];
  let slideColor = ["#245953","#408E91","#E49393", "#D8D8D8","#867070"];
  let slidePosition = [-1,-1,0,1,1];
  for(let i = 0;i<5;i++){
    let child = tagCreate("div",{});
    rootChild[3].appendChild(child);
    styleCreate(child,{
      width : "500px",
      height : "260px",
      backgroundColor : slideColor[i],
      position : "absolute"
    })
    slideChild.push(child);
  }
  function setSlidePosition(childArr){
    for(let i =0; i<childArr.length;i++){
      childArr[i].style.left = `${slidePosition[i] * 100}%`
    }
  }
  setSlidePosition(rootChild[3].children)
  function rightMove(){
    rootChild[3].appendChild(rootChild[3].firstChild);
    setSlidePosition(slideChild)
  }
  rightMove();





}

main()

