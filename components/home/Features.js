import Image from "next/image";
import {
  ArrowPathIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  TagIcon,
  LockClosedIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Fast redirects.",
    description:
      "Take users from your Hyperlink to any target URL quickly without any hiccups, that's our promise to you.",
    icon: ArrowPathIcon,
  },
  {
    name: "Powerful analytics.",
    description:
      "Track how many clicks each link gets and discover exactly where customers find your links",
    icon: ChartBarIcon,
  },
  {
    name: "Editable target URLs.",
    description:
      "Modify where each short Hyperlink redirects to anytime, instead of having to create a whole new link",
    icon: Cog6ToothIcon,
  },
  {
    name: "Custom URL slugs.",
    description:
      "Customize the word that comes after 'khyper.link/' with any phrase that matches your brand or goals, anytime.",
    icon: PencilSquareIcon,
  },
  {
    name: "HTTPS for all redirects.",
    description:
      "All Hyperlinks are secured with an SSL certificate provided by us for free.",
    icon: LockClosedIcon,
  },
  {
    name: "Customizable tags.",
    description:
      "Organize your Hyperlinks using custom tags so you never lose a short link you've created",
    icon: TagIcon,
  },
];

export default function HomeFeaturesComponent() {
  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-md font-semibold font-mono uppercase leading-8 tracking-tight text-hyper-blue-primary">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shrink your links on a dependable platform with features you&apos;ll
            love
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With Kreative Hyperlink, you can quickly create lightning-fast short
            links that get your users where you need, without sacrifing
            analytics or customizability.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            src="https://cdn.kreativeusa.com/hyperlink/app-screenshot.png"
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            width={2432}
            height={1442}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon
                  className="absolute top-1 left-1 h-5 w-5 text-hyper-blue-secondary"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
