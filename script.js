//global variables: group by function
let keys = [];
let tic = 60;
let position = [0, 0]; //x and y axis
let speedMultiplier = 4;
let layers = [
    document.getElementById("layer-1"),
    document.getElementById("layer-2"),
    document.getElementById("layer-3"),
    document.getElementById("layer-4"),
    document.getElementById("layer-5"),
    document.getElementById("layer-6")]


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
        // console.log(keys);
    }
})

//recursive function
function game () {
    setTimeout(game, tic);
    updatePosition();
}


function updatePosition() {
    if (keys.includes("ArrowRight")) {
        position[0] -= 1;
    }
    if (keys.includes("ArrowLeft")) {
        position[0] += 1;
    }

    for (let i = 0; i < layers.length; i++) {
        layers[i].style.backgroundPositionX = position[0] * (i* speedMultiplier) + "px";
        console.log(layers[i].style.backgroundPositionX);
    }
}

game();