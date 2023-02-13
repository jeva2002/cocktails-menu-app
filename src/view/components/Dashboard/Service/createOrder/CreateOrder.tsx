import { useSelector } from 'react-redux';
import { getCocktailsContext } from '../../../../../controller/slices/cocktails';
import Cocktail from './Cocktail';
import './CreateOrder.scss';

interface Props {
  setOrder: React.Dispatch<
    React.SetStateAction<{
      table: number;
      order: {};
    }>
  >;
}

const CreateOrder: React.FunctionComponent<Props> = ({ setOrder }) => {
  const cocktails = useSelector(getCocktailsContext);

  return (
    <>
      <h1>Crear orden</h1>
      <section className='scroll-view d-flex flex-wrap justify-content-evenly gap-1'>
        {cocktails.map((e, index) => (
          <Cocktail
            key={index}
            setOrder={(amount) => {
              setOrder((value) => {
                return {
                  table: value.table,
                  order: {
                    ...value.order,
                    [e.name]: amount > 0 ? amount : undefined,
                  },
                };
              });
            }}
            cocktail={e}
          />
        ))}
      </section>
    </>
  );
};

export default CreateOrder;
