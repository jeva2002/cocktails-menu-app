import { useState } from 'react';
import './Nav.scss';
import { menu } from '../../../../assets/icons';
import LinksList, { TLinksList } from './LinksList';

const servicesLinks: TLinksList = [
  ['Mesas', ''],
  ['Estado del pedido', `status`],
];

const adminLinks: TLinksList = [
  ['Ventas del día', 'sales'],
  ['Inventario', 'inventory'],
  ['Crear bebida', 'new-cocktail'],
  ['Agregar ingredientes', 'add-ingredient'],
];

const Nav: React.FunctionComponent = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [currentPage, setCurrentPage] = useState('Mesas');

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
        />
        <LinksList
          linksList={adminLinks}
          title='Admin'
          setCurrentPage={setCurrentPage}
        />
      </div>
    </nav>
  );
};

export default Nav;
