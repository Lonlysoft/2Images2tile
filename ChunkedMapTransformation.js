const CHUNK_MAX_SIZE = 32;

function transformIntoChunkedMap(grid, type){
	const mapaTransformado = {
		repeat: "no",
		pieces: {}
	};
	
	const chunkWidth = (grid[0].length > CHUNK_MAX_SIZE*2)? CHUNK_MAX_SIZE : grid[0].length;
	const chunkHeight = (grid.length > CHUNK_MAX_SIZE*2)? CHUNK_MAX_SIZE : grid.length;
	const chunkAmountHeight = (grid.length > CHUNK_MAX_SIZE*2)? grid.length/CHUNK_MAX_SIZE : 1;
	const chunkAmountWidth = (grid[0].length > CHUNK_MAX_SIZE*2)? grid[0].length/CHUNK_MAX_SIZE : 1;
	
	for (let cx = 0; cx < chunkAmountHeight; cx++){
		for (let cy = 0; cy < chunkAmountWidth; cy++){
			let matAux = [];
			for(let i = 0; i < chunkHeight; i++){
				let line = [];
				for(let j = 0; j < chunkWidth; j++){
					const realX = (cx * chunkWidth) + j;
					const realY = (cy * chunkHeight) + i;
					line.push(grid[realY][realX]);
				}
				matAux.push(line);
			}
			const chunkId = `${cx}_${cy}`;
			let mapObject = null;
			if(!TheSystem.mapa.pieces){
				mapObject = {
					name: chunkId,
					width: chunkWidth,
					height: chunkHeight,
					grids: {
						floor: [],
						ground: [],
						objects: [[]]
					}
				}
			} else {
				mapObject = TheSystem.mapa.pieces[chunkId]
			}
			if(type == "objects"){
				mapObject.grids[type].push(matAux);
				mapaTransformado.pieces[chunkId] = mapObject;
				continue;
			}
			mapObject.grids[type] = matAux;
			mapaTransformado.pieces[chunkId] = mapObject;
		}
	}
	
	return mapaTransformado;
}