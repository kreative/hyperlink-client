import Head from "next/head";

import Authenticate from "@/components/Authenticate";

// any of the permissions that would allow the user to continue using the application
const appPermissions = ["KREATIVE_HYPERLINK_USER"];

export default function Dashboard() {
  return (
    <Authenticate permissions={appPermissions}>
      <Head>
        <title>Dashbpard | Kreative Hyperlink</title>
        <meta name="description" content="URL shortening service by Kreative" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-center text-2xl">Dashboard</h1>
      </main>
    </Authenticate>
  );
}