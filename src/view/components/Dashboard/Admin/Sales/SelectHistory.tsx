import { compareDesc } from 'date-fns';
import { Account } from '../../../../../controller/handlers/dashboard/accounts';
import { today } from '../../../../../model/utils/dates';

interface Props {
  options: (string | undefined)[];
  history: Account[];
  setSales: React.Dispatch<React.SetStateAction<Account | undefined>>;
}

const SelectHistory: React.FunctionComponent<Props> = ({
  options,
  history,
  setSales,
}) => {
  return (
    <div className='select'>
      <select
        onChange={(e) => {
          setSales(
            history.find((item: Account) => {
              if (item.id) return item.id === e.target.value;
            })
          );
        }}
      >
        <option value={today}>{today}</option>
        {options
          ? options
              .filter((date) => date !== today)
              .sort((a, b) =>
                compareDesc(
                  parseInt(a?.substring(0, 2) ?? '0'),
                  parseInt(b?.substring(0, 2) ?? '0')
                )
              )
              .map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))
          : null}
      </select>
    </div>
  );
};

export default SelectHistory;
