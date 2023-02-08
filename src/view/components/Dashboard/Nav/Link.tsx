import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  text: string;
  link: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const setIsActive = ({ isActive }: { isActive: boolean; isPending: boolean }) =>
  isActive
    ? {
        textDecoration: 'underline',
      }
    : undefined;

const Link: React.FunctionComponent<Props> = ({
  text,
  link,
  setCurrentPage,
}) => {
  return (
    <NavLink
      style={setIsActive}
      to={'/dashboard/' + link}
      onClick={(e) => {
        setCurrentPage(e.currentTarget.innerText);
      }}
    >
      {text}
    </NavLink>
  );
};

export default Link;
