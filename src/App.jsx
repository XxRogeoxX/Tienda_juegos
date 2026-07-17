import { useState } from 'react';
import TablaVideojuegos from './components/TablaVideojuegos';
import videojuegosData from './data/videojuegos';
import './App.css';

function App() {
  // Estado local: aquí "viven" los datos de los videojuegos
  const [videojuegos, setVideojuegos] = useState(videojuegosData);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 Tienda de Videojuegos</h1>
        <p>Catálogo disponible: {videojuegos.length} juegos</p>
      </header>

      <main>
        {/* Pasamos el estado 'videojuegos' como prop al componente hijo */}
        <TablaVideojuegos videojuegos={videojuegos} />
      </main>
    </div>
  );
}

export default App;