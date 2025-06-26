import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { removeLocalStorageItem } from "./storage";

export const isTokenExpired = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken?.exp && decodedToken.exp < currentTime;
  } catch (e) {
    return true;
  }
};

const logout = () => {
  removeLocalStorageItem("user");
  removeLocalStorageItem("accessToken");
  window.location.href = "/auth/sign-in";
};

export const checkTokenValidity = () => {
  const cookieToken = Cookies.get("auth-token");

  const token = cookieToken || localStorage.getItem("accessToken");

  console.log("first token", token);

  if (!token) return;

  if (isTokenExpired(token)) {
    // logout();
  }
};
