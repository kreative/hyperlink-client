import Link from "next/link";

/* This example requires Tailwind CSS v3.0+ */
export default function CTAComponent() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl lg:py-12 px-6 sm:py-24 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-r from-hyper-purple-primary to-hyper-blue-primary px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white">
            Design your perfect Hyperlink today
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200">
            Get started for free today with our reliable URL shortening service and finally get greater insights into how many times your link is visited and where!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link 
              href="/dashboard"
              className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
            <Link href="/contact-us" className="text-base font-semibold leading-7 text-white">
            Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}