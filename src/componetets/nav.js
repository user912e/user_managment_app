import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="nav justify-content-start bg-light mb-3 ">
      <Link to="/" className="nav-link link-primary">
        Users list
      </Link>
      <Link to="/user/add" className="nav-link link-primary">
        Add user
      </Link>
    </nav>
  );
};

export default Nav;
