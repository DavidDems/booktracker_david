import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import BookCard from '../components/BookCard';
import { Container, Row, Form, Button, Spinner, Pagination } from 'react-bootstrap';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const maxPagesToShow = 4;

  // If there is a value associated with searchParams 'q' call the performSearch function and use the query
  useEffect(() => {
    if (searchParams.get('q')) {
      setCurrentPage(parseInt(searchParams.get('page')) || 1);
      performSearch(searchParams.get('q'), parseInt(searchParams.get('page')) || 1);
    }
  }, [searchParams]);

  // Function to call the google books api and do a search with a searchQuery
  const performSearch = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const startIndex = (page - 1) * itemsPerPage;
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${itemsPerPage}`
      );
      const data = await res.json();
      setBooks(data.items || []);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to set the searchParams value to the query inputed in the form
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchParams({ q: query, page: 1 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ q: query, page });
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePages = Math.min(totalPages, maxPagesToShow);

  return (
    <SearchContainer>
      <SearchTitle>Search Books</SearchTitle>
      <SearchForm onSubmit={handleSearch}>
        <Form.Group className="mb-3" controlId="searchInput">
          <Form.Control
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </SearchForm>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </Row>
          
          {totalItems > 0 && (
            <PaginationContainer>
              <Pagination>
                <Pagination.Prev 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                  disabled={currentPage === 1}
                />
                {[...Array(visiblePages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </PaginationContainer>
          )}
        </>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled(Container)`
  padding: 2rem 0;
`;

const SearchTitle = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchForm = styled(Form)`
  margin-bottom: 2rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export default Search;