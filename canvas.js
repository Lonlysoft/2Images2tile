function WorldToGrid(axis, tileSize){
	return Math.floor(axis/tileSize);
}

function GridToWorld(gridAx, tileSize){
	return gridAx*tileSize;
}

function DRAW__Grid(type, context, grid2Draw, tileSize, gridImage, tileImageSize = tileSize, ground3D = false){
	for(let i = 0; i < grid2Draw.length; i++){
		let renderPlusY = i * tileSize;
		for(let j = 0; j < grid2Draw[i].length; j++){
			let renderPlusX = j * tileSize;
			if(type !== "ground" && type !== "items"){
				context.drawImage(
					gridImage, grid2Draw[i][j]*tileImageSize % gridImage.width,
					Number.parseInt(grid2Draw[i][j]/WorldToGrid(gridImage.width, tileImageSize))* tileImageSize,
					tileImageSize, tileImageSize,
					
					renderPlusX, renderPlusY,
					tileSize, tileSize
				);
			}
			else if(type == 'items'){
				if(grid2Draw[i][j] == 0){
					continue;
				}
				let currentItem = furnitures.findId(grid2Draw[i][j])
				let frameX = grid2Draw[i][j]*tileImageSize % furnitures.image.width;
				let frameY = Number.parseInt(grid2Draw[i][j]/WorldToGrid(furnitures.image.width, tileSize))* tileSize;
				let width = currentItem.w
				let height = currentItem.h
				let depth = currentItem.p
				context.drawImage(
					furnitures.image,
					frameX, frameY,
					width, height + depth,
					renderPlusX,
					renderPlusY - depth,
					width, height + depth,
				);
			}
			else if(type == "ground" && ground3D){
				context.fillStyle = "#557"
				context.fillRect(renderPlusX, renderPlusY - grid2Draw[i][j]*tileSize + tileSize, tileSize, grid2Draw[i][j]*tileSize);
				context.fillStyle = '#779'
				context.fillRect(renderPlusX, renderPlusY - grid2Draw[i][j]*tileSize, tileSize, tileSize);
				context.beginPath();
				context.strokeStyle = "#f9bc60";
				context.rect(renderPlusX , renderPlusY, tileSize, tileSize);
				context.stroke();
				context.fillStyle = "#f9bc60";
				context.fillText(grid2Draw[i][j], renderPlusX + tileSize*0.5, renderPlusY + tileSize*0.5);
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



function distancia2pontos(x1, x2, y1, y2){
	return Math.hypot(x1 - x2, y1 - y2);
}

function calculateRelevo(map){
	let layerIndex = 0
	for(let i = 1; i < map.height; i++){
		for(let j = 0; j < map.width; j++){
			if(map.grids.ground[i][j] > map.grids.ground[i-1][j]){
				for(let k = i; k < map.height; k++){
					map.grids.shadow[k][j]++;
				}
			}
		}
	}
}

const MapGridsProps = ["floor", "ground"];