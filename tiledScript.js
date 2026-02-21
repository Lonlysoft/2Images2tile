let stottic = 0;

const Elements = {
	//multi canvas
	multiCanvas: document.querySelector(".multi-canvas"),
	mapInfoMenu: document.querySelector(".mapInfo-menu"),
	mapName: document.querySelector(".input__mapName"),
	main: document.querySelector("main"),
	canvas: document.createElement("canvas"),
	canvasPreset: document.querySelector("#canvasTilePreset"),
	canvasPreset__delimiter: document.querySelector(".preset-limiter"),
	selectInput: document.querySelector(".initialType"),
	imageInput: document.querySelector(".input__image_tilemap"),
	loadMapInput: document.querySelector(".input__file_loadMap"),
	npcInput: document.querySelector(".input__image_npcs"),
	tamanhoInput: document.querySelector(".input__tileSize"),
	larguraInput: document.querySelectorAll(".input__mapSize")[0],
	alturaInput: document.querySelectorAll(".input__mapSize")[1],
	relevoMode: document.querySelector(".relevoMode"),
	toolbar: document.querySelector(".tool-bar"),
	layerFront: document.querySelector(".camadas"),
	exitLayerMode: document.querySelector(".exitLayerMode"),
	hasWaterInput: document.querySelector(".input__hasWater"),
	enemyChecker: document.querySelector(".input__hasEnemy"),
	itemChecker: document.querySelector(".input__placeableItems"),
	npcChecker: document.querySelector(".input__placeableNPCs")
}


class Layer {
	constructor(tipo){
		this.id = stottic++;
		this.tipo = tipo;
		this.layerFront = document.createElement("div");
		this.layerFront.classList.add("layer");
		this.layerFront.style.color = "var(--button-bg)"
		this.layerFrontComponents = {
			hideButton: document.createElement("div"),
			layerName: document.createElement("h2"),
			type: document.createElement("p")
		}
		this.layerFrontComponents.layerName.classList.add("input__selectType");
		this.layerFrontComponents.layerName.innerHTML = this.tipo;
		this.layerFrontComponents.hideButton.innerHTML = "<i class = 'fa-solid fa-eye'></i>";
		this.events();
		this.layerFrontComponents.type.innerHTML = this.tipo;
		this.layerFront.appendChild(this.layerFrontComponents.hideButton);
		this.layerFront.appendChild(this.layerFrontComponents.layerName);
		this.layerFront.appendChild(this.layerFrontComponents.type);
		this.isHidden = false;
	}
	events(){
		this.layerFrontComponents.hideButton.addEventListener("click", ()=>{
			this.isHidden = !this.isHidden;
			canvasUpdate();
			if(this.isHidden){
				this.layerFrontComponents.hideButton.innerHTML = "<i class = 'fa-solid fa-glasses'></i>"
			} else {
				this.layerFrontComponents.hideButton.innerHTML = "<i class = 'fa-solid fa-eye'></i>"
			}
		});
		this.layerFront.addEventListener("click", () => {
			You.selectedLayer = this.id;
			
			if(this.tipo == "ground"){
				Elements.canvasPreset__delimiter.classList.add("hidden");
				Elements.relevoMode.classList.toggle("hidden");
				Elements.imageInput.classList.add("hidden");
				furnitures.DOM.classList.add('hidden');
			} else if(this.tipo == "items"){
				Elements.canvasPreset__delimiter.classList.add("hidden");
				furnitures.DOM.classList.remove('hidden');
			} else{
				Elements.canvasPreset__delimiter.classList.remove("hidden");
				furnitures.DOM.classList.add('hidden');
				Elements.relevoMode.classList.add("hidden");
				Elements.imageInput.classList.remove("hidden");
			}
		});
	}
}

let selectedLayer = 0;
const Layers = []

function addLayer(){
	Layers.push(new Layer("floor"));
	Elements.layerFront.appendChild(Layers[Layers.length-1].layerFront);
}

function addLayerAs(type){
	Layers.push(new Layer(type));
	Elements.layerFront.appendChild(Layers[Layers.length-1].layerFront);
}

function addObjectLayer(){
	Layers.push(new Layer("objects"));
	Elements.layerFront.appendChild(Layers[Layers.length-1].layerFront);
	Map.grids.objects.push(createMatrixWithSomething(Map.width, Map.height, -1));
	let tileSize = Number(Elements.tamanhoInput.value)
	canvasUpdate();
}

