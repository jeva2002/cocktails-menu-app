import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listenCustomCocktails } from '../../../../controller/handlers/dashboard/customCocktails';
import { getCocktailsAPI } from '../../../../controller/slices/cocktails';
import CreateCocktail from './create/CreateCocktail';
import './Panel.scss';

const Panel: React.FunctionComponent = () => {
  const [form, setForm] = useState('');
  const dispatch = useDispatch<any>();

  useEffect(() => {
    let unsub: Unsubscribe | undefined;

    listenCustomCocktails(() => {
      dispatch(getCocktailsAPI());
    }).then((res) => (unsub = res));

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <main className='d-flex flex-column align-items-center w-100 h-100 p-3'>
      <h1>Cocteles de la Casa</h1>
      <menu className='options d-flex w-75 justify-content-evenly ms-0 ps-0 bg-dark text-white py-2'>
        <li>Crear</li>
        <li>Actualizar</li>
        <li>Eliminar</li>
      </menu>
      <CreateCocktail />
    </main>
  );
};

export default Panel;
