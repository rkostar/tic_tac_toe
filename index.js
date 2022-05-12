var cell = Array.from(document.getElementsByClassName('cell'));
var display = document.getElementById("display");

var score1= document.getElementById("score1");
var score2= document.getElementById("score2");

const btn = document.querySelector('.btn');
btn.addEventListener('click', clickHandler);

var player1_score=0;
var player2_score=2;

// score1.innerHTML="Player 1 score: "+player1_score;
// score2.innerHTML="Player 2 score: "+player2_score;


var grid = [];
var flag = 1;
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        grid[i] = [];
    }
}
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        grid[i][j] = 0;
    }
}
var toggle = 1;
function clickHandler(event) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[i][j] = 0;
        }
    }
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerText = '';
    }
    flag = 1;
    display.innerText='Player 1 turn'
    toggle=1;
}

display.innerText = "Player 1 turn";

// var toggle = 1;

var sumX = 0;
var sumY = 0;
var sumd1 = 0;
var sumd2 = 0;

cell.map(func => {
        func.addEventListener('click', (e) => {
            
            var i;
            for (i = 0; i < cell.length; i++) {
                if (cell[i] == e.path[0]) {
                    break;
                }
            }
            var sc = Math.floor(i / 3);
            var sr = i % 3;
            if (grid[sr][sc] == 0) {

                if (flag == 1) {
                    if(this.toggle==0){
                        e.target.innerText = '';
                    }
                    else{
                    display.innerText = "Player 2 turn"
                    e.target.innerText = 'x';
                    flag = 0;
                    grid[sr][sc] = 'x';
                    }
                }
                else {
                    if(this.toggle==0){
                        e.target.innerText = '';
                    }
                    else{
                    display.innerText = "Player 1 turn"
                    e.target.innerText = 'o';
                    flag = 1;
                    grid[sr][sc] = 'o';
                    }
                }
            }

            var result = isWinning(grid, sr, sc, sumX, sumY, sumd1, sumd2);
            if (result == 1) {
                display.innerText = 'player 1 wins!!';
                player1_score+=1;
                this.toggle = 0;
            }
            else if (result == 2) {
                display.innerText = "player 2 wins!!";
                player2_score+=2;
                this.toggle = 0;
            }
            else if (result == 0) {
                display.innerText = "Draw!!";
                this.toggle = 0;
            }
        })
})


function isWinning(grid, sr, sc, sumX, sumY, sumd1, sumd2) {
    var map = {};
    map['x'] = 10;
    map['o'] = 1;

    for (var i = 0; i < 3; i++) {
        if (grid[i][sc] != 0) {
            sumX += map[grid[i][sc]];
        }
        if (grid[sr][i] != 0) {
            sumY += map[grid[sr][i]];
        }
    }
    if (sumY == 30 || sumX == 30)
        return 1;
    if (sumY == 3 || sumX == 3)
        return 2;


    if (sr == sc) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (i == j)
                    sumd1 += map[grid[i][j]];
            }
        }
    }
    else if (sr + sc == 2) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (i + j == 2)
                    sumd2 += map[grid[i][j]];
            }
        }
    }

    if (sumd1 == 30 || sumd2 == 30)
        return 1;
    if (sumd1 == 3 || sumd2 == 3)
        return 2;

    var count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] == 0)
                count += 1;
        }
    }
    if (count == 0)
        return 0;
}