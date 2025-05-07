class fallingItem { //class for falling items, with values on its respective speed, position, image and value of each item
 constructor(xPos,yPos,fallSpeed,displayImg,pointValue)      {this.xPos = xPos;
      this.yPos = yPos;
      this.fallSpeed = fallSpeed;
      this.img = displayImg;
      this.pValue = pointValue; 
                                                              
  }
  returnX(){
    return this.xPos;
  }
  
  returnY(){
    return this.yPos;
  }
  
  display(){ // sjpw the item
  image(this.img,this.xPos,this.yPos,75,75);
  }
  
  fall(){ // allow the item(s) to fall
    this.yPos+=this.fallSpeed;
  }
  
  
}

//bomb subclass
class pBomb extends fallingItem  { // subclass of falling items - bomb has it's own value and a sound file attached to it which ignites when collected by barrel
  constructor(xPos,yPos,fallSpeed,displayImg,pointValue,explSound){
    super(xPos,yPos,fallSpeed,displayImg,pointValue)
    this.explSound = explSound;
  }
  
  playSound(){  // play the sound of the exploding sound
    this.explSound.play();
  }
  
  
  
}
