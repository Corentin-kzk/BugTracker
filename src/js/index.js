import { isLoggin, MyCustomRouter } from "./services/isLogin.service.js";
import {
  getUserLogout,
  getUserBugs,
  getAllBugs,
} from "./services/getUserData.service.js";
import {
  getSessionStorage,
  removeSessionStorage,
} from "./services/sessionStorage.service.js";
import { timeConverter } from "./services/timeFormat.service.js";
import { changeState } from "./services/stateChanger.service.js";

const tableCreator = ({
  id,
  title,
  timestamp,
  description,
  user_id,
  state,
}) => {
  const date = timeConverter(timestamp);
  const table = ` <tr class="${
    state == 0 ? "bg-danger" : state == 1 ? "bg-warning" : "bg-success"
  }">
  <th scope="row" class="text-center">${id}</th>
  <td class="text-center">${title}</td>
  <td class="text-center">${user_id}</td>
  <td class="text-center">${date}</td>
  <td class="text-center">
    <select class="form-select ${
      state == 0 ? "bg-danger" : state == 1 ? "bg-warning" : "bg-success"
    } " aria-label="Default select example" id="${id}" onChange=${() => changeState(e)}>
      <option value="0" class="bg-light"  ${
        state == 0 ? "selected" : ""
      } >untreated</option>
      <option value="1" class="bg-light" ${
        state == 1 ? "selected" : ""
      }>In progress</option>
      <option value="2" class="bg-light" ${
        state == 2 ? "selected" : ""
      }>treaty</option>
    </select>
  </td>
  </tr>`;
  return table;
};

const addAssignedBugs = async () => {
  const userBugsListElement = document.querySelector("#userBugsList");
  const userInfo = getSessionStorage();
  const userBugsList = await getUserBugs(userInfo);
  if (userBugsList.result && userBugsList.result.status == "done") {
    if (userBugsList.result.bug.length <= 0) {
      userBugsListElement.innerHTML =
        '<td colspan="6" class="text-center">No Bugs 4 you <i class="bi bi-emoji-laughing"></i></td>';
    }
    userBugsList.result.bug.forEach((bug) => {
      userBugsListElement.innerHTML += tableCreator(bug);
    });
  }
};

const addAllBugs = async () => {
  const allBugsListElement = document.querySelector("#AllBugsList");
  const userInfo = getSessionStorage();
  const userBugsList = await getAllBugs(userInfo);
  console.log(
    "🚀 ~ file: index.js ~ line 43 ~ addAllBugs ~ userBugsList",
    userBugsList
  );
  if (userBugsList.result && userBugsList.result.status == "done") {
    if (userBugsList.result.bug.length <= 0) {
      allBugsListElement.innerHTML =
        '<td colspan="6" class="text-center">No Bugs 4 you <i class="bi bi-emoji-laughing"></i></td>';
    }
    userBugsList.result.bug.forEach((bug) => {
      allBugsListElement.innerHTML += tableCreator(bug);
    });
  }
};

const logOut = async () => {
  const res = await getUserLogout(getSessionStorage());
  removeSessionStorage();
  MyCustomRouter("/login.html", false);
};

const init = () => {
  const logout = document.querySelector("#logOut");
  logout.addEventListener("click", logOut);
  addAssignedBugs();
  addAllBugs();
};
window.addEventListener("load", () => {
  if (!isLoggin()) {
    MyCustomRouter("/login.html", false);
  } else init();
});
