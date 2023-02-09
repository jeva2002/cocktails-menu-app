import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  text: string;
  link: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  setShowLinks: React.Dispatch<React.SetStateAction<boolean>>;
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
  setShowLinks,
}) => {
  return (
    <NavLink
      style={setIsActive}
      to={'/dashboard/' + link}
      onClick={(e) => {
        setCurrentPage(e.currentTarget.innerText);
        setShowLinks(false);
      }}
    >
      {text}
    </NavLink>
  );
};

export default Link;
