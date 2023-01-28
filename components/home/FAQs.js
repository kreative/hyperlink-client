import Link from "next/link";

/* This example requires Tailwind CSS v3.0+ */
const faqs = [
  {
    question: "Can we track clicks and where users are clicking from?",
    answer:
      "Yes! With Kreative Hyperlink you're able to always take a look at how many total clicks any given link has recieved. In addition, you can monitor where users are clicking from based on country, state, and even city.",
  },
  {
    question: "Can I connect a custom, short domain name?",
    answer:
      `We hope to introduce this feature in the future, but currently links only use the 'khyper.link' domain name. If custom domain names are critical for your URL shortening needs, we recommend you checkout Rebrandly.com`,
  },
  {
    question: "Is Kreative Hyperlink free?",
    answer:
      "Currently as this application is an internal side-project, yes you can use Kreative Hyperlink for free! Just create an account and start shrinking your links at hyperspeed!",
  },
];

export default function HomeFAQsComponent() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-24 sm:pt-32 lg:pt-24 lg:pb-40 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Can’t find the answer you’re looking for? Reach out to our{" "}
              <Link
                href={"https://support.kreativeusa.com/hyperlink"}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                customer support
              </Link>{" "}
              team.
            </p>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-10">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
