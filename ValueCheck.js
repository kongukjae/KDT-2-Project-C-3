
export default class ValueCheck{
  constructor(id, pw, qe, as, dogName, dogGender){
    this.id = id;
    this.pw = pw;
    this.qe = qe;
    this.as = as;
    this.dogName = dogName;
    this.dogGender = dogGender;
  }

  set id(val){
    let rangecheckerFlag = this.stringNumChecker(val);
    if(rangecheckerFlag){
      this._id = val;
    }
    
  }

  set pw(val){
    let pwcheckerFlag = this.pwChecker(val);
    if(pwcheckerFlag){

      this._pw = val;
    }
  }
  set as(val){
    let asFlag = this.nonUseChecker(val);
    if(asFlag){
      this._as = val;
    }
  }
  set dogName(val){
    let dogName = this.nonUseChecker(val);
    if(dogName){
      this._dogName = val;
    }
  }
  asciiObject = {
    lowerCase: {min : 97, max : 122},
    upperCase: {min : 65, max : 90},
    number: {min : 48, max : 57},
    length: {min: 7, max: 14},
    nonUse: ['`', '~', '!','@','#','$','%','^','&','*','(',')','_','-','=','+',';',':',"'",'"',',','.','<','>','/','?','{','}', '[', ']', '|'],
  }

  nonUseChecker = function(value){
    for(let i = 0; i < value.length; i++){
      if(this.asciiObject.nonUse.includes(value[i])){
        return false;
      }
    }
    return true;
  }
  
  stringNumChecker = function(value){
    let rangechecker = true;
    if(value.length > this.asciiObject.length.max || value.length < this.asciiObject.length.min){
      return false;
    }
    for(let i = 0; i < value.length; i++){
      let target = value.charCodeAt(i);
      if(!(( target>= this.asciiObject.number.min && target<=this.asciiObject.number.max) || (target >= this.asciiObject.upperCase.min && target<=this.asciiObject.upperCase.max) || (target >= this.asciiObject.lowerCase.min && target<=this.asciiObject.lowerCase.max))){
        rangechecker = false;
        console.log('잘못된 문자');
        break
      };
    }
    return rangechecker
  }

  pwChecker = function(value){
    
    if(value.length > this.asciiObject.length.max || value.length < this.asciiObject.length.min){
      return false;
    }
    let checkerSpc = true; //특수기호
    let checkerNum = false; // 슷지
    let checkerStr = false; // 문자열

    for(let i = 0; i < value.length; i++){
      let target = value.charCodeAt(i);
      if(target >= this.asciiObject.number.min && target <= this.asciiObject.number.max){
        checkerNum = true;
      }
      else if ((target >= this.asciiObject.upperCase.min && target <= this.asciiObject.upperCase.max) || (target >= this.asciiObject.lowerCase.min && target <= this.asciiObject.lowerCase.max)){
        checkerStr = true;
      }
      if(!(( target>= this.asciiObject.number.min && target <= this.asciiObject.number.max) || (target >= this.asciiObject.upperCase.min && target <= this.asciiObject.upperCase.max) || (target >= this.asciiObject.lowerCase.min && target <= this.asciiObject.lowerCase.max)))
      {
        checkerSpc = false;
        break
      }
    }
    return checkerStr && checkerNum && checkerSpc;
  }
}
// let a = new ValueCheck('aaaa1111','asdzx443aaa','1','gdiswls','doggy','1');
// console.log(a);
