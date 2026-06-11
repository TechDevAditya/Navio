const gridContainer = document.getElementById('grid');

for(let r=0;r<20;r++){
    for(let c=0;c<50;c++){
        const node = document.createElement('div');
        node.className = 'node';

        if(r===9 && c===10){
            node.classList.add('start');
        }else if(r===9 && c===39) {
            node.classList.add('end');
        }

        node.addEventListener('click', function(){   //click listener for node to turn to a wall

            //to toggle bw wall mode and normal node if its not start or end node
            if(!node.classList.contains('start') && !node.classList.contains('end')){
                node.classList.toggle('wall');
            }
        });

        gridContainer.appendChild(node);
    }
}