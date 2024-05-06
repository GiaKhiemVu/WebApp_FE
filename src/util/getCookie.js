export const getCookie = () => {
    const cookies = document.cookie
    const cookiesArray = cookies.split(';')
    const cookieData = {}

    cookiesArray.forEach(function(cookie) {
        const parts = cookie.split('=')
        const key = parts[0].trim()
        const value = decodeURIComponent(parts[1])
        cookieData[key] = value
    });

    return cookieData
}

export const getUserCookie = () => {
    let userInfo = getCookie()['user_info']
    if(userInfo){
        userInfo = userInfo.replace(/\\054/g, ',');
        userInfo = JSON.parse(userInfo)
        const userInfoToObject = JSON.parse(userInfo)
        return userInfoToObject
    } else {
        return null
    }
}

export const isLogIn = () => {
    let userInfo = getCookie()['user_info']
    if(userInfo){
        return true
    }
    return false
}

export const clearLoginCookies = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "user_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}