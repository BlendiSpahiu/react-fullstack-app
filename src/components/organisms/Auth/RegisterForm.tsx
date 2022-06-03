import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@ornio-no/ds';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../graphql/gen/graphql';
import { useAuth } from '../../../hooks/useAuth';
import { RegisterFormInputs } from '../../../interfaces/RegisterFormInputs.types';
import { RegisterFormSchema } from '../../../validators/Register.validator';

export const RegisterForm = (): ReactElement => {
  // local state
  const [serverError, setServerError] = useState<boolean>(false);

  // hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // hook form
  const { register, handleSubmit } = useForm<RegisterFormInputs>({
    mode: 'onChange',
    resolver: joiResolver(RegisterFormSchema()),
  });

  // graphql hook
  const [registerMutation, { loading }] = useRegisterMutation({
    onCompleted: ({ register: registerData }) => {
      setServerError(false);
      login(registerData?.token || '');
      navigate('/posts');
    },
  });

  // handlers
  const handleRegister = (data: RegisterFormInputs) => {
    registerMutation({
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
            Register a new Account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              onSubmit={handleSubmit(handleRegister)}
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
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    {...register('name')}
                    id="name"
                    name="name"
                    type="name"
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
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <Button loading={loading} type="submit">
                  Sign Up
                </Button>
              </div>

              <div className="flex justify-center text-sm text-indigo-600 underline">
                <NavLink to="/auth/login">
                  Already have an account? Sign in here.
                </NavLink>
              </div>
            </form>
          </div>
        </div>

        {serverError && (
          <div className="flex justify-center w-full py-2 text-red-600 rounded-md bg-red-50">
            Something went wrong. Please try again later.
          </div>
        )}
      </div>
    </>
  );
};
