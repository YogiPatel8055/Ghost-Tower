var tower,towerimg;
var door,doorimg,doorG;
var climber,climberimg,climberG;
var ghost,ghostimg;
var invisibleground,invisG;

var gameState="PLAY";


function preload(){
  towerimg=loadImage("tower.png");
  doorimg=loadImage("door.png");
  climberimg=loadImage("climber.png");
  ghostimg=loadImage("ghost-standing.png");
}
function setup(){
  createCanvas(600,600);
  doorG=new Group();
  climberG=new Group();
  invisG=new Group();
  
  tower=createSprite(300,300);
  tower.addImage("tower", towerimg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,10,10);
  ghost.addImage("ghost", ghostimg);
  ghost.scale=0.4;
  
}
function draw(){
  background("black");
  
  if(gameState==="PLAY"){
  
  if(tower.y>600){
    tower.y=300;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(climberG.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
  if(invisG.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }


  spawndoors();
  drawSprites();
}
if(gameState==="END"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over",300,300);
}
}
function spawndoors(){
  if(frameCount%240===0){
  door=createSprite(200,-50,10,10);
  door.addImage("door", doorimg);
  door.velocityY=1;
    door.x=Math.round(random(120,400));
    doorG.add(door);
    
    climber=createSprite(200,10,10,10);
    climber.addImage("climber", climberimg);
    climber.velocityY=1;
    climber.x=door.x;
    climberG.add(climber);
    
    invisibleground=createSprite(200,15);
    invisibleground.width=climber.width;
    invisibleground.height=2;
    invisibleground.x=door.x;
    invisibleground.velocityY=1;
    invisG.add(invisibleground);
    invisibleground.debug=true;
    ghost.depth=door.depth;
    ghost.depth+=1;
    door.lifetime=600;
    climber.lifetime=600;
    invisibleground.lifetime=600;
}
}