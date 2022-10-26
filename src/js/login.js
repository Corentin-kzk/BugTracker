import { getFormData } from "./services/getFormData.service.js";
import { setSessionStorage } from "./services/sessionStorage.service.js";
import { getUserLogin } from "./services/getUserData.service.js";
import { MyCustomRouter } from "./services/isLogin.service.js";

const init = () => {
  let UserLogin = null;
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    UserLogin = getFormData(event.target);
    if (UserLogin) {
      (async () => {
        const isLogin = await getUserLogin(UserLogin);
        if (isLogin.result.status == "failure") {
          const error = document.querySelector(".error");
          error.innerHTML = `<span>${isLogin.result.message}</span>`;
        } else {
          setSessionStorage({
            token: isLogin.result.token,
            id: isLogin.result.id,
          });
          //check if the user is login
          MyCustomRouter("/index.html", true);
        }
      })();
    }
  });
};

init();
