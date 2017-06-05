from random import choice, shuffle
from time import sleep
import codecs

#RECURSIVE BACKTRACKER ALGORITHM

f = codecs.open("recursive maze.txt","w","UTF-8")

def writeMaze(maze):
	for row in maze:
		for c in row:
			if c: f.write("██")
			else: f.write("  ")
		f.write("\n")

def drawMaze(maze):
	for row in maze:
		for c in row:
			if c: print("█", end="")
			else: print(" ", end="")
		print()

width = height = 40
maze = [None] * 2 * height
maze[::2] =  [[True] * 2 * width + [True] for i in range(height)]
maze[1::2] = [[True, False] * width + [True] for i in range(height)]
maze += [[True] * 2 * width + [True]]
maze[1][0] = maze[height * 2 - 1][width * 2] = False
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

print("\n" * 3)
print("Recursive backtracker algorithm")
		
drawMaze(maze)
writeMaze(maze)
f.close()

#PRIM's ALGORITHM

f = codecs.open("prims maze.txt","w","UTF-8")


width = height = 10
maze = [None] * 2 * height
maze[::2] =  [[True] * 2 * width + [True] for i in range(height)]
maze[1::2] = [[True, False] * width + [True] for i in range(height)]
maze += [[True] * 2 * width + [True]]
maze[1][0] = maze[height * 2 - 1][width * 2] = False

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

				
print("\n" * 3)
print("Prim's alogirthm")
				
drawMaze(maze)
writeMaze(maze)
f.close()