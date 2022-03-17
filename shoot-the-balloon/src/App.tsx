import { useState } from 'react';
import Canvas from './components/Canvas';
function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  return <Canvas width={width} height={height} />
}

export default App;
