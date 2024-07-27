// variables are storage of values
// variables - reusable names that represent a value
let board;
let score = 0;
let rows = 4;
let columns = 4;


// functions - reusable tasks
function setGame(){

	board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	]; // Goal, we will use this backend board to create our frontend board.

	// loops are code to repeat the tasks inside it, until it fulfill / completed the whole task. (in our context, until our board will have a tile with there proper colors)
	for(let r=0; r < rows; r++){
		for(let c=0; c < columns; c++){
			
			// create and design a tile

			// Created tile using div 
			let tile = document.createElement("div");

			// each tile will have an invisible id
			tile.id = r.toString() + "-" + c.toString();

			// number of the tile
			let num = board[r][c];

			updateTile(tile, num);

			// bunso(walis);

			document.getElementById("board").append(tile)
		}
	}

	setTwo();
	setTwo();
}


// updateTile() - updates the appearance of the tile (that is should have tile number and background color)
function updateTile(tile, num){

	tile.innerText = "";
	tile.classList.value = "";

	tile.classList.add("tile");

	// updateTile() uses our prepared styles in style.css
	if(num > 0){
		tile.innerText = num.toString();
	
		if(num <= 4096){
							// class -> x2, class -> x4, x8, x16
			tile.classList.add("x" + num.toString());
		}

		else{
			tile.classList.add("x8192");
		}
	}
}


window.onload = function(){
	setGame();
}


function handleSlide(event){
	console.log(event.code); // event.code - is the pressed key in our keyboard

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code)){

		event.preventDefault(); // Prevents the default behavior in our browser, when pressing arrow keys (default behaviour to prevent: whenever pressing arrow keys, the whole game also joins in sliding);

		if(event.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}
		else if(event.code == "ArrowRight"){
			slideRight();
			setTwo();
		}
		else if(event.code == "ArrowUp"){
			slideUp();
			setTwo();
		}
		else if(event.code == "ArrowDown"){
			slideDown();
			setTwo();
		}
	}
}

document.addEventListener("keydown", handleSlide);


function slideLeft(){

	for(let r=0; r<rows; r++){

		let row = board[r];

		row = slide(row); // slideLeft() function uses slide() function to merge tiles with the same values.

		board[r] = row;


		for(let c = 0; c<columns; c++){

			// this code is the retrieve our tile element
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			let num = board[r][c];

			// Updates the appearance of the tile
			updateTile(tile, num);
		}
	}
}


function slideRight(){

	for(let r=0; r<rows; r++){

		let row = board[r];
		// 0 0 2 2
		// 4 0 0 0

		// 2 2 0 0
		// 0 0 2 2
		// 4 0 0 0
		// 0 0 0 4
		row.reverse();
		row = slide(row); // slideLeft() function uses slide() function to merge tiles with the same values.
		row.reverse();

		board[r] = row;


		for(let c = 0; c<columns; c++){

			// this code is the retrieve our tile element
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			let num = board[r][c];

			// Updates the appearance of the tile
			updateTile(tile, num);
		}
	}
}


function slideUp(){

	for(let c=0; c<columns; c++){

		let col = [ board[0][c], board[1][c], board[2][c], board[3][c] ];

		col = slide(col); // slideUp() function uses slide() function to merge tiles with the same values.

		for(let r = 0; r<rows; r++){

			board[r][c] = col[r];

			// this code is the retrieve our tile element
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			let num = board[r][c];

			// Updates the appearance of the tile
			updateTile(tile, num);
		}
	}
}

function slideDown(){

	for(let c=0; c<columns; c++){

		let col = [ board[0][c], board[1][c], board[2][c], board[3][c] ];

		col.reverse();
		col = slide(col);
		col.reverse(); // slideDown() function uses slide() function to merge tiles with the same values.

		for(let r = 0; r<rows; r++){

			board[r][c] = col[r];

			// this code is the retrieve our tile element
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			let num = board[r][c];

			// Updates the appearance of the tile
			updateTile(tile, num);
		}
	}
}








// filterZero - removes the zeroes
function filterZero(row){
	return row.filter(num => num != 0);
}


// slide function merges the same adjacent tile
// Core function for sliding and merging tiles
function slide(row){
	// 0 2 2 0
	row = filterZero(row); 
	// 2 2
	for(let i = 0; i<row.length - 1; i++){
		
		if(row[i] == row[i+1]){ 
			row[i] *= 2;  // 4 2 
			row[i+1] = 0; // 4 0
		}
	}

	// Add zeroes back
	while(row.length < columns){
		row.push(0); // 4 0 0 0
	}

	return row;
}


// hasEmptyTile checks the game board if it contains any empty (zero) tiles.
function hasEmptyTile(){

	// loop
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			if(board[r][c]==0){
				return true;
			}
		}
	}
	return false;
}

function setTwo(){

	// if hasEmptyTile() function returns false, the setTwo() function will not generate a new tile.
	if(hasEmptyTile() == false){
		return; // "I will do nothing, I don't need to generate a new tile"
	}

	// the codes below are the codes to be executed once the condition above is not satisfied. 
	let found = false;

	while(!found){

		// This is to generate a random row and column position to check a random tile, and generate a tile with number 2 in it.
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		// if the random tile is an empty tile, the program will make it a tile with number 2. 
		if(board[r][c]==0){

			// the random vacant becomes 2 
			board[r][c] = 2;

			let tile = document.getElementById(r.toString() + "-" + c.toString());
			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}
	}

}




