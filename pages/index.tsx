import Head from "next/head";

import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kreative Hyperlink</title>
        <meta name="description" content="URL shortening service by Kreative" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  );
}
