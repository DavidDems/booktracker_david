import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Component for an individual book preview (called volume by google's api)
const BookCard = ({ book }) => {
  // setting the book info from the api id search call response's json data
  // using ?. to see if this parameter has a value, if yes then check for the next parameter
  const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || 'https://dummyimage.com/200x300/cccccc/ffffff&text=No+Image';
  const title = book.volumeInfo?.title || 'No Title';
  const authors = book.volumeInfo?.authors?.join(', ') || 'Unknown Author';
  const description = book.volumeInfo?.description || 'No description available';

  return (
    <div className="col-md-4 mb-4">
      <Card className="card">
        <Link to={`/book/${book.id}`}>
          <CardImage src={thumbnail} alt={title} className="card-img-top" />
        </Link>
        <CardBody className="card-body">
          <CardTitle className="card-title">{title}</CardTitle>
          <CardText className="card-text">{authors}</CardText>
          <CardText className="card-text">{description}</CardText>
          <Link to={`/book/${book.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  background: #f8f9fa;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h5`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardText = styled.p`
  color: #6c757d;
  font-size: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default BookCard;