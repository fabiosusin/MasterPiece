import { Directive, ElementRef, OnChanges, SimpleChange, Attribute } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[cpfcnpj], [cpf], [cnpj]'
})

export class CpfCnpjDirective implements OnChanges {

  onlyCpf: boolean;
  onlyCnpj: boolean;

  constructor(public model: NgControl, public ele: ElementRef, @Attribute('cpfcnpj') public cpfcnpj: string, @Attribute('cpf') public cpf: string, @Attribute('cnpj') public cnpj: string) {
    model.valueChanges.subscribe(change => this.onInputChange(change));

    if (!this.cpfcnpj && this.cpf != null) {
      this.onlyCpf = true;
    } else if (!this.cpfcnpj && this.cnpj != null) {
      this.onlyCnpj = true;
    }
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

    if (model === value) {
      value = model.match(/\d+/g).join('');
    } else {
      value = value.match(/\d+/g).join('');
    }

    const pattern = this.onlyCpf || (!this.onlyCnpj && value.length <= 11) ? '###.###.###-##' : '##.###.###/####-##';
    let i = 0;
    let formatted = pattern.replace(/#/g, _ => value[i] ? value[i++] : '');

    // Remove os caracteres especiais ainda não usados na máscara
    formatted = formatted.match(/(.*)\d/)[0].toString();

    this.model.viewToModelUpdate(value);
    this.model.valueAccessor.writeValue(formatted);
  }
}