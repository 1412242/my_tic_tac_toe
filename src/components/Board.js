import React from 'react';
import Square from './Square';

class Board extends React.Component {
  
    renderSquare(i){
        const winner = this.props.winner;
        return <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)} winner={winner && winner.includes(i) ? 'winner' : ''}
        />
    }
    
    render() {  
        let row = [], boardRow =[], cells_in_row = 5;

        for(let i=0; i<cells_in_row; i++) {
            for (let j=0; j<cells_in_row; j++) {
                row.push(this.renderSquare(j + i * cells_in_row));
            };
            boardRow.push(<div key={i} className="board-row">{row}</div>);
            row = [];
        }
        const board = <div> {boardRow} </div>;
        return board;
    }
}

export default Board;