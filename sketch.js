//taking variables
var zombie_running,bkground, ground, human_runnning, human, bulletImg;
var human_shooting,zombie, gZombie, gZombie_running, healthImg, starImg;
var gunS, introS;

var life=200;
var score=0;

var WIN=3;
var START=1;
var PLAY=2;
var END=0;
var gameState=1;



function preload(){
//loadind images, animation and sound.
zombie_running = loadAnimation("Walk (1).png","Walk (2).png","Walk (3).png","Walk (4).png","Walk (5).png","Walk (6).png","Walk (7).png","Walk (8).png","Walk (9).png","Walk (10).png");
bkground = loadImage("horror.jpg");
human_runnning = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png")
bulletImg = loadImage("bullet.png")
human_shooting = loadAnimation("Shoot (1).png","Shoot (2).png","Shoot (3).png");
gZombie_running = loadAnimation("Attack (1).png","Attack (2).png","Attack (3).png","Attack (4).png","Attack (5).png","Attack (6).png","Attack (7).png","Attack (8).png");
healthImg = loadImage("health.png");
startImg= loadImage("start.png");
gunS = loadSound("gunS.mp3");
introS = loadSound("introS.mp3");
}

function setup() {

//background    
ground = createSprite(width/1,200);

//creating canvas
createCanvas(windowWidth,windowHeight);

//creating player
human = createSprite(width/2,height-50,200,20,20);
human.addAnimation("running",human_runnning);
human.addAnimation("shooting",human_shooting);
human.scale=0.2;

//creating groups
zombieG = new Group();
bulletG = new Group();
gZombieG = new Group();
healthG = new Group();

}

function draw() {
    
if(gameState===START){

//song and background
introS.loop();
background("yellow");   
    
//adding text
textSize(100);
text("𝖜𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 𝖙𝖍𝖊 𝖟𝖔𝖒𝖇𝖎𝖊 𝖌𝖆𝖒𝖊",100,100);
text("🅷🅴🆁🅴 🅰🆁🅴 🆃🅷🅴 🆁🆄🅻🅴🆂 🅾🅵 🆃🅷🅴 🅶🅰🅼🅴",100,200);
textSize(20);
text("The basic idea of this game is this game that you are in a city full of zombies and you have to escape from the zombies.",100,250);
text("In the starting of the game you life is 200.",100,280);
text("If a zombie touches your life is dereased by 20.",100,310);
text("If you take a medikit your life is increased by 40.",100,340);
text("If you shoot a zombie your score is increased by 100.",100,370);
text("If your score is 100 you win the game.",100,400);
text("If your life is 0 you lose the game.",100,430);
text("Press the up arrow to move up, left to move left, right to move rightand down to move down.",100,470);
text("Press space to shoot bullets.",100,500);
text("If you shoot any one zombie the whole group of zombies is destroyed.",100,530);
textSize(50);
text("Press y to start.",100,580);
textSize(60);
text("Game by Dev.",1000,500);
 
//condition of changing the game state to play
if(keyDown("y"))
{
gameState=PLAY;
}
}

if (gameState===PLAY)
{
//stopping sound and background 
introS.stop();        
background(0); 
ground.addImage(bkground);

//condition for bullets
if(keyDown("space"))
{
createBullet();
human.changeAnimation("shooting",human_shooting);
gunS.play();
}
if(keyWentUp("space"))
{
human.changeAnimation("running",human_runnning);
}

//condition for movement of player
if(keyDown("RIGHT_ARROW"))
{
human.x=human.x+10;
}
if(keyDown("LEFT_ARROW"))
{
human.x=human.x-10;
}
if(keyDown("UP_ARROW"))
{
human.y=human.y-10;
}
if(keyDown("DOWN_ARROW"))
{
human.y=human.y+10;
}

//condition for decreasing life
if(zombieG.isTouching(human))
{
life=life-20;
zombieG.destroyEach();
}
if (gZombieG.isTouching(human))
{
life=life-20;
gZombieG.destroyEach();
}

//condition for destroying zombies and score
if(bulletG.isTouching(zombieG))
{
zombieG.destroyEach();
score=score+100;
bulletG.destroyEach();
}
if(bulletG.isTouching(gZombieG))
{
gZombieG.destroyEach();
score=score+100;
bulletG.destroyEach();
}

//increasing helth(medikit)
if (healthG.isTouching(human))
{
life=life+40;
healthG.destroyEach();
}

//condition for changing gamestate
if (life===0)
{
gameState=END;
}
if (score===1000)
{
gameState=WIN; 
}

//spawning different things
spawnHealth();
spawngZombies();
spawnZombies();
drawSprites();

//life
textSize(20);
fill("blue");
text("LIFE: "+ life,150,30)

//score
textSize(20);
fill("orange");
text("SCORE: "+ score,250,30)  
}

if(gameState===END)
{
//song and background
introS.loop();
background(0);

//text
textSize(50)
text("You Lost :(",200,100);
text("Sound- Dev Shah",200,170);
text("Animation - Dev shah",200,240);
text("Coding - Dev shah",200,310);
text("Thanks for playing press n to play again",200,380);

//condition for changing game state
if (keyDown("n"))
{
gameState=PLAY;
score=0;
life=200;
}
}

if(gameState===WIN)
{
//song and background
introS.loop();
background(0);

//text
textSize(50)
text("You won :)",200,100);
text("Sound- Dev Shah",200,170);
text("Animation - Dev shah",200,240);
text("Coding - Dev shah",200,310);
text("Thanks for playing press d to play again",200,380);

//changing gamstate
if (keyDown("d")){
gameState=PLAY;
score=0;
life=200;
}
}
}

//spawning zombies
function spawnZombies()
{
if (World.frameCount % 50 == 0) 
{
zombie = createSprite(0,Math.round(random(windowWidth, -370)), 10, 10);
zombie.addAnimation("running", zombie_running);
zombie.scale = 0.2;
zombie.velocityX = 2;
zombieG.add(zombie);
zombie.lifetime=350;
}
}

//creating bullets
function createBullet()
{
var bulet = createSprite(human.x,human.y); 
bulet.addImage(bulletImg);
bulet.y=human.y;
bulet.velocityX= 8;
bulet.lifetime=350;
bulet.scale=0.1;
bulletG.add(bulet);
}

//spawning girl zombies
function spawngZombies()
{
if (World.frameCount % 50 == 0) 
{
gZombie = createSprite(0,Math.round(random(windowWidth, -370)), 10, 10);
gZombie.addAnimation("running", gZombie_running);
gZombie.scale = 0.2;
gZombie.velocityX = 2;
gZombieG.add(gZombie);
gZombie.lifetime=800;
}
}

//spawning heath kits.
function spawnHealth()
{
if (World.frameCount % 1000 == 0) 
{
var health = createSprite(50,Math.round(random(windowWidth, -370)), 10, 10);
health.addImage(healthImg);
health.scale=0.2;
health.velocityX=2;
healthG.add(health);
health.lifetime=800;
}
}


