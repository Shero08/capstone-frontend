import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import HotToast from "../classes/hotToastClass";
import usePostAxios from "../hooks/usePostAxios";
import DragAndDrop from "./DragAndDrop";
import useSession from "../hooks/useSession";
import { useNavigate } from "react-router-dom"

const NewProjectModal = ({ isOpenModalNewProject, closeModalNewProject, isRefresh, author, currentPage }) => {
  const toast = new HotToast();
  const session = useSession();
  const userToken = session && session?.userToken
  const userSession = session && session?.userSession
  const navigate = useNavigate();
  const [formData, setFormData] = useState({category: []});
  const [isChecked, setIsChecked] = useState(false);

  const { data, error, post } = usePostAxios({
    url: `${process.env.REACT_APP_API_URL}/projects`,
    headers: {
      'Content-Type': 'multipart/form-data', 
      'Authorization': userToken
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

  const handleFormDataChange = (fileData) => {
    setFormData({ ...formData, file: fileData });
  }

  const handleCreate = (e) => {
    e.preventDefault();

    setFormData(formData);

    post(formData).then(() => {
      closeModalNewProject();

      if(currentPage === 'UserDashboard'){
        userSession?.role === 'admin' ? navigate('/admin/projects') : navigate('/projects')
      } else {
        isRefresh();
      }
    });

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(formData);
    console.log(author);
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Inserisci nuovo progetto:
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
                            Descrizione progetto:
                          </label>
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
                          <label htmlFor="project-file" className="block text-sm font-medium leading-6 text-gray-900">
                              Inserisci allegato:
                          </label>
                          <DragAndDrop 
                            formData={formData} 
                            onFormDataChange={handleFormDataChange}
                          />
                        </div>
                      </div>

                      <div className="col-span-full space-y-4">
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
                                  value="Editing"
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
                                <p className="text-gray-500">
                                  Lavoreremo insieme a te al tuo testo, per cercare di farlo sbocciare nella sua forma migliore. 
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="correzione-bozze"
                                  name="correzione-bozze"
                                  type="checkbox"
                                  value="Correzione bozze"
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
                                <p className="text-gray-500">
                                  Ci assicureremo che il tuo testo sia privo di refusi e ripetizioni di termini e che risulti pulito.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="design-copertina"
                                  name="design-copertina"
                                  type="checkbox"
                                  value="Design copertina"
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
                                <p className="text-gray-500">
                                  Progettazione e realizzazione grafica della copertina per il tuo progetto.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="impaginazione"
                                  name="impaginazione"
                                  type="checkbox"
                                  value="Impaginazione"
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
                                <p className="text-gray-500">
                                  Daremo al tuo testo una veste interna gradevole e ordinata.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="web-design"
                                  name="web-design"
                                  type="checkbox"
                                  value="web-design"
                                  onChange={handleChecked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-5">
                                <label
                                  htmlFor="web-design"
                                  className="font-medium text-gray-900"
                                >
                                  Web Design
                                </label>
                                <p className="text-gray-500">
                                  Creeremo per te un sito web di presentazione su di te, i tuoi testi, la tua biografia e il collegamento ai tuoi social.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="traduzione"
                                  name="traduzione"
                                  type="checkbox"
                                  value="Traduzione"
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
                                <p className="text-gray-500">
                                  Se sei un scrittore straniero ci occuperemo di tradurre il tuo testo così che tu possa inserirlo nel mercato italiano.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="promozione"
                                  name="promozione"
                                  type="checkbox"
                                  value="Promozione"
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
                                <p className="text-gray-500">
                                  Pubblicizzeremo il tuo testo nei nostri canali e pubblicheremo i primi due capitoli che saranno visualizzabili da altri utenti.
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
