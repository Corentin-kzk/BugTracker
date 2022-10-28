import { USRTK } from "../../../env.js";

export const setSessionStorage = (token) => {
  token = JSON.stringify(token);
  sessionStorage.setItem(`${USRTK}`, token);
};
export const getSessionStorage = () => {
  const token = JSON.parse(sessionStorage.getItem(USRTK));
  return token || {};
};

export const removeSessionStorage = () => {
  sessionStorage.removeItem(USRTK);
};
