const slide = document.getElementById('slide');

const element = document.createElement('div');
slide.appendChild(element);
styleCreate(slide.children[0],targetStyle.menuMapSlideBar);


let sw = true;
let move;
let down;
slide.style.transition = 'cubic-bezier(0.07,0.6,0.71,0.97) 0.7s';

// 객체의 drag를 이용해 구현
/*
slide.draggable = "true";

slide.addEventListener('dragend', function(){
  if(sw){
    slide.style.bottom = '90px';
    sw = false;
  }
  else if(!sw){
  slide.style.bottom = '-155px';
    sw = true;
  }
})
*/

slideEvent(); //마우스 이벤트를 이용해 구현

function slideEvent(){

  slide.onmousedown = function(){
    down = true;
    return down;
  }
  slide.onmousemove = function(){
    if(down){
      move = true;
      return move;
    }
  }
  slide.onmouseup = function(){
    if(move){
      if(sw){
        slide.style.bottom = '90px';
        sw = false;
      }
      else if(!sw){
      slide.style.bottom = '-155px';
        sw = true;
      }
      console.log(down)
      console.log(move)
      
    }
    move = false;
    down = false;

  }
}