//funcao pra dar update no canvas. redesenhando o mapa do zero
function canvasUpdate(){
	let tileSize = Number(Elements.tamanhoInput.value)
	Elements.canvas.ctx.clearRect(0, 0, Elements.canvas.width, Elements.canvas.height)
	const objectLayers = Layers.filter(index => index.tipo == "objects");
	const normalLayers = Layers.filter(index => index.tipo != "objects");
	for(let i = 0; i < normalLayers.length; i++){
		if(!normalLayers[i].isHidden)
			DRAW__Grid(normalLayers[i].tipo, Elements.canvas.ctx, Map.grids[normalLayers[i].tipo], tileSize, tiles)
	}
	
	for(let i = 0; i < Map.grids.objects.length; i++){
		if(!objectLayers[i].isHidden)
			DRAW__Grid(objectLayers[i].tipo, Elements.canvas.ctx, Map.grids[objectLayers[i].tipo][i], tileSize, tiles);
	}
}

const RelevoButtons = {
	plus: document.querySelector("#btn-plus"),
	minus: document.querySelector("#btn-minus"),
	input: document.querySelector(".input__RelevoSize"),
	value: 0
};

const ToolBar ={
	verTiles: Elements.toolbar.querySelectorAll(".old-btns")[0],
	isTilesPresent: false,
	verCamadas: Elements.toolbar.querySelector("#btn-layers"),
	verItens: Elements.toolbar.querySelector('#btn-items')
}

const UIbuttons = {
	salvar: document.querySelector("#btn-salvar"),
	aplicar: document.querySelector("#btn-aplicar"),
}

const ElementosCamadas = {
	///*
	adicionar: document.querySelector("#btn-add-camadas"),
	deletar: document.querySelector('#btn-rm-camadas'),
	esconder: document.querySelector('#tool-bar-camadas'),
	//*/
}

Elements.canvasPreset.ctx = Elements.canvasPreset.getContext("2d");

function createMatrixWithSomething(width, height, arg){
	let matrix = new Array(height);
	for(let i = 0; i < height; i++){
		matrix[i] = new Array(width);
		for(let j = 0; j < width; j++){
			matrix[i][j] = arg;
		}
	}
	return matrix;
}

let tiles;

function saveTiles(file){
	const leitor = new FileReader();
	leitor.onload = function(e){
		tiles = new Image();
		tiles.src = e.target.result;
	}
	leitor.readAsDataURL(file);
}

function handleTileSet(e){
	const arq = e.target.files[0];
	saveTiles(arq);
}

const objectImage = {
	items: null,
	npcs: null
};

function saveNPCimage(e){
	const arq = e.target.files[0];
	const leitor = new FileReader();
	leitor.onload = function(e){
		objectImage.npcs = new Image();
		objectImage.npcs.src = e.target.result;
	}
	leitor.readAsDataURL(file);
}


function loadMap(e){
	const arq = e.target.files[0];
	const leitor = new FileReader();
	leitor.onload = function(ev){
		Map = JSON.parse(ev.target.result);
		Elements.larguraInput.value = Map.width;
		Elements.alturaInput.value = Map.height;
		Elements.mapName.value = Map.name;
	}
	leitor.readAsText(arq);
}

const You = {
	selectedPieceId: undefined,
	selectedLayer: 0,
	threeDimensionalGround: true,
	furnitureSelectedId: 0
}

let Map = undefined;
let standardGridLength = 2;
let selectedId = 0;

function events(){
	Elements.canvasPreset.addEventListener("click", choosePiece);
	Elements.loadMapInput.addEventListener("change", (e)=>{
		loadMap(e);
		let tileSize = Number(Elements.tamanhoInput.value);
	});
	Elements.hasWaterInput.addEventListener("click", ()=>{
		Elements.hasWaterInput.value = (Elements.hasWaterInput.value == "true")? "false": "true";
		Elements.hasWaterInput.classList.toggle("active");
	});
	Elements.enemyChecker.addEventListener("click", ()=>{
		Elements.enemyChecker.value = (Elements.enemyChecker.value == "true")? "false": "true";
		Elements.enemyChecker.classList.toggle("active");
	});
	Elements.itemChecker.addEventListener("click", ()=>{
		Elements.itemChecker.value = (Elements.itemChecker.value == "true")? "false": "true";
		Elements.itemChecker.classList.toggle("active");
	});
	Elements.imageInput.addEventListener("change", handleTileSet);
	UIbuttons.aplicar.addEventListener("click", aplicar);
	RelevoButtons.plus.addEventListener("click", ()=>{
		RelevoButtons.input.value = ++RelevoButtons.value;
	});
	RelevoButtons.minus.addEventListener("click", ()=>{
		RelevoButtons.input.value = --RelevoButtons.value;
	});
	RelevoButtons.input.addEventListener("change", ()=>{
		You.selectedPieceId = Number(RelevoButtons.input.value);
	});
	ToolBar.verTiles.addEventListener("click", ()=>{
		Elements.canvasPreset.classList.toggle("hidden");
	});
	ToolBar.verCamadas.addEventListener("click", () => {
		Elements.layerFront.classList.remove("hidden");
		Elements.exitLayerMode.classList.remove("hidden");
	});
	Elements.exitLayerMode.addEventListener("click", ()=>{
		Elements.layerFront.classList.add("hidden");
		Elements.exitLayerMode.classList.add("hidden");
	});
	UIbuttons.salvar.addEventListener("click", salvarMapa);
	ToolBar.verItens.addEventListener("click", ()=>{
		furnitures.DOM.classList.toggle('hidden');
	});
	
	ElementosCamadas.adicionar.addEventListener("click", addObjectLayer);
	//ElementosCamadas.deletar.addEventListener("click", removeLayer);
	furnitures.init();
}

