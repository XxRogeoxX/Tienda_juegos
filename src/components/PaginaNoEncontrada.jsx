import { Link } from 'react-router-dom';
import './PaginaNoEncontrada.css';

function PaginaNoEncontrada() {
  return (
    <div className="pagina-404">
      <h1>404</h1>
      <p>Oops... la página que buscas no existe.</p>
      <Link to="/" className="btn btn-volver">
        ⬅ Volver al Inventario
      </Link>
    </div>
  );
}

export default PaginaNoEncontrada;