var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostStandingImg, ghostJumpingImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostStandingImg = loadAnimation("ghost-standing.png");
  ghostJumpingImg = loadAnimation("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600)
  spookySound.loop();
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addAnimation("standing",ghostStandingImg);
  ghost.addAnimation("jumping",ghostJumpingImg);
  
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  spookySound.play();
  if(gameState === "play"){
    if(tower.y > 600){
      tower.y = 300;
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x +3;
    }
    if(keyDown("space")){
      ghost.velocityY = -4;
      ghost.changeAnimation("jumping",ghostJumpingImg);
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();

    drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors(){
  if(frameCount%200 === 0){
    door = createSprite(200, -50);
    door.addImage(doorImg);
    
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.visible = false;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.velocityY = 2;
    climber.velocityY = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    door.lifetime = 350;
    climber.lifetime = 350;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}