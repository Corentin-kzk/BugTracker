import { isLoggin, MyCustomRouter } from "./services/isLogin.service.js";
import { getBugs, getPing } from "./services/getUserData.service.js";
import { changeState } from "./services/stateChanger.service.js";
import { logOut } from "./logout.js";
import { tableCreator } from "./dynamicTable.js";
import { onDelete } from "./onDelete.js";
import { getAllUser } from "./services/getUserData.service.js";
import { addBug } from "./addBugs.js";

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

const addToFormBugs = async (htmlElement, isUniqueUser = false) => {
  htmlElement.addEventListener("click", (e) => handleClick(e));
  const userBugsList = await getBugs(isUniqueUser);
  if (userBugsList.result && userBugsList.result.status == "done") {
    if (userBugsList.result.bug.length <= 0) {
      htmlElement.innerHTML =
        '<td colspan="6" class="text-center">No Bugs 4 you <i class="bi bi-emoji-laughing"></i></td>';
    } else {
      (async () => {
        const userList = await getAllUser();
        userBugsList.result.bug.forEach((bug) => {
          htmlElement.innerHTML += tableCreator(
            bug,
            userList.result.user[bug.user_id]
          );
        });
      })();
    }
  }
};

const addPingStatus = () => {
  (async () => {
    const pingStatus = await getPing();
    return pingStatus;
  })();
  
};

const init = () => {
  const logout = document.querySelector("#logOut");
  logout.addEventListener("click", logOut);
  addPingStatus();
  addToFormBugs(document.querySelector("#AllBugsList"));
  addToFormBugs(document.querySelector("#userBugsList"), true);
  addBug();
};
window.addEventListener("load", () => {
  if (!isLoggin()) {
    MyCustomRouter("/login.html", false);
  } else init();
});
