import { useState } from 'react';
import table from '../../../../../assets/imgs/table.png';

const tablesList: number[] = [1, 2, 3, 4, 5, 6];

interface Props {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const TablesList: React.FunctionComponent<Props> = ({
  selected,
  setSelected,
}) => {
  return (
    <>
      <h1>Seleccionar Mesa</h1>
      <section className='tables-list scroll-view d-flex flex-wrap justify-content-evenly px-md-5 px-2 pt-2'>
        {tablesList.map((e) => (
          <article
            className='table d-flex flex-column align-items-center gap-2 m-1 p-2 pointer border rounded col-6 col-sm-4 '
            style={{
              cursor: 'pointer',
              width: 150,
              height: 175,
              backgroundColor: '#fdfdfd',
            }}
            key={e}
            onClick={() => setSelected(e)}
          >
            <input
              className='me-2 align-self-end'
              type='checkbox'
              checked={e === selected}
              style={{ width: 17, height: 17 }}
              readOnly
            />
            <img src={table} style={{ width: 120 }} />
            <b>{e}</b>
          </article>
        ))}
      </section>
    </>
  );
};

export default TablesList;
