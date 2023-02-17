import { Fragment, useRef, useState } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import axios from "axios";

import { isValidUrl } from "../../utils/isValidUrl";
import ErrorAlert from "../alerts/Error";

export default function CreateLinkModal({ state, setState }) {
  const cancelButtonRef = useRef(null);
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["kreative_id_key"]);

  // state variables for creating a new hyperlink in the modal
  const [target, setTarget] = useState("");
  // public visibility and toggle switch state
  const [isPublic, setIsPublic] = useState(false);

  // error alert message styles
  const [alertStyles, setAlertStyles] = useState("hidden");
  const [message, setMessage] = useState("");

  const setOpen = (isOpen) => {
    setState(isOpen);
    setAlertStyles("hidden");
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const linksMutation = useMutation({
    mutationFn: async () => {
      let response;

      try {
        response = await axios.post(
          "https://api.kreativehyperlink.com/v1/links/user",
          {
            public: isPublic,
            target,
          },
          {
            headers: {
              KREATIVE_ID_KEY: cookies["kreative_id_key"],
              KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
              KREATIVE_APPCHAIN: process.env.NEXT_PUBLIC_APPCHAIN,
            },
          }
        );
      } catch (error) {
        // some sort of error happened
        console.log(error);
        throw new Error(error.message);
      }

      return response.data;
    },
    onError: (error) => {
      // some sort of error occured
      // handle any errors produced from the request
      console.log(error);
      setMessage(
        `Internal server error occured. Please try again later. ERROR: ${error.message}`
      );
      setAlertStyles("");
    },
    onSuccess: () => {
      // close the modal since the method completely succeeded
      setState(false);

      // clear out the values from the state
      setTarget("");
      setIsPublic(false);

      // we tell queryClient that the cached data we currently have is invalid
      // this will force a refetch that contains the newly created application
      queryClient.invalidateQueries({ queryKey: ["hyperlinks"] });
    },
  });

  const createHyperlink = (e) => {
    // prevents default behavior on button click
    e.preventDefault();

    // hides any alert messages that may be showing
    setAlertStyles("hidden");

    // make sure all required fields are filled out, if not show alert and break thread
    // logoUrl and iconUrl are not required so they will not be checked
    if (target === "") {
      setMessage("Please add a target URL that you want to redirect to");
      setAlertStyles("");
      return;
    }

    // makes sure the url is valid if not show alert and break thread
    if (!isValidUrl(target)) {
      setMessage("Please make sure to enter a valid URL");
      setAlertStyles("");
      return;
    }

    // calls the mutation to create a new application
    linksMutation.mutate();
  };

  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-6 pb-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900 pb-6"
                    >
                      Create new Hyperlink
                    </Dialog.Title>
                    <div className={alertStyles}>
                      <ErrorAlert message={message} />
                    </div>
                    <div id="new-hyperlink-form">
                      <div className="pb-2 pt-6">
                        <label
                          htmlFor="target"
                          className="block text-left text-sm font-medium text-gray-700"
                        >
                          Target URL
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="target"
                            id="target"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="https://kreativeusa.com/hello"
                            required
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 pt-3">
                        <div className="sm:col-span-9">
                          <p className="text-left text-md text-gray-700">
                            Make this Hyperlink public?
                          </p>
                          <p className="text-left text-sm text-gray-400">
                            Public links are displayed on the Leaderboards page
                          </p>
                        </div>
                        <div className="flex sm:col-span-3 justify-end mt-2">
                          <div>
                          <Switch
                            checked={isPublic}
                            onChange={setIsPublic}
                            className={classNames(
                              isPublic ? "bg-indigo-600" : "bg-gray-200",
                              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            )}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                isPublic ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                              )}
                            />
                          </Switch>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-3 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 sm:col-start-2 sm:col-span-2 sm:text-sm"
                    onClick={(e) => createHyperlink(e)}
                  >
                    Create Hyperlink
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
