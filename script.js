const gridContainer = document.getElementById('grid');
const grid = [];  //Global array to store the in-memory graph structure

for (let r=0;r<20;r++) {
    const currentRow=[];
    for (let c=0;c<50;c++) {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';

        const isStart=(r===9 && c===10);
        const isEnd=(r===9 && c===39);

        if(isStart){
            nodeElement.classList.add('start');
        }else if(isEnd){
            nodeElement.classList.add('end');
        }

        //All the values required in dijkstra of a node
        const nodeData = {
            row:r,
            col:c,
            isStart: isStart,
            isEnd: isEnd,
            isWall: false,
            isVisited: false,
            distance: Infinity, 
            parNode: null, 
            element: nodeElement 
        };

        //Wall toggling logic
        nodeElement.addEventListener('click',function(){
            if(!nodeData.isStart && !nodeData.isEnd){
                nodeData.isWall = !nodeData.isWall; 
                nodeElement.classList.toggle('wall'); //Mistake done before: Toggle the visual state as well
            }
        });

        gridContainer.appendChild(nodeElement);
        currentRow.push(nodeData); 
    }
    
    grid.push(currentRow);
}




//start the algo and return data in the log
const startDijkstra=document.getElementById('start-btn');

startDijkstra.addEventListener('click', function(){
    //for now const start and end, later change to assign in UI
    const startNode=grid[9][10];
    const endNode=grid[9][39];
    
    const visitedNodes= dijkstra(grid,startNode,endNode);

    console.log("Algo finished! Nodes visited: ",visitedNodes.length);
    console.log(visitedNodes);
});







//DIJKSTRA logic

//to get neighbours without getting out of the grid
function getUnvisitedNeighbors(node, grid) {
    const neighbors=[];
    const {col,row}=node;
    
    // Check Up, Down, Left, Right
    if(row>0){
        neighbors.push(grid[row - 1][col]);
    }
    if(row<grid.length-1){
        neighbors.push(grid[row + 1][col]);
    }
    if(col>0){
        neighbors.push(grid[row][col - 1]);
    }
    if(col<grid[0].length-1){
        neighbors.push(grid[row][col + 1]);
    }
    
    // Return only the neighbors that haven't been visited yet
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

//updating the distance of those neighbors
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors= getUnvisitedNeighbors(node, grid);
    for(const neighbor of unvisitedNeighbors){
        neighbor.distance= node.distance+1; 
        neighbor.parNode= node;            
    }
}

function dijkstra(grid,startNode,endNode){
    const visitedNodes=[];   //we can do brute force by sorting array everytime so it works like a pr queue
    const unvisited=[];      //nodes which we have not yet visited

    for(const row of grid){
        for(const node of row){
            unvisited.push(node);
        }
    }

    startNode.distance=0;
    startNode.parNode=null;

    while(unvisited.length){
        unvisited.sort((nodeA,nodeB)=> nodeA.distance-nodeB.distance); //to simulate a priority queue

        const closestNode=unvisited.shift();  //shift() is in js was pop() is in c++

        if(closestNode.isWall){
            continue;
        }
        if(closestNode.distance===Infinity){
            return visitedNodes;
        }

        closestNode.isVisited=true;
        visitedNodes.push(closestNode);

        if(closestNode==endNode){
            return visitedNodes;
        }

        updateUnvisitedNeighbors(closestNode, grid);
    }

    return visitedNodes;
}

