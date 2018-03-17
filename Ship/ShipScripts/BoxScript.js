var BoxScript = pc.createScript('boxScript');

BoxScript.attributes.add('Xspeed', {
    type: 'number',
    default: 0
});

BoxScript.attributes.add('Yspeed',{
    type: 'number',
    default: 0
});

BoxScript.attributes.add('Zspeed',{
    type: 'number',
    default: 0
});

BoxScript.attributes.add('MaxSpeed',{
    type: 'number',
    default:10
});


const acceleration = 0.2;
const maxSpeed = this.MaxSpeed;
const rotationSpeed = 3;




var rotationVectors = {
    xMinus: new pc.Quat().setFromEulerAngles(0,-rotationSpeed,0),
    xPlus: new pc.Quat().setFromEulerAngles(0,rotationSpeed,0)
};

var angle= 0;



var speedVector = new pc.Vec3(this.Xspeed,this.YSpeed,this.Zspeed);
var accelerationVector = new pc.Vec3(acceleration,0,0);


// initialize code called once per entity
BoxScript.prototype.initialize = function() {
    
    this.on('attr:Xspeed', function (value, prev) {
        speedVector.x  = value;
    });
    
    this.on('attr:Yspeed', function (value, prev) {
        speedVector.y  = value;
    });
    
    this.on('attr:Zspeed', function (value, prev) {
        speedVector.z  = value;
    });
    
};


// update code called every frame
BoxScript.prototype.update = function(dt) {
    
    //console.log(speedVector.x + "    " + speedVector.z);

    if(this.app.keyboard.isPressed(pc.KEY_DOWN) && speedVector.x <= maxSpeed){
        speedVector.add(accelerationVector);
    }
    
    if(this.app.keyboard.isPressed(pc.KEY_UP) && speedVector.x >= -maxSpeed){
        speedVector.sub(accelerationVector);
    }
    
    if(this.app.keyboard.isPressed(pc.KEY_LEFT)){
        this.entity.rotateLocal(0,rotationSpeed,0);
       
        accelerationVector = rotationVectors.xPlus.transformVector(accelerationVector);
    }
    
    if(this.app.keyboard.isPressed(pc.KEY_RIGHT)){
        this.entity.rotateLocal(0,-rotationSpeed,0);
        accelerationVector = rotationVectors.xMinus.transformVector(accelerationVector);
    }
    
    speedCheck(maxSpeed,speedVector);
    

    this.entity.translate(speedVector.x * dt,speedVector.y * dt, speedVector.z * dt);
};

BoxScript.prototype.onKeyDown = function (event) {
    // Check event.key to detect which key has been pressed

    
    event.event.preventDefault();
};


speedCheck = function(maxSpeed, vector){
    if(vector.x > maxSpeed){
        vector.x = maxSpeed;
    }else if(vector.x < -maxSpeed){
        vector.x = -maxSpeed;
    }
    
    if(vector.y > maxSpeed){
        vector.y = maxSpeed;
    }else if(vector.y < -maxSpeed){
        vector.y =-maxSpeed;
    }
    
    if(vector.z > maxSpeed){
        vector.z = maxSpeed;
    }else if(vector.z < -maxSpeed){
        vector.z = -maxSpeed;
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// BoxScript.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/