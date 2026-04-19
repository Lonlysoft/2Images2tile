const canvas = document.getElementById("editor");
const ctx = canvas.getContext("2d");
const canvas_template = document.getElementById("paleta");
const ctx_template = canvas_template.getContext("2d");

let coresTemplate = [];
const TheSystem = {name: "mapa", grid: [], mapa: {}};

function obterCorDoPixel(context, x, y) {
	let pixel = context.getImageData(x, y, 1, 1);
	let cor = "rgba(" + pixel.data[0] + ", " + pixel.data[1] + ", " + pixel.data[2] + "," + pixel.data[3]+")";
	return cor;
}

function obterCorDeTemplate(temp_imagery){
	ctx_template.drawImage(temp_imagery, 0, 0);
	//ao iniciar sempre coloque um array vazio para n ter problema com overflow. podendo usar n vezes.
	coresTemplate = [];
	for(let i = 0; i < temp_imagery.width; i+=1){
		coresTemplate.push(obterCorDoPixel(ctx_template, i, 0));
	}
}
const osInputs = {
	tipoDeSetup: document.querySelector(".input__image_grid"),
	asCoresEmOrdem: document.querySelector(".input__image_template"),
	tileset: document.querySelector(".input__tile"),
	nomeDoMapa: document.querySelector(".input__name")
};
osInputs.tipoDeSetup.addEventListener("change", handleImagery);
osInputs.asCoresEmOrdem.addEventListener("change", handlePallet);
osInputs.tileset.addEventListener("change", handleTileSet);

function idOf(array, contents){
	if(!array.includes(contents)){
		return -1;
	}
	for(let i = 0; i < array.length; i++){
		if(contents == array[i])
			return i;
	}
}

function WorldToGrid(axis, tileSize){
	return Math.floor(axis/tileSize);
}

function drawMap(chunkId){
	const inputNumber = document.querySelector(".input__tileSize");
	const TILE_SIZE = Number(inputNumber.value);
	const mapCanvas = document.querySelector("#mapCanvas");
	const mapCtx = mapCanvas.getContext("2d");
	mapCanvas.height = TheSystem.mapa.pieces[chunkId].grids.floor.length * TILE_SIZE;
	mapCanvas.width = TheSystem.mapa.pieces[chunkId].grids.floor[0].length * TILE_SIZE;
	for(let i = 0; i < TheSystem.mapa.pieces[chunkId].grids.floor.length; i++){
		for(let j = 0; j < TheSystem.mapa.pieces[chunkId].grids.floor[i].length; j++){
			mapCtx.drawImage(tiles,
				TheSystem.mapa.pieces[chunkId].grids.floor[i][j]*TileSize % imagemSdw_width,
				Number.parseInt(
					TheSystem.mapa.pieces[chunkId].grids.floor[i][j]/WorldToGrid(imagemSdw_width, TileSize)
				) * TileSize,
				TileSize, TileSize,
				j*TILE_SIZE, i*TILE_SIZE, TILE_SIZE, TILE_SIZE
			);
		}
	}
}



function general(imagemSdw){
	let corDoPixel = []
	ctx.drawImage(imagemSdw, 0, 0, imagemSdw.width, imagemSdw.height);
	TheSystem.grid = [];
	for(let i = 0; i < imagemSdw.height; i++){
		corDoPixel.push(new Array());
		TheSystem.grid.push(new Array());
		for(let j = 0; j < imagemSdw.width; j++){
			corDoPixel[i].push(obterCorDoPixel(ctx, j, i));
			TheSystem.grid[i].push(idOf(coresTemplate, corDoPixel[i][j]));
		}
	}
	TheSystem.mapa = transformIntoChunkedMap(TheSystem.grid, "ground");
}

const TileSize = 48;
const imagemSdw_width = 192;

