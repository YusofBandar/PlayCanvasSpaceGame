var BoxScript = pc.createScript('boxScript');

BoxScript.attributes.add('Acceleration',{
    type: 'number',
    title: 'Acceleration',
    min: 0.1,
    default:0.2
});

BoxScript.attributes.add('MaxSpeed',{
    type: 'number',
    title: 'Max Speed',
    min: 0,
    default: 10
});








var acceleration = 0.2;
var maxSpeed = 10;
var rotationSpeed = 3;




var rotationVectors = {
    xMinus: new pc.Quat().setFromEulerAngles(0,-rotationSpeed,0),
    xPlus: new pc.Quat().setFromEulerAngles(0,rotationSpeed,0)
};

var speedVector = new pc.Vec3(0,0,0);

var accelerationVector = new pc.Vec3(acceleration,0,0);


// initialize code called once per entity
BoxScript.prototype.initialize = function() {
    
      this.on('attr', function(name, value, prev) {
          if(name == 'Acceleration')
              accelerationVector.x = value;
          if(name == 'MaxSpeed')
              maxSpeed = value;
        
    });
    
    
};


// update code called every frame
BoxScript.prototype.update = function(dt) {
    
    //console.log(speedVector.x + "    " + speedVector.z)
    console.log(accelerationVector.x + "  " + maxSpeed);
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