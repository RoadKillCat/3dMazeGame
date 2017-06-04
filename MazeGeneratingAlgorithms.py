from random import choice, shuffle, randrange
from time import sleep

print("\n" * 3)

print("Recursive backtracker algorithm")

def drawMaze(maze):
	for row in maze:
		for c in row:
			if c: print(" ", end = "")
			else: print("█", end = "")
		print()

width = height = 15
maze = [None] * 2 * height
maze[::2] =  [[True] * 2 * width + [True] for i in range(height)]
maze[1::2] = [[True, False] * width + [True] for i in range(height)]
maze += [[True] * 2 * width + [True]]
visited = [[False] * width for i in range(height)]

x, y = 0, 0
stack = [[x,y]]

while len(stack) > 0:
	visited[y][x] = True
	neighbours = [(x+1,y), (x-1,y), (x,y+1), (x,y-1)]
	notVisited = list(filter(lambda c: c[0] >= 0 and c[1] >= 0 and c[0] < width and c[1] < height and not visited[c[1]][c[0]] , neighbours))
	
	if len(notVisited):
		next = choice(notVisited)
		maze[(next[1] + y) + 1][(next[0] + x) +1] = False
		stack.append((x,y))
		x, y = next
	else:
		x, y = stack[-1][0], stack[-1][1]
		stack.pop()
		
drawMaze(maze)


# The depth-first search algorithm of maze generation is frequently implemented using backtracking:

# Make the initial cell the current cell and mark it as visited
# While there are unvisited cells
# If the current cell has any neighbours which have not been visited
# Choose randomly one of the unvisited neighbours
# Push the current cell to the stack
# Remove the wall between the current cell and the chosen cell
# Make the chosen cell the current cell and mark it as visited
# Else if stack is not empty
# Pop a cell from the stack
# Make it the current cell

print("\n" * 3)

print("Prim's alogirthm")

def drawMaze(maze):
	for row in maze:
		for c in row:
			if c: print(" ", end = "")
			else: print("█", end = "")
		print()

width = height = 15
maze = [None] * 2 * height
maze[::2] =  [[True] * 2 * width + [True] for i in range(height)]
maze[1::2] = [[True, False] * width + [True] for i in range(height)]
maze += [[True] * 2 * width + [True]]


cellsInMaze = [(0,0)]
frontierCells = [(1,0), (0,1)]

while len(frontierCells):


	
	# fx = frontier cell's x, fy = frontier's y
	fx,fy = choice(frontierCells)
	
	frontierAdjacents = [f for f in [(fx+1,fy), (fx-1,fy), (fx,fy+1), (fx,fy-1)] if f in cellsInMaze]
	
	afx, afy = choice(frontierAdjacents)	#random adjacent cell in maze adjacent to chosen frontier
	
	maze[(fy + afy) + 1][(fx + afx) +1] = False	 #break wall in real maze between frontier and random cell adjacent to it
	
	cellsInMaze.append((fx,fy))
	

	frontierCells = []
	
	for cx, cy in cellsInMaze:
		neighbours = [c for c in [(cx+1,cy), (cx-1,cy), (cx,cy+1), (cx,cy-1)] if c[0] >= 0 and c[1] >= 0 and c[0] < width and c[1] < height]
		for n in neighbours:
			if n not in frontierCells and n not in cellsInMaze:
				frontierCells.append(n)

drawMaze(maze)