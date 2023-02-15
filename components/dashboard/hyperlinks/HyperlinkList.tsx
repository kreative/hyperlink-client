import { useInfiniteQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect } from "react";

import { IHyperlink } from "@/types/IHyperlink";
import HyperlinkItem from "./HyperlinkItem";

export default function HyperlinkList() {
  // gets kreative id key cookie for authenticating requests
  const [cookies] = useCookies(["kreative_id_key"]);
  // amount of hyperlinks to be fetched per page
  const limit = 10;

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
      const maxPages: number = Math.ceil(lastPage.totaLinks / limit);
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
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage || true) await fetchNextPage();
        fetching = false;
      }
    };

    // adds the onScroll event listener to the window
    window.addEventListener("scroll", onScroll);
    // removes the onScroll event listener as a cleanup function
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage]);

  console.log(data);
  console.log(isSuccess);

  return (
    <div>
      <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isSuccess &&
          data?.pages.map((page: any) =>
            page.links.map((hyperlink: IHyperlink) => {
              <HyperlinkItem key={hyperlink.id} hyperlink={hyperlink} />;
            })
          )}
      </ul>
      <div className="pt-6">
        {isFetchingNextPage && <p className="text-center py-4">Fetching...</p>}
        {isLoading && <p className="text-center py-4">Loading...</p>}
      </div>
    </div>
  );
}
