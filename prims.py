from random import choice

#intilising a bollean 2d array to store the maze
width = height = 10																				
maze = [None] * 2 * height
maze[::2] =  [[True] * 2 * width + [True] for i in range(height)]
maze[1::2] = [[True, False] * width + [True] for i in range(height)]
maze += [[True] * 2 * width + [True]]

cellsInMaze = [(0,0)]
frontierCells = [(1,0), (0,1)]

#generate maze
while len(frontierCells):
	fx,fy = choice(frontierCells)
	frontierAdjacents = [c for c in [(fx+1,fy), (fx-1,fy), (fx,fy+1), (fx,fy-1)] if c in cellsInMaze]
	afx, afy = choice(frontierAdjacents)	     #random adjacent cell in maze adjacent to chosen frontier
	maze[(fy + afy) + 1][(fx + afx) +1] = False	 #break wall in real maze between frontier and random cell adjacent to it
	cellsInMaze.append((fx,fy))
	
	#update frontier cells
	frontierCells = []
	for cx, cy in cellsInMaze:
		neighbours = [c for c in [(cx+1,cy), (cx-1,cy), (cx,cy+1), (cx,cy-1)] if c[0] >= 0 and c[1] >= 0 and c[0] < width and c[1] < height]
		for n in neighbours:
			if n not in frontierCells and n not in cellsInMaze:
				frontierCells.append(n)

def drawMaze(maze):		#function which displays the generated maze in a console
	for row in maze:
		for c in row:
			if c: print(" ", end = "")
			else: print("█", end = "")
		print()

drawMaze(maze)