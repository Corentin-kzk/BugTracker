import { getChangeBugState } from "./getUserData.service.js";
export const changeState = (e) => {
  const id = e.dataset.id;
  e.addEventListener("change", (evt) => {
    getChangeBugState(
      {
        id,
        newState: evt.target.value,
      },
      { once: true }
    );
  });
};
