import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { cookies, setCookie, removeCookie, useCookies } from "react-cookie";
import axios from "axios";

export default function LogoutButton() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "kreative_id_key",
    "keychain_id",
    "id_ksn",
    "id_email",
    "id_fname",
    "id_lname",
    "id_picture",
  ]);

  const logout = (e) => {
    // prevents default button click behavior
    e.preventDefault();

    // closes the keychain using id-api
    axios
      .post(
        `https://id-api.kreativeusa.com/v1/keychains/${cookies["keychain_id"]}/close`
      )
      .then((response) => {
        // response status code is between 200-299
        // the only response that would come through is 200 (HTTP OK)
        console.log(response.data.data);

        // deletes all cookies stored in local storage
        removeCookie("kreative_id_key");
        removeCookie("keychain_id");
        removeCookie("id_ksn");
        removeCookie("id_email");
        removeCookie("id_fname");
        removeCookie("id_lname");
        removeCookie("id_picture");

        // redirects user back to the home page
        // TODO design a better logout flow that notifies user that they have been logged out
        window.location.href = "/";
      })
      .catch((error) => {
        // error response status code is above 300+
        console.log(error);

        // gets the status code of the error through the response
        // we check to see if the status code exists as to not throw an error in case an error is thrown
        // that isn't actually sent by the server api, but rather from axios
        let statusCode;

        if (error.response.data.data.statusCode === undefined) {
          statusCode = error.response.data.data.statusCode;

          // for all of these errors we want to redirect the user to the error page with a cause
          if (statusCode === 403) {
            // bad request, probably the id was not passed or is not a number
            window.location.href = `https://id.kreativeusa.com/error?cause=badrequest&aidn=${NEXT_PUBLIC_AIDN}`;
          } else if (statusCode === 404) {
            // keychain not found using the id
            window.location.href = `https://id.kreativeusa.com/error?cause=notfound&aidn=${NEXT_PUBLIC_AIDN}`;
          } else if (statusCode === 500) {
            // internal server error
            window.location.href = `https://id.kreativeusa.com/error?cause=ise&aidn=${NEXT_PUBLIC_AIDN}`;
          } else {
            // some weird unknown error
            // this should not happen at all, so if it does there are critical issues
            window.location.href = `https://id.kreativeusa.com/error?cause=unknown&aidn=${NEXT_PUBLIC_AIDN}`;
          }
        } else {
          // if there is no error response status code then we have an "unknown error"
          // in most cases this is a connection error or some sort of axios error
          window.location.href = `https://id.kreativeusa.com/error?cause=unknown&aidn=${NEXT_PUBLIC_AIDN}`;
        }
      });
  };

  return (
    <button
      type="button"
      className="inline-flex rounded-md border-2 border-hyper-blue-primary py-2 px-4 text-base font-medium text-hyper-blue-primary"
      onClick={(e) => logout(e)}
    >
      Logout
      <ArrowRightIcon className="ml-2 -mr-0.5 h-6 w-6" aria-hidden="true" />
    </button>
  );
}
