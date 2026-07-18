import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🎮 Tienda de Videojuegos</div>
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Inventario
        </NavLink>
        <NavLink
          to="/formulario"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Nuevo Juego
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;