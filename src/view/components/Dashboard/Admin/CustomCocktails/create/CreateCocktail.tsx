import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { createCustomCocktail } from '../../../../../../controller/handlers/dashboard/customCocktails';
import { getIngredients } from '../../../../../../controller/handlers/dashboard/inventory';
import { Cocktail } from '../../../../../../controller/slices/cocktails';
import { CREATE_COCKTAIL_VALIDATION } from '../../../../../../model/utils/formValidations';
import TextField from '../../../../Common/Form/TextField';
import SelectIngredient from '../common/SelectIngredient';

const INITIAL_VALUES: Cocktail = {
  name: '',
  price: 0,
  img: '',
  ingredients: [],
};

const CreateCocktail: React.FunctionComponent = () => {
  const [ingredients, setIngredients] = useState<[string, number][]>([['', 0]]);

  useEffect(() => {
    getIngredients().then((res: {}) => {
      const list = Object.entries(res);
      setIngredients(list.map((e) => [`${e[0]}`, Number(e[1])]));
    });
  }, []);

  return (
    <>
      <h2 className='mb-4 pb-1'>Nueva Bebida</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={CREATE_COCKTAIL_VALIDATION}
        onSubmit={createCustomCocktail}
      >
        <Form className='d-flex flex-column align-items-center w-100 gap-2'>
          <div className='d-flex flex-column-reverse flex-lg-row gap-5'>
            <SelectIngredient
              options={ingredients.map((e) => e[0])}
              name='ingredients'
            />
            <div className='d-flex flex-column align-items-center justify-content-evenly gap-3 col-lg-4 col-12'>
              <TextField name='name' label='Nombre' />
              <TextField name='price' label='Precio' type='number' />
              <TextField name='img' label='Imagen' />
            </div>{' '}
          </div>
          <button className='btn' type='submit'>
            Crear
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default CreateCocktail;
