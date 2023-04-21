import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import HotToast from "../classes/hotToastClass";
import usePatchAxios from "../hooks/usePatchAxios";
import DragAndDrop from "./DragAndDrop";
import useSession from '../hooks/useSession';
import useAxios from '../hooks/useAxios';

const UpdateProjectModal = ({isOpenUpdate, closeUpdateProjectModal, isRefresh, title, description, id}) => {
  const toast = new HotToast();
  const [categoryData, setCategoryData] = useState([])
  const [formData, setFormData] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const session = useSession();
  const userToken = session && session?.userToken
  const [updatedCategory, setUpdatedCategory] = useState(null)

  const { data } = useAxios({ url: `${process.env.REACT_APP_API_URL}/projects/${id}`, headers: {}});

  const getDataCategory = data && data?.category

  const { error, patch } = usePatchAxios({
    url: `${process.env.REACT_APP_API_URL}/projects/${id}`,
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": userToken
    },
  });

  const handleChecked = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setUpdatedCategory([...updatedCategory, name])
    } else {
      setUpdatedCategory(updatedCategory.filter((input) => input !== name))
    }

    console.log(name, value, checked);

    setFormData({ ...formData, category: updatedCategory });
  }

  const handleFormDataChange = (fileData) => {
    setFormData({ ...formData, file: fileData });
  }


  const handleCreate = (e) => {
    e.preventDefault();

    setFormData(formData);

    patch(formData).then(() => {
      closeUpdateProjectModal();

      isRefresh();
    });

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(data){
      setCategoryData(getDataCategory)
      setUpdatedCategory(getDataCategory)
    }
    console.log(data.category);
    console.log(updatedCategory);
  }, [data, formData])

  return (
    <>
      <Transition appear show={isOpenUpdate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeUpdateProjectModal}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Modifica progetto:
                  </Dialog.Title>
                  <form className="mt-2" onSubmit={handleCreate}>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                      <div className="col-span-full">
                        <div className="mt-2">
                          <label htmlFor="project-title" className="block text-sm font-medium leading-6 text-gray-900">
                            Titolo progetto:
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="project-title"
                            placeholder="Inserisci titolo"
                            required
                            defaultValue={title}
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
                          <label htmlFor="project-desc" className="block text-sm font-medium leading-6 text-gray-900">
                            Modifica descrizione progetto:
                          </label>
                          <input
                            type="text"
                            name="description"
                            id="project-desc"
                            defaultValue={description}
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
                          <label htmlFor="project-file" className="block text-sm font-medium leading-6 text-gray-900">
                              Sostituisci allegato:
                          </label>
                          <DragAndDrop 
                            formData={formData} 
                            onFormDataChange={handleFormDataChange}
                          />
                        </div>
                      </div>
                      
                      {data ? 
                      (<div className="col-span-full space-y-4">
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Seleziona uno o più servizi per il tuo progetto:
                          </legend>
                          <div className="mt-3 space-y-3">
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="editing"
                                  name="editing"
                                  type="checkbox"
                                  value="editing"
                                  defaultChecked={data && data.category && data.category.includes('editing')}
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-5">
                                <label
                                  htmlFor="editing"
                                  className="font-medium text-gray-900"
                                >
                                  Editing
                                </label>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="correzione bozze"
                                  name="correzione bozze"
                                  type="checkbox"
                                  value="correzione bozze"
                                  defaultChecked={data && data.category && data.category.includes('correzione bozze')}
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-5">
                                <label
                                  htmlFor="correzione-bozze"
                                  className="font-medium text-gray-900"
                                >
                                  Correzione bozze
                                </label>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="design copertina"
                                  name="design copertina"
                                  type="checkbox"
                                  value="design copertina"
                                  defaultChecked={data && data.category && data.category.includes('design copertina')}
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-5">
                                <label
                                  htmlFor="design-copertina"
                                  className="font-medium text-gray-900"
                                >
                                  Design copertina
                                </label>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="impaginazione"
                                  name="impaginazione"
                                  type="checkbox"
                                  value="impaginazione"
                                  defaultChecked={data && data.category && data.category.includes('impaginazione')}
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-5">
                                <label
                                  htmlFor="impaginazione"
                                  className="font-medium text-gray-900"
                                >
                                  Impaginazione
                                </label>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="web design"
                                  name="web design"
                                  type="checkbox"
                                  value="web design"
                                  defaultChecked={data && data.category && data.category.includes('web design')}
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-5">
                                <label
                                  htmlFor="web design"
                                  className="font-medium text-gray-900"
                                >
                                  Web Design
                                </label>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="traduzione"
                                  name="traduzione"
                                  type="checkbox"
                                  value="traduzione"
                                  defaultChecked={data && data.category && data.category.includes('traduzione')}
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-5">
                                <label
                                  htmlFor="traduzione"
                                  className="font-medium text-gray-900"
                                >
                                  Traduzione
                                </label>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="promozione"
                                  name="promozione"
                                  type="checkbox"
                                  value="promozione"
                                  defaultChecked={data && data.category && data.category.includes('Promozione')}
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-5">
                                <label
                                  htmlFor="promozione"
                                  className="font-medium text-gray-900"
                                >
                                  Pubblicità / Promozione
                                </label>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      )
                      : ''
                        }
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        onClick={closeUpdateProjectModal}
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Annulla
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Modifica progetto
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

export default UpdateProjectModal;
