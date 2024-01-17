import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/user">User Info</Link>
        <Link to="/repo">Repo List</Link>
      </div>
    </div>
  );
};

export default Header;
