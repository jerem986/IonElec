import { Directive, ElementRef, input, output, effect, Signal, signal } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Directive()
export class FormElement<T> {
	public value = input<T>();
	public validators = input<ValidatorFn[] | null>(null);
	public valueChange = output<T>();

	public formControl = new FormControl<T>(this.value(), { validators: this.validators() ?? [] });

	constructor(public elementRef?: ElementRef<HTMLElement>) {
		effect(() => {
			const inputValue = this.value();
			if (this.formControl.value !== inputValue) {
				this.formControl.setValue(inputValue, { emitEvent: false });
			}
		});

		effect(() => {
			const validators = this.validators() ?? [];
			this.formControl.setValidators(validators);
			this.formControl.updateValueAndValidity({ emitEvent: false });
		});

		this.formControl.valueChanges.subscribe((v) => {
			if (v !== this.value()) {
				this.valueChange.emit(v);
			}
		});
	}
}
