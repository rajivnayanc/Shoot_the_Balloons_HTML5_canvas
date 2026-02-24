import { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import { DARK_THEME, LIGHT_THEME } from './game/Objects/consts';
function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [theme, setTheme] = useState(DARK_THEME); // eslint-disable-line

  const updateDim = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', updateDim);
    return () => window.removeEventListener('resize', updateDim);
  })

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas width={width} height={height} theme={theme} />
      <button
        onClick={() => setTheme(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: theme === DARK_THEME ? '#fff' : '#333',
          color: theme === DARK_THEME ? '#333' : '#fff',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          zIndex: 10,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        {theme === DARK_THEME ? 'Light Theme' : 'Dark Theme'}
      </button>
    </div>
  )
}

export default App;
