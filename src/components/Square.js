import React from 'react';

function Square(props) {
    const squareClass = `square ${props.winner}`;
  return (
    <button className={squareClass} onClick={props.onClick}>{props.value}</button>
  );
} 

export default Square;