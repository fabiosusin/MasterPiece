import { EventEmitter, Injectable, Output } from "@angular/core";
import { LoggedUserService } from "src/app/cache/loggedUser.component";

@Injectable()
export class SharedService {
    @Output() isLoggedUser: EventEmitter<boolean> = new EventEmitter();
    constructor(protected loggedUser: LoggedUserService) { }

    changeLoggedUser = () =>
        this.isLoggedUser.emit(this.loggedUser.getLoggedUser() != null);

    getIsLoggedUser() {
        this.changeLoggedUser();
        return this.isLoggedUser;
    }

}