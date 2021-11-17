//global variables: grouped by function
let keys = [];
let tic = 60;
let position = [0, 0]; //x and y axis
let speedMultiplier = 4;
let jumping, falling = false;
let layers = [
    document.getElementById("layer-1"),
    document.getElementById("layer-2"),
    document.getElementById("layer-3"),
    document.getElementById("layer-4"),
    document.getElementById("layer-5"),
    document.getElementById("layer-6"),
    document.getElementById("layer-player")
    ]

layers[0].style.backgroundPositionX = "5px";
console.log(layers[0].style.backgroundPositionX);

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

// function jump () {
//     jumping = true
//     if (position[1] > 300) {
//         falling = true;
//         position[1] -=1;
//         if (position[1] <= 300) {
//             jumping = falling = false;
//         }
//     }
// }

function updatePosition() {
    if (keys.includes("ArrowRight")) {
        position[0] -= 1;
        layers[layers.length -1].style.backgroundImage = "url(\"img/run.gif\")";
        layers[layers.length -1].style.transform = "scaleX(1)";
    }
    if (keys.includes("ArrowLeft")) {
        position[0] += 1;
        layers[layers.length -1].style.backgroundImage = "url(\"img/run.gif\")";
        layers[layers.length -1].style.transform = "scaleX(-1)";
    }
    if (keys.length === 0) {
        layers[layers.length -1].style.backgroundImage = "url(\"img/idle.gif\")";
    }
    if (keys.includes(" ")) {
        layers[layers.length -1].style.backgroundImage = "url(\"img/jump.gif\")";
        //layers[7].style.bottom = position[1] + "px";
        //jump();
    }

    for (let i = 0; i < layers.length; i++) {
        layers[i].style.backgroundPositionX = `${position[0] * ((i+1)* speedMultiplier)}px`;
        console.log(layers[i].style.backgroundPositionX);
    }
}

game();