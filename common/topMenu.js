function topMenu(rootChild){
  //const root = document.getElementById('root');

  styleCreate(rootChild[0],targetStyle.topMenu)
  const logoLoginPage = tagCreate('img', '');
  logoLoginPage.style.width = '28%';
  logoLoginPage.src = './resource/MainLogo.png';
  rootChild[0].appendChild(logoLoginPage);

 

}