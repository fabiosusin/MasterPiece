import { Router } from '@angular/router';

export class BasePage<T> {
    constructor(protected router: Router) {
        this.dataReceived = this.router.getCurrentNavigation().extras.state;
    }

    dataReceived: any;
}
