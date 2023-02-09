import Link from './Link';

export type TLinksList = [string, string][];

interface Props {
  title: string;
  linksList: TLinksList;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  setShowLinks: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinksList: React.FunctionComponent<Props> = ({
  title,
  linksList,
  setCurrentPage,
  setShowLinks,
}) => {
  return (
    <ul className='links-list'>
      <h2>{title}</h2>
      {linksList.map((link, index) => (
        <Link
          key={index}
          link={link[1]}
          text={link[0]}
          setCurrentPage={setCurrentPage}
          setShowLinks={setShowLinks}
        />
      ))}
    </ul>
  );
};

export default LinksList;
