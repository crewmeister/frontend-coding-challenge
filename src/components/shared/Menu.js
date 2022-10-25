import {Link} from 'react-router-dom'

const Menu = () => {
  return (
    <div className="app-sidebar">
      <ul className="navbar-nav sidebar sidebar-dark">
        <li className="nav-item active">
            <Link
                to="/"
                className="nav-link">
                <i className="icon icon-wizard"></i>
                <span>Absence Manager</span>
            </Link>
        </li>
      </ul>
    </div>
  )
}
export default Menu;
