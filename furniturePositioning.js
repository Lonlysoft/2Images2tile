const moveisUI = document.querySelector(".define-furnitures");

const ObjVariables = {
	global: {
		w: 0,
		h: 0,
	},
	local: {
		w: 0,
		h: 0,
	}
}

const FurniturePositioning = {
	canvas: moveisUI.querySelector("#canvas-furniture"),
	ctx: null,
	inputWidth: moveisUI.querySelector(".furniture-min-width"),
	inputHeight: moveisUI.querySelector(".furniture-min-height"),
	btnRec: moveisUI.querySelector(".recalibrar"),
	input_currentFurnitureWidth: moveisUI.querySelector(".current-furniture-width"),
	input_currentFurnitureHeight: moveisUI.querySelector(".current-furniture-height"),
	adicionarMovel: moveisUI.querySelector(".add-furn"),
	image: null,
	you: {x: 0, y: 0, w: 0, h: 0},
	//fora do container
	toggler: document.querySelector(".input__placeableFurniture"),
	imgInput: document.querySelector(".input__image_furniture"),
	preMenu: document.querySelector(".structure-pre-menu"),
	launchImg: document.querySelector(".launch-img"),
	clear(){
		this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
	},
	startCanvas(){
		this.ctx = this.canvas.getContext("2d");
	},
	draw(){
		this.canvas.width = this.img.width;
		this.canvas.height = this.img.height;
		this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
	},
	saveImg(e){
		const arq = e.target.files[0];
		const leitor = new FileReader();
		leitor.onload = function(e){
			FurniturePositioning.img = new Image();
			FurniturePositioning.img.src = e.target.result;
		}
		leitor.readAsDataURL(arq);
	},
	addGuideLine(context){
		context.beginPath();
		context.strokeStyle = "#f9bc60";
		context.rect(this.you.x , this.you.y, this.you.w, this.you.h);
		context.stroke();
	},
	selectPiece(event){
		this.you.w = ObjVariables.local.w
		this.you.h = ObjVariables.local.h
		let client_width = Math.floor(this.canvas.clientWidth);
		let client_height = Math.floor(this.canvas.clientHeight);
		let aspectRatio = this.canvas.width/client_width;
		let aspectRatioHeight = this.canvas.height/client_height;
		let boundingRect = this.canvas.getBoundingClientRect();
		const canvasX = (event.clientX - boundingRect.left)*aspectRatio;
		const canvasY = (event.clientY - boundingRect.top)*aspectRatioHeight;
		
		this.you.x = GridToWorld(WorldToGrid(canvasX, tileSize), tileSize),
		this.you.y = GridToWorld(WorldToGrid(canvasY, tileSize), tileSize)
		
		this.clear();
		this.draw();
		this.addGuideline(this.ctx);
	},
	inputChange: {
		w(){
			ObjVariables.global.w = Number(FurniturePositioning.inputWidth.value);
		},
		h(){
			ObjVariables.global.h = Number(FurniturePositioning.inputWidth.value);
		}
	},
	currentInputChange: {
		w(){
			ObjVariables.local.w = Number(FurniturePositioning.inputWidth.value);
		},
		h(){
			ObjVariables.local.h = Number(FurniturePositioning.inputWidth.value);
		}
	},
	recalibrar(){
		ObjVariables.global.h = ObjVariables.global.w;
		ObjVariables.local.w = ObjVariables.global.w;
		ObjVariables.local.h = ObjVariables.global.w;
	},
	events(){
		this.startCanvas();
		this.canvas.addEventListener("click", this.selectPiece);
		this.inputWidth.addEventListener("change", this.inputChange["w"]);
		this.inputHeight.addEventListener("change", this.inputChange["h"]);
		this.btnRec.addEventListener('click', this.recalibrar);
		this.input_currentFurnitureWidth.addEventListener("change", this.currentInputChange["w"]);
		this.input_currentFurnitureHeight.addEventListener("change", this.currentInputChange["h"]);
		this.adicionarMovel.addEventListener("click", this.createMovel);
		this.toggler.addEventListener("click", ()=>{
			this.toggler.value = (this.toggler.value == "true")? "false": "true";
			this.toggler.classList.toggle("active");
			this.preMenu.classList.toggle("hidden");
		});
		this.imgInput.addEventListener("change", this.saveImg);
		this.launchImg.addEventListener("click", ()=>{
			moveisUI.classList.remove("hidden");
			this.draw();
		});
	},
};