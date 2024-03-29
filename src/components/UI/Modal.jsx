import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
const Modal = (props) => {
  let color =
    props.type === "error"
      ? "bg-red-500 text-white"
      : "bg-blue-200 text-blue-500";
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white dark:bg-dark p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-[#EEEEEE]"
                >
                  {props.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-white">{props.message}</p>
                </div>

                {props.children}

                <div className="mt-4 flex gap-2">
                  {props.type === "confirm" && (
                    <button
                      type="button" 
                      className={`bg-red-500 rounded-md border border-transparent  px-4 py-2 text-sm font-medium   focus:outline-none`}
                      onClick={props.onDelete}
                    >
                      Yes
                    </button>
                  )}
                  {props.type === "upload" && (
                    <button
                      type="button"
                      className={` bg-primary rounded-md border border-transparent text-white px-4 py-2 text-sm   hover:bg-blue-400 focus:outline-none`}
                      onClick={props.onConfirm}
                    >
                      Upload
                    </button>
                  )}

                  <button
                    type="button"
                    className={`rounded-md border border-transparent  px-4 py-2 text-sm text-white  hover:bg-blue-400 focus:outline-none`}
                    onClick={props.closeModal}
                  >
                    {props.type === "confirm" ? "No" : "Cancel"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
