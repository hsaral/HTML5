HEIGHT = 500
WIDTH = 500

// Inicia el juego
function start(){
	c = Crafty.init(HEIGHT, WIDTH);
	Crafty.Canvas;

	Crafty.scene("game", function(){
		Crafty.background("gray");
	
		// Pone el jugador en pantalla
		drawPlayer();

		// Pone los enemigos en pantalla
		drawEnemies();
		});

	Crafty.scene("game");
};


function drawPlayer(){
	// El multiway con las teclas no lo puedo definir en el componente Player
	// ...tengo que ver como se hace
	Crafty.e("2D, DOM, Player")
	      .multiway({x:1,y:1}, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180, 
		                    W: -90, S: 90, D: 0, A: 180});
	// Este multiway viene integrado con Crafty, se puede suplantar con 
	// .bind("enterframe", function(mov){ y definir cada tecla en la funcion }
	
};

function drawEnemies(){
	
	// Coloca los enemigos en el escenario							    
	for (i=1;i<=5;i++){
		var red = Crafty.e("2D, DOM, Enemy, RedEnemy");
		var blue = Crafty.e("2D, DOM, Enemy, BlueEnemy");
		var black = Crafty.e("2D, DOM, Enemy, BlackEnemy");	
	}
};


Crafty.c("Player",{
	_size : 15,
	_posX : Math.floor(Math.random()* HEIGHT),
	_posY : Math.floor(Math.random()* WIDTH),

	init: function(){
		this.attr({x: this._posX, 
			   y: this._posY,
			   w: this._size,
			   h: this._size})
		this.requires("Color").color("white");
		this.requires("Multiway, Collision, Solid");
		
		// Explota con Enemigos Rojos
		this.onHit("RedEnemy", function(){
    			this.destroy();
		})

		// No traspasa los Enemigos Negros
		this.bind('Moved', function(from) {
		    if(this.hit('BlackEnemy')) {
       			this.attr({x: from.x, y:from.y});
		   }
		})
	}
});


// El componente Enemy es generico para los 3 tipos de enemigos, establece el 
// tamaño y la posición aleatoria en donde se crea
Crafty.c("Enemy",{
	_size : 10,
	init: function(){
		this.attr({x: Math.floor(Math.random()* HEIGHT),
			   y: Math.floor(Math.random()* WIDTH),
			   w: this._size,
			   h: this._size})
		this.requires("Collision, Solid");
	}
});

Crafty.c("RedEnemy",{
	init: function(){
		this.requires("Color").color("red");
	}
});

Crafty.c("BlueEnemy",{
	init: function(){
		this.requires("Color").color("blue");
		// Se destruye al chocar con un "Player"
		this.onHit("Player", function () {
    			this.destroy();
		})
	}
});

Crafty.c("BlackEnemy",{
	init: function(){
		this.requires("Color").color("black");
	}
});
