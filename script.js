window.onload = function(){
	var board = document.getElementById("board"),
		turn = 0,
		lastMove = 0;
	board.innerHTML = drawBoard();
	var boardMatx = new Array(50);
	for(let i=0; i<50; i++){
		boardMatx[i] = new Array(50).fill(0);
	}

	var cells = document.getElementsByClassName("cell");
	var numCell = cells.length;
	for(let i=0; i<numCell; i++){
		cells[i].addEventListener("click", function(){
			let position = [Math.floor(i/50),i%50];
			if(boardMatx[position[0]][position[1]]==0){
				cells[lastMove].classList.remove("last-move");
				if(turn%2==0) this.classList.add("X-cell");
				else this.classList.add("O-cell");
				cells[i].classList.add("last-move");
				lastMove = i;
				boardMatx[position[0]][position[1]] = turn%2+1;
				console.log(check([position[0],position[1]]));
				turn++;
			}
		})
	}


	/* Check for winner */
	function check(pos){
		let res = false;
		let per = boardMatx[pos[0]][pos[1]];
		let direction = [[[1, 0],[-1, 0]],
						 [[0,-1],[ 0, 1]],
						 [[1, 1],[-1,-1]],
						 [[1,-1],[-1, 1]]];
		for(let i=0;i<4;i++){
			let n=1;
			for(let j=0; j<2; j++){
				let row = pos[0] + direction[i][j][0],
					col = pos[1] + direction[i][j][1];
				let curPos;
				if(row>=0 && row<50 && col>=0 && row<50){
					curPos = [row, col];
				}
				//console.log(curPos);
				while(boardMatx[curPos[0]][curPos[1]] == per){
					row += direction[i][j][0];
					col += direction[i][j][1];
					if(row>=0 && row<50 && col>=0 && row<50){
						curPos = [row, col];
					}
					n++;
				}
			}
			if(n>=5){
				res = true;
				break;
			}
		}
		return res;
	}
}
function drawBoard(board){
	let text="";
	for(let i=0; i<50; i++){
		text += '<div id="row-'+(i+1)+'">';
		for(let j=0; j<50; j++){
			text += '<div class="cell pos-' + (10*i + j +1) +'"></div>';
		}
		text += "</div>"
	}
	return text;
}