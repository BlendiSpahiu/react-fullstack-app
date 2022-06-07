import { joiResolver } from '@hookform/resolvers/joi';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../graphql/gen/graphql';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import { LoginFormInputs } from '../../../interfaces/LoginFormInputs.types';
import { LoginFormSchema } from '../../../validators/Login.validator';

export const LoginForm = (): ReactElement => {
  // local state
  const [serverError, setServerError] = useState<boolean>(false);

  // hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // hook form
  const { handleSubmit, register } = useForm<LoginFormInputs>({
    mode: 'onChange',
    resolver: joiResolver(LoginFormSchema()),
  });

  // graphql hooks
  const [loginMutation] = useLoginMutation({
    onCompleted: ({ login: loginData }) => {
      if (loginData?.token) {
        setServerError(false);
        login(loginData?.token);
        navigate('/posts');
      }
    },
    onError: () => setServerError(true),
  });

  // handlers
  const handleLogin = (data: LoginFormInputs) => {
    loginMutation({
      variables: {
        ...data,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center min-h-full py-12 mt-24 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="w-auto h-12 mx-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Or
            <NavLink
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </NavLink>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register('email')}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register('password')}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <NavLink
                    to="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </NavLink>
                </div>
              </div>

              <div>
                <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign in
                </button>
              </div>

              {serverError && (
                <div className="flex justify-center w-full py-2 text-red-600 rounded-md bg-red-50">
                  Something went wrong. Please try again later.
                </div>
              )}
              <NavLink
                className="flex justify-center mt-4 text-sm text-indigo-600 underline"
                to="/auth/register"
              >
                No account? Register Here.
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
