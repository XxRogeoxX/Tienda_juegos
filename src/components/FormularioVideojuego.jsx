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
  progreso: juegoExistente?.progreso || 0,
  fechaLanzamiento: juegoExistente?.fechaLanzamiento || '',
  sinopsis: juegoExistente?.sinopsis || '',
  calificacion: juegoExistente?.calificacion || ''
});
const [errores, setErrores] = useState({});


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
const validarFormulario = () => {
  const erroresEncontrados = {};

  // Título: no puede estar vacío ni ser solo espacios
  if (!formData.titulo.trim()) {
    erroresEncontrados.titulo = 'El título no puede estar vacío.';
  }

  // Precio: debe ser un número mayor a 0
  if (!formData.precio || Number(formData.precio) <= 0) {
    erroresEncontrados.precio = 'El precio debe ser mayor a 0.';
  }

  // Fecha de lanzamiento: no puede ser futura
  const hoy = new Date().toISOString().split('T')[0];
  if (formData.fechaLanzamiento && formData.fechaLanzamiento > hoy) {
    erroresEncontrados.fechaLanzamiento = 'La fecha no puede ser futura.';
  }
  if (!formData.fechaLanzamiento) {
    erroresEncontrados.fechaLanzamiento = 'Debes seleccionar una fecha.';
  }

  // Sinopsis: entre 10 y 250 caracteres
  const longitudSinopsis = formData.sinopsis.trim().length;
  if (longitudSinopsis < 10) {
    erroresEncontrados.sinopsis = 'La sinopsis debe tener al menos 10 caracteres.';
  } else if (longitudSinopsis > 250) {
    erroresEncontrados.sinopsis = 'La sinopsis no puede superar los 250 caracteres.';
  }

  // Calificación: estrictamente entre 1 y 100
  const calificacionNum = Number(formData.calificacion);
  if (!formData.calificacion || calificacionNum < 1 || calificacionNum > 100) {
    erroresEncontrados.calificacion = 'La calificación debe estar entre 1 y 100.';
  }

  return erroresEncontrados;
};

  const handleSubmit = (e) => {
  e.preventDefault();

  const erroresActivos = validarFormulario();

  if (Object.keys(erroresActivos).length > 0) {
    setErrores(erroresActivos);
    return; // Detenemos el envío, no se guarda nada
  }

  setErrores({}); // Limpiamos errores previos si todo salió bien

  const videojuegoFinal = {
    ...formData,
    lanzamiento: Number(formData.lanzamiento),
    precio: Number(formData.precio),
    progreso: Number(formData.progreso),
    calificacion: Number(formData.calificacion),
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
          />
          {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
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
          {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
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
        <label>
          Fecha de Lanzamiento
          <input
            type="date"
            name="fechaLanzamiento"
            value={formData.fechaLanzamiento}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
          {errores.fechaLanzamiento && <span className="error-mensaje">{errores.fechaLanzamiento}</span>}
        </label>

        <label>
          Sinopsis / Descripción
          <textarea
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            rows="4"
            maxLength="250"
          />
          {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
        </label>

        <label>
          Calificación de la Crítica (1-100)
          <input
            type="number"
            name="calificacion"
            value={formData.calificacion}
            onChange={handleChange}
            min="1"
            max="100"
          />
          {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
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