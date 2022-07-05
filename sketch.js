
//next objective
var firework_explosion_properties = {
  color:[220,43,43], //firework explosion color
  radius1:10,
  radius2:20,
  accelerationX:0,
  accelerationY:0.01,
  deleteCondRange1:50,
  deleteCondRange2:100,
  Particles:100, //number of particles
};
var firework_trail_properties = {
  color:[204,204,0], //firework trail color
  radius1:1,
  radius2:2,
  accelerationX:0,
  accelerationY:0.1,
  deleteCondRange1:20,
  deleteCondRange2:50,
  Particles:1, //number of particles
};
var firework_properties = {
  color:[153,102,0], //default color
  starting_velocityX:0,
  starting_velocityY:-10,
  accelerationX:0,
  accelerationY:0.09,
  explosion_delay:0
};

var fireworks = [];
var particles = [];
let turn = 1;
var firework_explosion_SFX = []
var firework_trail_SFX = []

// var mic;
function preload(){
  firework_explosion_SFX[0] = loadSound("soundFX/FireworkExplosionSFX_1.mp3")
  firework_explosion_SFX[1] = loadSound("soundFX/FireworkExplosionSFX_2.mp3")
  firework_explosion_SFX[2] = loadSound("soundFX/FireworkExplosionSFX_3.mp3")
  
  firework_trail_SFX[0] = loadSound("soundFX/FireworkTrailSFX_1.mp3")
}

function setup() {
//   mic = new p5.AudioIn();
//   mic.start();
imageMode(CENTER)//center the image
  angleMode(DEGREES)
  rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
}

function draw() {
//   var vol = mic.getLevel();
//   console.log(vol)
  
  background(0);
  //text
  stroke(0)
  fill(255)
  textSize(50)
  text("X:" + floor(mouseX-width/2) + " Y:" + floor(mouseY-height/2),20,100);  
  text(floor(millis()/1000),20,150);  
  
  translate(width/2,height/2); //centered

  for(var i = fireworks.length-1;i>=0;i--){
    if(!fireworks[i].destroyCond()){
      fireworks[i].show();
      fireworks[i].update();
    }else{
      fireworks.splice(i,1)
    }
    
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log(windowHeight)
}
//create firework at mouse position
function mouseClicked(){
  firework_explosion_properties.color = [random(10,255),random(10,255),random(10,255)]
  //firework_explosion_SFX1.play();
  fireworks.push(
    new Firework
      (
        mouseX-width/2,
        mouseY-height/2,
        firework_explosion_properties,
        firework_trail_properties,
        //firework properties
        [153,102,0],
        createVector(random(-2,2),-10), //starting velocity
        createVector(0,0.09), //acceleration
        0, //explosion delay
        firework_explosion_SFX,
        firework_trail_SFX,
      )
    )
}

function keyPressed(){
  if(keyCode == 32){
    noLoop()
  }
  if(keyCode == 66){
    loop()
  }
}