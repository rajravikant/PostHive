import { PhotoIcon} from "@heroicons/react/24/solid";
import { useState,useRef } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "../../components/UI/Modal";
export default function ProfileEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing,setIsEditing]  = useState(false);
  const aboutRef = useRef();
  const statusRef = useRef();
  const avatarRef = useRef();
  const coverRef = useRef();

  const closeModal = () => {
    setIsOpen(false);
  };
  const onConfirm = () => {
    alert("confirmed");
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      bio : aboutRef.current.value,
      status : statusRef.current.value,
      avatar : avatarRef.current,
      cover : coverRef.current
    }
    console.log(data);
    
  };
  const buttons = (
    <div className="mt-2 flex items-center justify-end gap-x-6">
      <button
        type="button" onClick={()=>{
          setIsEditing(false)
        }}
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <button
        type="submit" disabled={!isEditing}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-500 "
      >
        Save
      </button>
    </div>
  );
  const user = useLoaderData();
  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onConfirm={onConfirm}
          closeModal={closeModal}
          title="Select a file"
          type="upload"
          message={`Choose a file with .jpeg/png`}
        >
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="avatar"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none    hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </Modal>
      )}
      <form className="bg-white px-10 py-10" onSubmit={onSubmitHandler}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about" ref={aboutRef}
                    name="about" 
                    rows={3} onKeyDown={(e)=>{setIsEditing(true)}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                    
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="status-col"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Status
                </label>
                <div className="mt-2">
                  <input
                    type="text" ref={statusRef}
                    name="status"
                    defaultValue={user ? user.status : ""}
                    id="status-col"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                   Profile Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="avatar-pic border-2 p-2">
                    <img src="/user.png" className="h-32 w-full object-cover" alt="avatar" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
             
              </div>
            </div>
          </div>

          {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name" defaultValue={user ? user.name :''}
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email" defaultValue={user ? user.email :''}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}

        {buttons}
        </div>
      </form>
    </>
  );
}
