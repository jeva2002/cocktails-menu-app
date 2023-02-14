import { Cocktail } from '../../../../../../controller/slices/cocktails';
import { capitalize } from '../../../../../../model/utils/formatString';

interface ISelectCocktailProps {
  cocktail: string;
  setCocktail: React.Dispatch<React.SetStateAction<string>>;
  list: [string, any][];
}

const SelectCocktail: React.FunctionComponent<ISelectCocktailProps> = ({
  cocktail,
  setCocktail,
  list,
}) => {
  return (
    <div className='select'>
      <select value={cocktail} onChange={(e) => setCocktail(e.target.value)}>
        {list.map((item: [string, Cocktail]) => (
          <option key={item[1].name} value={item[1].name}>
            {capitalize(item[1].name)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCocktail;
