document.addEventListener('DOMContentLoaded', () => {
    const player1Board = document.getElementById('player1-board');
    const player2Board = document.getElementById('player2-board');
    const numberInput = document.getElementById('number-input');
    const markButton = document.getElementById('mark-button');
    const newGameButton = document.getElementById('new-game-button');
    const message = document.getElementById('message');
    const chance = document.getElementById('turn-msg');
    let p1=true;
    const size = 5;
    const numbers = Array.from({ length: size * size }, (_, i) => i + 1);

    const generateBoard = (board) => {
        board.innerHTML = ''; // Clear the board
        const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
        for (let i = 0; i < size; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < size; j++) {
                const cell = document.createElement('td');
                cell.textContent = shuffledNumbers[i * size + j];
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    };

    const markNumber = (board, number) => {
        const cells = board.getElementsByTagName('td');
        for (const cell of cells) {
            if (cell.textContent == number) {
                if(cell.classList.contains('marked')){
                    message.textContent = 'Please enter a UnMarked Number';
                    return false;
                }
                else {
                    cell.classList.add('marked');
                    return true;
                }    
            }
        }
    };

    const checkWinner = (board) => {
        const rows = board.getElementsByTagName('tr');
        let cnt = 0;
        const cols = Array.from({ length: size }, () => []);
        let diag1 = [];
        let diag2 = [];

        for (let i = 0; i < size; i++) {
            const row = rows[i].getElementsByTagName('td');

            // for rows
            if (Array.from(row).every(cell => cell.classList.contains('marked'))) cnt++;  

            for (let j = 0; j < size; j++) {
                if (row[j].classList.contains('marked')) {
                    cols[j].push(row[j]);   //jth column me row ka jth element
                }
            }

            if (row[i].classList.contains('marked')) {
                diag1.push(row[i]);
            }

            if (row[size - i - 1].classList.contains('marked')) {
                diag2.push(row[size - i - 1]);
            }
        }
        // for columns
        for (let j = 0; j < size; j++) {
            if (cols[j].length === size) cnt++;
        }
        // for diagonals
        if (diag1.length === size) cnt++;
        if (diag2.length === size) cnt++;

        return cnt >= 5;
    };

    const resetGame = () => {
        generateBoard(player1Board);
        generateBoard(player2Board);
        message.textContent = '';
        markButton.disabled = false;
        p1=true;
        chance.textContent = 'Player 1 Turn';
    };

    markButton.addEventListener('click', () => {
        if(p1){
            
            const number = numberInput.value;
            
            if (number < 1 || number > 25) {
                message.textContent = 'Please enter a valid number between 1 and 25';
                return;
            }
            
            let a=markNumber(player1Board, number);
            a&=markNumber(player2Board, number);
            
            if (checkWinner(player1Board)) {
                message.textContent = 'Player 1 wins!';
                markButton.disabled = true;
            } else if (checkWinner(player2Board)) {
                message.textContent = 'Player 2 wins!';
                markButton.disabled = true;
            } else {
                message.textContent = '';
            }
            numberInput.value = '';
            if(a){
            p1=!p1;
            chance.textContent = 'Player 2 Turn';
            }
            else{
                alert('Please Enter Unmarked Number')
            } 
        }
        else{
            
            const number = numberInput.value;
            if (number < 1 || number > 25) {
                message.textContent = 'Please enter a valid number between 1 and 25';
                return;
            }

            let a=markNumber(player2Board, number);
            a&=markNumber(player1Board, number);

            if (checkWinner(player2Board)) {
                message.textContent = 'Player 2 wins!';
                markButton.disabled = true;
            } else if (checkWinner(player1Board)) {
                message.textContent = 'Player 1 wins!';
                markButton.disabled = true;
            } else {
                message.textContent = '';
            }

            numberInput.value = '';
            if(a){
                p1=!p1;
                chance.textContent = 'Player 1 Turn';
            }
            else{
                alert('Please Enter Unmarked Number')
            }    
            
        }
    });

    newGameButton.addEventListener('click', resetGame);

    // Initialize the game
    resetGame();
});

function toggleBoard(boardId) {
    const board = document.getElementById(boardId);
    if (board.style.display === 'none' || board.style.display === '') {
        board.style.display = 'table';
    } else {
        board.style.display = 'none';
    }
}