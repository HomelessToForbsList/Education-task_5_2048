import React from 'react';
import './App.css';

import Item from './components/Item';

import Matrix from './Matrix';

import { CSSTransition, TransitionGroup } from "react-transition-group";

const pressedBtn = {
  background: '#e0e0e0',
  boxShadow: 'inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2), inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5)',
  fontSize: '22px'
}

const unpressedBtn = {
  background: '#e0e0e0',
  boxShadow: '7px 7px 14px #bebebe,-7px -7px 14px #ffffff'
}

function App() {

  const [game, setGame] = React.useState(1)

  //const grid = React.useMemo(() => new Matrix([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]), [game])
  //[2, 4, 8, 16], [4, 2, 16, 8], [8, 16, 2, 4], [5, 5, 4, 16]
  //[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]

  const ref = React.useRef(new Matrix())
  const grid = ref.current


  const [gridData, setGridData] = React.useState([])
  const [counter, setCounter] = React.useState(0)
  const [endGame, setEndGame] = React.useState(false)
  const [bestScore, setBestScore] = React.useState(0)

  const [btnNewStyle, setBtnNewStyle] = React.useState(unpressedBtn)
  const [btnCloseStyle, setBtnCloseStyle] = React.useState(unpressedBtn)



  const sum = grid.sumValues.bind(grid)
  const move = grid.moveZero.bind(grid)
  const change = grid.changeArray.bind(grid)
  const add = grid.createValue.bind(grid)
  const updateData = grid.updateData.bind(grid)

  React.useEffect(() => {
    updateData()
    add()
    add()
    setGridData(prev => compareArrays(prev, grid.data))
    setCounter(grid.count)
    setBestScore(grid.bestScore.sort((a, b) => b - a)[0])
  }, [game])

  React.useEffect(() => {
    window.addEventListener('keydown', e => {
      switch (true) {
        case e.key === 'ArrowUp':
          up()
          break;
        case e.key === 'ArrowDown':
          down()
          break;
        case e.key === 'ArrowLeft':
          left()
          break;
        case e.key === 'ArrowRight':
          right()
          break;
        default:
          break;
      }
    })
  }, [])


  function compareArrays(prev, next) {
    let result = []
    if (prev.length < 1) {
      next.forEach(el => {
        el.forEach(item => result.push({ id: Math.random(), value: item }))
      })
    }
    else {
      let index = 0
      next.forEach(arr => {
        arr.forEach(el => {
          if (el !== prev[index].value) {
            result.push({ id: Math.random(), value: el })
            index++
          }
          else {
            result.push(prev[index])
            index++
          }
        })
      })
    }
    return result
  }


  const left = function () {
    sum(false)
    move(false)
    setGridData(prev => compareArrays(prev, grid.data))
    setCounter(grid.count)
    setTimeout(() => {
      add()
      setEndGame(grid.endGame)
      setGridData(prev => compareArrays(prev, grid.data))
    }, 300)
  }

  const right = function () {
    sum(true)
    move(true)
    setGridData(prev => compareArrays(prev, grid.data))
    setCounter(grid.count)
    setTimeout(() => {
      add()
      setEndGame(grid.endGame)
      setGridData(prev => compareArrays(prev, grid.data))
    }, 300)
  }

  const up = function () {
    change()
    sum(false)
    move(false)
    change()
    setGridData(prev => compareArrays(prev, grid.data))
    setCounter(grid.count)
    setTimeout(() => {
      add()
      setEndGame(grid.endGame)
      setGridData(prev => compareArrays(prev, grid.data))
    }, 300)
  }

  const down = function () {
    change()
    sum(true)
    move(true)
    change()
    setGridData(prev => compareArrays(prev, grid.data))
    setCounter(grid.count)
    setTimeout(() => {
      add()
      setEndGame(grid.endGame)
      setGridData(prev => compareArrays(prev, grid.data))
    }, 300)
  }



  return (
    <div className="App" >
      <div className='squere' >
        <TransitionGroup className='box'>
          {gridData.map(obj =>
            <CSSTransition key={obj.id} timeout={{
              appear: 500,
              enter: 1500,
              exit: 0,
            }} classNames={obj.value === 0 ? '' : 'i'} >
              <Item key={Math.random()} value={obj.value !== 0 ? obj.value : null}></Item>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
      <div className='info'>
        <div className='counter'>
          <p>Total: {counter}</p>
        </div>
        <div className='best_score'>
          <p>Best score: {bestScore}</p>
        </div>
      </div>
      <div className='bg'>
        <p>20</p>
        <p>48</p>
      </div>
      {endGame &&
        <div className='popup_wrapper'>
          <div className='popup'>
            <h1>Game over</h1>
            <div>
              <button
                style={btnNewStyle}
                onMouseDown={() => setBtnNewStyle(pressedBtn)}
                onMouseUp={() => setBtnNewStyle(unpressedBtn)}
                onClick={() => {
                  setGame(prev => prev + 1)
                  setEndGame(prev => !prev)
                }}
              >
                New game
              </button>
              <button
                style={btnCloseStyle}
                onMouseDown={() => setBtnCloseStyle(pressedBtn)}
                onMouseUp={() => setBtnCloseStyle(unpressedBtn)}
                onClick={() => setEndGame(prev => !prev)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
