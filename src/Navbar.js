import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Parlay</h1>
      <div className="links">
        <Link to="/">Discover</Link>
        <Link to="/search">Search</Link>
        <Link to="/users/account">Account</Link>
        <Link to="/ideas/new" style={{
          color: 'white',
          backgroundColor: '#0000ff',
          borderRadius: '8px'
        }}>Create</Link>
      </div>
    </nav>
  );
}

export default Navbar;
