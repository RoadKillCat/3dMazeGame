cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")

width = height = 50
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


function drawMaze(m, x, y){
	xPos = 2 * x + 1
	yPos = 2 * y + 1
	blockWidth = cnvs.width / (width * 2 + 1)
	blockHeight = cnvs.height / (height * 2 + 1)
	ctx.fillStyle = "white"
	for (r = 0; r < m.length; r++){
		for (c = 0; c < m[r].length; c++){
			if (!m[r][c])	ctx.fillRect(c * blockWidth, r * blockHeight, blockWidth, blockHeight);
		}
	}
	ctx.fillStyle = "#00ffd0"
	ctx.fillRect(xPos * blockWidth, yPos * blockHeight, blockWidth, blockHeight);
	
}
	
function update(){
ctx.clearRect(0,0,cnvs.width,cnvs.height)
while (stack.length){
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


drawMaze(maze, x, y)
}

update()
//setInterval(update, 0.001)