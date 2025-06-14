import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const BookDetails = () => {
  // declaring id which is passed when this route is called
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // declaring the fetchBookDetails function and calling it whenever id has a value / new value
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        if (!res.ok) {
          throw new Error('Book not found');
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // sanitizing html to use html elements
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };

  // Different pages based on if there is an error or loading
  if (loading) {
    return (
      <DetailContainer className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </DetailContainer>
    );
  }
  if (error) {
    return (
      <DetailContainer>
        <Alert variant="danger">{error}</Alert>
      </DetailContainer>
    );
  }
  if (!book) {
    return (
      <DetailContainer>
        <Alert variant="warning">No book data available</Alert>
      </DetailContainer>
    );
  }

  // Setting the basic book info
  const volumeInfo = book.volumeInfo || {};
  const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://dummyimage.com/200x300/cccccc/ffffff&text=No+Image';

  return (
    <DetailContainer>
      <div className="row">
        <div className="col-md-4 text-center">
          <BookCover src={thumbnail} alt={volumeInfo.title} />
          {volumeInfo.previewLink && (
            <Button
              variant="primary"
              href={volumeInfo.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 block d-block"
            >
              Preview Book
            </Button>
          )}
        </div>
        <div className="col-md-8">
          <BookTitle>{volumeInfo.title}</BookTitle>
          <BookAuthor>
            {volumeInfo.authors?.join(', ') || 'Unknown Author'}
          </BookAuthor>
          <div className="mb-3">
            <span className="badge bg-secondary me-2">
              {volumeInfo.publishedDate}
            </span>
            {volumeInfo.pageCount && (
              <span className="badge bg-info me-2">
                {volumeInfo.pageCount} pages
              </span>
            )}
            <span className="badge bg-success">
              {volumeInfo.averageRating || 'No'} rating
            </span>
          </div>
          {volumeInfo.description && (
            <BookDescription
              dangerouslySetInnerHTML={createMarkup(volumeInfo.description)}
            />
          )}
          <div>
            <h5>Categories</h5>
            <p>
              {volumeInfo.categories?.join(', ') || 'No categories specified'}
            </p>
          </div>
        </div>
      </div>
    </DetailContainer>
  );
};

const DetailContainer = styled(Container)`
  padding: 2rem 0;
`;

const BookCover = styled.img`
  max-height: 500px;
  width: auto;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BookTitle = styled.h1`
  margin-bottom: 1rem;
`;

const BookAuthor = styled.h3`
  color: #6c757d;
  margin-bottom: 1.5rem;
`;

const BookDescription = styled.div`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export default BookDetails;