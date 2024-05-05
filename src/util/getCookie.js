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
    userInfo = userInfo.replace(/\\054/g, ',');
    userInfo = JSON.parse(userInfo)
    const userInfoToObject = JSON.parse(userInfo)
    return userInfoToObject
}