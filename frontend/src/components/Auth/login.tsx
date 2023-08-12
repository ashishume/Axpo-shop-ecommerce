import { FieldValues, useForm } from 'react-hook-form';
import { API_PATHS } from '../../constants/api-path';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../services/http-service';
import './auth.scss';
import { useState } from 'react';
import CustomSnackbar from '../Snackbar';
import { SNACKBAR_TIMEOUT } from '../../constants/snackbar';
const Login = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (val: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await Axios.post(API_PATHS.LOGIN, data);
      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem('userId', response.data.user);
        navigate('/');
      }
    } catch (e: any) {
      setError(e.response.data.message);
      setTimeout(() => {
        setError('');
      }, SNACKBAR_TIMEOUT);
    }
  };

  return (
    <>
      <CustomSnackbar message={error} isError={true} />
      <div className="flex justify-center align-center pt-15">
        <img src="assets/logo.png" height="200px" width="200px" className="image-logo" />
      </div>
      <div className="container mx-auto border m-20 p-10 max-w-md rounded-lg shadow">
        <h3 className="font-bold text-3xl">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              required
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: true })}
              required
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            className="px-3 py-1 border rounded-md shadow my-5"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div>
          Not signed up? signup{' '}
          <a className="signup-link" onClick={() => navigate('/signup')}>
            here
          </a>{' '}
        </div>
      </div>
    </>
  );
};

export default Login;
