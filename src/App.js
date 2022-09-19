import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [divInfo, setDivInfo] = useState([]);
  const [size, setSize] = useState(8);

  const prepareBoard = () => {
    let tempArray = [];
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) {
        if ((i % 2 == 0 && j % 2 != 0) || ( i % 2 != 0 && j % 2 == 0)) {
          tempArray.push({ name: "App-item-black-tile", row: (i), column: (j) });
        } else {
          tempArray.push({ name: "App-item-white-tile", row: (i), column: (j) });
        }
      }
    }
    console.log(divInfo);
    setDivInfo(tempArray);
  }
  const makeBoard = () => {
    divInfo.map((divInfo, index) => {
      return (
        createDivs(index, divInfo.name, divInfo.row, divInfo.column)
      )
    }
    )
  }

  function createDivs(html, name, row, col){
    console.log("R/C TEST: " + row + " " + col)
      const ele = document.createElement('div');
      ele.innerHTML = html;
      ele.classList.add(name);

      document.querySelector('.App-chessboard').append(ele);
      ele.style.gridRow = `${row}`;
      ele.style.gridColumn = `${col}`;


      return ele;
  }

  useEffect(() => {
    setDivInfo([])
    document.querySelector(".App-chessboard").innerHTML = "";
    prepareBoard()
  }, [size])

  return (
    <div style={{ margin: "200px", justifyContent: "center" }}>
      <h1 style={{ display:"flex", alignItems: "center", justifyContent: "center"}}>Welcome to the Checkerboard Generator!</h1>
      <h1 style={{ display:"flex", alignItems: "center", justifyContent: "center"}}>
      <input type="number" placeholder="Enter Size" onChange={(e) => setSize(e.target.value)}/>
      </h1>
      <div className="App-chessboard">
        {divInfo ? makeBoard() : ""}

      </div>

    </div>
  );
}

export default App;
