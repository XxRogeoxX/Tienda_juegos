import './TablaVideojuegos.css';

function TablaVideojuegos({ videojuegos }) {
  return (
    <div className="tabla-container">
      <table className="tabla-videojuegos">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Progreso de Descarga</th>
          </tr>
        </thead>
        <tbody>
          {videojuegos.map((juego) => (
            <tr key={juego.id}>
              <td data-label="Título">{juego.titulo}</td>
              <td data-label="Género">{juego.genero}</td>
              <td data-label="Plataforma">{juego.plataforma}</td>
              <td data-label="Año">{juego.lanzamiento}</td>
              <td data-label="Precio">${juego.precio.toFixed(2)}</td>
              <td data-label="Disponible">
                {juego.disponible ? '✅ Sí' : '❌ No'}
              </td>
              <td data-label="Progreso">
                <progress value={juego.progreso} max="1"></progress>
                <span className="progreso-texto">
                  {Math.round(juego.progreso * 100)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;