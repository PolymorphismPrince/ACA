var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

draw = function (img,x,y,rotation) {
    //Check if image needs rotating
    if (rotation) {
        //Move x and y to the center of the image
        x += (img.width)/2;
        y += (img.height)/2;
        //Translate angle to radians
        rotation = (rotation / 360) * 2 * Math.PI; 
        //Move the context so the center of the image is at the origin
        ctx.translate(x, y);
        //Rotate the context
        ctx.rotate(rotation);
        //Draw the image
        ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        //Unrotate and move back
        ctx.rotate(-rotation);
        ctx.translate(-x, -y);
        return;
    }
    ctx.drawImage(img,x,y,img.width,img.height);
}

function loadSprites () {
    //Load cowSprites
    for (let i = 1; i < 4; i++) {
        cowSprites[i-1] = new Image();
        cowSprites[i-1].src = "./images/cow/" + i + ".png";
        cowSprites[i-1].width = 245 / sizeScalar;
        cowSprites[i-1].height = 390 / sizeScalar;
    }
    //Load pandaSprites
    for (let i = 1; i < 4; i++) {
        pandaSprites[i-1] = new Image();
        pandaSprites[i-1].src = "./images/panda/" + i + ".png";
        pandaSprites[i-1].width = 245 / sizeScalar;
        pandaSprites[i-1].height = 390 / sizeScalar;
    }
}
var sizeScalar = 4;
var cowSprites = [];
var pandaSprites = [];
var cowPoses = [{sprite:0,speed:1,time:0.5},{sprite:2,speed:1,time:0.5}];
var pandaPoses = [{sprite:0,speed:1,time:0.3},{sprite:1,speed:1,time:0.3},{sprite:2,speed:1,time:0.3},{sprite:1,speed:1,time:0.3}];


class Animal {
    //Type is true or false (panda or cow)
    constructor (x,y,type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.movementCounter = 0;
        this.sprites = (type) ? pandaSprites : cowSprites;
        this.poses = (type) ? pandaPoses : cowPoses;
        this.velocityScalar;
        this.currentSpeed = 1;
        this.rot = 0;
    }
    get xV () {
        return Math.cos(this.radRot);
    }
    get yV () {
        return Math.sin(this.radRot);
    }

    get radRot () {
        return this.rot/180 * Math.PI;
    }

    get test () {
        return [Math.atan2(this.yV,this.xV),this.radRot];
    }
    //Update pose and stuff
    animate () {
        //Increment movement counter
        this.movementCounter++;
        //Calculate time in seconds
        var time = this.movementCounter / fps;
        let timeAccumulator = 0;
        //Itterate through the poses array
        for (let pose of this.poses) {
            //Add to the time accumulator
            timeAccumulator += pose.time;
            //Check if this is the right sprite
            if (time < timeAccumulator) {
                //Update the speed of the animal at this time
                this.currentSpeed = pose.speed;
                //Render the current animation of the movement on the canvas
                draw(this.sprites[pose.sprite],this.x,this.y,this.rot + 70);
                return;
            }
        }
        //Return 0 so that the animation restarts
        this.movementCounter = 0;
        this.animate();
    }
    //Moving
    move () {
        var xDist = - this.x + pandaGoalX;
        var yDist =  - this.y + pandaGoalY;
        if (Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2)) > 20) {
            this.rot = Math.atan2(yDist,xDist) / (2 * Math.PI) * 360;
        }
        //Add to x and y
        this.x += this.xV * this.currentSpeed;
        this.y += this.yV * this.currentSpeed;
    }
    //Update everything
    update () {
        this.move();
        this.animate();
    }

}
var pandaGoalX = 500;
var pandaGoalY = 500;
document.body.onclick = function(event) {
    pandaGoalX = event.clientX;
    pandaGoalY = event.clientY;
}

//Load the Sprites
loadSprites();

var pandas = [];

//Starting Code
pandaSprites[2].onload = 
function () {
    for (let i = 0; i < 10; i++) {
        pandas.push(new Animal(Math.random() * 1000,0,true));
    }
    setInterval(update,1000/fps);
} 

const fps = 25;

function update () {
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for (let panda of pandas) {
        panda.update();
    }
}


