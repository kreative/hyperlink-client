import Link from "next/link";
import moment from "moment";
import { useAtom } from "jotai";
import { UsersIcon, CalendarIcon } from "@heroicons/react/20/solid";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { IHyperlink } from "@/types/IHyperlink";
import { deleteModalState } from "@/stores/deleteModalState";
import { editModalState } from "@/stores/editModalState";
import { hyperlinkData } from "@/stores/hyperlinkData";

const HyperlinkItem: React.FC<{ hyperlink: IHyperlink }> = ({
  hyperlink,
}): JSX.Element => {
  const [editState, setEdit] = useAtom(editModalState);
  const [deleteState, setDelete] = useAtom(deleteModalState);
  const [hyperlinkDataState, setHyperlinkData] = useAtom(hyperlinkData);

  const handleEditModal = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setHyperlinkData(hyperlink);
    setEdit(true);
  }

  const handleDeleteModal = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setHyperlinkData(hyperlink);
    setDelete(true);
  }

  return (
    <li key={hyperlink.id} className="border rounded-md">
      <Link href="#" className="block hover:bg-gray-50">
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
              <button 
                type="button"
                className="focus:ring-0"
                onClick={handleEditModal}
              >
                <PencilIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-600 -mb-0.5"
                  aria-hidden="true"
                />
              </button>
              <button 
                type="button"
                className="focus:ring-0"
                onClick={handleDeleteModal}
              >
                <TrashIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-600 -mb-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default HyperlinkItem;
