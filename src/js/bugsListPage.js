import { isLoggin, MyCustomRouter } from "./services/isLogin.service.js";
import { getBugs } from "./services/getUserData.service.js";
import { changeState } from "./services/stateChanger.service.js";
import { logOut } from "./logout.js";
import { onDelete } from "./onDelete.js";
import { getAllUser } from "./services/getUserData.service.js";
import { addBug } from "./addBugs.js";
import { timeConverter } from "./services/timeFormat.service.js";

const handleClick = (e) => {
  switch (e.target.dataset.trackId) {
    case "delete":
      if (e.target.dataset.id) {
        onDelete(e.target.dataset.id);
      } else if (e.target.parentElement.dataset.id) {
        onDelete(e.target.parentElement.dataset.id);
      } else break;
    case "modify":
      changeState(e.target);
      break;
    default:
      break;
  }
};

const cardCreator = (
  { id, title, timestamp, description, user_id, state },
  userName
) => {
  const date = timeConverter(timestamp);
  const card = `
  <div class="col p-1 p-sm-2 ">
    <div class="card text-center h-100" id="${id}">
            <div class="card-header">${title}</div>
            <div class="card-body d-flex justify-content-between flex-column h-100"  style=" min-height : 250px ">
                <p class="card-text  overflow-scroll" style=" height : 200px " >${description}</p>
                <div class="d-flex justify-content-space-aroud">
                <select class="form-select" aria-label="Default select example" data-track-id="modify"  data-id="${id}" >
            <option value="0"  ${
              state == 0 ? "selected" : ""
            } >untreated</option>
            <option value="1" ${
              state == 1 ? "selected" : ""
            }>In progress</option>
            <option value="2" ${state == 2 ? "selected" : ""}>treaty</option>
        </select>
        <button type="button" class="btn btn-light col-4" data-track-id="delete" data-id="${id}"><i class="bi bi-trash-fill text-danger

        " data-track-id="delete"></i></button>
                </div>
            </div>
            <div class="card-footer text-muted">${userName} create this task at ${date}</div>
        </div>
    </div>`;
  return card;
};

const addToFormBugs = async (htmlElement, isUniqueUser = false) => {
  htmlElement.addEventListener("click", (e) => handleClick(e));
  const userBugsList = await getBugs(isUniqueUser);
  if (userBugsList.result && userBugsList.result.status == "done") {
    if (userBugsList.result.bug.length <= 0) {
      htmlElement.innerHTML =
        '<div class="d-flex justify-content-center align-items-center"> 0 bugs 4 you <i class="bi bi-hand-thumbs-up"></i></div>';
    } else {
      (async () => {
        const userList = await getAllUser();
        userBugsList.result.bug.forEach((bug) => {
          htmlElement.innerHTML += cardCreator(
            bug,
            userList.result.user[bug.user_id]
          );
        });
      })();
    }
  }
};

const init = () => {
  const logout = document.querySelector("#logOut");
  logout.addEventListener("click", logOut);
  if (window.location.href.includes("user")) {
    addToFormBugs(document.querySelector("#bugsList"), true);
  } else {
    addToFormBugs(document.querySelector("#bugsList"));
  }
  addBug();
};
window.addEventListener("load", () => {
  if (!isLoggin()) {
    MyCustomRouter("/login.html", false);
  } else init();
});
