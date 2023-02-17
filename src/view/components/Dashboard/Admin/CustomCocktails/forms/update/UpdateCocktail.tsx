import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
  getCustomCocktails,
  updateCustomCocktail,
} from '../../../../../../../controller/handlers/dashboard/customCokctail/customCocktails';
import { getIngredients } from '../../../../../../../controller/handlers/dashboard/inventory';
import { Cocktail } from '../../../../../../../controller/slices/cocktails';
import SelectCocktail from '../../common/SelectCocktail';
import UpdateCocktailForm from './UpdateCocktailForm';

let INITIAL_VALUES: Cocktail = {
  name: '',
  price: 0,
  img: '',
  ingredients: [],
};

const UpdateCocktail: React.FunctionComponent = () => {
  const [ingredients, setIngredients] = useState<[string, number][]>([['', 0]]);
  const [list, setList] = useState<[string, any][]>([]);
  const [cocktail, setCocktail] = useState('');
  const [currentCocktail, setCurrentCocktail] = useState<[string, any]>();

  useEffect(() => {
    getCustomCocktails().then((res) => {
      if (res) {
        setList(Object.entries(res));
      }
    });

    getIngredients().then((res: {}) => {
      const list = Object.entries(res);
      setIngredients(list.map((e) => [`${e[0]}`, Number(e[1])]));
    });
  }, []);

  useEffect(() => {
    if (list.length > 0) setCocktail(list[0][1].name);
    else setCocktail('');
  }, [list]);

  useEffect(() => {
    setCurrentCocktail(list.find((item) => item[1].name === cocktail));
  }, [cocktail]);

  return (
    <>
      <h2 className='my-5 pb-1 text-center'>Actualizar Bebida</h2>
      <div className='w-md-50 w-100 mb-md-4 mb-5 mb-3'>
        <div className='d-flex align-items-center justify-md-content-center justify-content-evenly flex-md-row flex-column'>
          <b className='h4'>Bebida:</b>
          <SelectCocktail
            cocktail={cocktail}
            setCocktail={setCocktail}
            list={list}
          />
        </div>
      </div>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => {
          updateCustomCocktail(values, currentCocktail, list);
        }}
      >
        <UpdateCocktailForm ingredients={ingredients} />
      </Formik>
    </>
  );
};

export default UpdateCocktail;
