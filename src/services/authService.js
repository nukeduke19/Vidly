import http from "./httpservices";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";
const tokenkey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenkey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenkey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenkey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenkey);
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenkey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
