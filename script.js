//todo: why doesn't rotation work any more?
//global variables: grouped by function
//todo: refactor!
let keys = [];
const tic = 60;
let position = [0, 0]; //x and y axis??
let hits = 0;
const speedMultiplier = 4;
const vh = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const beeHeight = 100;
let direction = 'right';

const start = document.getElementById('button')

const layers = document.getElementsByClassName('layer');
const bee = layers[layers.length-1];

//main player object
// class bee {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
// }
// const bee = new bee(0,0);


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
    if (hits > 3) {

    } else {
        start.removeEventListener('click', game);
        setTimeout(game, tic);
        updatePosition();
    }

}

function fly (direction) {
    switch (direction) {
        case 'right':
            position[0] -= 1;
            layers[layers.length -1].style.transform = "scaleX(1)";
            break;
        case 'left':
            position[0] += 1;
            layers[layers.length -1].style.transform = "scaleX(-1)";
            break;
    }
}

function flyUp () {
    let beePositionYFull = window.getComputedStyle(bee).bottom;
    let beePositionY = parseFloat(beePositionYFull.slice(0, beePositionYFull.length-2));
    if (beePositionY < vh - beeHeight) {
        bee.style.transform = direction === 'right'? "rotate(-45deg)" : "scaleX(-1) rotate(-45deg)";
        console.log(bee.style.transform);
        bee.style.bottom = beePositionY + 10 +"px";
    } else {
        //todo: bounce
        bee.style.transform = "rotate(0deg)";
    }
}

function flyDown () {
    let beePositionYFull = window.getComputedStyle(bee).bottom;
    let beePositionY = parseFloat(beePositionYFull.slice(0, beePositionYFull.length-2)); //remove "px"
    if (beePositionY > 0) {
        // console.log(beePositionY);
        // console.log(beeHeight);
        bee.style.transform = direction === 'right'? "rotate(45deg)" : "scaleX(-1) rotate(45deg)";
        bee.style.bottom = beePositionY - 10 +"px";
    } else {
        //todo: bounce
        console.log(beePositionY);
        console.log(beeHeight);
        bee.classList.add('bounce');
        hits += 1;
        bee.style.transform = "rotate(0deg)";
    }
}

function updatePosition() {
    if (keys.includes("ArrowRight") || direction === "right") {
        direction = 'right';
    }
    if (keys.includes("ArrowLeft") || direction === "left") {
        direction = 'left';
    }
    if (keys.includes("ArrowUp")) {
        flyUp();
    }
    if (keys.includes("ArrowDown")) {
        flyDown(direction);
    }

    if (keys.includes(" ")) {
        //todo: decide action later
    }
    fly(direction);
    //last layer is the player, who doesn't need a change in backgroundPositionX (or he'd disappear off screen)
    for (let i = 0; i < layers.length -1 ; i++) {
        layers[i].style.backgroundPositionX = `${position[0] * ((i+1)* speedMultiplier)}px`;
        // console.log(layers[layers.length -1].style.backgroundPositionX);
    }
}

start.addEventListener('click', game);