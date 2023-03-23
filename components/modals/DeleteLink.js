import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useAtom } from "jotai";
import axios from "axios";

import ErrorAlert from "../alerts/Error";
import { hyperlinkData } from "@/stores/hyperlinkData";

export default function DeleteLinkModal({ state, setState, isSingle }) {
  const cancelButtonRef = useRef(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["kreative_id_key"]);
  const [hyperlink] = useAtom(hyperlinkData);

  // error alert message styles
  const [alertStyles, setAlertStyles] = useState("hidden");
  const [message, setMessage] = useState("");

  const setOpen = (isOpen) => {
    setState(isOpen);
    setAlertStyles("hidden");
  };

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // empty response object to store api response
      let response;

      try {
        // calls the hyperlink api to delete the link with the given id
        response = await axios.delete(
          `https://api.kreativehyperlink.com/v1/links/${hyperlink.id}`,
          {
            headers: {
              KREATIVE_ID_KEY: cookies.kreative_id_key,
              KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
              KREATIVE_APPCHAIN: process.env.NEXT_PUBLIC_APPCHAIN,
            },
          }
        );
      } catch (error) {
        // if the api call fails, throws an error to be handled by the onError function
        throw new Error(error.response.data.message);
      }

      return response.data;
    },
    onSuccess: (data) => {
      // on successful api call, sets the state of the modal to false to close it
      // and invalidates the hyperlinks query to update the hyperlinks list
      setState(false);
      queryClient.invalidateQueries("hyperlinks");

      if (isSingle) {
        // if the modal is being used on the single link page, redirects to the dashboard
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      // some sort of error occured with axios api call
      setMessage(error.response.data.message);
      setAlertStyles("block");
    },
  });

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
                      className="text-2xl font-bold leading-6 text-gray-900 pb-6 leading-normal"
                    >
                      Are you sure you want to delete{" "}
                      <span className="text-gray-400">khyper.link/</span>
                      {hyperlink.extension}?
                    </Dialog.Title>
                    <p className="text-gray-600">
                      Once you delete this Hyperlink, people won&apos;t be able
                      to reach your target URL with this link and extension.
                      Additionally, other Hyperlink users will be able to use
                      the extension: &apos;{hyperlink.extension}&apos;.
                    </p>
                    <div className={alertStyles}>
                      <ErrorAlert message={message} />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:col-start-2 sm:col-span-2 sm:text-sm"
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? (
                      <div
                        className="flex align-middle justify-center"
                        role="status"
                      >
                        <svg
                          aria-hidden="true"
                          className={`w-5 h-5 mr-2 text-gray-200 animate-spin dark:white fill-red-600`}
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        Deleting...
                      </div>
                    ) : (
                      "Confirm Delete"
                    )}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    disabled={deleteMutation.isLoading}
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
