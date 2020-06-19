import * as Cookies from "js-cookie";

class Auth {
    appId: string;
    token: string;
    redirectPage: string;

    constructor() {
        this.appId = Cookies.get("appId") || "";
        this.token = Cookies.get("token") || "";
        this.redirectPage = Cookies.get("redirectPage") || "";
    }
}

export default new Auth();
