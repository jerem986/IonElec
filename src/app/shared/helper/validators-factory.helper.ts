import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export type ControlsOf<T> = {
	[K in keyof T]: ValidatorFn[];
};

type FormControlsOf<T> = {
	[K in keyof T]: FormControl<T[K]>;
};

export class ValidatorsFactoryHelper {
	static createControls<T>(model: T): ControlsOf<T> {
		const controls = {} as ControlsOf<T>;
		const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(model)).filter(
			(k) => k !== 'constructor',
		) as (keyof T)[];
		for (const key of new Set([...keys, ...Object.keys(model)] as (keyof T)[])) {
			const value = model[key];
			if (typeof value === 'number' || value === null || value === undefined) {
				controls[key] = [Validators.required, Validators.min(0)];
			} else {
				controls[key] = [Validators.required];
			}
		}
		return controls;
	}

	public static createFormGroup<T>(model: T, controls: ControlsOf<T>): FormGroup<FormControlsOf<T>> {
		const group: Partial<FormControlsOf<T>> = {};
		for (const key of Object.keys(controls) as (keyof T)[]) {
			group[key] = new FormControl(model[key], controls[key]);
		}
		return new FormGroup(group as FormControlsOf<T>);
	}

	public static isFormValid<T>(form: FormGroup<FormControlsOf<T>>): boolean {
		form.updateValueAndValidity({ emitEvent: false });
		return form.valid;
	}
}
