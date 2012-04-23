var HEIGHT = 300
var WIDTH = 800
var level = 1

// Inicia el juego
function start(){
	Crafty.init(WIDTH, HEIGHT);
	Crafty.Canvas;
		
	LoadSprites();
  	  	     
	Crafty.scene("loading");
};


function LoadSprites(){
	Crafty.sprite(16, "images/example.png", {
    	Kupo: [0,3],
  	}); 	
}


Crafty.scene("game", function(){
	// Crea la "cámara/viewport", establece un area visible en el mapa sin importar el tamaño del mismo
	Crafty.viewport.init(WIDTH, HEIGHT); 
	
	// La setea en el inicio
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
	Crafty.e("2D, DOM, Image")
          .attr({w: Crafty.viewport.width, h: Crafty.viewport.height})
          .image("images/wall.jpg", "repeat");
          	  
	createFloor();	  
	createLevel(level);
});


// Scenes lists: Loading, Game	
Crafty.scene("loading", function() {
   	// Black background with some loading text
	Crafty.background("gray");
	Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
  		  .text("Cargando...")
       
    Crafty.scene("game");
});
  	

function createFloor(){	
	var size = 5
	
	// Create the Floor
	Crafty.e("2D, DOM, Floor")
		  .attr({x: 0, 
				 y: HEIGHT - size, 
			     w: WIDTH,
			     h: size});
	
	/*	  
    // Create the Walls
	Crafty.e("2D, DOM, Floor")
		  .attr({x: WIDTH - size,
				 y: 0, 
			     w: size,
			     h: HEIGHT});
	Crafty.e("2D, DOM, Floor")
		  .attr({x: 0, 
				 y: 0, 
			     w: size,
			     h: HEIGHT});

	*/
};


Crafty.c("Floor",{
	init: function(){ 
			this.requires("Solid, Color, Collision")
			this.color("white")
			
	}
});	