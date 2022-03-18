import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Game from './Game';

const MyCanvas = styled.canvas`
  padding: 0;
	margin: 0;
	border: 1px solid black;
	position: absolute;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
`;

interface Props{
  height:number;
  width: number;
}

const Canvas = ( {height , width}:Props ) => {
    console.log("Canvas Rendered");
    const canvas = useRef<HTMLCanvasElement>(null);
    
    useEffect( () => {
      const game = new Game(canvas?.current);
      game.start();
    }, [height, width]);

    return <MyCanvas width={width} height={height} ref={canvas} />
}
Canvas.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
}
export default Canvas;