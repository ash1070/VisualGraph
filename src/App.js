import './App.scss';
import react, { useState, useEffect, Fragment } from 'react';
import GraphNode from './components/GraphNode';
import background from '../src/assets/images/back_night.jpg';
// import { selectOptions } from '@testing-library/user-event/dist/select-options';
// import GradientButton from 'react-native-gradient-buttons';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function App() {
  const [dummy, setdummy] = useState(0);

  const graph_size = 30;

  const [mouseDown, setmouseDown] = useState(false);
  document.body.onmousedown = function () {
    setmouseDown(true);
  };
  document.body.onmouseup = function () {
    setmouseDown(false);
  };

  const arr = [];
  for (var i = 0; i < graph_size; i++) {
    const temp = [];
    for (var j = 0; j < graph_size; j++) {
      temp.push('white');
    }
    arr.push(temp);
  }

  const [blocks, setblocks] = useState(false);
  const handleBlocks = (e) => {
    setmode('block');
    setblocks(mode);
  };

  const [typeArray, settypeArray] = useState(arr);

  const nodeArray = [];

  const [mode, setmode] = useState('start');

  const [start, setStart] = useState([0, 0]);
  const startChange = (e) => {
    console.log('mode:start');
    console.log(start);
    setmode('start');
  };

  const [end, setEnd] = useState([graph_size - 1, graph_size - 1]);
  const endChange = (e) => {
    console.log('mode:end');
    console.log(end);
    setmode('end');
  };

  for (var i = 0; i < graph_size; i++) {
    // console.log('here');
    var temp_array = [];
    for (var j = 0; j < graph_size; j++) {
      // const a = [i, j];
      temp_array.push(
        <GraphNode
          mouseState={mouseDown}
          mode={mode}
          start={start}
          end={end}
          functions={[setStart, setEnd]}
          x={i}
          y={j}
          type={typeArray}
        ></GraphNode>
      );
    }
    nodeArray.push(temp_array);
  }

  useEffect(() => {
    settypeArray(arr);
    typeArray[start[0]][start[1]] = 'blue';
    typeArray[end[0]][end[1]] = 'red';
    console.log('haha');
  }, []);

  function task2(i, t) {
    setTimeout(function () {
      typeArray[Math.floor(i / graph_size)][i % graph_size] = 'green';

      setdummy(Math.random());
      // }
    }, 10 * t);
  }

  const changeIndex = (e) => {
    var t = 0;
    let start_node = +(start[0] * +graph_size) + +start[1];
    let end_node = +end[0] * +graph_size + +end[1];

    for (var i = start_node + 1; i < end_node; i++) {
      t++;
      task2(i, t);
    }
  };

  function bfs_helper(i, j, t) {
    setTimeout(function () {
      typeArray[i][j] = '#3CB371';

      setdummy(Math.random());
      // }
    }, 10 * t);
  }

  function addNode(i, j, visited, queue) {
    if (i >= 0 && i < graph_size && j >= 0 && j < graph_size) {
      if (visited[i][j] == false && typeArray[i][j] != 'black') {
        visited[i][j] = true;
        queue.push([i, j]);
      }
    }
  }

  const BFSearch = (e) => {
    var t = 1;

    const queue = [];
    const visited = [];

    for (var i = 0; i < graph_size; i++) {
      const temp_v = [];
      for (var j = 0; j < graph_size; j++) {
        temp_v.push(false);
      }
      visited.push(temp_v);
    }
    // typeArray[start_x][start_y] = 'blue';
    // typeArray[end_x][end_y] = 'red';
    setdummy(Math.random());

    queue.push([start[0], start[1]]);

    while (queue.length > 0) {
      var top = queue.shift();
      console.log(top);
      var temp_x = +top[0];
      var temp_y = +top[1];
      visited[+temp_x][+temp_y] = true;

      if (+temp_x == +end[0] && +temp_y == +end[1]) {
        break;
      }

      if (!(t == 1)) {
        if (typeArray[start[0]][start[1]] != 'white') {
          bfs_helper(+temp_x, +temp_y, t);
        }
      }

      if (typeArray[start[0]][start[1]] != 'white') {
        t++;
      } else {
        break;
      }

      //up node
      addNode(+(+temp_x - 1), temp_y, visited, queue);

      //down
      addNode(+(+temp_x + 1), temp_y, visited, queue);

      //left
      addNode(temp_x, +(+temp_y - 1), visited, queue);

      //right
      addNode(temp_x, +(+temp_y + 1), visited, queue);

      // //top-left
      // addNode(+(+temp_x - 1), +(+temp_y - 1), visited, queue);

      // //top-right
      // addNode(+(+temp_x - 1), +(+temp_y + 1), visited, queue);

      // //bottom-left
      // addNode(+(+temp_x + 1), +(+temp_y - 1), visited, queue);

      // //bottom-right
      // addNode(+(+temp_x + 1), +(+temp_y + 1), visited, queue);
    }
  };

  const [start_x, setStart_x] = useState(0);
  const startChange_x = (e) => {
    setStart_x(e.target.value);
    // console.log(start);
  };

  const [end_x, setEnd_x] = useState(9);
  const endChange_x = (e) => {
    setEnd_x(e.target.value);
    // console.log(end);
  };

  const [start_y, setStart_y] = useState(0);
  const startChange_y = (e) => {
    setStart_y(e.target.value);
    // console.log(start);
  };

  const [end_y, setEnd_y] = useState(9);
  const endChange_y = (e) => {
    setEnd_y(e.target.value);
    // console.log(end);
  };

  const resetNodes = (e) => {
    settypeArray(arr);
    var highestTimeoutId = setTimeout(';');
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    // setStart([0, 0]);
    // // setEnd([graph_size - 1][graph_size - 1]);
    // typeArray[start[0]][start[1]] = 'blue';
    // typeArray[end[0]][end[1]] = 'red';
    // setdummy(Math.random());
    // window.location.reload();
  };

  return (
    <div
      className='row'
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: '100vw 110%',
      }}
    >
      <div className='title'>VisualGraph</div>
      {/* <div className='buttons>'></div> */}

      <div className='graph_wrapper'>
        {nodeArray.map((sub_arr) => {
          return <div className='items'>{sub_arr}</div>;
        })}
      </div>

      {/* <div className='input_coord'>
        <input value={start_x} onChange={startChange_x} type='number'></input>
        <input value={start_y} onChange={startChange_y} type='number'></input>
      </div> */}
      {/* <div className='input_coord'>
        <input value={end_x} onChange={endChange_x} type='number'></input>
        <input value={end_y} onChange={endChange_y} type='number'></input>
      </div> */}
      {/* <div className='buttons'>
        <button onClick={changeIndex}>linear</button>
        <button onClick={BFSearch}>BFS</button>
        <button onClick={resetNodes}>reset</button>
      </div> */}
      <div className='buttons'>
        <ButtonGroup
          className='left-buttons'
          size='large'
          aria-label='large button group'
        >
          <Button onClick={startChange} variant='outlined'>
            Start
          </Button>
          <Button onClick={endChange} color='secondary' variant='outlined'>
            Finish
          </Button>
          <Button onClick={resetNodes} variant='outlined'>
            Reset
          </Button>
          <Button onClick={handleBlocks} variant='outlined'>
            Blocks
          </Button>
        </ButtonGroup>

        <ButtonGroup size='large' aria-label='large button group'>
          <Button onClick={changeIndex} variant='outlined'>
            Linear
          </Button>
          {/* <Button color='secondary' variant='outlined'>
            Contained
          </Button> */}
          <Button onClick={BFSearch} variant='outlined'>
            Dijkstra
          </Button>
        </ButtonGroup>
      </div>
      {/* <div>{typeArray}</div> */}
      {/* <div>{dummy}</div> */}
    </div>
  );
}

export default App;
