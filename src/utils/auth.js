/**
 * 设置sessionstorage值
*/
export const setSessionStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    // window.sessionStorage.setItem(name, content)
    window.localStorage.setItem(name, content)
}

/**
 *  获取sessionstorage值
*/
export const getSessionStore = (name) => {
    if (!name) return
    let value = window.localStorage.getItem(name)
    // let value = window.sessionStorage.getItem(name)
    if (value !== null) {
        try {
            value = JSON.parse(value)
        } catch (e) {
        }
    }
    return value
}

/**
 * 移除sessionstorage值
*/
export const removeSessionStore = (name) => {
    if (!name) return
    // window.sessionStorage.removeItem(name)
    window.localStorage.removeItem(name)
}

/**
 * 获取cookie,
*/
export const getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
}

/**
 * 设置cookie,
*/
export const setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    // document.domain = 'http://100.168.1.161:8080'
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())+"; path=/";
};

/**
 * 清除cookie,
*/
export const delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null){
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
