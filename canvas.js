function WorldToGrid(axis, tileSize){
	return Math.floor(axis/tileSize);
}

function GridToWorld(gridAx, tileSize){
	return gridAx*tileSize;
}

function DRAW__Grid(type, context, grid2Draw, tileSize, gridImage, tileImageSize = tileSize){
	for(let i = 0; i < grid2Draw.length; i++){
		let renderPlusY = i * tileSize;
		for(let j = 0; j < grid2Draw[i].length; j++){
			let renderPlusX = j * tileSize;
			if(type !== "relevo"){
				context.drawImage(
					gridImage, grid2Draw[i][j]*tileImageSize % gridImage.width,
					Number.parseInt(grid2Draw[i][j]/WorldToGrid(gridImage.width, tileImageSize))* tileImageSize,
					tileImageSize, tileImageSize,
					
					renderPlusX, renderPlusY,
					tileSize, tileSize
				);
			} else {
				context.beginPath();
				context.strokeStyle = "#f9bc60";
				context.rect(renderPlusX , renderPlusY, tileSize, tileSize);
				context.stroke();
				context.fillStyle = "#f9bc60";
				context.fillText(grid2Draw[i][j], renderPlusX + tileSize*0.5, renderPlusY + tileSize*0.5);
			}
		}
	}
}

function calculateRelevo(map){
	let layerIndex = 0
	for(let i = 1; i < map.height; i++){
		for(let j = 0; j < map.width; j++){
			if(map.grids.relevo[i][j] > map.grids.relevo[i-1][j]){
				for(let k = i; k < map.height; k++){
					map.grids.shadow[k][j]++;
				}
			}
		}
	}
}

const MapGridsProps = ["relevo", "floor"];