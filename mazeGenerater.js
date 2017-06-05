cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")

width = height = 10
speed = 150
algorithm = "recursive"

function initilise(){
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
	
	
	cellsInMaze = [[0,0]]
	frontierCells = [[1,0], [0,1]]
}

initilise()


function drawMaze(mx, my, points, join){
	ctx.clearRect(0,0,cnvs.width,cnvs.height)	
	ctx.fillStyle = "white"

	blockWidth = cnvs.width / (width * 2 + 1)
	blockHeight = cnvs.height / (height * 2 + 1)

	for (r = 0; r < maze.length; r++){
		for (c = 0; c < maze[r].length; c++){
			ctx.fillStyle = "white"
			if (!maze[r][c])	ctx.fillRect(c * blockWidth, r * blockHeight, blockWidth, blockHeight);
		}
	}
	
	ctx.fillStyle = "blue"
	for (i = join == true ? 1: 0; i < points.length; i++){
		ctx.fillRect((points[i][0]*2 + 1) * blockWidth, (points[i][1]*2 + 1) * blockHeight, blockWidth, blockHeight);
		if (join) ctx.fillRect((points[i][0] + points[i-1][0] + 1) * blockWidth, (points[i][1] + points[i-1][1] + 1) * blockHeight, blockWidth, blockHeight);
	}
	if (join) ctx.fillRect((points[points.length - 1][0] + x + 1) * blockWidth, (points[points.length - 1][1] + y + 1) * blockHeight, blockWidth, blockHeight);

	ctx.fillStyle = "red"
	ctx.fillRect((2 * mx + 1) * blockWidth, (2 * my + 1) * 	blockHeight, blockWidth, blockHeight);
}



function update(){
	if (algorithm == "prims") {
		if (!frontierCells.length) return
		fc = frontierCells[Math.floor(Math.random() * frontierCells.length)]
		//fc if a random frontier cell [x,y]
		frontierAdjacents = [[fc[0]+1,fc[1]],[fc[0]-1,fc[1]],[fc[0],fc[1]+1], [fc[0],fc[1]-1]].filter(c => (cellsInMaze.some(o => (o[0] == c[0] && o[1] == c[1]))))	
		af = frontierAdjacents[Math.floor(Math.random() * frontierAdjacents.length)]
		maze[(fc[1] + af[1]) + 1][(fc[0] + af[0]) +1] = false
		cellsInMaze.push([fc[0],fc[1]])
		
		frontierCells = []
		for (i = 0; i < cellsInMaze.length; i++){
			c = cellsInMaze[i]
			neighbours = [[c[0]+1,c[1]], [c[0]-1,c[1]], [c[0],c[1]+1], [c[0],c[1]-1]].filter(c => (c[0] >= 0 && c[1] >= 0 && c[0] < width && c[1] < height))
			validNeighbours = neighbours.filter(c => (!cellsInMaze.some(o => (o[0] == c[0] && o[1] == c[1])) && !frontierCells.some(o => (o[0] == c[0] && o[1] == c[1]))  ) ) 
			frontierCells = frontierCells.concat(validNeighbours)
			
		}
		
		drawMaze(fc[0], fc[1], frontierCells, false)
	} else {		//recursive algorithm
		if (!stack.length) return
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
		drawMaze(x, y, stack, true)
	}
		
}

setInterval(update, speed)