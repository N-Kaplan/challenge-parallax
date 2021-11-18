//global variables: grouped by function
//todo: refactor!
let keys = [];
const tic = 60;
let position = [0, 0]; //x and y axis??
let speedMultiplier = 4;
const vh = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0);
let fishHeight = 200;
let direction = 'right';

let layers = [
    document.getElementById("layer-1"),
    document.getElementById("layer-2"),
    document.getElementById("layer-3"),
    document.getElementById("layer-4"),
    document.getElementById("layer-5"),
    document.getElementById("layer-6"),
    document.getElementById("layer-player")
    ];

//main player object
// class Fish {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// }
// const fish = new Fish(0,0);

//add key
document.addEventListener("keydown", function (event) {
    if (!keys.includes(event.key)) {
        keys.push(event.key);
        console.log(keys);
    }
})

//remove key
document.addEventListener("keyup", function (event) {
    let index = keys.indexOf(event.key);
    if (index !== -1) {
        keys.splice(index, 1);
    }
})

//recursive function
function game () {
    setTimeout(game, tic);
    updatePosition();
}

function swimUp () {
    let fishPositionYFull = window.getComputedStyle(layers[layers.length-1]).bottom;
    let fishPositionY = parseFloat(fishPositionYFull.slice(0, fishPositionYFull.length-2));
    if (fishPositionY < vh - fishHeight) {
        layers[layers.length - 1].style.transform = direction === 'right'? "rotate(-45deg)" : "scaleX(-1) rotate(-45deg)";
        layers[layers.length - 1].style.bottom = fishPositionY + 10 +"px";
    } else {
        layers[layers.length - 1].style.transform = "rotate(0deg)";
    }
}

function swimDown () {
    let fishPositionYFull = window.getComputedStyle(layers[layers.length-1]).bottom;
    let fishPositionY = parseFloat(fishPositionYFull.slice(0, fishPositionYFull.length-2));
    if (fishPositionY > 0) {
        // console.log(fishPositionY);
        // console.log(fishHeight);
        layers[layers.length - 1].style.transform = direction === 'right'? "rotate(45deg)" : "scaleX(-1) rotate(45deg)";
        layers[layers.length - 1].style.bottom = fishPositionY - 10 +"px";
    } else {
        layers[layers.length - 1].style.transform = "rotate(0deg)";
    }
}



function updatePosition() {
    if (keys.includes("ArrowRight")) {
        position[0] -= 1;
        // layers[layers.length -1].style.backgroundImage = "url(\"img/SWIM_TO_RIGHT.gif\")";
        layers[layers.length -1].style.transform = "scaleX(1)";
        direction = 'right';
    }
    if (keys.includes("ArrowLeft")) {
        position[0] += 1;
        //layers[layers.length -1].style.backgroundImage = "url(\"img/SWIM_TO_RIGHT.gif\")";
        layers[layers.length -1].style.transform = "scaleX(-1)";
        direction = 'left';
    }
    if (keys.includes("ArrowUp")) {
        //position[1] += 1;
        // layers[layers.length - 1].style.backgroundImage = "url(\"img/SWIM_TO_RIGHT.gif\")";
        swimUp();
    }
    if (keys.includes("ArrowDown")) {
        //position[1] += 1;
        // layers[layers.length - 1].style.backgroundImage = "url(\"img/SWIM_TO_RIGHT.gif\")";
        swimDown(direction);
    }

    // if (keys.length === 0) {
    //     layers[layers.length -1].style.backgroundImage = "url(\"img/REST_TO_RIGHT.gif\")";
    // }
    if (keys.includes(" ")) {
        //todo: decide action later
    }

    //last layer is the player, who doesn't need a change in backgroundPositionX (or he'd disappear off screen)
    for (let i = 0; i < layers.length -1 ; i++) {
        layers[i].style.backgroundPositionX = `${position[0] * ((i+1)* speedMultiplier)}px`;
        // console.log(layers[layers.length -1].style.backgroundPositionX);
    }
}

game();