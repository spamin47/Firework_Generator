class Line{
    constructor(color,radius1,radius2,accelerationX,accelerationY,position,deleteCondRange1,deleteCondRange2){
        this.pos = p5.Vector.random2D().mult(random(radius1,radius2)) //position of the particle
        //Declare and initialize the spawn origin of particle
        this.originX = position.x
        this.originY = position.y
        this.vel = this.pos.copy().mult(0.1) //starting velocity is 0
        this.acc = createVector(accelerationX,accelerationY) //randomize particle acceleration //randomize particle acceleration
        this.color = color
        this.timer = 0;
        this.deleteCond = random(deleteCondRange1,deleteCondRange2)

      }
      update(){ //update the particle's movement
        this.pos.add(this.vel)
        this.vel.add(this.acc)
      }
      show(){//show particle
        push()
        translate(this.originX,this.originY)
        //characteristics of line
        stroke(this.color)
        line(this.pos.x, this.pos.y,this.pos.x*2,this.pos.y*2)
        pop()
      }
      //timer
      destroy(){
        if(this.timer > this.deleteCond){
            return true
        }else{
            this.timer++
            return false
        }
      }
}