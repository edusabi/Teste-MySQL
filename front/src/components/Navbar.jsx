import { NavLink } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <h1>Navbar</h1>
        <div className="navItens">
        <NavLink to="/">Usuários</NavLink>
        <NavLink to="/registrar">Registrar usuários</NavLink>
        </div>
    </div>
  )
}

export default Navbar