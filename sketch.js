// I after a variable name means it is a image variable
// T after a variable name means it is a tutorial variable
// B after a variable name means it is a background variable
// S after a variable name means it is a sound variable
// b after a variable name means it is a balloon variable
var PLAY, END;
var backscreen, backscreenI;
var gameState = PLAY;
var score = 0;
var diffuculty = "normal";
var tree, treeI;
var treeTop, treeTopI;
var cloud, cloudI;
var cursor, cursorI;
var rb, rbI, rbGroup;
var bb, bbI, bbGroup;
var gb, gI, gbGroup;
var pb, pI, pbGroup;
var yb, yI, ybGroup;
var balloonGroup;
var ground, groundI;
var clickTimer = 0;


var arrow, arrowI;
var arrowMode = "hold";


var rightEdge;
var testing = false;
var timer = 0;
var testingTimer = 0;
var level = 1;
var momentum = 0;
var arrowGroup;







function preload(){
  
  treeI = loadImage("tree.png");
  treeTopI = loadImage("tree.png");
  cloudI = loadImage("cloud.png");
  cursorI = loadImage("cursor.png");
  rbI = loadImage("red_balloon.png");
  bbI = loadImage("blue_balloon.png");
  gbI = loadImage("green_balloon.png");
  pbI = loadImage("pink_balloon.png");
  ybI = loadImage("yellow_balloon.png");
  backscreenI = loadImage("backscreen.png");
  groundI = loadImage("ground.png");
  arrowI = loadImage("arrow.png");
  
 
}

function setup() {
  createCanvas(1536,720);
  //768,360 is middle of the screen
  
  backscreen = createSprite(768,360,1536,720);
  backscreen.addImage("bac", backscreenI);
  backscreen.velocityX = 10;

  ground = createSprite(768,360,1536,720);
  ground.addImage("gro", groundI);
  ground.depth = -100;

  cursor = createSprite(200,200,20,20);
  cursor.addImage("cur", cursorI);
  cursor.scale = 0.25;
  cursor.depth = 20;

  arrow = createSprite(1500,475,200,200);
  arrow.addImage("arr", arrowI);
  arrow.scale = 0.55;
  arrow.visible = false;


  
  rightEdge = createSprite(1536,475,20,950);
  rightEdge.visible = false;

  console.log("clickTimer:" + clickTimer);

  treeTopGroup = createGroup();
  treeGroup = createGroup();
  rbGroup = createGroup();
  bbGroup = createGroup();
  gbGroup = createGroup();
  pbGroup = createGroup();
  ybGroup = createGroup();
  arrowGroup = createGroup();
  balloonGroup = createGroup();
  arrowGroup.add(arrow);
}

