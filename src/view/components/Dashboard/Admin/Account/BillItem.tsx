interface Props {
  cocktail:
    | {
        amount: number;
        id?: string | undefined;
        name: string;
        img: string;
        ingredients: {
          name: string;
          amount: number;
        }[];
        price: number;
      }
    | undefined;
}

const BillItem: React.FunctionComponent<Props> = ({ cocktail }) => {
  return (
    <li className='item'>
      <img src={cocktail?.img} alt={cocktail?.name} />
      <div>
        <small>{cocktail?.name}</small>
        <b>c/u $ {cocktail?.price}</b>
      </div>
      <div>
        <small>Cantidad: {cocktail?.amount}</small>
        <b>
          Total: ${' '}
          {cocktail?.amount && cocktail.price
            ? parseInt(`${cocktail?.amount}`) * cocktail?.price
            : null}
        </b>
      </div>
    </li>
  );
};

export default BillItem;
