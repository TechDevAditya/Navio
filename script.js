const gridContainer = document.getElementById('grid');

for(let r=0;r<20;r++){
    for(let c=0;c<50;c++){
        const node = document.createElement('div');
        node.className = 'node';

        node.addEventListener('click', function(){   //click listener for node to turn to a wall

            //to toggle bw wall mode and normal node
            node.classList.toggle('wall');
        });

        gridContainer.appendChild(node);
    }
}