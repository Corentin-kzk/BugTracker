import { APIURL, USRTK } from "../../../env.js";
import { MyCustomRouter } from "./isLogin.service.js";
import { getSessionStorage } from "./sessionStorage.service.js";

export const getPing = async () => {
  try {
    const { data } = await axios.get(`${APIURL}/ping`);
    return data;
  } catch (errors) {
    console.error(errors);
  }
};
export const getUserLogin = async ({ Username, password }) => {
  try {
    const { data } = await axios.get(`${APIURL}/login/${Username}/${password}`);
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

export const getUserRegister = async ({ Username, password }) => {
  try {
    const { data } = await axios.get(
      `${APIURL}/signup/${Username}/${password}`
    );
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

export const getUserLogout = async () => {
  const { token } = getSessionStorage(USRTK);
  try {
    const { data } = await axios.get(`${APIURL}/logout/${token}`);
    if (data.result.status === 'failure') {
      MyCustomRouter('/login.html');
    }
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

export const getAllUser = async () => {
  const { token } = getSessionStorage(USRTK);
  try {
    const { data } = await axios.get(`${APIURL}/users/${token}`);
    if (data.result.status === 'failure') {
      MyCustomRouter('/login.html');
    }
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

export const getBugs = async (isUniqueUser = false) => {
  const { token, userId } = getSessionStorage(USRTK);
  try {
    const { data } = await axios.get(
      `${APIURL}/list/${token}/${isUniqueUser ? userId : "0"}`
    );
      if (data.result.status === 'failure') {
        MyCustomRouter('/login.html');
      }
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

export const getChangeBugState = async ({ id, newState }) => {
  const { token, userId } = getSessionStorage(USRTK);
  try {
    const { data } = await axios.get(
      `${APIURL}/state/${token}/${id}/${newState}`
    );
    if (data.result.status === 'failure') {
      MyCustomRouter('/login.html');
    }
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

export const getDeleteBug = async (id) => {
  const { token, userId } = getSessionStorage(USRTK);
  try {
    const { data } = await axios.get(`${APIURL}/delete/${token}/${id}`);
     if (data.result.status === 'failure') {
        MyCustomRouter('/login.html');
      }
    return data;
  } catch (errors) {
    console.error(errors);
  }
};
