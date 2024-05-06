const backendVer = 'v1.0'
const baseURL = 'http://localhost:3000/'
const baseBackendURL = `http://localhost:5000/${backendVer}/api/`

const loginRoute = {
    loginPage: baseURL+'login/',
    registerPage: baseURL+'login/register',
    recoverPage: baseURL+'login/recover',
}

const apiRoute = {
    base: baseBackendURL,
    login: baseBackendURL+'login',
    register: baseBackendURL+'register',
}

const dashboardRoute = {
    home: baseURL,
    menu: baseURL,
    drink: baseURL,
    food: baseURL,
    about: baseURL,
}

export { loginRoute, apiRoute, dashboardRoute }