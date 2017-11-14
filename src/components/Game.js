import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveLocation: '',
            }], 
            xIsNext: true,
            stepNumber: 0,
            moves: [
                'Game Start'
            ],
            isReverse: false,
        };
    }
  
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const moveLocation = [Math.floor(i / 5) + 1, (i % 5) + 1].join(", ");
        squares[i] = this.state.xIsNext ? 'X' : 'O';
    
        this.setState({
            history: history.concat([{
            squares: squares,
            moveLocation: moveLocation,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }
    jumpTo(step) {
        this.setState({
        stepNumber: step,
        xIsNext: (step % 2) ? false : true,
        });
    }
    changeReverse(isReverse){
        this.setState({
            isReverse: !isReverse
        });
    }
 
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
    
        let status;
        if (winner) {
            status = "Winner is: " + winner.winnerPlayer;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
            const description = move ? `Move #${move} (${step.moveLocation})` : 'Game start'; // Thêm moveLocation vào
            return <li key={move}><button onClick={() => this.jumpTo(move)}>{description}</button></li>
        });
        
        return (
            <div className="game">
                <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)} winner={winner && winner.winnerLocation}
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol reversed={this.state.isReverse ? 'reverse' :''}>{this.state.isReverse ? moves.reverse() : moves}</ol>
                    <button onClick={() => this.changeReverse(this.state.isReverse)}>Reverse list</button>
                </div>
            </div>
        );
    }
}
// ========================================

function calculateWinner(squares) {
    let lines = [];
    let cellInRows = 5;
    // check row
    for (let i=0; i < cellInRows; i++)
    {
         lines.push([cellInRows*i+0, cellInRows*i+1, cellInRows*i+2, cellInRows*i+3, cellInRows*i+4]);
    }
    // check colum
    for (let i=0; i < cellInRows; i++)
    {
        lines.push([cellInRows*0+i, cellInRows*1+i, cellInRows*2+i, cellInRows*3+i, cellInRows*4+i]);
    }
    lines.push([0,6,12,18,24],[4,8,12,16,20]);
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            return {
                winnerLocation: [a,b,c,d,e],
                winnerPlayer: squares[a]
            };
        }
    }
    return null;
}

export default Game;