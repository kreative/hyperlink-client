import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useAtom } from "jotai";
import axios from "axios";

import { isValidUrl } from "../../utils/isValidUrl";
import { hyperlinkData } from "@/stores/hyperlinkData";
import ErrorAlert from "../alerts/Error";

export default function EditLinkModal({ state, setState }) {
  const cancelButtonRef = useRef(null);
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["kreative_id_key"]);

  // global hyperlink state
  const [hyperlink, setHyperlink] = useAtom(hyperlinkData);

  // temporary states to hold changed data about the hyperlink
  const [target, setTarget] = useState("");
  const [extension, setExtension] = useState("");
  // public visibility and toggle switch state
  const [isPublic, setIsPublic] = useState(false);

  // error alert message styles
  const [alertStyles, setAlertStyles] = useState("hidden");
  const [message, setMessage] = useState("");

  // sets the local states based on hyperlink global state
  // we also hide any alert messages
  useEffect(() => {
    setAlertStyles("hidden");
    setTarget(hyperlink.target);
    setExtension(hyperlink.extension);
    setIsPublic(hyperlink.public);
  }, [hyperlink]);

  const setOpen = (isOpen) => {
    setState(isOpen);
    setAlertStyles("hidden");
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const editLinkMutation = useMutation({
    mutationFn: async (extensionChanged) => {
      let response;

      try {
        response = await axios.post(
          `https://api.kreativehyperlink.com/v1/links/${hyperlink.id}`,
          {
            target,
            extension,
            public: isPublic,
            extensionChanged,
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
        throw new Error(error.response.data.message);
      }

      return response.data;
    },
    onSuccess: (data) => {
      // close the modal since the method succeeded
      setState(false);
      // invalidate the query so that the data is refetched
      queryClient.invalidateQueries("hyperlinks");
    },
    onError: (error) => {
      // some sort of error occured
      // handle any errors produced from the request
      setMessage(error.message);
      setAlertStyles("");
    },
  });

  const editLink = (e) => {
    // prevents default behavior for form submission
    e.preventDefault();
    // hides any alert messages currently shown
    setAlertStyles("hidden");

    // makes sure all fields have values
    if (target === "" || extension === "") {
      setMessage("Please fill out all fields.");
      setAlertStyles("");
      return;
    }

    // checks to see if all the fields are the same as the global state
    // if they are we show an error message, we don't want to waste resources
    if (
      target === hyperlink.target &&
      extension === hyperlink.extension &&
      isPublic === hyperlink.public
    ) {
      setMessage("No changes were made.");
      setAlertStyles("");
      return;
    }

    // checks to see if the target is a valid URL
    if (!isValidUrl(target)) {
      setMessage("Please enter a valid URL.");
      setAlertStyles("");
      return;
    }

    // check if the extension has changed
    const extensionChanged = extension !== hyperlink.extension;

    // call the mutation
    editLinkMutation.mutate(extensionChanged);
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
                      Edit Hyperlink
                    </Dialog.Title>
                    <p className="text-center text-sm text-gray-500 pb-4">
                      Modify the target URL, extension, and whether the link is
                      public or not.
                    </p>
                    <div className={alertStyles}>
                      <ErrorAlert message={message} />
                    </div>
                    <div id="edit-hyperlink-form">
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
                      <div className="pb-2 pt-3">
                        <label
                          htmlFor="extension"
                          className="block text-left text-sm font-medium text-gray-700"
                        >
                          Link extension
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="extension"
                            id="extension"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="xxx..."
                            required
                            value={extension}
                            onChange={(e) => setExtension(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 pt-3">
                        <div className="sm:col-span-9">
                          <p className="text-left text-md text-gray-700">
                            Hyperlink public visibility
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
                    onClick={(e) => editLink(e)}
                  >
                    Modify hyperlink
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
