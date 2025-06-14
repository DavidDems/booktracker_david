import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component for the search form, which uses the searchQuery as a parameter
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // function to handle the submission of a search form
  const handleSearch = (e) => {
    e.preventDefault();
    // if the searchQuery has a value go to the search url with q="searchQuery"
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton type="submit">
          <i className="bi bi-search"></i>
        </SearchButton>
      </form>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  border-radius: 20px;
  border: none;
  outline: none;
  width: 200px;
  transition: width 0.3s ease;

  &:focus {
    width: 250px;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: white;
  }
`;

export default SearchBar;