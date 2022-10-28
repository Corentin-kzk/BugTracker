import { APIURL, USRTK } from "../../../env.js";
import { getSessionStorage } from "./sessionStorage.service.js";

export const postNewBug = async (formParam) => {
  const { token, userId } = getSessionStorage(USRTK);
  try {
    const response = await axios.post(
      `${APIURL}/add/${token}/${userId}`,
      formParam,
      { headers: { "Content-Type": "text/plain" } }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};
