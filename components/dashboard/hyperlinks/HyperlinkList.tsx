import { useInfiniteQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useAtom } from "jotai";
import axios from "axios";
import { useEffect } from "react";

import HyperlinkItem from "./HyperlinkItem";
import DeleteLinkModal from "../../modals/DeleteLink";
import EditLinkModal from "../../modals/EditLink";
import QueryDescriptor from "../QueryDescriptor";
import { IHyperlink } from "@/types/IHyperlink";
import { deleteModalState } from "@/stores/modals/deleteDashboard";
import { editModalState } from "@/stores/modals/editDashboard";
import { queryDescriptorState } from "@/stores/queryDescriptorState";

export default function HyperlinkList() {
  // gets kreative id key cookie for authenticating requests
  const [cookies] = useCookies(["kreative_id_key"]);
  // global delete link modal state
  const [deleteState, setDelete] = useAtom(deleteModalState);
  // global edit link modal state
  const [editState, setEdit] = useAtom(editModalState);
  // amount of hyperlinks to be fetched per page
  // global state to manage query descriptor message
  const [queryDescription, setQueryDescription] = useAtom(queryDescriptorState);
  const limit = 21;

  const fetchHyperlinks = async (page: number) => {
    // empty response object to be set
    let response;

    try {
      // makes a request to hyperlink api to get all hyperlinks
      // sends all ID cookies and headers and pagination data
      response = await axios.get(
        `https://api.kreativehyperlink.com/v1/links?limit=${limit}&page=${page}`,
        {
          headers: {
            KREATIVE_ID_KEY: cookies.kreative_id_key,
            KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
            KREATIVE_APPCHAIN: process.env.NEXT_PUBLIC_APPCHAIN,
          },
        }
      );
    } catch (error) {
      // some sort of error and status code is not between 200-299
      console.log(error);
      throw new Error("Something went wrong with the server.");
    }

    // gets the total links from the api response
    const totalLinks = response.data.data.totalLinks;
    // sets the query description based on totalLinks
    setQueryDescription(`Showing ${totalLinks} Hyperlinks`);

    // sends back the data object which includes
    // totalLinks and array of hyperlinks
    return response.data.data;
  };

  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["hyperlinks"],
    queryFn: ({ pageParam = 1 }) => fetchHyperlinks(pageParam),
    getNextPageParam: (lastPage, pages) => {
      const maxPages: number = Math.ceil(lastPage.totalLinks / limit);
      if (pages.length < maxPages) return pages.length + 1;
      else return undefined;
    },
  });

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      // gets different variable to measure and track scrolling on the DOM
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      // if the user is at the bottom of the page and react-query is not fetching
      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;
        console.log("fetching next page");
        if (hasNextPage || true) await fetchNextPage();
        fetching = false;
      }
    };

    // adds the onScroll event listener to the window
    window.addEventListener("scroll", onScroll);
    // removes the onScroll event listener as a cleanup function
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage]);

  return (
    <div>
      <DeleteLinkModal state={deleteState} setState={setDelete} isSingle={false} />
      <EditLinkModal state={editState} setState={setEdit} />
      <QueryDescriptor />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        {isSuccess &&
          data?.pages.map((page: any) =>
            page.links.map((hyperlink: IHyperlink) => (
              <HyperlinkItem key={hyperlink.id} hyperlink={hyperlink} />
            ))
          )}
      </ul>
      <div className="pt-6">
        {isFetchingNextPage && <p className="text-center py-4">Fetching...</p>}
        {isLoading && <p className="text-center py-4">Loading...</p>}
      </div>
    </div>
  );
}
