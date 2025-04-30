import { Directive, effect, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { input } from '@angular/core';

@Directive()
export class FormElement<T> {
	public value = input<T>();

	@Output()
	public valueChange = new EventEmitter<T>();

	public _formControl = new FormControl<T>(null as any);

	public constructor(public elementRef?: ElementRef<HTMLElement>) {
		effect(() => {
			const inputValue = this.value();
			if (this._formControl.value !== inputValue) {
				this._formControl.setValue(inputValue);
			}
		});

		this._formControl.valueChanges.subscribe((v) => {
			if (v !== this.value()) {
				this.valueChange.emit(v);
			}
		});
	}
}
