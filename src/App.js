import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import whitePawn from './Assets/whitePawn.png';
import pawn from './Assets/Pawn.png';

function App() {
  const [divInfo, setDivInfo] = useState([]);
  const [size, setSize] = useState(8);
  const [pieceToMove, setPieceToMove] = useState(-1);
  const [pieceSelected, setPieceSelected] = useState(false); 
  const [initial, setInitial] = useState(true);
  const [currentPiece, setCurrentPiece] = useState();

  

  const prepareBoard = () => {
    let tempArray = [];
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) {
        if ((i % 2 == 0 && j % 2 != 0) || ( i % 2 != 0 && j % 2 == 0)) {
          if(i == 7)
          tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "wp" });
          else if (i == 2)
          tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "bp" });
          else
          tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "" });
          
        } else {
          if(i == 7)
          tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "wp" });
          else if (i == 2)
          tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "bp" });
          else
          tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "" });
        }
      }
    }
    console.log(divInfo);
    setDivInfo(tempArray);
  }
  const makeBoard = () => {
    divInfo.map((divInfo, index) => {
      return (
        createDivs(index, divInfo.name, index, divInfo.row, divInfo.column, divInfo.piece)
      )
    }
    )
  }
  function handleClick(value) {
    console.log(value + " was clicked");
    console.log("CURRENT PIECE TEST: " + currentPiece)
    if(pieceSelected){
      if(pieceToMove != value && (divInfo[value].piece == "" || divInfo[value].piece[0] != divInfo[pieceToMove].piece[0])){ // update this to check for if square contains same color piece as player currently moving aka friendly fire
      updateDivInfo(pieceToMove, value);
      // document.getElementById(value).style.backgroundImage=`${currentPiece}`;
      // document.getElementById(value).style.backgroundSize= 'cover';
      // document.getElementById(value).style.backgroundPosition= "center";


      // document.getElementById(pieceToMove).style.backgroundImage="none";
      }
      // document.getElementById(pieceToMove).style.backgroundBlendMode= 'soft-light';

      setPieceToMove(-1);
      setPieceSelected(false);
      setCurrentPiece(null);
      return;
    }
    if(divInfo[value].piece != ""){
    setPieceToMove(value);
    // document.getElementById(value).style.backgroundBlendMode= "color-dodge";
    setPieceSelected(true);
    setCurrentPiece(document.getElementById(value).style.backgroundImage);
    console.log("IMAGE TEST: " + document.getElementById(value).style.backgroundImage);

    }
  }
  function updateDivInfo(oldNum, newNum){
    let tempArray = divInfo;
    let tempObject = divInfo[oldNum];
    tempArray[oldNum] = { name: (tempArray[oldNum].name), row: (tempArray[oldNum].row), column: (tempArray[oldNum].column), piece: "" }
    tempArray[newNum] = { name: (tempArray[newNum].name), row: (tempArray[newNum].row), column: (tempArray[newNum].column), piece: (tempObject.piece) }

    setDivInfo(tempArray);
  }

  function randomizePawns(){
    let tempArray = divInfo;
    for(let i = 0 ; i < tempArray.length; i++){
      if(Math.floor(Math.random() * 2) == 1)
      tempArray[i] = { name: (tempArray[i].name), row: (tempArray[i].row), column: (tempArray[i].column), piece: "wp" }
      else
      tempArray[i] = { name: (tempArray[i].name), row: (tempArray[i].row), column: (tempArray[i].column), piece: "" }


    }
    setDivInfo(tempArray);

    console.log("TEST RANDO");

  }

  function createDivs(html, name, index, row, col, piece){
    // console.log("R/C TEST: " + row + " " + col)
      const ele = document.createElement('div');
      ele.id = index;
      if(row == 7 && initial || piece =="wp"){
        ele.style.backgroundImage=`url(${whitePawn})`;
        ele.style.backgroundSize= 'cover';
        ele.style.backgroundPosition= "center";
      }
      if(row == 2 && initial || piece == "bp"){
        ele.style.backgroundImage=`url(${pawn})`;
        ele.style.backgroundSize= 'cover';
        ele.style.backgroundPosition= "right";
      }
      else {
      ele.innerHTML = html;
      }

      if(pieceToMove == index)
      ele.style.border="dashed";
      else
      ele.style.border="none";



      ele.style.backgroundBlendMode="soft-light";

      ele.classList.add(name);
      ele.onclick=()=>handleClick(html);
  

      document.querySelector('.App-chessboard').append(ele);
      ele.style.gridRow = `${row}`;
      ele.style.gridColumn = `${col}`;

      setInitial(false);


      return ele;
  }

  useEffect(() => {
    setDivInfo([])
    document.querySelector(".App-chessboard").innerHTML = "";
    prepareBoard()
  }, [size])

  useEffect(() => {
    document.querySelector(".App-chessboard").innerHTML = "";

    makeBoard()
  }, [divInfo, pieceSelected, pieceToMove, currentPiece])

  return (
    <div style={{ margin: "200px", justifyContent: "center" }}>
      <h1 style={{ display:"flex", alignItems: "center", justifyContent: "center"}}>Welcome to the Checkerboard Generator!</h1>
      <h1 style={{ display:"flex", alignItems: "center", justifyContent: "center"}}>
        <img src={whitePawn} style={{height: "100px", width: "100px"}} />
      <input type="number" placeholder="Enter Size" onChange={(e) => setSize(e.target.value)}/>
      </h1>
      <div className="App-chessboard">

      </div>
    <button style={{}} onClick={() => randomizePawns()}>DO NOT CLICK</button>
    </div>
  );
}

export default App;
