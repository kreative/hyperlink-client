import Head from "next/head";

import HomeSplashComponent from "@/components/home/Splash";
import HomeFeaturesComponent from "@/components/home/Features";
import HomeFAQsComponent from "@/components/home/FAQs";
import CTAComponent from "@/components/CTA";
import NavbarComponent from "@/components/Navbar";
import Navbar2Component from "@/components/Navbar2";
import FooterComponent from "@/components/Footer";

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
        <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-10">
          <div className="tablet:block hidden">
            <NavbarComponent />
          </div>
          <div className="tablet:hidden visible">
            <Navbar2Component />
          </div>
        </div>
        <HomeSplashComponent />
        <HomeFeaturesComponent />
        <HomeFAQsComponent />
        <CTAComponent />
        <FooterComponent />
      </main>
    </>
  );
}
