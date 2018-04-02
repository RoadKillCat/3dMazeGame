cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")

var width, height

cnvs.width = width = innerWidth
cnvs.height = height = innerHeight

document.addEventListener("keydown", keyPress)

window.addEventListener("resize", function(e){
    cnvs.width = width = innerWidth
    cnvs.height = height = innerHeight
    renderWorld()
} )

function keyPress(event){
    if (!started) restart();
    var key = event.keyCode

    if (key == 67) restart()                            //c restart
    if (key == 88) cam.z -= cam.step                    //x fly down
    if (key == 90) cam.z += cam.step                    //z fly up
    if (key == 87) takeStep(cam.yaw)                    //w walk forward
    if (key == 83) takeStep(cam.yaw + 180)              //s walk backwards
    if (key == 65) takeStep(cam.yaw - 90)               //a walk left
    if (key == 68) takeStep(cam.yaw + 90)               //d walk right  
    if (key == 69) cam.yaw   += cam.lookStep            //e look left
    if (key == 81) cam.yaw   -= cam.lookStep            //q look right
    if (key == 82) cam.pitch += cam.lookStep            //r look up
    if (key == 70) cam.pitch -= cam.lookStep            //f look down
    if (key == 89) cam.roll  += cam.lookStep            //y roll left
    if (key == 84) cam.roll  -= cam.lookStep            //t roll right
    if (key == 187) {mazeWidth++;mazeHeight++;newMaze()}//+ increase maze size
    if (key == 189) {mazeWidth--;mazeHeight--;newMaze()}//- decrease maze size
    if (key == 77) miniMap = !miniMap                   //m toggle minimap
    if (key == 78) newMaze()                            //n new maze
    if (key == 86) toggleNight()                        //v toggle night mode
    if (key == 71) {wireframe = !wireframe;if(!night)toggleNight()}                             //g toggle wireframe
    if (key == 66) {mazeAlgorithm=mazeAlgorithm=="backtracker"?"prims":"backtracker";newMaze()} //b toggle maze algorithm
    renderWorld()
}

/*** CHEAT ***/
console.log("use keys 'z' and 'x' to fly up and down for all element inspecters ;)")
console.log("using this, a cool thing to do is fly up (z) and then pan down (f) then generate new mazes (n)...")

/*** VARIABLES ***/
//general
var started = false;
var world;

//camera
var cam;

//maze
var mazeAlgorithm = "prims"
var mazeWidth = mazeHeight = 3;

//rendering
var wireframe = false
var blockSz = 40
var blockHght = 20
var blockCol = "#c6b9cc"
var night = false

//heads up display
var tableWidth = 80
var tableGap = 20
var tablePad = 10

/**** BEGIN ***/
startScreen()

function renderWorld(){
    moduloCamViewpoint()
    zengine.render(world, cam, cnvs, wireframe)
    renderCrosshairs()
    renderHUD() 
}

function toggleNight(){
    if (night){
        blockCol = "#c6b9cc"
        cnvs.style.backgroundColor = "#fcfcda"
    } else {
        blockCol = "#fff"
        cnvs.style.backgroundColor = "#000"
    }
    night = !night
    restart()
}

function newMaze(){
    generateMaze()
    world = []
    for (var y = 0; y < mazeHeight * 2 + 1; y ++){
        for (var x = 0; x < mazeWidth * 2 + 1; x++){
            if (maze[y][x]){
                world.push({verts: [{x: x*blockSz, y: y*blockSz, z: 0}, {x: (x+1)*blockSz, y: y*blockSz, z: 0}, {x: (x+1)*blockSz, y: (y+1)*blockSz, z: 0}, {x: x*blockSz, y: (y+1)*blockSz, z: 0}], col: blockCol})
                world.push({verts: [{x: x*blockSz, y: y*blockSz, z: 0}, {x: (x+1)*blockSz, y: y*blockSz, z: 0}, {x: (x+1)*blockSz, y: y*blockSz, z: blockHght}, {x: x*blockSz, y: y*blockSz, z: blockHght}], col: blockCol})
                world.push({verts: [{x: x*blockSz, y: y*blockSz, z: 0}, {x: x*blockSz, y: (y+1)*blockSz, z: 0}, {x: x*blockSz, y: (y+1)*blockSz, z: blockHght}, {x: x*blockSz, y: y*blockSz, z: blockHght}], col: blockCol})
                world.push({verts: [{x: (x+1)*blockSz, y: y*blockSz, z: 0}, {x: (x+1)*blockSz, y: (y+1)*blockSz, z: 0}, {x: (x+1)*blockSz, y: (y+1)*blockSz, z: blockHght}, {x: (x+1)*blockSz, y: y*blockSz, z: blockHght}], col: blockCol})
                world.push({verts: [{x: x*blockSz, y: (y+1)*blockSz, z: 0}, {x: (x+1)*blockSz, y: (y+1)*blockSz, z: 0}, {x: (x+1)*blockSz, y: (y+1)*blockSz, z: blockHght}, {x: x*blockSz, y: (y+1)*blockSz, z: blockHght}], col: blockCol})
                world.push({verts: [{x: x*blockSz, y: y*blockSz, z: blockHght}, {x: (x+1)*blockSz, y: y*blockSz, z: blockHght}, {x: (x+1)*blockSz, y: (y+1)*blockSz, z: blockHght}, {x: x*blockSz, y: (y+1)*blockSz, z: blockHght}], col: blockCol})
            }
        }
    }
}