function putPiece(event){
	let context = Elements.canvas.ctx;
	try{
		let tileSize = Number(Elements.tamanhoInput.value)
		let client_width = Math.floor(Elements.canvas.clientWidth);
		let client_height = Math.floor(Elements.canvas.clientHeight);
		let aspectRatio = Elements.canvas.width/client_width;
		let aspectRatioHeight = Elements.canvas.height/client_height;
		let boundingRect = Elements.canvas.getBoundingClientRect();
		let canvasX = (event.clientX - boundingRect.left)*aspectRatio;
		let canvasY = (event.clientY - boundingRect.top)*aspectRatioHeight;
		
		
		let gridCanvasCoords = {
			x: GridToWorld(WorldToGrid(canvasX, tileSize), tileSize),
			y: GridToWorld(WorldToGrid(canvasY, tileSize), tileSize)
		}
		if(Layers[You.selectedLayer].tipo == "ground"){
			You.selectedPieceId = Number(RelevoButtons.input.value);
		} else if(Layers[You.selectedLayer].tipo == "items"){
			Map.grids["items"][WorldToGrid(canvasY, tileSize)][WorldToGrid(canvasX, tileSize)] = You.furnitureSelectedId;
			canvasUpdate();
			return;
		}
		standardGridLength = MapGridsProps.length;
		if(You.selectedLayer < standardGridLength){
			Map.grids[MapGridsProps[You.selectedLayer]][WorldToGrid(canvasY, tileSize)][WorldToGrid(canvasX, tileSize)] = You.selectedPieceId;
		}else{
			Map.grids.objects[You.selectedLayer-standardGridLength][WorldToGrid(canvasY, tileSize)][WorldToGrid(canvasX, tileSize)] = You.selectedPieceId;
		}
		canvasUpdate();
	} catch (error) {
		alert("grid não declarada");
		canvasUpdate();
		console.log(error);
	}
}

function putPieceTouchMove(event){
	event.preventDefault();
	putPiece(event.touches[0]);
}


function choosePiece(event){
	let context = Elements.canvasPreset.ctx;
	try{
		let tileSize = Number(Elements.tamanhoInput.value)
		let client_width = Math.floor(Elements.canvasPreset.clientWidth);
		let client_height = Math.floor(Elements.canvasPreset.clientHeight);
		let aspectRatio = Elements.canvasPreset.width/client_width;
		let aspectRatioHeight = Elements.canvasPreset.height/client_height;
		let boundingRect = Elements.canvasPreset.getBoundingClientRect();
		let canvasX = (event.clientX - boundingRect.left)*aspectRatio;
		let canvasY = (event.clientY - boundingRect.top)*aspectRatioHeight;
		
		
		let gridCanvasCoords = {
			x: GridToWorld(WorldToGrid(canvasX, tileSize), tileSize),
			y: GridToWorld(WorldToGrid(canvasY, tileSize), tileSize)
		}
		context.clearRect(0, 0, tiles.width, tiles.height);
		context.drawImage(tiles, 0, 0, tiles.width, tiles.height);
		
		context.beginPath();
		context.strokeStyle = "#f9bc60";
		context.rect(gridCanvasCoords.x , gridCanvasCoords.y, tileSize, tileSize);
		context.stroke();
		
		You.selectedPieceId = WorldToGrid(canvasX, tileSize) + WorldToGrid(canvasY, tileSize)*WorldToGrid(tiles.width, tileSize);
	} catch (error) {
		console.log(error);
		alert("ainda não foi dado upload em nenhum tileset");
	}
}

