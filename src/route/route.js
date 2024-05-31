const backendVer = "v1.0";
const baseURL = "http://localhost:3000/";
const baseBackendURL = `http://localhost:5000/${backendVer}/api/`;

const loginRoute = {
  loginPage: baseURL + "account/login",
  registerPage: baseURL + "account/register",
  recoverPage: baseURL + "account/recover",
};

const apiRoute = {
  base: baseBackendURL,
  login: baseBackendURL + "login",
  register: baseBackendURL + "register",
};

const dashboardRoute = {
  home: baseURL + "home",
  menu: baseURL,
  drink: baseURL,
  food: baseURL,
  about: baseURL,
};

export { loginRoute, apiRoute, dashboardRoute };
