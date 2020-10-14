class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    lmp1 = createSprite(100,200);
  huracan= createSprite(300,200);
    p1 = createSprite(500,200);
    chiron = createSprite(700,200);
    cars = [lmp1, huracan, p1, chiron];
    lmp1.addImage("lmp1",lmp1img);
    huracan.addImage("huracan",hurimg);
    p1.addImage("p1",pimg);
    chiron.addImage("chiron",cimg);
    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background("#c68767");
      image(track,0,-displayHeight*6,displayWidth,displayHeight*7);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 220;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          console.log(camera.position.x,camera.position.y);
        }
       
       
         }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
  
if (player.distance>6000){
  gameState=2;
  player.rank=player.rank+1;
  Player.updateCarsAtEnd(player.rank);
}
    drawSprites();
    if(player.rank===1){
      text("You came first!Great going!",displayWidth/2,displayHeight+150);
    }
    if(player.rank===2){
      text("You came Second!Better luck next time!",displayWidth/2,displayHeight+150);
    }
  }
  end(){
    console.log("race ended");
console.log(player.rank);
if(player.rank===1){
  text("You came first!Great going!",768,-5100);
}
if(player.rank===2){
  text("You came second!Better luck next time!",768,-5100);
}
if(player.rank===3){
  text("You came third!Try again!",768,-5100);
}
if(player.rank===4){
  text("You came fourth!You can do it. I feel it!",768,-5100);
}
  }
}
