from random import choice

#intilising a bollean 2d array to store the maze
width = height = 10
maze = [None] * 2 * height
maze[::2] =  [[True] * 2 * width + [True] for i in range(height)]
maze[1::2] = [[True, False] * width + [True] for i in range(height)]
maze += [[True] * 2 * width + [True]]

x, y = 0, 0
stack = [[x,y]]
visited = [[False] * width for i in range(height)]

#generate maze
while len(stack) > 0:
	visited[y][x] = True
	neighbours = [(x+1,y), (x-1,y), (x,y+1), (x,y-1)]
	notVisited = [c for c in neighbours if c[0] >= 0 and c[1] >= 0 and c[0] < width and c[1] < height and not visited[c[1]][c[0]]]
	
	if len(notVisited):
		xx, yy = choice(notVisited)
		maze[(yy + y) + 1][(xx + x) +1] = False		#break wall between current cell and next cell
		stack.append((xx,yy))
		x, y = xx, yy
	else:	#if there is no free cell to go to, backtrack
		x, y = stack[-1][0], stack[-1][1]
		stack.pop()
		
def drawMaze(maze):		#function which displays the generated maze in a console
	for row in maze:
		for c in row:
			if c: print(" ", end = "")
			else: print("█", end = "")
		print()

drawMaze(maze)