function generalForGraphicPurposes(imagemSdw){
	let corDoPixel = []
	TheSystem.grid = [];
	let imageLengthInTileSize = Math.floor(imagemSdw_width/TileSize);
	ctx.drawImage(imagemSdw, 0, 0, imagemSdw.width, imagemSdw.height);
	for(let i = 0; i < imagemSdw.height; i++){
		TheSystem.grid.push(new Array());
		corDoPixel.push(new Array());
		for(let j = 0; j < imagemSdw.width; j++){
			corDoPixel[i].push(obterCorDoPixel(ctx, j, i));
			let fret = 16 * idOf(coresTemplate, corDoPixel[i][j]);
			TheSystem.grid[i].push(fret+5);
		}
	}
	for(let i = 0; i < TheSystem.grid.length; i++){
		for(let j = 0; j < TheSystem.grid[i].length; j++){
			let flag = [false, false, false, false];
			if((i > 0 && j > 0) && (i < imagemSdw.height-1 && j < imagemSdw.width-1)){
				if(corDoPixel[i - 1][j] != corDoPixel[i][j])
					flag[0] = true;
				if(corDoPixel[i + 1][j] != corDoPixel[i][j])
					flag[1] = true;
				if(corDoPixel[i][j - 1] != corDoPixel[i][j])
					flag[2] = true;
				if(corDoPixel[i][j + 1] != corDoPixel[i][j])
					flag[3] = true;
			}
			
			if(flag[0] && flag[1] && flag[2] && flag[3])
				TheSystem.grid[i][j] -= imageLengthInTileSize*2+2;
			
			else if(flag[0] && flag[1] && flag[2] && !flag[3])
				TheSystem.grid[i][j] += imageLengthInTileSize*2 -1;
			
			else if(flag[0] && flag[1] && flag[3] && !flag[2])
				TheSystem.grid[i][j] += imageLengthInTileSize*2 +1;
				
			else if(flag[2] && flag[3] && flag[0] && !flag[1])
				TheSystem.grid[i][j] -= imageLengthInTileSize+2;
				
			else if(flag[2] && flag[3] && flag[1] && !flag[0])
				TheSystem.grid[i][j] += imageLengthInTileSize+2;
			
			else if(flag[0] && flag[1] && !flag[2] && !flag[3])
				TheSystem.grid[i][j] += imageLengthInTileSize*2;
				
			else if(flag[0] && flag[2] && !flag[1] && !flag[3])
				TheSystem.grid[i][j] -= imageLengthInTileSize+1;
				
			else if(flag[0] && flag[3] && !flag[1] && !flag[2])
				TheSystem.grid[i][j] -= imageLengthInTileSize-1;
				
			else if(flag[1] && flag[2] && !flag[0] && !flag[3])
				TheSystem.grid[i][j] += imageLengthInTileSize-1;
				
			else if(flag[1] && flag[3] && !flag[0] && !flag[2])
				TheSystem.grid[i][j] += imageLengthInTileSize+1;
				
			else if(flag[2] && flag[3] && !flag[1] && !flag[0])
				TheSystem.grid[i][j] += 2;
			
			else if(flag[0] && !flag[1] && !flag[2] && !flag[3])
				TheSystem.grid[i][j] -= imageLengthInTileSize;
				
			else if(flag[1] && !flag[0] && !flag[2] && !flag[3])
				TheSystem.grid[i][j] += imageLengthInTileSize;
				
			else if(flag[2] && !flag[0] && !flag[1] && !flag[3])
				TheSystem.grid[i][j]--;
				
			else if(flag[3] && !flag[0] && !flag[1] && !flag[2])
				TheSystem.grid[i][j]++;
			
		}
	}
	//trasemos o mapa normal, aí transformamos ele em um super mapa
	TheSystem.mapa = transformIntoChunkedMap(TheSystem.grid, map__type.value);
}

let image;
let pallet;
let tiles;

const frontImage = document.querySelector(".main_img");
const backImage = document.querySelector(".pallet_img");

function handleImagery(e){
	const arq = e.target.files[0];
	saveImage(arq);
}

function handlePallet(e){
	const arq = e.target.files[0];
	savePallet(arq);
}

function handleTileSet(e){
	const arq = e.target.files[0];
	saveTiles(arq);
}

function saveImage(file){
	const leitor = new FileReader();
	leitor.onload = function(e){
		image = new Image();
		image.src = e.target.result;
		frontImage.classList.remove("none");
		frontImage.src = image.src;
	}
	leitor.readAsDataURL(file);
}

function savePallet(file){
	const leitor = new FileReader();
	leitor.onload = function(e){
		pallet = new Image();
		pallet.src = e.target.result
		backImage.classList.remove("none");
		backImage.src = pallet.src;
	}
	leitor.readAsDataURL(file);
}

function saveTiles(file){
	const leitor = new FileReader();
	leitor.onload = function(e){
		tiles = new Image();
		tiles.src = e.target.result;
	}
	leitor.readAsDataURL(file);
}

const map__type = document.querySelector(".map__type");
const output = document.querySelector(".output");

function openVisualizer(){
	const divVisualizer = document.querySelector(".map-visualization");
	divVisualizer.classList.toggle("none");
	const sel = document.querySelector(".chunk-selector");
	sel.addEventListener("change", (e)=> {
		drawMap(e.target.value);
	});
	for(chunk in TheSystem.mapa.pieces){
		let option = document.createElement("option");
		option.innerHTML = chunk;
		sel.appendChild(option);
	}
}

let finalString;
function calculate_andSend(){
	let send = document.querySelector(".sendBtn");
	send.style.background = "var(--p-color)";
	send.innerHTML = "processando...";
	window.setTimeout(()=>{
		canvas.width = image.width;
		canvas.height = image.height;
		canvas_template.width = pallet.width;
		canvas_template.height = pallet.height;
		obterCorDeTemplate(pallet);
		TheSystem.mapa.name = osInputs.nomeDoMapa.value;
		if(map__type.value == "relevo"){
			general(image);
		}
		else {
			generalForGraphicPurposes(image);
			openVisualizer();
		}
		send.innerHTML = "pronto!"; output.classList.remove("none");
	}, 1000);
}


function download(){
	const blob = new Blob([JSON.stringify(TheSystem.mapa, null, 2)], {type: "application/JSON"})
	saveAs(blob, ""+map__type.value+".json")
}