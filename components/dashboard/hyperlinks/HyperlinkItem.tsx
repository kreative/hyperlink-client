import Link from "next/link";
import moment from "moment";
import { UsersIcon, CalendarIcon } from "@heroicons/react/20/solid";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { IHyperlink } from "@/types/IHyperlink";

const HyperlinkItem: React.FC<{ hyperlink: IHyperlink }> = ({
  hyperlink,
}): JSX.Element => {
  return (
    <li key={hyperlink.id} className="border rounded-md">
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div>
            <p className="truncate text-2xl font-medium">
              <span className="text-gray-600">khyper.link/</span>
              <span className="text-indigo-600">{hyperlink.extension}</span>
            </p>
          </div>
          <p className="text-md font-regular text-hyper-blue-secondary">
            {hyperlink.titleTag}
          </p>
          <div className="mt-4 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex pr-4 items-center text-sm text-gray-500">
                <UsersIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {hyperlink.clickCount} clicks
              </p>
              <p className="flex pr-4 items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {moment(hyperlink.createdAt).format("MMM Do YYYY")}
              </p>
            </div>
            <div>
              <Link
                href={`/dashboard/links/${hyperlink.id}/edit`}
                className="inline-block"
              >
                <PencilIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-600 -mb-0.5"
                  aria-hidden="true"
                />
              </Link>
              <button type="button">
                <TrashIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-600 -mb-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default HyperlinkItem;
