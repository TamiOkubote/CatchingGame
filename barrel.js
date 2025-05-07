class barrel {
  
  constructor(xPos){
    this.xPos = xPos;
    this.yPos = height*0.9;
    this.img = loadImage('Images/barrel.png');
  }
  
// use either a/d or arrow keys. Validation to check whether barrel is within range.
  move(){
    if(keyIsPressed == true){{
    if ((keyIsDown(65) || keyIsDown(37) ) && this.xPos>0){
      this.xPos -=3;
    }
    else if ((keyIsDown(68) || keyIsDown(39)) && this.xPos<width){
      this.xPos +=3;
    }
  }}}
  
  display(){
    imageMode(CENTER);
  image(this.img,this.xPos,this.yPos,height/4,width/4)
  }
  
}