function draw() {
  background(color(100,69,30));
  
  // to make the cursor follow the mouse
  cursor.x = World.mouseX;
  cursor.y = World.mouseY;
  cursor.depth = 100+1;
  console.log("testingTimer:" + testingTimer);
  if(gameState === PLAY){
    // spawning things
    spawnTrees();
    spawnTreesTop();
    spawnCloud();
    spawnBalloon();
    
   
    
    
    // TO MAKE BACKGROUND INFINITE

    if(backscreen.x > 1536){
      backscreen.x = 0;
    }

    
    //to make the balloons pop when touching arrows
    
    if(arrowGroup.isTouching(rbGroup)){
      rbGroup.destroyEach();
      score = score+1;
      arrowMode = "hold";
      
     
      
    } else if(arrowGroup.isTouching(bbGroup)){
      bbGroup.destroyEach();
      score = score+2;
      arrowMode = "hold";
  

      
    } else if(arrowGroup.isTouching(gbGroup)){
      gbGroup.destroyEach();
      score = score+3;
      arrowMode = "hold";
     
     
   
    } else if(arrowGroup.isTouching(pbGroup)){
      pbGroup.destroyEach();
      score = score+2;
      arrowMode = "hold";
    
      
    } else if(arrowGroup.isTouching(ybGroup)){
      ybGroup.destroyEach();
      score = score+5;
      arrowMode = "hold";

    }
    //to control the arrows
    if(arrowMode === "hold"){
      arrow.x = 1600;
      arrow.y = -5;
      momentum = 0;
    }
    
    if(arrowMode === "shoot"){
      momentum = momentum+1;
    }
    
    if(mouseIsPressed === true && arrowMode === "hold"){
      arrow.y = cursor.y;
      arrowMode = "shoot";
      arrow.velocityX = -20 - momentum;
      arrow.visible = true;
      }

     

     




    if(arrow.x < 0){
      arrow.x = 1540;
      arrow.visible = false;
      arrow.velocityX = 0;
      arrowMode = "hold";
      momentum = 0;
    }

    

    //to make you lose points when balloons go off the screen
    if(rightEdge.isTouching(rbGroup)){
      rbGroup.destroyEach();
      score = score-1;
    }

    if(rightEdge.isTouching(bbGroup)){
      bbGroup.destroyEach();
      score = score-2;
    }

    if(rightEdge.isTouching(gbGroup)){
      gbGroup.destroyEach();
      score = score-3;
    }

    if(rightEdge.isTouching(pbGroup)){
      pbGroup.destroyEach();
      score = score-2;
    }

    if(rightEdge.isTouching(ybGroup)){
      ybGroup.destroyEach();
      score = score-5;
    }

    //to make sure the balloons dont touch eachother
    if(rbGroup.isTouching(bbGroup)){
      rbGroup.destroyEach();
      
    }

    if(rbGroup.isTouching(gbGroup)){
      rbGroup.destroyEach();
    }

    if(rbGroup.isTouching(pbGroup)){
      rbGroup.destroyEach();
    }

    if(rbGroup.isTouching(ybGroup)){
      rbGroup.destroyEach();
    }

    if(bbGroup.isTouching(gbGroup)){
      bbGroup.destroyEach();
    }

    if(bbGroup.isTouching(pbGroup)){
      bbGroup.destroyEach();
    }

    if(bbGroup.isTouching(ybGroup)){
      bbGroup.destroyEach();
    }

    if(gbGroup.isTouching(pbGroup)){
      gbGroup.destroyEach();
    }

    if(gbGroup.isTouching(ybGroup)){
      gbGroup.destroyEach();
    }

    if(pbGroup.isTouching(ybGroup)){
      pbGroup.destroyEach();
    }

    //testing mode
    testingTimer = testingTimer+0.25;
    if(keyDown("t") && testing === false && testingTimer > 2){
      testing = true;
      testingTimer = 0;
    } else if(keyDown("t") && testing === true && testingTimer > 2){
      testing = false;
      testingTimer = 0;
    }
    if(testing === true){
      timer = timer+0.25;
      if(keyDown("UP_ARROW") && timer > 10){
        score = score+1;
        timer = 0;
      }
    }
    //ammo system
    if(arrow.isTouching(balloonGroup)){
      arrowMode = "hold";
    }

    //level system
    if(score === 20){
      level = 2;
    }

  


  } else if(gameState === END){

  }
    
    
    
  drawSprites();
//to make the score constanly update
  textSize(25);
    fill("white");
    text("Score:" + score, 768, 40);

    if(gameState === PLAY){
      if(testing === true){
        text("testingModeActive",1320, 710);
      }
    }

}


function spawnTrees(){
  if(frameCount % Math.round(random(40,60)) === 0){
    treeSize = 0.06 + random(0.15,0.25);
    tree = createSprite(-5,378,20,20);
    tree.addImage("tre", treeI);
    tree.scale = treeSize;
    tree.velocityX = 10;

    tree.depth = 6;

    tree.lifetime = 600;

  }
}

function spawnTreesTop(){
  if(frameCount % Math.round(random(40,60)) === 0){
    treeTopSize = random(0.15,0.25)
    treeTop = createSprite(-5,232,20,20);
    treeTop.addImage("treTop", treeTopI);
    treeTop.scale = treeTopSize;
    treeTop.velocityX = 10;
    treeTop.depth = 5;

    treeTop.depth = 7;
    if(treeTop.isTouching(treeTop)){
      treeTop.destroy();
    }
    treeTop.lifetime = 600;

  }
}

