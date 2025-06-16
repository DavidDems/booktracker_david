import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>Your Profile</h2>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Username:</strong> {user.username}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {user.email}
              </div>
              <button 
                onClick={logout}
                className="btn btn-danger"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;