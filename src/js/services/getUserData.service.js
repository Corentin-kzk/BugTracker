import { APIURL } from "../../../env.js";

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
    const { data } = await axios.get(`${APIURL}/signup/${Username}/${password}`);
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

export const getUserLogout = async ({ token }) => {
  try {
    const { data } = await axios.get(`${APIURL}/logout/${token}`);
    return data;
  } catch (errors) {
    console.error(errors);
  }
};


export const getUserBugs = async ({token, id}) => {
  try {
    const { data } = await axios.get(`${APIURL}/list/${token}/${id}`);
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

export const getAllBugs = async ({token, id}) => {
  try {
    const { data } = await axios.get(`${APIURL}/list/${token}/0`);
    return data;
  } catch (errors) {
    console.error(errors);
  }
};



export const getChangeBugState = async ({token, id, newState}) => {
  try {
    const { data } = await axios.get(`${APIURL}/state/'${token}/${id}/${newState}`);
    return data;
  } catch (errors) {
    console.error(errors);
  }
};

