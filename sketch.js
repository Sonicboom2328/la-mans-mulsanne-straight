var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, lmp1, huracan, p1, chiron;
var track,lmp1img,hurimg, cimg, pimg;

function preload(){
  track=loadImage("../images/track.jpg");
  lmp1img=loadImage("../images/car4.png");
  hurimg=loadImage("../images/car2.png");
  cimg=loadImage("../images/car3.png");
  pimg=loadImage("../images/car1.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (gameState===2){
    game.end();
  }
}
