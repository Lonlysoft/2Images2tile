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
			if(type !== "ground"){
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
			if(map.grids.ground[i][j] > map.grids.ground[i-1][j]){
				for(let k = i; k < map.height; k++){
					map.grids.shadow[k][j]++;
				}
			}
		}
	}
}

class Objectus{
	constructor (type, frameX, width, frameY = frameX, height = width){
		this.frameX = x;
		this.frameY = y;
		this.type = type;
		this.width = width;
		this.height = height;
	}
	draw(x, y){ // x, y são em grid
		let worldX = GridToWorld(x, tileSize) + tileSize *0.5;
		let worldY = GridToWorld(y, tileSize) + tileSize
		ctx.drawImage(objectImage[this.type], this.frameX, this.frameY, this.width, this.height, worldX - this.width*0.5, worldY- this.height, this.width, this.height);
	}
}

const MapGridsProps = ["floor", "ground"];