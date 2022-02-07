import React, { useState, useEffect } from 'react';
import './GraphNode.css';

const GraphNode = (props) => {
  const [bgColor, setbgColor] = useState(0);
  const x = props.x;
  const y = props.y;
  const mode = props.mode;
  const grid_size = props.type.length;
  const start = props.start;
  const end = props.end;
  const setStart = props.functions[0];
  const setEnd = props.functions[1];
  const black = [];
  const handleClick = (e) => {
    if (mode == 'block') {
      props.type[x][y] = 'black';
      // console.log(mouseDown);
      setbgColor(Math.random());
    } else if (mode == 'start') {
      // console.log('here');
      props.type[start[0]][start[1]] = 'white';
      setbgColor(Math.random());
      // console.log(start);
      // setStart([x, y]);
      // console.log(start);
      props.type[x][y] = 'blue';
      setStart([x, y]);
      setbgColor(Math.random());
    } else if (mode == 'end') {
      props.type[end[0]][end[1]] = 'white';
      setbgColor(Math.random());

      props.type[x][y] = 'red';
      setEnd([x, y]);
      setbgColor(Math.random());
    }
  };

  // const [mouseDown, setmouseDown] = useState(false);

  const handleMouseEnter = (e) => {
    if (props.mode == 'block' && props.mouseState) {
      props.type[x][y] = 'black';
      // console.log(mouseDown);
      setbgColor(Math.random());
    }
    // console.log('enterMouse');
    // console.log(props.mouseState);
  };

  useEffect(() => {
    setbgColor('white');
  }, []);

  const W = 60 / +grid_size;

  const nodeStyle = {
    background: props.type[x][y],
    width: W + 'vh',
    height: W + 'vh',
  };

  return (
    <div
      // onMouseEnter={handleMouseEnter}
      onMouseOver={handleMouseEnter}
      onClick={handleClick}
      style={nodeStyle}
      className='node'
    ></div>
  );
};

export default GraphNode;
