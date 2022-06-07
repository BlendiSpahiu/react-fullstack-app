import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@ornio-no/ds';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useChangePasswordMutation,
  useGetUserByPkSubscription,
} from '@graphql/gen/graphql';
import { useAuth } from '@hooks';
import { ChangePasswordInputs } from '@interfaces';
import { ChangePasswordSchema } from '@validators';
import { Loader } from '@atoms';
import { Notification } from '@molecules';

export const Password = (): ReactElement => {
  // local state
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // hooks
  const { user } = useAuth();

  // graphql hooks
  const { loading } = useGetUserByPkSubscription({
    variables: {
      userId: user?.id || 0,
    },
  });
  const [changePassword] = useChangePasswordMutation({
    onCompleted: () => {
      setShowNotification(!showNotification);
      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
      }, 2500);
      reset();
      return () => {
        clearTimeout(notificationTimeout);
      };
    },
    onError: ({ graphQLErrors }) => console.log(graphQLErrors[0].message),
  });
  // hook form
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
    reset,
  } = useForm<ChangePasswordInputs>({
    mode: 'onSubmit',
    resolver: joiResolver(ChangePasswordSchema()),
  });

  // handlers
  const handleChangePassword = (data: ChangePasswordInputs) => {
    changePassword({
      variables: {
        data: {
          password: data.newPassword,
          userId: user?.id || 0,
        },
      },
    });
  };

  const handleCancelChangePassword = () => reset();

  if (loading) return <Loader className="relative" />;

  return (
    <>
      <form
        className="flex w-full"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <div className="w-full p-6 shadow">
          <div>
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Password
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Changed your password with one click.
            </p>
          </div>

          <div className="flex flex-col mt-6 space-y-6 lg:flex-row">
            <div className="flex-grow">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="flex flex-col mt-1">
                <input
                  {...register('newPassword')}
                  type="password"
                  placeholder="****************"
                  name="newPassword"
                  id="newPassword"
                  autoComplete="newPassword"
                  className="flex-grow block min-w-0 p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-grow">
              <label
                htmlFor="repeatNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Repeat New Password
              </label>
              <div className="flex flex-col mt-1">
                <input
                  {...register('repeatNewPassword')}
                  type="password"
                  placeholder="****************"
                  name="repeatNewPassword"
                  id="repeatNewPassword"
                  autoComplete="repeatNewPassword"
                  className="flex-grow block w-full min-w-0 p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
                {errors.repeatNewPassword && (
                  <p className="mt-1 text-red-500">
                    {errors.repeatNewPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-full mt-6 space-x-4">
            <Button
              onClick={handleCancelChangePassword}
              color="none"
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={
                !dirtyFields.newPassword || !dirtyFields.repeatNewPassword
              }
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>

      <Notification
        show={showNotification}
        setShow={setShowNotification}
        title="Password changed successfully!"
      />
    </>
  );
};
