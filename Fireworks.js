
class Firework{
    //private arrays for storing particles
    #explosionParticles = []
    #particleTrail = []
    #exploded = false
    #originX;
    #originY;
    constructor(positionX,positionY,properties){
        //console.log(properties.name)
        this.pos = createVector(50,400);
        //this.pos = p5.Vector.random2D().mult(250) //position of the particle
       this.vel = createVector(0,-12) //starting velocity is 0
       this.acc = createVector(0,0.09) //randomize particle acceleration
       this.#originX = positionX
       this.#originY = positionY
    }
    update(){
        //If upward velocity is 0 then explode the firework
        if(this.vel.y>0 && !this.#exploded){
            this.explode()
            this.#exploded = true;
        }
        //Cap downward acceleration to make falling more realistic
        if(!(this.vel.y >12)){
            this.vel.add(this.acc)
        }
        this.pos.add(this.vel)
    }
    show(){
        
        push()
        translate(this.#originX,this.#originY)
        //show streak particles
        if(!this.#exploded){
            stroke(0)
            fill(102,102,0)
            ellipse(this.pos.x,this.pos.y,15)
            noStroke()
            fill(153,153,0)
            ellipse(this.pos.x,this.pos.y,13)
            fill(255,247,247)
            ellipse(this.pos.x,this.pos.y,10)
            fill(255)
            ellipse(this.pos.x,this.pos.y,4)
            var sp = new Particles([220,43,43],1,2,0.1,this.pos,20,50)
            this.#particleTrail.push(sp)
            
        }
        //show and update streak particles
        for(var i = this.#particleTrail.length-1;i>=0;i--){
            if(!this.#particleTrail[i].destroy()){
                this.#particleTrail[i].show();
                this.#particleTrail[i].update();
            }else{
                this.#particleTrail.splice(i,1);
            }
        }
        //show and update explosion particles
        for(var i = this.#explosionParticles.length-1;i>=0;i--){
            if(!this.#explosionParticles[i].destroy()){
                this.#explosionParticles[i].show();
                this.#explosionParticles[i].update();
            }else{
                this.#explosionParticles.splice(i,1);
            }
        }
        pop()
    }
    explode(){
        for(var i = 0; i<100;i++){
            var p = new Particles([220,43,43],10,15,0.01,this.pos,50,100);
            this.#explosionParticles.push(p);  
        }
    }  
    exploded(){
        return this.#exploded
    }
    //destroy condition for firework
    destroyCond(){
        //return true after firework has exploded and all particles is destroyed
        if(this.#exploded && this.#explosionParticles.length == 0 && this.#particleTrail.length == 0){
            return true;
        }else{
            return false;
        }
    }  
}
