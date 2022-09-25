import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import whitePawn from './Assets/whitePawn.png';
import pawn from './Assets/Pawn.png';

function App() {
  const [divInfo, setDivInfo] = useState([]);
  const [size, setSize] = useState(8);
  const [spaceSelected, setSpaceSelected] = useState(-1);
  const [isPieceSelected, setIsPieceSelected] = useState(false); 
  const [initial, setInitial] = useState(true);
  const [currentPiece, setCurrentPiece] = useState();
  const [singlePieceMoves, setSinglePieceMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("w");

  

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

  function createDivs(html, name, index, row, col, piece){
    console.log("TEST AVAILABLE MOVES: " + singlePieceMoves);
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
      if(singlePieceMoves.includes(index)){
        ele.style.backgroundColor = "#228B22";
      }
      if(spaceSelected == index)
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

  function handleClick(value) {
    console.log(value + " was clicked");
    console.log("CURRENT PIECE TEST: " + currentPiece)
    if(isPieceSelected){
      if(spaceSelected != value && (divInfo[value].piece == "" || divInfo[value].piece[0] != divInfo[spaceSelected].piece[0]) && singlePieceMoves.includes(value)){ // update this to check for if square contains same color piece as player currently moving aka friendly fire
      updateDivInfo(spaceSelected, value);
      flipBoard();
      }
      setSinglePieceMoves([]);
      setSpaceSelected(-1);
      setIsPieceSelected(false);
      setCurrentPiece(null);
      return;
    }
    if(divInfo[value].piece != "" && divInfo[value].piece[0] == currentPlayer){
    findAvailableMoves(value);
    setSpaceSelected(value);
    setIsPieceSelected(true);
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

  function findAvailableMoves(spaceNum){
    let tempArray = [];
    if(divInfo[spaceNum].piece[1] == "p"){
      if(divInfo[spaceNum - 8].piece == "")
      tempArray.push(spaceNum - 8);
      if(spaceNum > 48){
        tempArray.push(spaceNum - 16);
      }
      if(divInfo[spaceNum - 7].piece[0] != divInfo[spaceNum].piece[0] && divInfo[spaceNum - 7].piece != ""){ // will need to upadte this to account for enemy regardless of color
        tempArray.push(spaceNum - 7);
      }
      if(divInfo[spaceNum - 9].piece[0] != divInfo[spaceNum].piece[0] && divInfo[spaceNum - 9].piece != ""){ // will need to upadte this to account for enemy regardless of color
        tempArray.push(spaceNum - 9);
      }
      setSinglePieceMoves(tempArray);
    }
  }

  function flipBoard(){
    let tempArray = [...divInfo];
    tempArray.reverse();
    setDivInfo(tempArray);
    console.log("divInfo 1:" + divInfo[12].piece);
    console.log("divInfo 2:" + divInfo.reverse()[12].piece);
    console.log("CURRENT PLAYER: " + currentPlayer);
    if(currentPlayer == "w")
      setCurrentPlayer("b")
    else
      setCurrentPlayer("w");

  }
  function flipView(){
    // TODO: create method to see the board from blacks perspective
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

  }

  useEffect(() => {
    setDivInfo([])
    document.querySelector(".App-chessboard").innerHTML = "";
    prepareBoard()
  }, [size])

  useEffect(() => {
    document.querySelector(".App-chessboard").innerHTML = "";

    makeBoard()
  }, [divInfo, isPieceSelected, spaceSelected, currentPlayer])

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
    <button style={{}} onClick={() => flipBoard()}>Flip Board</button>

    </div>
  );
}

export default App;
