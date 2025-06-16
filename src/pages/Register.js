import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RegisterForm from '../components/Auth/RegisterForm';

const Register = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/profile');
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Create an Account</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;