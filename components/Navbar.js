import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function NavbarComponent() {
  return (
    <header>
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Kreative Hyperlink</span>
              <Image
                className="sm:h-10 w-auto h-8"
                width={300}
                height={300}
                src="/hyperlink-logo-color.png"
                alt=""
              />
            </Link>
          </div>
          <div className="ml-10 space-x-8">
            <Link
              href={"/contact-us"}
              className="inline-block py-2 text-base font-medium text-black"
            >
              Contact us
            </Link>
            <a
              href={"https://support.kreativeusa.com/hyperlink"}
              className="inline-block py-2 text-base font-medium text-black"
              target={"_blank"}
              rel={"noreferrer"}
            >
              Get support
            </a>
            <Link
              href={"#"}
              className="inline-block py-2 text-base font-medium text-black"
            >
              Sign up
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex rounded-md border border-transparent bg-hyper-blue-primary hover:bg-hyper-blue-secondary py-2 px-4 text-base font-medium text-white"
            >
              Dashboard
              <ArrowRightIcon
                className="ml-2 -mr-0.5 h-6 w-6"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
