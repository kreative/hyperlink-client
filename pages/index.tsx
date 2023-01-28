import Head from "next/head";

import HomeSplashComponent from "@/components/home/Splash";
import HomeFeaturesComponent from "@/components/home/Features";
import HomeFAQsComponent from "@/components/home/FAQs";
import CTAComponent from "@/components/CTA";
import NavbarComponent from "@/components/Navbar";
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
        <NavbarComponent />
        <HomeSplashComponent />
        <HomeFeaturesComponent />
        <HomeFAQsComponent />
        <CTAComponent />
        <FooterComponent />
      </main>
    </>
  );
}
