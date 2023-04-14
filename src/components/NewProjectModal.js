import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import HotToast from "../classes/hotToastClass";
import usePostAxios from "../hooks/usePostAxios";

const NewProjectModal = ({
  isOpenModalNewProject,
  closeModalNewProject,
  isRefresh,
  author
}) => {
  const toast = new HotToast();
  const [formData, setFormData] = useState({category: []});
  const [isChecked, setIsChecked] = useState(false);

  const { data, error, post } = usePostAxios({
    url: `${process.env.REACT_APP_API_URL}/projects`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleChecked = (e) => {
    const target = e.target;
    const value = target.value;
    const checked = target.checked;
    let updatedCategory = [...formData.category];

    if (checked) {
      updatedCategory.push(value);
    } else {
      updatedCategory = updatedCategory.filter((cat) => cat !== value);
    }

    setFormData({ ...formData, author: author, category: updatedCategory });
  }

  const handleCreate = (e) => {
    e.preventDefault();

    setFormData(formData);

    post(formData).then(() => {
      closeModalNewProject();

      isRefresh();
    });

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(isChecked, formData, author);
  }, [isChecked, formData, author])

  return (
    <>
      <Transition appear show={isOpenModalNewProject} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModalNewProject}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Inserisci nuovo progetto:
                  </Dialog.Title>
                  <form className="mt-2" onSubmit={handleCreate}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                      <div className="col-span-full">
                        <div className="mt-2">
                          <input
                            type="text"
                            name="title"
                            id="project-title"
                            placeholder="Inserisci titolo"
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <div className="mt-2">
                          <input
                            type="text"
                            name="description"
                            id="project-desc"
                            placeholder="Inserisci descrizione progetto"
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <div className="mt-2">
                          <input
                            type="text"
                            name="file"
                            id="project-file"
                            placeholder="URL file"
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                file: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-span-full mt-3 space-y-10">
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Seleziona uno o più servizi che vuoi ricevere
                          </legend>
                          <div className="mt-6 space-y-6">
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="comments"
                                  name="category"
                                  type="checkbox"
                                  value="Servizio1"
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="comments"
                                  className="font-medium text-gray-900"
                                >
                                  Comments
                                </label>
                                <p className="text-gray-500">
                                  Get notified when someones posts a comment on
                                  a posting.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="candidates"
                                  name="category"
                                  type="checkbox"
                                  value="Servizio2"
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="candidates"
                                  className="font-medium text-gray-900"
                                >
                                  Candidates
                                </label>
                                <p className="text-gray-500">
                                  Get notified when a candidate applies for a
                                  job.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="offers"
                                  name="category"
                                  type="checkbox"
                                  value="Servizio3"
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="offers"
                                  className="font-medium text-gray-900"
                                >
                                  Offers
                                </label>
                                <p className="text-gray-500">
                                  Get notified when a candidate accepts or
                                  rejects an offer.
                                </p>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        onClick={closeModalNewProject}
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Annulla
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Crea nuovo progetto
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewProjectModal;
