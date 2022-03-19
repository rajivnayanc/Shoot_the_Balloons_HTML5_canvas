import { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateDim = () => {
    setWidth( window.innerWidth );
    setHeight( window.innerHeight );
  }

  useEffect( () => {
    window.addEventListener('resize', updateDim);
    return () => window.removeEventListener('resize', updateDim);
  })

  return <Canvas width={width} height={height} />
}

export default App;
