import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from './radio-option.model'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'


@Component({
  selector: 'mt-radio',
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true
      }
  ],
  templateUrl: './radio.component.html'
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]
  value: any

  onChange:any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any) {
    this.value = value
    this.onChange(this.value)
  }
  
  getValue(): any {
    return this.value
  }

  writeValue(obj: any) { this.value = obj }
  registerOnChange(fn: any) { this.onChange = fn }
  registerOnTouched() {}
  setDisabledState?() {}


}