function aplicarComMapaDefinido(){
	Elements.mapInfoMenu.classList.add("hidden")
	Elements.main.classList.remove("hidden");
	Elements.canvasPreset.width = tiles.width;
	Elements.canvasPreset.height = tiles.height;
	Elements.canvasPreset.ctx.drawImage(tiles, 0, 0, tiles.width, tiles.height);
	Elements.multiCanvas.appendChild(Elements.canvas);
	let tileSize = Number(Elements.tamanhoInput.value);
	Elements.canvas.width = Map.width*tileSize;
	Elements.canvas.height = Map.height*tileSize;
	if(Elements.itemChecker.value == "true"){
		MapGridsProps.push("items");
	}
	for(let i = 0; i < MapGridsProps.length; i++){
		addLayerAs(MapGridsProps[i]);
	} 
	if(Map.grids.enemies){
		hasEnemies = true;
	}
	if(Map.grids.objects.length > 0){
		for(let i = 0; i < Map.grids.objects.length; i++){
			addLayerAs('objects');
			if(Map.grids.objects[i].length <= 0){
				Map.grids.objects[i] = createMatrixWithSomething(Map.width, Map.height, -1);
			}
		}
	}
	standardGridLength = MapGridsProps.length;
	
	canvasUpdate();
	
	// por razões [i][j]++ irão acontecer problemas de camadas, então vamos resetar as sombras e calculá-las quando o usuario apertar em baixar.
	Map.grids["shadow"] = createMatrixWithSomething(Map.width, Map.height, 0);
}

function aplicar(){
	Elements.canvas.classList.add("screen");
	Elements.canvas.classList.add("absolute");
	Elements.canvas.classList.add("top");
	Elements.canvas.classList.add("left");
	Elements.canvas.ctx = Elements.canvas.getContext("2d");
	Elements.canvas.addEventListener("click", putPiece);
	Elements.canvas.addEventListener("touchmove", putPieceTouchMove);
	if(Map){
		aplicarComMapaDefinido();
		return;
	}
	Elements.multiCanvas.appendChild(Elements.canvas);
	Map = {
		width: Number(Elements.larguraInput.value),
		height: Number(Elements.alturaInput.value),
		grids: {},
		name: Elements.mapName.value
	}
	Elements.mapInfoMenu.classList.add("hidden")
	Elements.main.classList.remove("hidden");
	Elements.canvasPreset.width = tiles.width;
	Elements.canvasPreset.height = tiles.height;
	Elements.canvasPreset.ctx.drawImage(tiles, 0, 0, tiles.width, tiles.height);
	
	let tileSize = Number(Elements.tamanhoInput.value);
	if(Elements.itemChecker.value == "true"){
		MapGridsProps.push("items");
	}
	for(let i = 0; i < MapGridsProps.length; i++){
		addLayerAs(MapGridsProps[i]);
		Map.grids[MapGridsProps[i]] = createMatrixWithSomething(Map.width, Map.height, 0);
	}
	let hasEnemies = (Elements.enemyChecker.value == "true")? true : false;
	Map.grids["beings"] = createMatrixWithSomething(Map.width, Map.height, "");
	Map.grids["npcs"] = createMatrixWithSomething(Map.width, Map.height, 0);
	Map.grids["items"] = createMatrixWithSomething(Map.width, Map.height, 0);
	Map.grids["hasWater"] = (Elements.hasWaterInput.value == "true")? true : false;
	Map.grids["water"] = (Map.grids["hasWater"])? createMatrixWithSomething(Map.width, Map.height, 0): null;
	if(hasEnemies){
		Map.grids["enemies"] = createMatrixWithSomething(Map.width, Map.height, 0);
	}
	Map.grids["objects"] = [];
	Map.grids["shadow"] = createMatrixWithSomething(Map.width, Map.height, 0);
	Elements.canvas.width = Map.width*tileSize;
	Elements.canvas.height = Map.height*tileSize;
	for(let i = 0; i < Layers.length; i++){
		if(!Layers[i].isHidden)
			DRAW__Grid(Layers[i].tipo, Elements.canvas.ctx, Map.grids[Layers[i].tipo], tileSize, tiles)
	}
}

function download(){
	calculateRelevo(Map);
	const blob = new Blob([JSON.stringify(Map, null, 2)], {type: "application/JSON"});
	saveAs(blob, Elements.mapName.value+".json");
}

function salvarMapa(){
	download();
}

events();