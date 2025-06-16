import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { NavDropdown } from 'react-bootstrap';

// Simple navbar component
const Navbar = () => {
  const categories = [
    { name: 'Fantasy', value: 'fantasy' },
    { name: 'Romance', value: 'romance' },
    { name: 'Thriller', value: 'thriller' },
    { name: 'Horror', value: 'horror' },
    { name: 'Science Fiction', value: 'science fiction' }
  ];

  return (
    <NavbarContainer className="navbar navbar-dark">
      <NavBrand to="/">
        <i className="bi bi-book"></i> Book Tracker
      </NavBrand>
      <NavLinks>
        <NavLink to="/">
          <i className="bi bi-house"></i> Home
        </NavLink>
        <NavDropdown 
          title="Categories " 
          id="basic-nav-dropdown"
          className="text-white"
        >
          {categories.map((category) => (
            <NavDropdown.Item 
              key={category.value} 
              as={Link} 
              to={`/search?q=subject:${category.value}`}
            >
              {category.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <SearchBar />
        <NavLink to="/login">
          <i className="bi bi-box-arrow-in-right"></i> Login
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  background-color: #343a40;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBrand = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.3s;

  &:hover {
    color: white;
  }
`;

export default Navbar;