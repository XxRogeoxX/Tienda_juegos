import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import videojuegosData from './data/videojuegos';
import './App.css';

function App() {
  // Estado centralizado: toda la lista de videojuegos vive aquí
  const [videojuegos, setVideojuegos] = useState(videojuegosData);

  // Agrega un nuevo videojuego al final de la lista
  const agregarVideojuego = (nuevoJuego) => {
    setVideojuegos((prev) => [...prev, nuevoJuego]);
  };

  // Reemplaza el videojuego editado, buscándolo por id
  const editarVideojuego = (juegoEditado) => {
    setVideojuegos((prev) =>
      prev.map((juego) => (juego.id === juegoEditado.id ? juegoEditado : juego))
    );
  };

  // Función unificada que decide si agregar o editar,
  // según lo que nos indique el formulario (esEdicion)
  const guardarVideojuego = (juego, esEdicion) => {
    if (esEdicion) {
      editarVideojuego(juego);
    } else {
      agregarVideojuego(juego);
    }
  };

  // Elimina un videojuego filtrando por id
  const eliminarVideojuego = (id) => {
    setVideojuegos((prev) => prev.filter((juego) => juego.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <header className="app-header">
          <h1>🎮 Tienda de Videojuegos</h1>
          <p>Catálogo disponible: {videojuegos.length} juegos</p>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <TablaVideojuegos
                  videojuegos={videojuegos}
                  onEliminar={eliminarVideojuego}
                />
              }
            />
            <Route
              path="/formulario"
              element={<FormularioVideojuego onGuardar={guardarVideojuego} />}
            />
            <Route path="*" element={<PaginaNoEncontrada />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;