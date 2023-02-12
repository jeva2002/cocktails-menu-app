interface Props {
  list: [string, unknown][];
}

const InventoryList: React.FunctionComponent<Props> = ({ list }) => {
  return (
    <>
      <ul className='scroll-view inventory-list m-0'>
        {list.map((item) => (
          <li
            className='d-flex justify-content-around align-items-center'
            key={item[0]}
          >
            <span className='text-center'>{item[0]}</span>
            <span className='text-center'>{Number(item[1])}</span>
          </li>
        ))}
      </ul>
      <div className='d-flex justify-content-between border border-dark rounded position-relative mt-2 px-sm-5 px-1 py-2'>
        <span className='h4'>Total:</span>
        <span className='h4'>
          {list.length > 0
            ? list
                .map((item) => Number(item[1]))
                .reduce((accumulator, current) => accumulator + current)
            : null}
        </span>
      </div>
    </>
  );
};

export default InventoryList;
