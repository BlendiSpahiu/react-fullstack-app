import { Fragment, ReactElement } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { ModalProps } from '@molecules';
import { Button, Ternary } from '@ornio-no/ds';
import { EyeIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { ModalTypesEnum } from '@enums';

export const Modal = ({
  open,
  setOpen,
  onClick,
  title,
  description,
  buttonLabel,
  publish,
}: ModalProps): ReactElement => {
  // hooks
  const { modal } = useParams();

  // handlers
  const handleOnClick = () => {
    onClick();
    setOpen(false);
    window.history.back();
  };

  const handleOnClose = () => {
    setOpen(false);
    modal !== ModalTypesEnum.DELETE && window.history.back();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        open={open}
        as="div"
        className="relative z-10"
        onClose={handleOnClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div
                    className={clsx(
                      'flex items-center justify-center w-12 h-12 mx-auto rounded-full',
                      publish ? 'bg-gray-100' : 'bg-red-50'
                    )}
                  >
                    <Ternary
                      condition={!!publish}
                      fallback={
                        <ExclamationIcon
                          className="w-6 h-6 text-red-600"
                          aria-hidden="true"
                        />
                      }
                    >
                      <EyeIcon
                        className="w-6 h-6 text-gray-600"
                        aria-hidden="true"
                      />
                    </Ternary>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Button
                    type="button"
                    color={publish ? 'none' : 'danger'}
                    className={clsx('w-full', publish ? '' : 'bg-red-600')}
                    onClick={handleOnClick}
                  >
                    {buttonLabel}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
