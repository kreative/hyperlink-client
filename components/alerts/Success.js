import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function SuccessAlertComponent({ extension, hyperlink }) {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-regular text-green-800">
            <span>New Hyperlink successfully created without account: </span>
            <Link
              href={hyperlink}
              className="hover:underline underline-offset-2 font-medium"
            >
              {`khyper.link/${extension}`}
            </Link>
          </h3>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                onClick={() => {
                  navigator.clipboard.writeText(hyperlink);
                }}
              >
                Copy to clipboard
              </button>
              <button
                type="button"
                className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                onClick={() => {
                  window.location.href = hyperlink;
                }}
              >
                Test your Hyperlink
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
