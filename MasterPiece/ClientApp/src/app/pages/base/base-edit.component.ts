import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BasePage } from './base.component';

export class BaseEdit<T> extends BasePage<T> {

    constructor(protected router: Router) {
        super(router);
    }

    public form: FormGroup;
    public tab: number = 0;

    onClickChangeTab = (newTab: number) => this.tab = newTab;

    inValidateForm = async () => this.form.invalid;
    assignForm = async (_item: T) => { };
    onSubmit = async (_item: T) => { };
}
