import { useState } from 'react';
import './Nav.scss';
import { menu } from '../../../../assets/icons';
import { NavLink } from 'react-router-dom';

const active = {
  textDecoration: 'underline',
};

const setIsActive = ({ isActive }: { isActive: boolean; isPending: boolean }) =>
  isActive ? active : undefined;

const Nav: React.FunctionComponent = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className='nav d-flex flex-column position-relative'>
      <div className='container-fluid bg-dark p-2'>
        <img
          className='nav-toggle'
          src={menu}
          alt='Menú'
          style={{ width: 40, height: 40, fill: '#fff' }}
          onClick={() => setShowLinks(!showLinks)}
        />
      </div>
      <div className={`links bg-dark ${showLinks ? '' : 'd-none'}`}>
        <ul className='links-list'>
          <h2>Servicios</h2>
          <NavLink style={setIsActive} to='/dashboard/'>
            Mesas
          </NavLink>
          <NavLink style={setIsActive} to='/dashboard/request'>
            Hacer pedido
          </NavLink>
          <NavLink style={setIsActive} to={`/dashboard/request/${'tableId'}`}>
            Estado del pedido
          </NavLink>
        </ul>
        <ul className='links-list'>
          <h2>Admin</h2>
          <NavLink style={setIsActive} to='/dashboard/sales'>
            Ventas del día
          </NavLink>
          <NavLink style={setIsActive} to='/dashboard/inventory'>
            Inventario
          </NavLink>
          <NavLink style={setIsActive} to='/dashboard/new-cocktail'>
            Crear bebida
          </NavLink>
          <NavLink style={setIsActive} to='/dashboard/add-ingredient'>
            Crear bebida
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
