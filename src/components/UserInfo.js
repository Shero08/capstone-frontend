import React, { useState, useEffect } from "react";
import useSession from "../hooks/useSession";
import { EyeIcon, EyeSlashIcon, PencilIcon } from "@heroicons/react/24/outline";
import usePatchAxios from "../hooks/usePatchAxios";
import useAxios from '../hooks/useAxios';
import UpdateModalConfirm from "./UpdateModalConfirm";
import HotToast from "../classes/hotToastClass";
import { Toaster } from 'react-hot-toast';

const UserInfo = () => {
  const toast = new HotToast();
  const session = useSession(); 
  const userSession = session && session?.userSession
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [UpdateOn, setUpdateOn] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const id = userSession?.id

  const { data, loading, getError } = useAxios({ url: `${process.env.REACT_APP_API_URL}/users/${id}`, headers: {}});

  const { error, patch } = usePatchAxios({
    url: `${process.env.REACT_APP_API_URL}/users/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    console.log(data);
  }, [session, data]);

  const enableUpdate = () => {
    setUpdateOn(!UpdateOn);
  };

  const openUpdateModal = () => {
    setIsOpenUpdate(true);
  };

  const closeUpdateModal = () => {
    setIsOpenUpdate(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("funzione avviata");

    if (password !== confirmPassword) {
      toast.passwordAlert();
      return;
    }

    let updatedFormData = { ...formData };

    if (password !== "") {
      updatedFormData = {
        ...formData,
        password: password,
      };
    }

    console.log(updatedFormData);

    setFormData(updatedFormData);

    patch(updatedFormData).then(() => {
      closeUpdateModal();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });

    if (error) {
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="px-6 py-5 text-md text-gray-500 flex items-center justify-between">
        <div>Dati anagrafici</div>

        {UpdateOn ? (
          ""
        ) : (
          <button type="button" onClick={enableUpdate}>
            <PencilIcon className="w-6 p-2 box-content hover:bg-gray-100 rounded-xl duration-300" />
          </button>
        )}
      </div>

      <form className="px-6 pb-6" onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="md:col-span-full lg:col-span-3">
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="user-name"
                defaultValue={data?.name}
                disabled={!UpdateOn}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="md:col-span-full lg:col-span-3">
            <div className="mt-2">
              <input
                type="text"
                name="surname"
                id="user-surname"
                defaultValue={data?.surname}
                required
                disabled={!UpdateOn}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    surname: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="md:col-span-full lg:col-span-3">
            <div className="mt-2">
              <input
                type="text"
                name="nickname"
                id="user-nickname"
                defaultValue={data?.nickname}
                required
                disabled={!UpdateOn}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nickname: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="md:col-span-full lg:col-span-3">
            <div className="mt-2">
              <input
                type="date"
                name="birth"
                id="user-birth"
                defaultValue={data?.birth}
                required
                disabled={!UpdateOn}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    birth: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="col-span-full">
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="user-email"
                defaultValue={data?.email}
                disabled={!UpdateOn}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="md:col-span-full lg:col-span-3">
            <div className="mt-2 relative">
              <input
                type={!showPassword ? "password" : "text"}
                name="password"
                id="change-password"
                disabled={!UpdateOn}
                placeholder="Modifica password"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="icon_button absolute right-4 top-0 py-1.5"
                onClick={handleClickShowPassword}
              >
                {!showPassword ? (
                  <EyeIcon className="h-6 font-extralight" />
                ) : (
                  <EyeSlashIcon className="h-6 font-extralight" />
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-full lg:col-span-3">
            <div className="mt-2">
              <input
                type="password"
                name="confirmPassword"
                id="confirm-change-password"
                disabled={!UpdateOn}
                placeholder="Conferma password"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

        </div>

        {UpdateOn ? (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => setUpdateOn(false)}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={openUpdateModal}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salva modifiche
            </button>

            <UpdateModalConfirm
              isOpenUpdate={isOpenUpdate}
              openUpdateModal={openUpdateModal}
              closeUpdateModal={closeUpdateModal}
              handleUpdate={handleUpdate}
            />
          </div>
        ) : (
          ""
        )}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: "",
            duration: 5000,
            success: {
              style: {
                background: "green",
                color: "white",
              },
            },
          }}
        />
      </form>
    </>
  );
};

export default UserInfo;
