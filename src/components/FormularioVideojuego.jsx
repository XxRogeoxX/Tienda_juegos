import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormularioVideojuego.css';

const generosDisponibles = [
  'Aventura', 'RPG', 'Acción', 'Metroidvania', 'Estrategia', 'Deportes'
];

const plataformasDisponibles = [
  'PC', 'PS5', 'Xbox Series X', 'Nintendo Switch'
];

function FormularioVideojuego({ onGuardar }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Si venimos desde "Editar", location.state.juego trae los datos.
  // Si venimos desde "Nuevo Juego", location.state es null/undefined.
  const juegoExistente = location.state?.juego || null;
  const esEdicion = juegoExistente !== null;

  const [formData, setFormData] = useState({
    titulo: juegoExistente?.titulo || '',
    genero: juegoExistente?.genero || generosDisponibles[0],
    plataforma: juegoExistente?.plataforma || plataformasDisponibles[0],
    lanzamiento: juegoExistente?.lanzamiento || new Date().getFullYear(),
    precio: juegoExistente?.precio || '',
    disponible: juegoExistente?.disponible ?? true,
    progreso: juegoExistente?.progreso || 0
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const videojuegoFinal = {
      ...formData,
      lanzamiento: Number(formData.lanzamiento),
      precio: Number(formData.precio),
      progreso: Number(formData.progreso),
      id: esEdicion ? juegoExistente.id : Date.now()
    };

    onGuardar(videojuegoFinal, esEdicion);
    navigate('/');
  };

  return (
    <div className="formulario-container">
      <h2>{esEdicion ? '✏️ Editar Videojuego' : '🆕 Registrar Nuevo Videojuego'}</h2>

      <form onSubmit={handleSubmit} className="formulario-videojuego">
        <label>
          Título
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Género
          <select name="genero" value={formData.genero} onChange={handleChange}>
            {generosDisponibles.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>

        <label>
          Plataforma
          <select name="plataforma" value={formData.plataforma} onChange={handleChange}>
            {plataformasDisponibles.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>

        <label>
          Año de Lanzamiento
          <input
            type="number"
            name="lanzamiento"
            value={formData.lanzamiento}
            onChange={handleChange}
            min="1970"
            max="2030"
            required
          />
        </label>

        <label>
          Precio (USD)
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </label>

        <label>
          Progreso de Descarga (0 a 1)
          <input
            type="number"
            name="progreso"
            value={formData.progreso}
            onChange={handleChange}
            step="0.05"
            min="0"
            max="1"
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="disponible"
            checked={formData.disponible}
            onChange={handleChange}
          />
          Disponible en stock
        </label>

        <div className="formulario-botones">
          <button type="submit" className="btn btn-guardar">
            {esEdicion ? 'Guardar Cambios' : 'Registrar Juego'}
          </button>
          <button type="button" className="btn btn-cancelar" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioVideojuego;