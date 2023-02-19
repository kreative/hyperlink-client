import Head from "next/head";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import axios from "axios";

import Authenticate from "@/components/Authenticate";
import StackedNavbar from "@/components/dashboard/StackedNavbar";
import SingleHyperlink from "@/components/dashboard/hyperlinks/SingleHyperlink";
import Breadcrumb from "../../../components/dashboard/Breadcrumb";
import EditLinkModal from "../../../components/modals/EditLink";
import DeleteLinkModal from "../../../components/modals/DeleteLink";
import { hyperlinkData } from "@/stores/hyperlinkData";

// any of the permissions that would allow the user to continue using the application
const appPermissions = ["KREATIVE_HYPERLINK_USER"];

export default function SingleLinkPage() {
  const { id } = useRouter().query;
  const [cookies] = useCookies(["kreative_id_key"]);

  // global states for edit and delete modal
  const [editState, setEdit] = useState(false);
  const [deleteState, setDelete] = useState(false);
  const [hyperlink, setHyperlink] = useAtom(hyperlinkData);

  const navigation = [{ name: "Dashboard", href: "/dashboard", current: true }];

  const singleLinkQuery = useQuery({
    queryKey: ["hyperlinks", id],
    queryFn: async () => {
      let response;

      try {
        response = await axios.get(
          `https://api.kreativehyperlink.com/v1/links/${id}`,
          {
            headers: {
              KREATIVE_ID_KEY: cookies.kreative_id_key,
              KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
              KREATIVE_APPCHAIN: process.env.NEXT_PUBLIC_APPCHAIN,
            },
          }
        );
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
      }

      // set the hyperlink data to the global state
      setHyperlink(response.data.data.link);

      // return the successful response with the link data
      return response.data.data.link;
    },
    enabled: true,
  });

  return (
    <Authenticate permissions={appPermissions}>
      <Head>
        <title>Manage Hyperink | Kreative Hyperlink</title>
        <meta name="description" content="URL shortening service by Kreative" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StackedNavbar navigation={navigation} />
      <div>
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {singleLinkQuery.isLoading && <p>Loading...</p>}
            {singleLinkQuery.isError && <p>Error</p>}
          </div>
        </header>
      </div>
      {singleLinkQuery.isSuccess && (
        <div className="py-10">
          <EditLinkModal state={editState} setState={setEdit} />
          <DeleteLinkModal state={deleteState} setState={setDelete} isSingle={true} />
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
                    {hyperlink && (
                      <span>
                        <span className="text-gray-600">khyper.link/</span>
                        <span className="text-hyper-blue-primary">
                          {hyperlink.extension}
                        </span>
                      </span>
                    )}
                  </h2>
                  <div className="pt-4">
                    <Breadcrumb
                      pages={[
                        {
                          name: "Dashboard",
                          href: "/dashboard",
                          current: false,
                        },
                        {
                          name: hyperlink.titleTag,
                          href: `/dashboard/links/${hyperlink.id}`,
                          current: true,
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none"
                    onClick={() => setDelete(true)}
                  >
                    <TrashIcon className="h-5 w-5 mr-2" />
                    Delete
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md border border-transparent bg-hyper-blue-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hyper-blue-secondary focus:outline-none"
                    onClick={() => setEdit(true)}
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <SingleHyperlink />
              </div>
            </div>
          </main>
        </div>
      )}
    </Authenticate>
  );
}
