interface HeaderProps {
    name: string;
}

const Header = ({ name }: HeaderProps): JSX.Element => {
    return <h1>{name}</h1>;
};

export default Header;