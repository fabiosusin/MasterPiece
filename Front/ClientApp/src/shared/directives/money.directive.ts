import { Directive, ElementRef, OnChanges, SimpleChange } from '@angular/core';
import { NgControl } from '@angular/forms';


@Directive({
  selector: '[money]'
})
export class MoneyDirective implements OnChanges {

  private DECIMALS = 2;
  private DECIMAL_DIVIDER = ',';
  private THOUSANDS_DIVIDER = '.';

  constructor(public model: NgControl, public ele: ElementRef) {
    model.valueChanges.subscribe(change => this.onInputChange(change));
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    this.onInputChange(changes);
  }

  onInputChange(changes: { [propertyName: string]: SimpleChange }) {

    let value: String = this.model.value;
    const model: string = (this.model as any).model;

    if (!value || !String(value).match(/\d+/g)) {
      return;
    }

    // When value is loaded from database it grants is handled as a decimal number
    if (model === value) {
      value = parseFloat(model).toFixed(this.DECIMALS);
    }

    let num: number = Number(String(value).match(/\d+/g).join(''));
    value = num.toString().padStart(1 + this.DECIMALS, '0');
    num = num / Math.pow(10, this.DECIMALS); // Always starts by cents

    let rev = String(value).split('').reverse();

    for (let i = 0, j = 0; i < rev.length; i++) {

      if (i === this.DECIMALS) {
        rev = rev.concat(rev.splice(i, rev.length - (i - 1), this.DECIMAL_DIVIDER));
      }

      if ((i - (j * 4) - (this.DECIMALS + 1)) === 3) {
        rev = rev.concat(rev.splice(i, rev.length - (i - 1), this.THOUSANDS_DIVIDER));
        j++;
      }
    }

    const formatted = rev.reverse().join('');

    this.model.viewToModelUpdate(num);
    this.model.valueAccessor.writeValue(formatted);
    // Need to setValue without emit event to not raise ngOnChanges again
    this.model.control.setValue(num, {
      emitEvent: false, emitModelToViewChange: false
    });
  }
}