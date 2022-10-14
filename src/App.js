import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import whitePawn from './Assets/whitePawn.jpg';
import pawn from './Assets/blackPawn.jpg';
import blackRook from './Assets/blackRook.jpg';
import whiteRook from './Assets/whiteRook.jpg';
import blackBishop from './Assets/blackBishop.jpg';
import whiteBishop from './Assets/whiteBishop.jpg';
import blackQueen from './Assets/blackQueen.jpg';
import whiteQueen from './Assets/whiteQueen.jpg';
import blackKnight from './Assets/blackKnight.jpg';
import whiteKnight from './Assets/whiteKnight.jpg';
import blackKing from './Assets/blackKing.jpg';
import whiteKing from './Assets/whiteKing.jpg';




function App() {
  const [divInfo, setDivInfo] = useState([]);
  const [size, setSize] = useState(8);
  const [spaceSelected, setSpaceSelected] = useState(-1);
  const [isPieceSelected, setIsPieceSelected] = useState(false);
  const [currentPiece, setCurrentPiece] = useState();
  const [singlePieceMoves, setSinglePieceMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("w");
  const [isFlipped, setIsFlipped] = useState(false);
  const [random, setRandom] = useState(false);
  const [allMoves, setAllMoves] = useState([]);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );



  const prepareBoard = () => {
    let tempArray = [];
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) {
        if ((i % 2 == 0 && j % 2 != 0) || (i % 2 != 0 && j % 2 == 0)) {
          if (i == 7)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "wp" });
          else if (i == 2)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "bp" });
          else if (i == 1 && j == 8)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "br" });
          else if (i == 8 && j == 1)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "wr" });
          else if (i == 1 && j == 6)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "bb" });
          else if (i == 8 && j == 3)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "wb" });
          else if (i == 1 && j == 4)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "bq" });
          else if (i == 1 && j == 2)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "bn" });
          else if (i == 8 && j == 7)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "wn" });
          else if (i == 8 && j == 5)
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "wk" });
          else
            tempArray.push({ name: "App-item-black-tile", row: (i), column: (j), piece: "" });

        } else {
          if (i == 7)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "wp" });
          else if (i == 2)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "bp" });
          else if (i == 1 && j == 1)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "br" });
          else if (i == 8 && j == 8)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "wr" });
          else if (i == 1 && j == 3)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "bb" });
          else if (i == 8 && j == 6)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "wb" });
          else if (i == 8 && j == 4)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "wq" });
          else if (i == 1 && j == 7)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "bn" });
          else if (i == 8 && j == 2)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "wn" });
          else if (i == 1 && j == 5)
            tempArray.push({ name: "App-item-white-tile", row: (i), column: (j), piece: "bk" });
          
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

  function createDivs(html, name, index, row, col, piece) {
    console.log("TEST AVAILABLE MOVES: " + singlePieceMoves);
    // console.log("R/C TEST: " + row + " " + col)
    const ele = document.createElement('div');
    ele.id = index;
    if (piece == "wp") {
      ele.style.backgroundImage = `url(${whitePawn})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "center";
    }
    if (piece == "bp") {
      ele.style.backgroundImage = `url(${pawn})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "br") {
      ele.style.backgroundImage = `url(${blackRook})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "wr") {
      ele.style.backgroundImage = `url(${whiteRook})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "bb") {
      ele.style.backgroundImage = `url(${blackBishop})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "wb") {
      ele.style.backgroundImage = `url(${whiteBishop})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "bq") {
      ele.style.backgroundImage = `url(${blackQueen})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "wq") {
      ele.style.backgroundImage = `url(${whiteQueen})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "bn") {
      ele.style.backgroundImage = `url(${blackKnight})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "wn") {
      ele.style.backgroundImage = `url(${whiteKnight})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "bk") {
      ele.style.backgroundImage = `url(${blackKing})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    if (piece == "wk") {
      ele.style.backgroundImage = `url(${whiteKing})`;
      ele.style.backgroundSize = 'cover';
      ele.style.backgroundPosition = "right";
    }
    else {
      ele.innerHTML = html;
    }
    if (singlePieceMoves.includes(index)) {
      ele.style.backgroundColor = "#228B22";
    }
    if (spaceSelected == index)
      ele.style.border = "dashed";
    else
      ele.style.border = "none";

    if (document.querySelector(".App-chessboard").style.transform == "rotate(180deg)") {
      ele.style.transform = "rotate(180deg)";

    }
    else {
      ele.style.transform = "rotate(0deg)";
    }


    ele.style.backgroundBlendMode = "soft-light";

    ele.classList.add(name);
    ele.onclick = () => handleClick(index);


    document.querySelector('.App-chessboard').append(ele);
    ele.style.gridRow = `${row}`;
    ele.style.gridColumn = `${col}`;


    return ele;
  }
  
  function generateMove(){
    let randomNumber = Math.floor(Math.random() * 64);
    console.log("RAND NUMB: " + randomNumber);
    if(divInfo[randomNumber].piece[0] != currentPlayer){
    generateMove();
    }
    else{
    handleClick(randomNumber);
    setRandom(true);
    }
  }

  function finishMove(){
    if(singlePieceMoves.length <= 0){
      
      generateMove()
      }
      else{ 
      let move = Math.floor(Math.random() * singlePieceMoves.length);
      console.log("RAND NUMB MOVE: " + move);
      console.log("RAND NUMB MOVE SPACE RESULT: " + singlePieceMoves[move]);
  
      handleClick(singlePieceMoves[move]);
      }
  }

  function handleClick(value) {
    console.log(value + " was clicked");
    console.log("row: " + divInfo[value].row + " || col: " + divInfo[value].column);
    console.log("CURRENT PIECE TEST: " + currentPiece);
    console.log("PIECE TEST %%%%%>>> : " + divInfo[value].piece);
    if (isPieceSelected) {
      if (spaceSelected != value && (divInfo[value].piece == "" || divInfo[value].piece[0] != divInfo[spaceSelected].piece[0]) && singlePieceMoves.includes(value)) { // update this to check for if square contains same color piece as player currently moving aka friendly fire
        updateDivInfo(spaceSelected, value);
        flipBoard();
      }
      setSinglePieceMoves([]);
      setSpaceSelected(-1);
      setIsPieceSelected(false);
      setCurrentPiece(null);
      return;
    }
    if (divInfo[value].piece != "" && divInfo[value].piece[0] == currentPlayer) {
      findAvailableMoves(value);
      setSpaceSelected(value);
      setIsPieceSelected(true);
      setCurrentPiece(document.getElementById(value).style.backgroundImage);
      console.log("IMAGE TEST: " + document.getElementById(value).style.backgroundImage);

    }
  }

  function updateDivInfo(oldNum, newNum) {
    let tempArray = divInfo;
    let tempObject = divInfo[oldNum];
    tempArray[oldNum] = { name: (tempArray[oldNum].name), row: (tempArray[oldNum].row), column: (tempArray[oldNum].column), piece: "" }
    tempArray[newNum] = { name: (tempArray[newNum].name), row: (tempArray[newNum].row), column: (tempArray[newNum].column), piece: (tempObject.piece) }

    setDivInfo(tempArray);
  }

  function findAvailableMoves(spaceNum) {
    let tempArray = [];
    if (divInfo[spaceNum].piece[1] == "p") {
      if (divInfo[spaceNum - 8].piece == "")
        tempArray.push(spaceNum - 8);
      if (spaceNum >= 48) {
        if (divInfo[spaceNum - 8].piece == "" && divInfo[spaceNum - 16].piece == "")
        tempArray.push(spaceNum - 16);
      }
      if (divInfo[spaceNum - 7].piece[0] != divInfo[spaceNum].piece[0] && divInfo[spaceNum - 7].piece != "") {
        tempArray.push(spaceNum - 7);
      }
      if (divInfo[spaceNum - 9].piece[0] != divInfo[spaceNum].piece[0] && divInfo[spaceNum - 9].piece != "") {
        tempArray.push(spaceNum - 9);
      }

    }
    if (divInfo[spaceNum].piece[1] == "r" || divInfo[spaceNum].piece[1] == "q") {

      if(currentPlayer == "b"){

      // down
      for (let i = 1; i <= size - divInfo[spaceNum].row; i++) {
        if (divInfo[spaceNum - (8 * i)].piece[0] != currentPlayer) {
          tempArray.push(spaceNum - (8 * i));
          if (divInfo[spaceNum - (8 * i)].piece != "")
            break;
        }
        else {
          break;
        }
      }
      // up
      for (let i = 1; i < divInfo[spaceNum].row; i++) {
        if (divInfo[spaceNum + (8 * i)].piece[0] != currentPlayer) {
          tempArray.push(spaceNum + (8 * i));
          if (divInfo[spaceNum + (8 * i)].piece != "")
            break;
        }
        else {
          break;
        }

      }
      // left
      for (let i = 1; i < divInfo[spaceNum].column; i++) {
        if (divInfo[spaceNum + i].piece[0] != currentPlayer) {
          tempArray.push(spaceNum + i);
          if (divInfo[spaceNum + i].piece != "")
            break;
        }
        else {
          break;
        }
      }
      
      // right
      for (let i = 1; i <= size - divInfo[spaceNum].column; i++) {
        if (divInfo[spaceNum - i].piece[0] != currentPlayer) {
          tempArray.push(spaceNum - i);
          if (divInfo[spaceNum - i].piece != "")
            break;
        }
        else {
          break;
        }
      }
    }
    else{
       // down
       for (let i = 1; i < divInfo[spaceNum].row; i++) {
        if (divInfo[spaceNum - (8 * i)].piece[0] != currentPlayer) {
          tempArray.push(spaceNum - (8 * i));
          if (divInfo[spaceNum - (8 * i)].piece != "")
            break;
        }
        else {
          break;
        }
      }
      // up
      for (let i = 1; i <= size - divInfo[spaceNum].row; i++) {
        if (divInfo[spaceNum + (8 * i)].piece[0] != currentPlayer) {
          tempArray.push(spaceNum + (8 * i));
          if (divInfo[spaceNum + (8 * i)].piece != "")
            break;
        }
        else {
          break;
        }

      }
      // left 
      for (let i = 1; i <= size - divInfo[spaceNum].column; i++) {
        if (divInfo[spaceNum + i].piece[0] != currentPlayer) {
          tempArray.push(spaceNum + i);
          if (divInfo[spaceNum + i].piece != "")
            break;
        }
        else {
          break;
        }
      }
      // right
      for (let i = 1; i < divInfo[spaceNum].column; i++) {
        if (divInfo[spaceNum - i].piece[0] != currentPlayer) {
          tempArray.push(spaceNum - i);
          if (divInfo[spaceNum - i].piece != "")
            break;
        }
        else {
          break;
        }
      }
    }
    
    }
    if(divInfo[spaceNum].piece[1] == "b" || divInfo[spaceNum].piece[1] == "q"){

      // down right (b) / up left (w)
      for(let i = 1; i <= size; i++){
        if((divInfo[spaceNum].row >= 8 || divInfo[spaceNum].column >= 8) && (currentPlayer == "b"))
          break;
        if((divInfo[spaceNum].row <= 1 || divInfo[spaceNum].column <= 1) && (currentPlayer == "w"))
          break;
        
        if (divInfo[spaceNum - (9 * i)].piece[0] != currentPlayer) {
          tempArray.push(spaceNum - (9 * i));
          if (divInfo[spaceNum - (9 * i)].piece != "" || divInfo[spaceNum - (9 * i)].row <= 1 || divInfo[spaceNum - (9 * i)].column <= 1 || divInfo[spaceNum - (9 * i)].row >= 8 || divInfo[spaceNum - (9 * i)].column >= 8)
            break;
        }
        else {
          break;
        }
      }
      // up left (b) / down right (w)
      for(let i = 1; i <= size; i++){

        if((divInfo[spaceNum].row <= 1 || divInfo[spaceNum].column <= 1) && (currentPlayer == "b"))
          break;
        if((divInfo[spaceNum].row >= 8 || divInfo[spaceNum].column >= 8) && (currentPlayer == "w"))
          break;
        
        if (divInfo[spaceNum + (9 * i)].piece[0] != currentPlayer) {
          tempArray.push(spaceNum + (9 * i));
          if (divInfo[spaceNum + (9 * i)].piece != "" || divInfo[spaceNum + (9 * i)].row <= 1 || divInfo[spaceNum + (9 * i)].column <= 1 || divInfo[spaceNum + (9 * i)].row >= 8 || divInfo[spaceNum + (9 * i)].column >= 8)
            break;
        }
        else {
          break;
        }
      }
      // up right (b) / down left (w)
      for(let i = 1; i <= size; i++){
        if((divInfo[spaceNum].row <= 1 || divInfo[spaceNum].column >= 8) && (currentPlayer == "b"))
          break;
        if((divInfo[spaceNum].column <= 1 || divInfo[spaceNum].row >= 8) && (currentPlayer == "w"))
          break;
        if (divInfo[spaceNum + (7 * i)].piece[0] != currentPlayer) {
          tempArray.push(spaceNum + (7 * i));
          if (divInfo[spaceNum + (7 * i)].piece != "" || divInfo[spaceNum + (7 * i)].row <= 1 || divInfo[spaceNum + (7 * i)].column <= 1 || divInfo[spaceNum + (7 * i)].row >= 8 || divInfo[spaceNum + (7 * i)].column >= 8)
            break;
        }
        else {
          break;
        }
      }
      //  down left (b) /  up right (w)
      for(let i = 1; i <= size; i++){
        if((divInfo[spaceNum].column <= 1 || divInfo[spaceNum].row >= 8) && (currentPlayer == "b"))
          break;
        if((divInfo[spaceNum].row <= 1 || divInfo[spaceNum].column >= 8) && (currentPlayer == "w"))
          break;
        if (divInfo[spaceNum - (7 * i)].piece[0] != currentPlayer) {
          tempArray.push(spaceNum - (7 * i));
          if (divInfo[spaceNum - (7 * i)].piece != "" || divInfo[spaceNum - (7 * i)].row <= 1 || divInfo[spaceNum - (7 * i)].column <= 1 || divInfo[spaceNum - (7 * i)].row >= 8 || divInfo[spaceNum - (7 * i)].column >= 8)
            break;
        }
        else {
          break;
        }
      }
    }

    // KNIGHT

    if (divInfo[spaceNum].piece[1] == "n") {

       for(let i = 0; i < divInfo.length; i++){
        if(divInfo[i].row == (divInfo[spaceNum].row + 2) || divInfo[i].row == (divInfo[spaceNum].row - 2)){
          if((divInfo[i].column == (divInfo[spaceNum].column + 1) || divInfo[i].column == (divInfo[spaceNum].column - 1))){
            if(divInfo[i].piece[0] != currentPlayer)
            tempArray.push(i);
          }
        }
        if(divInfo[i].row == (divInfo[spaceNum].row + 1) || divInfo[i].row == (divInfo[spaceNum].row - 1)){
          if((divInfo[i].column == (divInfo[spaceNum].column + 2) || divInfo[i].column == (divInfo[spaceNum].column - 2))){
            if(divInfo[i].piece[0] != currentPlayer)
            tempArray.push(i);
          }
        }
       }

    }
    setSinglePieceMoves(tempArray);
    setAllMoves(current => [...current, tempArray]);

  }

  function flipBoard() {
    let tempArray = [...divInfo];
    tempArray.reverse();
    setDivInfo(tempArray);
    console.log("CURRENT PLAYER: " + currentPlayer);
    if (currentPlayer == "w")
      setCurrentPlayer("b")
    else
      setCurrentPlayer("w");

    setAllMoves([]);

  }

  function flipView() {
    if (document.querySelector(".App-chessboard").style.transform == "rotate(180deg)") {
      document.querySelector(".App-chessboard").style.transform = "rotate(0deg)";
      setIsFlipped(false);
    }
    else {
      document.querySelector(".App-chessboard").style.transform = "rotate(180deg)";
      setIsFlipped(true);
    }

    console.log("LIL FLIP");
  }

  const findAllMoves = () => {
    for(let i = 0; i < divInfo.length; i++){
      if(divInfo[i].piece[0] == currentPlayer){
        console.log(491);
        findAvailableMoves(i);
      }
    }
    console.log("MOVE TEST: " + allMoves)

  }


  useEffect(() => {
    setDivInfo([])
    document.querySelector(".App-chessboard").innerHTML = "";
    prepareBoard()
  }, [size])

  useEffect(() => {
    document.querySelector(".App-chessboard").innerHTML = "";
    // if(random == true){
    //   setRandom(false)
    //   finishMove()
    // }

    makeBoard()
  }, [divInfo, isPieceSelected, spaceSelected, currentPlayer, isFlipped])

  useEffect(() => {
if(random == true){
      setRandom(false)
      finishMove()
    }
  }, [isPieceSelected])

  return (
    <div style={{ margin: "200px", justifyContent: "center" }}>
      <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Welcome to the Checkerboard Generator!</h1>
      <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={whitePawn} style={{ height: "100px", width: "100px" }} />
        <input type="number" placeholder="Enter Size" onChange={(e) => setSize(e.target.value)} />
      </h1>
      <div className="App-chessboard">

      </div>
      <button style={{}} onClick={() => flipBoard()}>Flip Board</button>
      <button style={{}} onClick={() => flipView()}>Flip Board View</button>
      <button style={{}} onClick={() => generateMove()}>Generate Move</button>
      <button style={{}} onClick={() => finishMove()}>Finish Move</button>
      <button style={{}} onClick={() => findAllMoves()}>Find All Moves</button>
      <button style={{}} onClick={() => console.log("ALL MOVES: " + allMoves)}>Log Moves</button>





    </div>
  );
}

export default App;
