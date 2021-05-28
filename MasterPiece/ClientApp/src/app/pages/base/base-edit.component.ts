import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/shared/services/shared.service';
import { Utils } from 'src/shared/utils';
import { BasePage } from './base.component';

export class BaseEdit<T> extends BasePage {

    constructor(
        protected router: Router,
        protected utils: Utils,
        protected sharedService: SharedService) {
        super(router, utils, sharedService);
    }

    public form: FormGroup;
    public tab: number = 0;

    onClickChangeTab = (newTab: number) => this.tab = newTab;

    inValidateForm = async () => this.form.invalid;
    assignForm = async (_item: T) => { };
    onSubmit = async (_item: T) => { };
    errors = () => { };
}
