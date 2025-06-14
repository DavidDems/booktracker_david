import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookCard from '../components/BookCard';
import { Container, Row, Spinner } from 'react-bootstrap';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define and call the fetchFictionBooks function inside the useEffect(() => {}, []) to run once when the route loads
  useEffect(() => {
    const fetchFictionBooks = async () => {
      try {
        const res = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=12'
        );
        const data = await res.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        // Stop showing loading text
        setLoading(false);
      }
    };

    fetchFictionBooks();
  }, []);

  return (
    <HomeContainer>
      <Title>Popular Books</Title>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Row>
      )}
    </HomeContainer>
  );
};

const HomeContainer = styled(Container)`
  padding: 2rem 0;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

export default Home;