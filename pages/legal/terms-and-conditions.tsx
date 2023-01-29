import Head from "next/head";
import NavbarComponent from "@/components/Navbar";
import Navbar2Component from "@/components/Navbar2";
import CTAComponent from "@/components/CTA";
import FooterComponent from "@/components/Footer";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Kreative Hyperlink</title>
        <meta name="description" content="URL shortening service by Kreative" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-10">
          <div className="tablet:block hidden">
            <NavbarComponent />
          </div>
          <div className="tablet:hidden visible">
            <Navbar2Component />
          </div>
        </div>
        <div className="mx-auto max-w-7xl pb-24 px-6 lg:px-8" aria-label="Top">
          <h1 className="text-2xl text-center font-bold">Terms and Conditions</h1>
        </div>
        <CTAComponent />
        <FooterComponent />
      </main>
    </>
  );
}
