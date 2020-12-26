
var monkey , monkey_running,monkey_collided;
var jungle,jungleImg;
var ground, invisibleGround, groundImage;
var banana ,bananaImage, obstacles, obstaclesImage;
var foodGroup, obstaclesGroup, spawnfood, spawnobstacles;
var happySound, hurtSound;
var score=0, survivalTime=0;

function preload(){
  
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided=loadAnimation("sprite_0.png")
  jungleImg=loadImage("Backg.jpg")
  
 bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
  
    happySound=loadSound("Happymonsd.mp3")
  hurtSound=loadSound("hurtmonsd.mp3")

  
    }


function setup() {
 createCanvas(600,450); 
var message = "This is a message";
 console.log(message)
  
  
  jungle=createSprite(400,200)
   jungle.addImage(jungleImg)
  jungle.scale=0.2
  
     
  invisibleGround= createSprite(200,400,400,5); 
  invisibleGround.visible=false
  
  
  
  // create monkey
 monkey = createSprite(90,315,20,20); 
 monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
 monkey.scale=0.1;
  
  //create a ground sprite
ground = createSprite(400,400,400,5);

ground.x = ground.width /1;
ground.velocityX = 0; 
  ground.visible=false
  console.log(ground.x)
   
 
  
    //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
   
  score=0;
  
}

function draw() {
    
  
// moving ground
    background.velocityX = 3 

    if (background.x < 0){
      background.x = background.width/2;
    }
     
  
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  
  if(foodGroup.isTouching(monkey)){
   score=score+1
     
    foodGroup.destroyEach(); 
    
    happySound.play();
        
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    
       
       
    
    
        ground.velocityX=0;
        //obstaclesGroup.velocityY=0;
        //foodGroup.velocityY=0;

     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0); 
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    //obstaclesGroup.destroyEach(0)
     foodGroup.destroyEach(0)
   
       monkey.changeAnimation("collided",monkey_collided)
  }
  
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  console.log(monkey.y )
  
  monkey.collide(invisibleGround);
   
  
  //spawn the food
    spawnfood();
  
  //spawn obstacles on the ground
    spawnobstacles();
  
  drawSprites();
  
  stroke("black");
  textSize=20;
  fill("black");
  text("score: "+ score, 130,50);
  
  stroke("black"); 
  textSize=20;
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 457,50);
  
  
  
}
     function spawnfood() {
       
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var food = createSprite(700,100,5,5);
    
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.08;
    food.velocityX = -6;
    
     //assign lifetime to the variable
    food.lifetime = 300;
                                                 
    //add each food to the group
    foodGroup.add(food);
  }
}

function spawnobstacles(){
  
if(frameCount % 150 === 0){
  var obstacles = createSprite(700,380,10,5);
    obstacles.addImage("obstacles",obstaclesImage);   
  obstacles.scale=0.1
  obstacles.setCollider("rectangle",0,0,obstacles.width,obstacles.height);
  obstacles.debug = false
  
  obstaclesGroup.add(obstacles);
  obstaclesGroup.setLifetimeEach(200);
   obstacles.velocityX = -4;
  
  }
  
}


  






