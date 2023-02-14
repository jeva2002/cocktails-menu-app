import { Unsubscribe } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listenCustomCocktails } from '../../../../../controller/handlers/dashboard/customCokctail/customCocktails';
import { getCocktailsAPI } from '../../../../../controller/slices/cocktails';
import { CreateCocktail, DeleteCocktail, UpdateCocktail } from './forms';
import './Panel.scss';

const Panel: React.FunctionComponent = () => {
  const [form, setForm] = useState('');

  const dispatch = useDispatch<any>();

  useEffect(() => {
    let unsub: Unsubscribe | undefined;

    listenCustomCocktails(() => {
      setTimeout(() => {
        dispatch(getCocktailsAPI());
      }, 4000);
    }).then((res) => (unsub = res));

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <main className='d-flex flex-column align-items-center w-100 h-100 p-3'>
      <h1>Bebidas de la Casa</h1>
      <menu className='options rounded-pill d-flex w-sm-100 w-75 justify-content-evenly ms-0 ps-0 bg-dark text-white py-2'>
        <li onClick={() => setForm('')}>Crear</li>
        <li onClick={() => setForm('update')}>Actualizar</li>
        <li onClick={() => setForm('delete')}>Eliminar</li>
      </menu>
      {form === '' ? (
        <CreateCocktail />
      ) : form === 'update' ? (
        <UpdateCocktail />
      ) : (
        <DeleteCocktail />
      )}
    </main>
  );
};

export default Panel;