function restart(){
    started = true;
    cam = {x: 60, y: -100, z: 10, pitch: 0, yaw: 0, roll: 0, fov: 90, step: 4, lookStep: 22.5}
    newMaze()
    renderWorld()
}

function renderHUD(){
    var fontSize = 15
    ctx.font = fontSize.toString() + "px " + "aerial"
    ctx.fillStyle = "red"
    var tables = [
    //cam table
    [["Camera:", ""],
    ["x", padLeft(cam.x)],
    ["y", padLeft(cam.y)],
    ["z", padLeft(cam.z)],
    ["yaw", padLeft(cam.yaw)],
    ["pitch", padLeft(cam.pitch)],
    ["roll", padLeft(cam.roll)],
    ["fov", padLeft(cam.fov)],
    ["",""],["",""],["",""],["",""],["",""],["",""],["",""],
    ["",mazeAlgorithm]],
    
    //controls
    [["Controls:", ""],
    ["w", "forward"],
    ["a", "left"],
    ["s", "backwards"],
    ["d", "right"],
    ["q", "yaw left"],
    ["e", "yaw right"],
    ["r", "pitch up"],
    ["f", "pitch down"],
    ["z", "fly up"],
    ["x", "fly down"],
    ["Toggles:",""],
    ["g", "wireframe"],
    //["m", "mini map"],
    ["n", "new maze"],
    ["v", "night mode"],
    ["b", "algorithm"],
    ["+", "incr. size"],
    ["-", "decr. size"],
    ["c", "restart"],
    ["(F12 for cheat)",""]]
    ]
    for (t = 0; t < tables.length; t++){
        table = tables[t]
        for (r = 0; r < table.length; r++){
            ctx.textAlign = "left"
            ctx.fillText(table[r][0], width - (tables.length - t) * (tableWidth + tableGap) - tablePad, tablePad + r * fontSize + fontSize)
            ctx.textAlign = "right"
            ctx.fillText(table[r][1], width - (tables.length - t) * (tableWidth + tableGap) + tableWidth - tablePad, tablePad + r * fontSize + fontSize)
        }
    }
}


function startScreen(){
    ctx.textBaseline = "middle"
    ctx.fillStyle = blockCol
    ctx.font = "150px cambria"
    ctx.textAlign = "center"
    ctx.fillText("Welcome", width / 2, height / 5)
    lines = [
    "The aim is to escape the maze.",
    "Good luck!",
    "",
    "Full screen (F11) is recommended",
    "",
    "Controls:",
    "w: walk forward",
    "a: walk left",
    "s: reverse",
    "d: walk right",
    "q: yaw left",
    "e: yaw right",
    "r: pitch up",
    "f: pitch down",
    "+: incr. maze size",
    "-: decr. maze size",
    "g: toggle wireframe",
    "m: toggle mini map",
    "n: new imaze",
    "v: night mode",
    "b: toggle algorithm",
    "c: begin"
    ]
    ctx.textAlign = "left"
    ctx.font = "20px cambria"
    for (l = 0; l < lines.length; l ++){
        ctx.fillText(lines[l], width / 2 - 200, height / 5 + l * 20 + 80)
    }
}

