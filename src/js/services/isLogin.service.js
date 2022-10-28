import { URL} from "../../../env.js";
import {getSessionStorage} from "./sessionStorage.service.js"

export const isLoggin = () => {
  let IsLoggin = false;
  if (getSessionStorage()) IsLoggin = true;
  return IsLoggin;
};

/**
 *
 * @param {string} url
 * @param {Boolean} isSecureRoute
 */
export const MyCustomRouter = (url = "/#", isSecureRoute = false) => {
  if (isSecureRoute) {
    if (!isLoggin()) window.location.href = `/login.html`;
    else window.location.href = `${url}`;
  } else window.location.href = `${url}`;
};
