import { useSelector } from 'react-redux';
import table from '../../../../../assets/imgs/table.png';
import { getOrders } from '../../../../../controller/slices/orders';
import Table from './Table';
import './TablesList.scss';

const tablesList: number[] = [1, 2, 3, 4, 5, 6];

interface Props {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const TablesList: React.FunctionComponent<Props> = ({
  selected,
  setSelected,
}) => {
  const orders = useSelector(getOrders);

  return (
    <>
      <h1>Seleccionar Mesa</h1>
      <section className='tables-list scroll-view d-flex flex-wrap justify-content-evenly px-md-5 px-2 pt-2'>
        {tablesList.map((table) => (
          <Table
            key={table}
            selected={selected}
            setSelected={setSelected}
            tableId={table}
            isPending={orders.some((e) => e.table === table)}
          />
        ))}
      </section>
    </>
  );
};

export default TablesList;
