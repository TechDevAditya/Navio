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

//log when start button clicked to debug
const startDijkstra=document.getElementById('start-btn');

startDijkstra.addEventListener('click', function() {
    console.log("Master Grid Data Structure:", grid);
});