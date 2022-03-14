class Plate {
  
  static loadImage(){
    this.image = loadImage("Plate.png");
  }
  
  constructor(x, w) {
    this.x = x;
    this.w = w;
    this.h = 10;
    this.y = height - this.h;
  }

  catches(pie) {
    if (pie.y + pie.r >= this.y && pie.x+pie.r > this.x-this.w/2 && pie.x-pie.r < this.x + this.w/2) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    push()
    imageMode(CENTER);
    image(Plate.image,this.x,this.y,this.w,this.h) 
    pop()
//rect(this.x, this.y, this.w, this.h);
  }
}
