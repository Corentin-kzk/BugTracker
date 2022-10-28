import { getUserLogout } from "./services/getUserData.service.js";
import { removeSessionStorage } from "./services/sessionStorage.service.js";
import { MyCustomRouter } from "./services/isLogin.service.js";

export const logOut = async () => {
  const res = await getUserLogout();
  removeSessionStorage();
  MyCustomRouter("/login.html", false);
};
