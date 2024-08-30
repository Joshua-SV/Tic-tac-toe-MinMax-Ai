
const PLAYER = "X";
const CPU = "O";

let grid = [
    ["","",""],
    ["","",""],
    ["","",""]
];

const cols = document.querySelectorAll('.column');
const reset = document.querySelector(".restart");

function isGameOver() {
    // check if game is over
    for (let i = 0; i < 3; i++)
    {   // check horizontal wins
        if (grid[i][0] != "" && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) 
        {
            return grid[i][0];
        }
        // check vertical wins
        if (grid[0][i] != "" && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) 
        {
            return grid[0][i];
        }
    }
    // check diagonal wins
    if (grid[0][0] != "" && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) 
    {
        return grid[0][0];
    } 
    if (grid[0][2] != "" && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) 
    {
        return grid[0][2];
    }     
   
    // check if game is tied 
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] === ""){
                return false;
            }
        }
    }

    return null;
}

function moveAI() {
    // basic ai return first blank spot
    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 3; j++) {
    //         if (grid[i][j] === ""){
    //             return {i: i, j: j};
    //         }
    //     }
    // }

    // advance AI
    let bestMove;
    let bestScore = -Infinity;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Check if the spot is available
            if (grid[i][j] === "") {
                grid[i][j] = CPU; // Try the move
                let score = minimax(grid, 0, false); // Recursively evaluate the move
                grid[i][j] = ""; // Undo the move

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { i: i, j: j };
                }
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    let result = isGameOver();
    if (result !== false) {
        if (result === CPU) return 10;
        if (result === PLAYER) return -10;
        return 0; // Tie
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    board[i][j] = CPU;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    board[i][j] = PLAYER;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

cols.forEach((c) => {
    c.addEventListener('click',() => {
        const i = c.getAttribute('data-i');
        const j = c.getAttribute('data-j');
        // display players choice on screen
        c.textContent = PLAYER;
        // mark the grid with players choice
        grid[i][j] = PLAYER;

        console.log(`i: ${i} and j: ${j}`)
        console.log(grid)

        let gamestate = isGameOver();
        if (gamestate) 
        {
            // end the game
            alert(`winner is ${gamestate}`);
            return;
        }
        else if(gamestate === null)
        {
            // end the game
            alert(`game is tied!`);
            return;
        }
        else 
        {
            // have computer choose
            const move = moveAI();

            grid[move.i][move.j] = CPU;
            // Select the column with specific data-i and data-j values
            const column = document.querySelector(`.column[data-i='${move.i}'][data-j='${move.j}']`);
            // display computer's choice on screen
            column.textContent = CPU;
        }

        gamestate = isGameOver();
        if (gamestate) {
            alert(`winner is ${gamestate}`);
        }

    });
});


reset.addEventListener("click", (e) => {
    grid = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    cols.forEach((c) =>{
        c.textContent = " ";
    })
})


