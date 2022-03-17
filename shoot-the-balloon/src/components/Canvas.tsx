import React, { useEffect, useRef } from 'react';
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
    const canvas = useRef<HTMLCanvasElement>(null);
    const start = () => {
      const game = new Game(canvas?.current);
      game.start();
    }
    // useEffect(()=>{
    //     if(canvas?.current){
    //       //let c:(CanvasRenderingContext2D|null) = canvas.current?.getContext('2d');
    //       //start(canvas.current);
    //     }
          
    // }, [])
    return <MyCanvas onClick={()=>start()} width={width} height={height} ref={canvas} />
}

export default Canvas;