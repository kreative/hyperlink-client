import moment from "moment";
import { useAtom } from "jotai";
import { hyperlinkData } from "@/stores/hyperlinkData";

export default function SingleHyperlink(): JSX.Element {
  const [hyperlink] = useAtom(hyperlinkData);

  return (
    <div>
      {hyperlink && (
        <div>
          <div>
            <div>
              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                Hyperlink information
              </h3>
              <p className="mt-1 max-w-2xl text-lg text-gray-500">
                Basic stats and information about this hyperlink.
              </p>
            </div>
            <div className="mt-5 border-t border-gray-200">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-md font-medium text-gray-500">
                    Target URL
                  </dt>
                  <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                    <a className="text-hyper-blue-secondary underline underline-offset-2" href="{hyperlink.target}">{hyperlink.target}</a>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-md font-medium text-gray-500">
                    Clicks
                  </dt>
                  <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                    {hyperlink.clickCount}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-md font-medium text-gray-500">
                    Appears on Leaderboard page
                  </dt>
                  <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                    {hyperlink.public ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-md font-medium text-gray-500">
                    Hyperlink Title
                  </dt>
                  <dd className="mt-1 text-md text-gray-900 sm:col-span-2 sm:mt-0">
                    {hyperlink.titleTag}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
