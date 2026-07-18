import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import videojuegosData from './data/videojuegos';
import './App.css';
import AlertaNotificacion from './components/AlertaNotificacion';


function App() {
  // Estado centralizado: toda la lista de videojuegos vive aquí
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem('lista_videojuegos');
    return datosGuardados ? JSON.parse(datosGuardados) : videojuegosData;
  });
  
  const [mensajeToast, setMensajeToast] = useState('');


  useEffect(() => {
  localStorage.setItem('lista_videojuegos', JSON.stringify(videojuegos));
  }, [videojuegos]);

  // Agrega un nuevo videojuego al final de la lista
  const agregarVideojuego = (nuevoJuego) => {
  setVideojuegos((prev) => [...prev, nuevoJuego]);
  setMensajeToast(`"${nuevoJuego.titulo}" fue agregado con éxito.`);
  };

  // Reemplaza el videojuego editado, buscándolo por id
  const editarVideojuego = (juegoEditado) => {
  setVideojuegos((prev) =>
    prev.map((juego) => (juego.id === juegoEditado.id ? juegoEditado : juego))
  );
  setMensajeToast(`"${juegoEditado.titulo}" fue actualizado con éxito.`);
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
  const juegoEliminado = videojuegos.find((juego) => juego.id === id);
  setVideojuegos((prev) => prev.filter((juego) => juego.id !== id));
  setMensajeToast(`"${juegoEliminado?.titulo}" fue eliminado.`);
};

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        {mensajeToast && <AlertaNotificacion mensaje={mensajeToast} />}

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