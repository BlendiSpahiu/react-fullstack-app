import { Button, FileUpload } from '@ornio-no/ds';
import { Upload } from 'upload-js';
import { FileTypeEnum } from '@enums';
import { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '@hooks';
import { useForm } from 'react-hook-form';
import { PersonaInformationInputs } from '@interfaces';
import {
  useGetUserByPkSubscription,
  useUpdatePersonalInfoMutation,
} from '@graphql/gen/graphql';
import { Loader } from '@atoms';
import { Notification } from '@molecules';
import { formatDate } from '@utils';

export const PersonalInformation = (): ReactElement => {
  // local state
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>('');

  // hooks
  const { user } = useAuth();

  // graphql hooks
  const { data: { userByPk = null } = {}, loading: userLoading } =
    useGetUserByPkSubscription({
      variables: {
        userId: user?.id || 0,
      },
    });
  const [updateInfo] = useUpdatePersonalInfoMutation({
    onCompleted: () => {
      setShowNotification(!showNotification);
      const notificationTimeout = setTimeout(() => {
        setShowNotification(false);
      }, 2500);

      return () => {
        clearTimeout(notificationTimeout);
      };
    },
    onError: ({ graphQLErrors }) => console.log(graphQLErrors[0].message),
  });

  // hook form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PersonaInformationInputs>({
    mode: 'onBlur',
  });

  // upload
  const upload = new Upload({ apiKey: 'public_FW25aqth2dBeCyy9JW8C1kdTnpZb' });
  const uploadFile = upload.createFileInputHandler({
    onProgress: () => setLoading(true),
    onUploaded: ({ fileUrl }) => {
      setLoading(false);
      setFileUrl(fileUrl);
    },
  });

  // handlers
  const handleChangeInfo = (data: PersonaInformationInputs) => {
    updateInfo({
      variables: {
        userId: user?.id || 0,
        data: {
          name: data.name,
          profile_picture: fileUrl || user?.profilePicture || '',
        },
      },
    });
  };

  // useEffect
  useEffect(() => {
    if (user)
      reset({
        ...user,
        role: user.role[0].toUpperCase() + user.role.substring(1),
      });
  }, [reset, user]);

  if (userLoading) return <Loader className="relative" />;

  return (
    <>
      <div className="w-full max-w-screen-xl">
        <div className="overflow-hidden bg-white shadow">
          <div className="divide-gray-200 lg:divide-y-0 lg:divide-x">
            <form
              className="divide-y divide-gray-200"
              onSubmit={handleSubmit(handleChangeInfo)}
            >
              {/* Profile section */}
              <div className="p-6">
                <div>
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Member since
                    <span className="ml-1 font-semibold">
                      {formatDate(userByPk?.createdAt)}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col mt-6">
                  <div className="flex-grow space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <div className="flex w-[400px] mt-1">
                        <input
                          {...register('name')}
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          className="flex-grow block min-w-0 p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                        {errors.name && (
                          <p className="mt-1 text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6 mt-6">
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <input
                        {...register('role')}
                        disabled
                        type="text"
                        name="role"
                        id="role"
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm disabled:hover:cursor-not-allowed focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <FileUpload
                    className="mt-10"
                    accept="image/png,image/gif,image/jpeg"
                    defaultPreview={{
                      name: 'default image',
                      src: user?.profilePicture || '',
                      type: FileTypeEnum.image,
                    }}
                    helptext="PNG, JPG, GIF up to 10MB"
                    label="Upload a file or drag and drop"
                    onRemoveFile={function noRefCheck() {}}
                    onSelectFiles={function noRefCheck() {}}
                    onChange={uploadFile}
                  />
                </div>
              </div>

              {/* Privacy section */}
              <div className="divide-y divide-gray-200">
                <div className="flex justify-end px-4 py-4 mt-4 space-x-4 sm:px-6">
                  <Button type="button" color="none">
                    Cancel
                  </Button>
                  <Button
                    className="bg-indigo-600"
                    loading={loading}
                    disabled={!isDirty && !fileUrl}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Notification
        show={showNotification}
        setShow={setShowNotification}
        title="Credentials updated successfully!"
      />
    </>
  );
};
