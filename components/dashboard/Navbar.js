import Link from "next/link";
import Image from "next/image";

import LogoutButton from "./LogoutButton";

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
                src="/hyperlink-logo-black.png"
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
            <LogoutButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
