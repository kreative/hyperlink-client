import Head from "next/head";
import Link from "next/link";
import {
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

import NavbarComponent from "@/components/Navbar";
import FooterComponent from "@/components/Footer";
import CTAComponent from "@/components/CTA";

export default function ContactUs() {
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
        <div className="mx-auto max-w-5xl px-6 lg:px-8" aria-label="Top">
          <div className="py-24 px-12">
            <h2 className="text-lg font-semibold font-mono uppercase leading-8 tracking-tight text-indigo-600 text-center">
              Contact us
            </h2>
            <h1 className="text-black text-center font-bold text-8xl pb-24">
              Drop us a line
            </h1>
            <div className="text-center text-2xl">
              <Link
                href="mailto:hyperlink@kreativeusa.com"
                className="inline-flex hover:underline underline-offset-2"
              >
                <EnvelopeIcon className="w-8 h-8 mr-3" aria-hidden="true" />
                <span className="-mt-0.5">hyperlink@kreativeusa.com</span>
              </Link>
              <div className="text-center text-2xl">
                <Link
                  href="mailto:hyperlink@kreativeusa.com"
                  className="inline-flex hover:underline underline-offset-2"
                >
                  <ChatBubbleLeftIcon
                    className="w-8 h-8 mr-3"
                    aria-hidden="true"
                  />
                  <span className="-mt-0.5">{"(510) 673-5179"}</span>
                </Link>
              </div>
              <div className="pt-6">
                <p className="text-xl text-gray-400">
                  Mon – Fri 9:00 AM- 5:00 PM CST
                </p>
              </div>
              <div className="pt-12">
                <Link
                  href={"mailto:hyperlink@kreativeusa.com"}
                  className="inline-flex rounded-md border border-transparent bg-blue-800 py-3 px-5 text-base font-medium text-white"
                >
                  <PencilSquareIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span className="-mt-0.5">Write to us</span>
                </Link>
              </div>
              <div className="pt-16 mt-20 border-t-2 border-t-gray-200">
                <p className="font-sans text-gray-500">
                  If you're running into technical issues, please submit a
                  ticket at Kreative Support, and our team will take care
                  of you write away.
                </p>
                <div className="pt-12">
                <Link
                  href={"https://support.kreativeusa.com/hyperlink"}
                  className="inline-flex rounded-md border border-blue-800 py-3 px-5 text-base font-medium text-blue-800"
                >
                  <span className="-mt-0.5">Submit a support ticket</span>
                  <ArrowTopRightOnSquareIcon
                    className="ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
        <CTAComponent />
        <FooterComponent />
      </main>
    </>
  );
}