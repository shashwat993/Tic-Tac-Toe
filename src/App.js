import React, { useState } from 'react';

const Square = ({value,clickValue}) => {
  const buttonstyle={
    width:'20px',
    height:'20px',
    fontSize:'10px',
    padding:'1px'
  }

  return (
    
    <button style={buttonstyle} className='button btn btn-outline-dark m-1' onClick={clickValue}>
      {value}
    </button>
  );
};

const Board = () => {
  const [next ,setNext]=useState(true);
  const [square, setSquare] = useState(Array(9).fill(null));

  const clickHandle = (i) => {
    const nextSquares = square.slice();
    if(square[i] || CheckWinner(square)){
      return;
    }
    if(next){
      nextSquares[i] = 'X';
    }
    else{
      nextSquares[i]='O';
    }
    setSquare(nextSquares);
    setNext(!next);
  };
  const winner = CheckWinner(square);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } 
  else if(square[0] &&square[1]&&square[2]&&square[3]&&square[4]&&square[5]&&square[6]&&square[7]&&square[8]){
    status='Draw';
  }
  else{
    status = 'Next player: ' + (next ? 'X' : 'O');
  }
  const resetGame = () => {
    setSquare(Array(9).fill(null));
    setNext(true);
  };
  const playAgainButtonStyle = {
    fontSize: '8px',
    padding: '3px 5px'
  };

 
  return (
    <div className='col-md-6 offset-md-3 text-center mt-5'>
      <div className='text-success text-bold' > {status}</div>
      <div>
        <Square value={square[0]} clickValue={()=>clickHandle(0)} />
        <Square value={square[1]} clickValue={()=>clickHandle(1)} />
        <Square value={square[2]} clickValue={()=>clickHandle(2)} />
      </div>
      <div>
      <Square value={square[3]} clickValue={()=>clickHandle(3)} />
      <Square value={square[4]} clickValue={()=>clickHandle(4)} />
      <Square value={square[5]} clickValue={()=>clickHandle(5)} />
      </div>
      <div>
      <Square value={square[6]} clickValue={()=>clickHandle(6)} />
      <Square value={square[7]} clickValue={()=>clickHandle(7)} />
      <Square value={square[8]} clickValue={()=>clickHandle(8)} />
      </div>
     <div >
     {winner || square.every((val) => val) ? (
        <button className='button btn btn-outline-dark ' style={playAgainButtonStyle} onClick={resetGame}>
          Play Again
        </button>
      ) : null}
     </div>
    </div>

    
   
  );
};

function CheckWinner(square){
  const line=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0;i<line.length;i++){
    const [a,b,c]=line[i];

    if(square[a] && square[a]===square[b] && square[a] === square[c]){
      return square[a];
    }
  }
  return null;

  

}
export default Board;
