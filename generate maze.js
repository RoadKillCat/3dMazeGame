cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")


mazeWidth = mazeHeight = 3;

var maze = []
var visited = []
for (r = 0; r < mazeHeight * 2; r ++){
	r1 = [true]
	r2 = [true]
	v = []
	for (c = 0; c < mazeWidth * 2; c++){
		r1.push(true,true)
		r2.push(false,true)
		v.push(false)
	}
	maze.push(r1,r2)
	visited.push(v)
}

maze[0][1] = maze[mazeWidth * 2][mazeHeight * 2 - 1]= false

var x, y
x = y = 0

var stack = [[x,y]]

while (stack.length){
	visited[y][x] = true
	neighbours = [[x+1,y], [x-1,y], [x,y+1], [x,y-1]]
	notVisited = neighbours.filter(c => (c[0] >= 0 && c[1] >= 0 && c[0] < mazeWidth && c[1] < mazeHeight && !visited[c[1]][c[0]] ))
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
