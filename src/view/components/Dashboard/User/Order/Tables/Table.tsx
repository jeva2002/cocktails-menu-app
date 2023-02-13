import table from '../../../../../../assets/imgs/table.png';

interface Props {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  tableId: number;
  isPending: boolean;
}

const Table: React.FunctionComponent<Props> = ({
  selected,
  setSelected,
  tableId,
  isPending,
}) => {
  return (
    <article
      className='table d-flex flex-column align-items-center gap-2 m-1 p-2 pointer border rounded'
      id={isPending ? 'pending' : ''}
      onClick={() => (isPending ? null : setSelected(tableId))}
    >
      <input
        className='me-2 align-self-end'
        type='checkbox'
        checked={tableId === selected}
        readOnly
      />
      <img src={table} style={{ width: 120 }} />
      <b>{tableId}</b>
    </article>
  );
};

export default Table;
