cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")

width = height = 10
speed = 100

function initiliseEmptyMaze(){
	maze = []
	visited = []
	for (r = 0; r < height * 2; r ++){
		r1 = [true]
		r2 = [true]
		v = []
		for (c = 0; c < width * 2; c++){
			r1.push(true,true)
			r2.push(false,true)
			v.push(false)
		}
		maze.push(r1,r2)
		visited.push(v)
	}
	
	maze[0][1] = maze[width * 2][height * 2 - 1]= false
	x = y = 0
	stack = [[x,y]]
}

initiliseEmptyMaze()


function drawMaze(){
	xPos = 2 * x + 1
	yPos = 2 * y + 1
	blockWidth = cnvs.width / (width * 2 + 1)
	blockHeight = cnvs.height / (height * 2 + 1)
	ctx.fillStyle = "white"
	for (r = 0; r < maze.length; r++){
		for (c = 0; c < maze[r].length; c++){
			ctx.fillStyle = "white"
			if (!maze[r][c])	ctx.fillRect(c * blockWidth, r * blockHeight, blockWidth, blockHeight);
		}
	}
	
	
	ctx.fillStyle = "blue"
	for (i = 1; i < stack.length; i++){
		ctx.fillRect((stack[i][0]*2 + 1) * blockWidth, (stack[i][1]*2 + 1) * blockHeight, blockWidth, blockHeight);
		ctx.fillRect((stack[i][0] + stack[i-1][0] + 1) * blockWidth, (stack[i][1] + stack[i-1][1] + 1) * blockHeight, blockWidth, blockHeight);
	}
	
	ctx.fillRect((stack[stack.length - 1][0] + x + 1) * blockWidth, (stack[stack.length - 1][1] + y + 1) * blockHeight, blockWidth, blockHeight);
	
	
	ctx.fillStyle = "red"
	ctx.fillRect(xPos * blockWidth, yPos * blockHeight, blockWidth, blockHeight);
}


cellsInMaze = [[0,0]]
frontierCells = [[1,0], [0,1]]

function updateFF(){
	if (!frontierCells.length) return
	frontier = frontierCells[Math.floor(Math.random() * frontierCells.length)]
	fx = frontier[0]
	fy = frontier[1]
	frontierAdjacents = [[fx+1,fy],[fx-1,fy],[fx,fy+1], [fx,fy-1]].filter(c => (a))
	
	
}














setInterval(update, speed)









function update(){
	if (!stack.length) return
	if (x == 9 && y == 9) {solution = stack.slice(0); console.log(solution)}
	ctx.clearRect(0,0,cnvs.width,cnvs.height)
	drawMaze()
	visited[y][x] = true
	neighbours = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]]
	notVisited = neighbours.filter(c => (c[0] >= 0 && c[1] >= 0 && c[0] < width && c[1] < height && !visited[c[1]][c[0]] ))
	if (notVisited.length) {
		next = notVisited[Math.floor(Math.random() * notVisited.length)];
		maze[(next[1] + y) + 1][(next[0] + x) +1] = false
		stack.push([x,y])
		x = next[0]
		y = next[1]
	} else {
		x = stack[stack.length -1][0]
		y = stack[stack.length -1][1]
		stack.pop()
	}
}