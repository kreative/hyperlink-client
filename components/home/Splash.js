import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import ErrorAlertComponent from "@/components/alerts/Error";
import SuccessAlertComponent from "@/components/alerts/Success";

export default function HomeSplashComponent() {
  const [url, setUrl] = useState("");
  const [extension, setExtension] = useState("test");
  const [hyperlink, setHyperlink] = useState("#");
  const [errorMessage, setErrorMessage] = useState("Fill out the field");
  const [errorStyles, setErrorStyles] = useState(
    "hidden sm:mx-auto sm:max-w-screen-md"
  );
  const [successStyles, setSuccessStyles] = useState(
    "hidden sm:mx-auto sm:max-w-screen-md"
  );

  const modifyErrorAlert = (message) => {
    setErrorMessage(message);
    setErrorStyles("sm:mx-auto sm:max-w-screen-md");
  };

  const isValidUrl = (urlString) => {
    let urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const createHyperlink = (e) => {
    // prevents default form submit behavior
    // however this does remove automatic "required" verification so we have to handle empty field problems
    e.preventDefault();

    // resets alert styles back to hidden to reset the error, success flow
    setErrorStyles("hidden");
    setSuccessStyles("hidden");

    // checks if the field is filled out
    // or checks if the input is an actual URL or not
    if (url === "" || !isValidUrl(url)) {
      modifyErrorAlert("Please enter a valid URL");
    } else {
      // makes a request to the hyperlink api to create a new ghost link
      axios
        .post("https://api.kreativehyperlink.com/v1/links/ghost", {
          target: url,
        })
        .then((response) => {
          console.log(response);
          // response status is between 200-299, so success
          // sets the new hyperlink and extension that came back into state
          const newExtension = response.data.data.link.extension;
          const newHyperlink = `https://khyper.link/${newExtension}`;
          
          setExtension(newExtension);
          setHyperlink(newHyperlink);

          // shows success alert box with the new hyperlink
          setSuccessStyles("sm:mx-auto sm:max-w-screen-md")
        })
        .catch((error) => {
          console.log(error);
          // handles the errors that come back from the api, displays alerts/components for errors
        });
    }
  };

  return (
    <div className="border-b-2 border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div id="splash-section" className="pt-36 pb-52">
          <h1 className="text-black text-center font-bold text-8xl">
            Create, track, and analyze your links at{" "}
            <span className="italic">hyperspeed</span>
          </h1>
          <p className="my-10 text-lg leading-8 text-gray-600 text-center lg:px-18 md:px-12 sm:px-0">
            When your links get crazy long and you're sending thousands of
            customers all across the web, you need Kreative Hyperlink to keep an
            eye on what links you're promoting and what your customers are
            finding click-worthy!
          </p>
          <div id="error-alert" className={errorStyles}>
            <ErrorAlertComponent message={errorMessage} />
          </div>
          <div id="success-alert" className={successStyles}>
            <SuccessAlertComponent extension={extension} hyperlink={hyperlink} />
          </div>
          <form className="mt-4 sm:mx-auto sm:flex sm:max-w-screen-md">
            <div className="min-w-0 flex-1">
              <label htmlFor="url" className="sr-only">
                URL
              </label>
              <input
                id="url"
                type="text"
                value={url}
                name="url"
                required
                className="block w-full rounded-md border px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                placeholder="Enter your URL..."
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-3">
              <button
                onClick={(e) => createHyperlink(e)}
                className="block w-full rounded-md border border-transparent bg-blue-800 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
              >
                Create Hyperlink
              </button>
            </div>
          </form>
          <p className="text-center pt-4 text-sm text-gray-400">
            By clicking Create Hyperlink, you agree to Kreative Hyperlink's{" "}
            <Link
              href="/legal/terms-and-conditions"
              className="underline underline-offset-2 hover:text-blue-800"
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy-policy"
              className="underline underline-offset-2 hover:text-blue-800"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
