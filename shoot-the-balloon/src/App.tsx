import { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import { DARK_THEME, LIGHT_THEME } from './game/Objects/consts';
function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [theme, setTheme] = useState( DARK_THEME );

  const updateDim = () => {
    setWidth( window.innerWidth );
    setHeight( window.innerHeight );
  }

  useEffect( () => {
    window.addEventListener('resize', updateDim);
    return () => window.removeEventListener('resize', updateDim);
  })

  return <Canvas width={width} height={height} theme={theme} />
}

export default App;
