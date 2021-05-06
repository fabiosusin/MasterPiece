import { FormGroup } from '@angular/forms';

export class BaseEdit<T> {

    public form: FormGroup;
    public tab: number = 0;

    onClickChangeTab = (newTab: number) => this.tab = newTab;

    validateForm = async () => this.form.valid;
    assignForm = async (_item: T) => { };
    onSubmit = async (_item: T) => { };
}
