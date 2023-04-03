function styleCreate(target, width, height, bgColor){
  target.style.width = width;
  target.style.height = height;
  target.style.backgroundColor = bgColor;
}

const root = document.getElementById('root');
const element = document.createElement('div');
element.id = 'slide'
root.appendChild(element);

const slide = document.getElementById('slide');

styleCreate(slide, "500px", "300px", "gray")
slide.style.position = 'absolute';
slide.style.zIndex = '1';
slide.style.bottom = '-150px';


let sw = true;
slide.style.transition = 'bottom 2s';

// slide.addEventListener('dragstart', function(data){
//   data.preventDefault();
// })
slide.addEventListener('dragstart', function(data){
  data.preventDefault();

  if(sw){
    slide.style.bottom = '90px';
    sw = false;
  }
  else if(sw === false){
  slide.style.bottom = '-150px';
    sw = true;
  }
})

/*
mapArea.addEventListener('dragover', function(data){
    data.preventDefault();
})
mapArea.addEventListener('drop', function(data){
  data.preventDefault();
  slide.style.height = '300px';

})
root.children[2].addEventListener('dragover', function(data){
  data.preventDefault();
})
root.children[2].addEventListener('drop', function(data){
data.preventDefault();
slide.style.height = '50px';

})
*/