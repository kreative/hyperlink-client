import Head from "next/head";

import Authenticate from "@/components/Authenticate";

// any of the permissions that would allow the user to continue using the application
const appPermissions = ["KREATIVE_HYPERLINK_USER"];

import StackedNavbar from "@/components/dashboard/StackedNavbar";
import HyperlinkList from "@/components/dashboard/hyperlinks/HyperlinkList";

export default function Dashboard() {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Hyperlinks", href: "/dashboard/links", current: true },
  ];

  return (
    <Authenticate permissions={appPermissions}>
      <Head>
        <title>My Links | Kreative Hyperlink</title>
        <meta name="description" content="URL shortening service by Kreative" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StackedNavbar navigation={navigation} />
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  My Hyperlinks
                </h2>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md border border-transparent bg-hyper-blue-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hyper-blue-secondary focus:outline-none focus:ring-2 focus:ring-hyper-blue-light focus:ring-offset-2"
                >
                  New Hyperlink
                </button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <HyperlinkList />
            </div>
          </div>
        </main>
      </div>
    </Authenticate>
  );
}
