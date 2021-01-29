var PLAY=1;
var END=0;
var gameState=PLAY;

var trex,trexImage,sun,sunImage;
var ground,groundImage,invisibleGround;
var score,cloud,cloudImage;
var cactiG, cloudsG;
var gameOverImg,restartImg,gameOverS;
var gameOver,restart;
var backgroundImage;

function preload()
{
  trexImage=loadImage("trex.png");
  sunImage=loadImage("sun.png");
  obstacle1Image=loadImage("obstacle1.png");  
  obstacle2Image=loadImage("obstacle2.png");
  groundImage=loadImage("ground.png");
  cloudImage=loadImage("cloud.png");
  restartImg=loadImage("restart.png");
  gameOverImg=loadImage("gameOver.png");
  gameOverS=loadSound("die.mp3");
  backgroundImage = loadImage("Tree.jpg");
}
function setup()
{
  createCanvas(600,500);
  
  trex=createSprite(50,460,20,20);
  trex.addImage(trexImage);
  trex.scale=0.2;
  
  sun=createSprite(460,100,20,20)
  sun.addImage(sunImage);
  sun.scale=0.1;
  
  ground=createSprite(200,470,20,20);
  ground.addImage(groundImage);
  ground.velocityX=-3;
   
  invisibleGround=createSprite(200,475,550,20);
  invisibleGround.debug=true;
  invisibleGround.visible=true;
  invisibleGround.visible=false;
  
  gameOver=createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.6;
  
  restart=createSprite(300,230);
  restart.addImage(restartImg);
  restart.scale=0.7;
  
 // trex.debug=true;
  trex.setCollider("rectangle",0,0,300,700);
  
  gameOver.visible=false;
  restart.visible=false;
  
  score=0;
  //To declare the groups.
  cactiG=new Group();
  cloudsG=new Group();  
}

function draw()
{
  background(backgroundImage);
  stroke("green");
  fill("green");
  textSize(25);
  text("Score: "+score,360,50);
  
  if(gameState===PLAY)
    {
     obstacles();
     SpawnClouds();
    
  //To increase the score.
  score= score+ Math.round(getFrameRate()/60)
  
  //To make the trex jump.
  if(keyDown("space")&&trex.y>=390)
    {
      trex.velocityY=-20;
    }
 if(ground.x<0)
   {
     ground.x=ground.width/2;
   }
  if(trex.isTouching(cactiG))
    {
      gameState=END;
      gameOverS.play();
   }
    }
  if(mousePressedOver(restart))
    {
      reset();
    }
  if(gameState===END)
  {
    trex.velocityY=0;
    cactiG.setVelocityXEach(0);
    cloudsG.setVelocityXEach(0);
    
    cloudsG.setLifetimeEach(-1);
    cactiG.setLifetimeEach(-1);
    ground.velocityX=0;
    score=0;
    
    gameOver.visible=true;
    restart.visible=true;    
  }
  
  
  trex.velocityY=trex.velocityY+0.8;
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset()
{
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  
  cactiG.destroyEach();
  cloudsG.destroyEach();
  
  score=0;
  ground.velocityX=-3;
}

function obstacles()
{
  if(frameCount%60===0){
    cactus1=createSprite(width-0,height-65,20, 20);
    cactus1.velocityX=-10;
    var rand=Math.round(random(1,2))
    
    switch(rand)
      {
      case 1:
  cactus1.addImage(obstacle1Image);
  cactus1.scale=0.3; 
          break;
      case 2:
  cactus1.addImage(obstacle2Image);
  cactus1.scale=0.1; 
          break;
      default : break; 
      }
  cactiG.add(cactus1);
 // cactus1.debug=true;
    }
}

function SpawnClouds()
{
  if(frameCount%60===0)
    {
  var cloud=createSprite(650,200,20,20)
  cloud.velocityX=-3;
      cloud.y=Math.round(random(100,200));
 cloud.addImage(cloudImage);
 cloud.scale=0.2;
 cloud.lifetime=260;
 cloudsG.add(cloud);
  }  
}