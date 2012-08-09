Crafty.c("Player",{
	_size : 20,
	_posX : (WIDTH - 20) / 2 ,
	_posY : (HEIGHT - 20) / 2,

	init: function(){
		this.attr({x: this._posX, 
			   	   y: this._posY,
			   	   w: this._size,
			       h: this._size})		
		this.requires("Collision, Solid");
		this.requires("Color").color("Black");
		this.requires("Multiway").multiway({x:1,y:1}, 
										   {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180, 
		                    				W: -90, S: 90, D: 0, A: 180});
		
		
		// Explota con Zombies
		this.onHit("Zombies", function(){
    			this.destroy();
		})

		// No traspasa las paredes
		this.bind('Moved', function(from) {
		    if(this.hit('Wall')) {
       			this.attr({x: from.x, y:from.y});
		   }
		})
	}
});
