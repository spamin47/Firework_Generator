class Particles{
    constructor(color,radius1,radius2,downwardAccel,position,deleteCondRange1,deleteCondRange2){
        this.pos = p5.Vector.random2D().mult(random(radius1,radius2)) //position of the particle
        //Declare and initialize the spawn origin of particle
        this.originX = position.x
        this.originY = position.y
        this.vel = this.pos.copy().mult(0.1) //starting velocity is 0
        this.acc = createVector(0,downwardAccel) //randomize particle acceleration //randomize particle acceleration
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
        //characteristics of particle
        noStroke()
        fill(this.color)
        ellipse(this.pos.x, this.pos.y,4)
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