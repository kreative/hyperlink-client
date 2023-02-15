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
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Your Hyperlinks
            </h1>
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
