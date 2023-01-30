import Head from "next/head";
import FooterComponent from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import Navbar2Component from "@/components/Navbar2";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 Not Found | Kreative Hyperlink</title>
        <meta name="description" content="URL shortening service by Kreative" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-10">
        <div className="tablet:block hidden">
          <NavbarComponent />
        </div>
        <div className="tablet:hidden visible">
          <Navbar2Component />
        </div>
      </div>
      <div className="bg-white py-56 px-6 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Go back home
                </Link>
                <Link
                  href="https://support.kreativeusa.com/hyperlink"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
