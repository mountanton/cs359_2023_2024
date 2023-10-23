const game = {
  plays: "X",
  moves: 0,
  cells: [],
  winner: false
};

game.cells[0]=[null,null,null];
game.cells[1]=[null,null,null];
game.cells[2]=[null,null,null];

function play(x,y){
	document.getElementById('p'+x+'_'+y).innerText=game.plays;
	document.getElementById('p'+x+'_'+y).disabled=true;
	game.cells[x][y]=game.plays;
	game.moves++; 
	document.getElementById('message').innerHTML+="Move "+ game.moves+ ". Player " + game.plays+"<br>";
	this.checkWinner(x,y);
	if(game.winner===false)
		setTurn();
}





function disableButtons(){
	for(var i=0;i<3;i++){
			for(var j=0;j<3;j++){
			document.getElementById('p'+i+'_'+j).disabled=true;
			}
	}
}

function filterFunc(value){
	return value===game.plays;
}

function horizontalWin(row){
	if(game.cells[row].filter(filterFunc).length===3){
			document.getElementById('message').innerHTML+="Winner Vertically Player: "+ game.plays+ " with "+game.moves+" moves";
			for(let j=0;j<=2;j++)
				document.getElementById('p'+row+'_'+j).className="blinking";
			return true;
		}
	return false;
}


function verticalWin(y){
	const temp=[game.cells[0][y],game.cells[1][y],game.cells[2][y]];
	if(temp.filter(filterFunc).length===3){
			document.getElementById('message').innerHTML+="Winner Vertically Player: "+ game.plays+ " with "+game.moves+" moves";
		     for(let j=0;j<=2;j++)
			      document.getElementById('p'+j+'_'+y).className="blinking";
		     return true;
		}
	return false;
}

function diagonialWin(){
	if(game.cells[0][0]==game.cells[1][1] && game.cells[1][1]==game.cells[2][2]  && game.cells[2][2]==game.plays){
					document.getElementById('p'+0+'_'+0).className="blinking";
					document.getElementById('p'+1+'_'+1).className="blinking";
					document.getElementById('p'+2+'_'+2).className="blinking";
				document.getElementById('message').innerHTML+="Winner Diagonally Player: "+ game.plays+ " with "+game.moves+" moves";
				return true;
	}
	else if(game.cells[0][2]==game.cells[1][1] && game.cells[1][1]==game.cells[2][0]  && game.cells[2][0]==game.plays){
					document.getElementById('p'+0+'_'+2).className="blinking";
					document.getElementById('p'+1+'_'+1).className="blinking";
					document.getElementById('p'+2+'_'+0).className="blinking";
				document.getElementById('message').innerHTML+="Winner Diagonally Player: "+ game.plays+ " with "+game.moves+" moves";
				return true;
	}
	return false;
}


function checkWinner(x,y){
	//console.log(cells);
	if(game.moves>=5 && (horizontalWin(x)==true || verticalWin(y)==true || diagonialWin()==true)){
		game.winner=true;
		disableButtons();
	}
	else if(game.moves===9){
		document.getElementById('message').innerHTML+="Draw";
	}
}



function setTurn(){
	if(game.plays=='X')
		game.plays='O';
	else
		game.plays='X';
	
}