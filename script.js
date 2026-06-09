const gridContainer = document.getElementById('grid');
for(let r=0;r<20;r++){
    for(let c=0;c<50;c++){
        const node = document.createElement('div');
        node.className = 'node';
        gridContainer.appendChild(node);
    }
}