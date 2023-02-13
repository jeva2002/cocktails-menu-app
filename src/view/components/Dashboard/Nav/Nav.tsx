import { useState } from 'react';
import { menu } from '../../../../assets/icons';
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
        <LinksList
          linksList={adminLinks}
          title='Admin'
          setCurrentPage={setCurrentPage}
          setShowLinks={setShowLinks}
        />
      </div>
    </nav>
  );
};

export default Nav;
