import { useForm } from 'react-hook-form';
import { API_PATHS } from '../../constants/api-path';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../services/http-service';
import { useState } from 'react';
import { FormInputs } from '../../models/Form';
import './auth.scss';
import CustomSnackbar from '../Snackbar';
import { SNACKBAR_TIMEOUT } from '../../constants/snackbar';
const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await Axios.post(API_PATHS.SIGNUP, data);
      if (response.status === 201) {
        navigate('/login');
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
        <h3 className="font-bold text-3xl">Signup</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <input
              type="name"
              {...register('name', { required: true })}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.name && <p className="text-red-400">Name is required</p>}
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: true })}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && <p className="text-red-400">Email is required</p>}
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: true })}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.password && (
              <p className="text-red-400">Password is required</p>
            )}
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === watch('password'),
              })}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.confirmPassword && (
              <p className="text-red-400">Password doesnt match</p>
            )}
          </div>
          <button
            className="px-3 py-1 border rounded-md shadow my-5"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div>
          Already signed up? login{' '}
          <a className="signup-link" onClick={() => navigate('/login')}>
            here
          </a>{' '}
        </div>
      </div>
    </>
  );
};

export default Signup;