function spawnCloud(){
  if(frameCount % Math.round(random(50,80)) === 0){
    qa = Math.round(random(40, 150));
    cloudSize = random(0.15,0.25)
    cloud = createSprite(-5,0,20,20);
    cloud.addImage("clo", cloudI);
    cloud.scale = cloudSize;
    cloud.velocityX = 10;

    cloud.y = qa;
    cloud.depth = 5;
    cloud.lifetime = 600;

  }
}

function spawnBalloon(){
  if(frameCount %  120 === 0 && level === 1 || frameCount %  120 === 0 && level === 2 ){
    rb = createSprite(-5, 0, 20,20);
    rb.addImage("rbL", rbI);
    rb.scale = 0.45;
    rb.setCollider("rectangle", 0, -100, 200, 250);
    
    if (diffuculty === "normal") {
      rb.velocityX = 15;
    } else if (diffuculty === "easy") {
      rb.velocityX = 8
    } else if (diffuculty === "hard") {
      rb.velocityX = 20
    }
    rb.depth = 10;
    rb.y = Math.round(random(60,400));
    rb.lifetime = 600;
    rbGroup.add(rb);
    balloonGroup.add(rb);
  }

  if(frameCount % 150 === 0 && level === 2){
    bb = createSprite(-5, 0, 20,20);
    bb.addImage("bbL", bbI);
    bb.scale = 0.40;
    bb.setCollider("rectangle", 0, -100, 200, 230);
    
    if (diffuculty === "normal") {
      bb.velocityX = (15 + (3*score / 5));
    } else if (diffuculty === "easy") {
      bb.velocityX = (8 + (3*score / 10));
    } else if (diffuculty === "hard") {
      bb.velocityX = (20 + (3*score / 2));
    }
    bb.depth = 10;
    bb.y = Math.round(random(60,400));
    bb.lifetime = 600;
    bbGroup.add(bb);
    balloonGroup.add(bb);
  }

  if(frameCount % 180 === 0 && level === 3){
    gb = createSprite(-5, 0, 20,20);
    gb.addImage("gbL", gbI);
    gb.scale = 0.35;
    gb.setCollider("rectangle", 0, -100, 200, 210);
    
    if (diffuculty === "normal") {
      gb.velocityX = (15 + (3*score / 5));
    } else if (diffuculty === "easy") {
      gb.velocityX = (8 + (3*score / 10));
    } else if (diffuculty === "hard") {
      gb.velocityX = (20 + (3*score / 2));
    }
    gb.depth = 10;
    gb.y = Math.round(random(60,400));
    gb.lifetime = 600;
    gbGroup.add(gb);
    balloonGroup.add(gb);
  }

  if(frameCount % 140 === 0 && level === 1){
    pb = createSprite(-5, 0, 20,20);
    pb.addImage("pbL", pbI);
    pb.scale = 0.50;
    pb.setCollider("rectangle", 0, -100, 200, 195);
   
    if (diffuculty === "normal") {
      pb.velocityX = 18;
    } else if (diffuculty === "easy") {
      pb.velocityX = 3;
    } else if (diffuculty === "hard") {
      pb.velocityX = 3;
    }
    pb.depth = 10;
    pb.y = Math.round(random(60,400));
    pb.lifetime = 600;
    pbGroup.add(pb);
    balloonGroup.add(pb);
  }

  if(frameCount % 240 === 0 && level === 3){
    yb = createSprite(-5, 0, 20,20);
    yb.addImage("ybL", ybI);
    yb.scale = 0.20;
    yb.setCollider("rectangle", 0, -100, 200, 175);

    if (diffuculty === "normal") {
      yb.velocityX = 0;
    } else if (diffuculty === "easy") {
      yb.velocityX = (8 + (3*score / 10));
    } else if (diffuculty === "hard") {
      yb.velocityX = (20 + (3*score / 2));
    }
    yb.depth = 10;
    yb.y = Math.round(random(60,400));
    yb.lifetime = 600;
    ybGroup.add(yb);
    balloonGroup.add(yb);
  }
}





