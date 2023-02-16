import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
  getIngredients,
  handleAddIngredients,
  modifyIngredientsInventory,
} from '../../../../../../controller/handlers/dashboard/inventory';
import { ADD_INGREDIENT_VALIDATION } from '../../../../../../model/utils/formValidations';
import AddExistentIngredientForm from './AddExistentIngredientForm';
import AddNewIngredientForm from './AddNewIngredientForm';

export interface IngredientValues {
  name: string;
  amount: number;
}

const INITIAL_VALUES: IngredientValues = {
  name: '',
  amount: 0,
};

const AddIngredient: React.FunctionComponent = (props) => {
  const [ingredients, setIngredients] = useState<[string, number][]>([['', 0]]);

  useEffect(() => {
    getIngredients().then((res: {}) => {
      const list = Object.entries(res);
      setIngredients(list.map((e) => [`${e[0]}`, Number(e[1])]));
    });
  }, []);

  return (
    <main className='d-flex flex-column px-0 py-3 w-100 h-75 h-sm-100 justify-content-center align-items-center gap-5'>
      <div className='d-flex gap-2 flex-md-row flex-column'>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={ADD_INGREDIENT_VALIDATION}
          onSubmit={(values) => handleAddIngredients(values, ingredients)}
        >
          <AddExistentIngredientForm ingredients={ingredients} />
        </Formik>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={ADD_INGREDIENT_VALIDATION}
          onSubmit={(values) => {
            const currentIngredient = ingredients.find(
              (ingredient) => ingredient[0] === values.name
            );
            if (currentIngredient === undefined) {
              setIngredients([...ingredients, [values.name, values.amount]]);
              modifyIngredientsInventory([[values]], 'new');
            }
          }}
        >
          <AddNewIngredientForm />
        </Formik>
      </div>
    </main>
  );
};

export default AddIngredient;