function generateMaze(){
    if (mazeAlgorithm == "backtracker"){
        maze = []
        visited = []
        r1 = [true]
        r2 = [true]
        vr = [false]
        for (c = 0; c < mazeWidth; c++){
            r1.push(true,true)
            r2.push(false,true)
            vr.push(false)
        }
        for (r = 0; r < mazeHeight; r ++){
            maze.push(r1.slice(0), r2.slice(0))
            visited.push(vr.slice(0))
        }
        maze.push(r1.slice(0))
        maze[0][1] = maze[mazeHeight * 2][mazeWidth * 2 - 1] = false        
        var x, y
        x = y = 0
        var stack = [[x,y]]
        while (stack.length){
            visited[y][x] = true
            neighbours = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]]
            notVisited = neighbours.filter(c => (c[0] >= 0 && c[1] >= 0 && c[0] < mazeWidth && c[1] < mazeHeight && !visited[c[1]][c[0]] ))
            if (notVisited.length) {
                next = notVisited[Math.floor(Math.random() * notVisited.length)];
                maze[next[1] + y + 1][next[0] + x +1] = false
                stack.push([x,y])
                x = next[0]
                y = next[1]
            } else {
                x = stack[stack.length -1][0]
                y = stack[stack.length -1][1]
                stack.pop()
            }
        }
    } else {    //prims
        maze = []
        r1 = [true]
        r2 = [true]
        for (c = 0; c < mazeWidth; c++){
            r1.push(true,true)
            r2.push(false,true)
        }
        for (r = 0; r < mazeHeight; r ++){
            maze.push(r1.slice(0), r2.slice(0))
        }
        maze.push(r1.slice(0))
        maze[0][1] = maze[mazeHeight * 2][mazeWidth * 2 - 1] = false        
        cellsInMaze = [[0,0]]
        frontierCells = [[1,0], [0,1]]
        while (frontierCells.length){
            fc = frontierCells[Math.floor(Math.random() * frontierCells.length)]
            //fc is a random frontier cell [x,y]
            frontierAdjacents = [[fc[0]+1,fc[1]], [fc[0]-1,fc[1]], [fc[0],fc[1]+1], [fc[0],fc[1]-1]]
                                 .filter(c => (cellsInMaze.some(cc => (cc[0] == c[0] && cc[1] == c[1]))))
            af = frontierAdjacents[Math.floor(Math.random() * frontierAdjacents.length)]
            maze[fc[1] + af[1] + 1][fc[0] + af[0] +1] = false
            cellsInMaze.push(fc)
            frontierCells = []
            for (i = 0; i < cellsInMaze.length; i++){
                c = cellsInMaze[i]
                neighbours = [[c[0]+1,c[1]], [c[0]-1,c[1]], [c[0],c[1]+1], [c[0],c[1]-1]].filter(cc => (cc[0] >= 0 && cc[1] >= 0 && cc[0] < mazeWidth && cc[1] < mazeHeight))
                validNeighbours = neighbours.filter(c => (!cellsInMaze.some(cc => (cc[0] == c[0] && cc[1] == c[1])) && !frontierCells.some(cc => (cc[0] == c[0] && cc[1] == c[1]))  ) ) 
                frontierCells = frontierCells.concat(validNeighbours)
            }
        }
    }
}

//SHORT SPECIFIC FUNCTIONS

function takeStep(yaw){
    next = {x: cam.step * Math.sin(yaw*(Math.PI/180)) + cam.x,
            y: cam.step * Math.cos(yaw*(Math.PI/180)) + cam.y}
    blk = {x: Math.floor(next.x / blockSz),
           y: Math.floor(next.y / blockSz)}
    if (blk.x < 0 || blk.y < 0 || blk.x > mazeWidth * 2 + 1 || blk.y > mazeHeight * 2 + 1 || !maze[blk.y][blk.x]){
        cam.x = next.x
        cam.y = next.y
    }
}

function moduloCamViewpoint(){
    while (cam.yaw <= -180) cam.yaw += 360
    while (cam.yaw > 180) cam.yaw -= 360
    while (cam.pitch <= -180) cam.pitch += 360
    while (cam.pitch > 180) cam.pitch -= 360
    while (cam.roll <= -180) cam.roll += 360
    while (cam.roll > 180) cam.roll -= 360
}

function padLeft(num){                                          //returns string of number padded from left to make a 6 character string
    return ("\xa0\xa0\xa0\xa0\xa0" + parseFloat(num.toFixed(1))).slice(-6)
}

function drawLine(xStart, yStart, xFin, yFin){                  //draws a line on the canvas
   ctx.beginPath();
   ctx.moveTo(xStart, yStart);
   ctx.lineTo(xFin, yFin);
   ctx.stroke();
}

function drawCross(x, y, l){                                    //draws a cross on canvas in relation to the midpoint
    drawLine( width/2 + x + l, height / 2 + y, width / 2 + x - l, height /2 + y)
    drawLine(width /2 + x, height / 2 + y + l,width / 2 + x, height /2 + y - l)
}

function renderCrosshairs(){                                    //draws the two axis and center crosshar
    drawCross(0, 0, 30)
    for (a = 113.09; a <= 20 * 113.09; a += 113.09){
        drawCross(a, 0, 5)
        drawCross(-1 * a, 0, 5)
        drawCross(0, a, 5)
        drawCross(0, -1 * a, 5)
    }
}
