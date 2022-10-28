import { getFormData } from "./services/getFormData.service.js";
import { postNewBug } from "./services/postUserData.service.js";


export const addBug = () => {
  const addElement = document.querySelector("#addBugForm");
  addElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formBug = getFormData(e.target);
    const res = await postNewBug(formBug);
    if (res.data.result.status == "done") {
      location.reload();
    }
    return res;
  });
};
