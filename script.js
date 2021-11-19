//todo: refactor!
//todo:adjust bounce
// todo: pick flowers

let keys = [];
const tic = 60;
let position = [0, 0]; //x and y axis??
const speedMultiplier = 4;
const vh = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0);

const layers = document.getElementsByClassName('bg-layer');

const bee = {
    direction: "right",
    height: 100,
    layer: document.getElementById('layer-bee')
}

//add key
document.addEventListener("keydown", function (event) {
    if (!keys.includes(event.key)) {
        keys.push(event.key);
    }
})

//remove key
document.addEventListener("keyup", function (event) {
    let index = keys.indexOf(event.key);
    if (index !== -1) {
        keys.splice(index, 1);
    }
})

//recursive function, stops
function game () {
    document.removeEventListener('keydown', game);
    updatePosition();
    if (!keys.includes(' ')) {
        setTimeout(game, tic);
    }
    else if (keys.length > 0) {
        document.addEventListener('keydown', game);
    }
}

function fly (direction) {
    switch (direction) {
        case 'right':
            position[0] -= 1;
            bee.layer.style.transform = "scaleX(1)";
            break;
        case 'left':
            position[0] += 1;
            bee.layer.style.transform = "scaleX(-1)";
            break;
    }
}

function bounce () {
    bee.layer.classList.add('bounce');
    setTimeout(function (){
        bee.layer.classList.remove('bounce')
    }, 1500)
}

function flyUp () {
    let beePositionYFull = window.getComputedStyle(bee.layer).bottom;
    let beePositionY = parseFloat(beePositionYFull.slice(0, beePositionYFull.length-2));
    if (beePositionY < vh - bee.height) {
        bee.layer.style.transform = bee.direction === 'right'? "rotate(-30deg)" : "scaleX(-1) rotate(-30deg)";
        bee.layer.style.bottom = beePositionY + 10 +"px";
    } else {
        bounce();
    }
}

function flyDown () {
    let beePositionYFull = window.getComputedStyle(bee.layer).bottom;
    let beePositionY = parseFloat(beePositionYFull.slice(0, beePositionYFull.length-2));
    if (beePositionY > 0) {
        bee.layer.style.transform = bee.direction === 'right'? "rotate(30deg)" : "scaleX(-1) rotate(30deg)";
        bee.layer.style.bottom = beePositionY - 10 +"px";
    } else {
        bounce();

    }
}

function updatePosition() {
    if (keys.includes("ArrowRight") || bee.direction === "right") {
        bee.direction = 'right';
    }
    if (keys.includes("ArrowLeft") || bee.direction === "left") {
        bee.direction = 'left';
    }
    fly(bee.direction);
    if (keys.includes("ArrowUp")) {
        flyUp();
    }
    if (keys.includes("ArrowDown")) {
        flyDown(bee.direction);
    }

    //all but the first background layers move with increasing speed
    for (let i = 0; i < layers.length ; i++) {
        layers[i].style.backgroundPositionX = `${position[0] * (i * speedMultiplier)}px`;
    }
}


document.addEventListener('keydown', game);

