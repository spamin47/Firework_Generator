
class Firework{
    //SFX
    #explosionSFX;
    #trailSFX;
    //private arrays for storing particles
    #explosionParticles = []
    #particleTrail = []
    #exploded = false
    #originX;
    #originY;
    #explosion_properties = {
        color:[255,255,255], //default color
        radius1:10,
        radius2:20,
        accelerationX:0,
        accelerationY:0.01,
        deleteCondRange1:50,
        deleteCondRange2:100,
        Particles:100, //number of particles
    };
    #trail_properties = {
        color:[255,255,255], //default color
        accelerationX:0,
        accelerationY:0.1,
        deleteCondRange1:20,
        deleteCondRange2:50,
        Particles:1, //number of particles
    };
    #firework_properties = {
        color:[153,102,0], //default color
        starting_velocity:createVector(0,-10),
        acceleration:createVector(0,0.09),
        explosion_delay:0
    };
    constructor(positionX,positionY,explosion_properties,trail_properties,
        color,starting_velocity,acceleration,explosion_delay,explosion_SFX,trail_SFX){
        this.pos = createVector(0,0);
       this.#originX = positionX
       this.#originY = positionY
       this.#explosion_properties = explosion_properties;
       this.#trail_properties = trail_properties
       this.#firework_properties.color = color
       this.#firework_properties.starting_velocity = createVector(starting_velocity.x,starting_velocity.y)
       this.#firework_properties.acceleration = createVector(acceleration.x,acceleration.y)
       this.#firework_properties.explosion_delay = explosion_delay
       this.#explosionSFX = explosion_SFX
       this.#trailSFX = trail_SFX
       this.#trailSFX[0].play()
    }
    update(){
        //If upward velocity is 0 then explode the firework
        if(this.#firework_properties.starting_velocity.y>this.#firework_properties.explosion_delay 
            && !this.#exploded){
            this.explode()
            this.#exploded = true;
        }
        //Cap downward acceleration to make falling more realistic
        if(!(this.#firework_properties.starting_velocity.y >12)){
            this.#firework_properties.starting_velocity.add(this.#firework_properties.acceleration)
        }
        this.pos.add(this.#firework_properties.starting_velocity)
    }
    show(){
        push()
        translate(this.#originX,this.#originY)
        //show streak particles
        if(!this.#exploded){
            //shape of firework
            stroke(0)
            fill(102,102,0)
            ellipse(this.pos.x,this.pos.y,15)
            noStroke()
            fill(this.#firework_properties.color)
            ellipse(this.pos.x,this.pos.y,13)
            fill(255,247,247)
            ellipse(this.pos.x,this.pos.y,10)
            fill(255)
            ellipse(this.pos.x,this.pos.y,4)
            //streak particles
            for(var i = 0;i<this.#trail_properties.Particles;i++){
                var sp = new Particles
                    (
                        this.#trail_properties.color,
                        this.#trail_properties.radius1,
                        this.#trail_properties.radius2,
                        this.#trail_properties.accelerationX,
                        this.#trail_properties.accelerationY,
                        this.pos,
                        this.#trail_properties.deleteCondRange1,
                        this.#trail_properties.deleteCondRange2
                    )
            this.#particleTrail.push(sp) 
            }
            
        }
        //show/update streak particles
        for(var i = this.#particleTrail.length-1;i>=0;i--){
            if(!this.#particleTrail[i].destroy()){
                this.#particleTrail[i].show();
                this.#particleTrail[i].update();
            }else{
                this.#particleTrail.splice(i,1);
            }
        }
        //show/update explosion particles
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
        this.#explosionSFX[floor(random(0,this.#explosionSFX.length))].play()
        for(var i = 0; i<this.#explosion_properties.Particles;i++){
            //create particles for explosion
            var p = new Line
            (
                this.#explosion_properties.color,
                this.#explosion_properties.radius1,
                this.#explosion_properties.radius2,
                this.#trail_properties.accelerationX,
                this.#explosion_properties.accelerationY,
                this.pos,
                this.#explosion_properties.deleteCondRange1,
                this.#explosion_properties.deleteCondRange2
            );
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
