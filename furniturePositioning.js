const furnitures = {
	image: new Image(),
	list: [
		{
			name: "washing machine",
			dimen: {w: 48, h: 48, p: 48},
			id: 0
		},
		{
			name: "sink",
			dimen: {w: 48, h: 48, p: 48},
			id: 2
		},
		{
			name: "micro pantry",
			dimen: {w: 48, h: 48, p: 48},
			id: 4
		},
		{
			name: "stove",
			dimen: {w: 48, h: 48, p: 48},
			id: 6
		},
		{
			name: "double stove",
			dimen: {w: 96, h: 48, p: 48},
			id: 8
		},
		{
			name: "chair",
			dimen: {w: 48, h: 48, p: 48},
			id: 10
		},
		{
			name: "table",
			dimen: {w: 96, h: 48, p: 48},
			id: 14
		},
		{
			name: "small table",
			dimen: {w: 48, h: 48, p: 48},
			id: 12
		},
		{
			name: "vase 1",
			dimen: {w: 48, h: 48, p: 48},
			id: 16
		},
		{
			name: "vase 2",
			dimen: {w: 48, h: 48, p: 48},
			id: 18
		},
		{
			name: "vase 3",
			dimen: {w: 48, h: 48, p: 48},
			id: 20
		},
		{
			name: "bed",
			dimen: {w: 48, h: 48, p: 96},
			id: 22
		},
		{
			name: "tree",
			dimen: {w: 144, h: 48, p: 96},
			id: 25
		},
	],
	findId(wantedId){
		for(let i = 0; i< this.list.length; i++){
			if(this.list[i].id == wantedId){
				return this.list[i].dimen;
			}
		}
		return null;
	},
	DOM: document.querySelector('.item-list'),
	element: null,
	init(){
		this.image.src = "src/imgs/furnitures.png";
		//great, it's now a level editor... anyway, I'm gonna work on that later, but... for now...
		//put that on the element
		
		this.element = document.createElement("section");
		this.element.classList.add("list");
		this.element.classList.add("flex-column");
		this.element.classList.add("scrollable");
		
		for(let i = 0; i < this.list.length; i++){
			let listItem = document.createElement("div");
			listItem.innerHTML = this.list[i].name;
			listItem.classList.add("items");
			listItem.addEventListener("click", ()=>{
				
				You.furnitureSelectedId = this.list[i].id;
				this.DOM.classList.add('hidden');
			});
			this.element.appendChild(listItem);
		}
		this.DOM.appendChild(this.element);
		
	},
	add(you, x, y){
		Map.items[y][x] = you.furnitureSelectedId;
	}
}