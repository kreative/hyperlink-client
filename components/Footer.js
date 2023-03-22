import Link from "next/link";

const navigation = {
  main: [
    {
      name: "Contact Us",
      href: "https://support.kreativeusa.com/hyperlink#submit-issue",
    },
    { name: "Get Support", href: "https://support.kreativeusa.com/hyperlink" },
    {
      name: "Sign up",
      href: `https://id.kreativeusa.com/signup?aidn=${process.env.NEXT_PUBLIC_AIDN}`,
    },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Terms & Conditions", href: "/legal/terms-and-conditions" },
  ],
};

export default function FooterComponent() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden pb-10 pt-24 px-6 sm:pb-12 lg:px-8">
        <nav
          className="-mb-6 columns-2 lg:space-x-12 md:space-x-6 sm:flex sm:justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                href={item.href}
                className="text-md leading-6 text-gray-600 hover:text-gray-900"
                target={item.href.startsWith("http") ? "_blank" : undefined}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-sm leading-5 text-gray-500">
          &copy;{" "}
          <Link
            href="https://kreativeusa.com"
            className="hover:underline underline-offset-2 hover:text-black"
          >
            2023 Kreative, LLC. All rights reserved.
          </Link>{" "}
          <Link
            href="https://kreativedreamflow.com"
            className="hover:underline underline-offset-2 hover:text-indigo-700"
          >
            Website made &hearts; with by Kreative Dreamflow.
          </Link>
        </p>
      </div>
    </footer>
  );
}
