import { getFormData } from "./services/getFormData.service.js";
import { setSessionStorage } from "./services/sessionStorage.service.js";
import {
  getUserLogin,
  getUserRegister,
} from "./services/getUserData.service.js";
import { MyCustomRouter } from "./services/isLogin.service.js";

const init = () => {
  let userLogin = null;
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    userLogin = getFormData(event.target);
    if (userLogin) {
      if (userLogin.password !== userLogin.confirmPassword) {
        const error = document.querySelector(".error");
        error.innerHTML = `<span>Not the same password</span>`;
      } else {
        (async () => {
          const isLogin = await getUserRegister(userLogin);
          if (isLogin.result.status == "failure") {
            const error = document.querySelector(".error");
            error.innerHTML = `<span>${isLogin.result.message}</span>`;
          } else {
            setSessionStorage({
              token: isLogin.result.token,
              userId: isLogin.result.id,
            });
            //check if the user is login
            MyCustomRouter("/index.html", true);
          }
        })();
      }
    }
  });
};

init();
