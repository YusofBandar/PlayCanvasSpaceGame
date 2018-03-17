var BackThruster = pc.createScript('backThruster');

var Thrusterspeed= 0;

var slowDown = false;

// initialize code called once per entity
BackThruster.prototype.initialize = function() {
    
    

};

// update code called every frame
BackThruster.prototype.update = function(dt) {

    
    this.entity.rotateLocal((Thrusterspeed * 40) * dt,0,0);
  
    if(this.app.keyboard.isPressed(pc.KEY_DOWN) && Thrusterspeed < maxSpeed){
        Thrusterspeed += acceleration;
    }else if(Thrusterspeed > 0){
        if(Math.abs(Thrusterspeed) < 0.5){
            Thrusterspeed =0;
        }else{
            Thrusterspeed -= acceleration;
        }
    }
    
    if(this.app.keyboard.isPressed(pc.KEY_UP) && Thrusterspeed > -maxSpeed){
        Thrusterspeed -= acceleration;    
    }else if(Thrusterspeed < 0){
        if(Math.abs(Thrusterspeed) < 0.5){
            Thrusterspeed =0;
        }else{
            Thrusterspeed += acceleration;
        }
    }

};


// swap method called for script hot-reloading
// inherit your script state here
// BoxBackScript.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/