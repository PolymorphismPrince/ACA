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
var sizeScalar = 10;
var cowSprites = [];
var pandaSprites = [];
loadSprites();

pandaSprites[2].onload = 
function () {
    draw(pandaSprites[0],0,0,1);
    img = pandaSprites[0]
} 

