import { Injectable } from "@angular/core";
import { LoggedUserModel } from "src/models/logged-user/logged-user";

@Injectable({ providedIn: 'root' })
export class LoggedUser {

    setLoggedUser(loggedUser: LoggedUserModel) {
        localStorage.setItem('password', loggedUser.password);
        localStorage.setItem('token', loggedUser.token);
        localStorage.setItem('userName', loggedUser.userName);
    }

    getLoggedUser() {
        const user: LoggedUserModel = {
            password: localStorage.getItem('password'),
            token: localStorage.getItem('token'),
            userName: localStorage.getItem('userName')
        };

        return user;
    }

}