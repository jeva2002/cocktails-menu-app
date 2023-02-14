import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menu } from '../../../../assets/icons';
import { clearUser, selectUser } from '../../../../controller/slices/user';
import LinksList, { TLinksList } from './LinksList';
import './Nav.scss';

const servicesLinks: TLinksList = [
  ['Mesas', ''],
  ['Estado del pedido', `status`],
  ['Cuentas', 'account'],
];

const adminLinks: TLinksList = [
  ['Reporte de ventas', 'sales'],
  ['Inventario', 'inventory'],
  ['Bebidas de la Casa', 'custom-cocktails'],
  ['Agregar ingredientes', 'add-ingredient'],
];

const Nav: React.FunctionComponent = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [currentPage, setCurrentPage] = useState('Mesas');

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <nav className='nav d-flex flex-column position-relative'>
      <div className='container-fluid d-flex bg-dark p-2 align-items-center gap-5'>
        <img
          className='nav-toggle'
          src={menu}
          alt='Menú'
          style={{ width: 40, height: 40, fill: '#fff' }}
          onClick={() => setShowLinks(!showLinks)}
        />
        <h2 className='current-page'>{currentPage}</h2>
      </div>
      <div className={`links bg-dark ${showLinks ? '' : 'd-none'}`}>
        <LinksList
          linksList={servicesLinks}
          title='Servicios'
          setCurrentPage={setCurrentPage}
          setShowLinks={setShowLinks}
        />
        {user.email === 'juanito@gmail.com' ? (
          <LinksList
            linksList={adminLinks}
            title='Admin'
            setCurrentPage={setCurrentPage}
            setShowLinks={setShowLinks}
          />
        ) : null}
        <button className='btn ms-5' onClick={() => dispatch(clearUser())}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Nav;
