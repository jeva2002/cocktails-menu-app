import { useField } from 'formik';
import {
  capitalize,
  revertCamelCase,
} from '../../../../model/utils/formatData';

interface Props {
  name: string;
  label: string;
  options: string[];
}

const Select: React.FunctionComponent<Props> = ({ name, label, options }) => {
  const [field, meta] = useField(name);

  return (
    <div className='select'>
      <select {...field}>
        <option value={''}>Seleccionar Ingrediente</option>
        {options
          ? options.map((e, index) => (
              <option key={index} value={e}>
                {revertCamelCase(e)}
              </option>
            ))
          : null}
      </select>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Select;
