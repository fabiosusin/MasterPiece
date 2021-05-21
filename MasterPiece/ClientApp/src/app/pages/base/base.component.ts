import { Router } from '@angular/router';
import { Utils } from 'src/shared/utils';

export class BasePage<T> {
    constructor(
        protected router: Router,
        protected utils: Utils) {
        this.dataReceived = this.router.getCurrentNavigation().extras.state;
    }

    isLoading: boolean;
    dataReceived: any;

    showValidationsError(messages: string[], title = 'Os seguintes erros foram encontrados!') {
        this.utils.errorMessage(messages.join('\r\n'), title)
    }
}
