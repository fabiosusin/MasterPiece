import { Injectable } from "@angular/core";
import { LoggedUserModel } from "src/models/logged-user/logged-user";

@Injectable({ providedIn: 'root' })
export class LoggedUserService {

    setLoggedUser(loggedUser: LoggedUserModel) {
        if (!loggedUser || !loggedUser.user || !loggedUser.token) {
            console.error('Não foi possível setar o usuário Logado', loggedUser)
            return;
        }

        localStorage.setItem('password', loggedUser.user.password);
        localStorage.setItem('token', loggedUser.token);
        localStorage.setItem('userName', loggedUser.user.name);
    }

    removeLoggedUser() {
        localStorage.removeItem('password');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
    }

    getLoggedUser() {
        const user: LoggedUserModel = {
            user: {
                password: localStorage.getItem('password'),
                name: localStorage.getItem('userName')
            },
            token: localStorage.getItem('token'),
        };

        if (!user.token)
            return null;

        return user;
    }

}