import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCocktailsContext } from '../../../../../controller/slices/cocktails';
import Cocktail from './Cocktail';
import './CreateOrder.scss';

interface ICreateOrderProps {}

const CreateOrder: React.FunctionComponent<ICreateOrderProps> = (props) => {
  const cocktails = useSelector(getCocktailsContext);
  useEffect(() => {
    console.log(cocktails);
  }, []);
  return (
    <>
      <h1>Crear orden</h1>
      <section className='scroll-view d-flex flex-wrap justify-content-evenly gap-1'>
        {cocktails.map((e) => (
          <Cocktail key={e.id} cocktail={e} />
        ))}
      </section>
    </>
  );
};

export default CreateOrder;
