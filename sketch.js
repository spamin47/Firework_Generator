var fireworkProperties = {
  name:"Minh",
  age: 21

}
var fireworks = [];
var particles = [];
let turn = 1;
// var mic;
function preload(){

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
  
  background(255);
  //text
  stroke(0)
  fill(0)
  textSize(50)
  text("X:" + floor(mouseX-width/2) + " Y:" + floor(mouseY-height/2),20,100);  
  text(floor(millis()/1000),20,150);  
  
  translate(width/2,height/2); //centered

  if(fireworks.length == 0){
    // var fw = new Firework(500,0);
    // fireworks.push(fw);
    var fw2 = new Firework(0,0);
    fireworks.push(fw2);
  }
  for(var i = fireworks.length-1;i>=0;i--){
    fireworks[i].show();
    fireworks[i].update();

  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log(windowHeight)
}
//create firework at mouse position
function mouseClicked(){
  fireworks.push(new Firework(mouseX-width/2-50,mouseY-height+200))
}

function keyPressed(){
  if(keyCode == 32){
    noLoop()
  }
  if(keyCode == 66){
    loop()
  }
}