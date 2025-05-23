import { Validators, ValidatorFn, FormGroup, FormControl } from '@angular/forms';

type ControlsOf<T> = {
	[K in keyof T as `${K & string}Control`]: ValidatorFn[];
};

type FormControlsOf<T> = {
	[K in keyof T]: FormControl<T[K]>;
};

export class ValidatorsFactoryHelper {
	static createControls<T>(model: T): ControlsOf<T> {
		const controls = {} as ControlsOf<T>;
		for (const key of Object.keys(model) as (keyof T)[]) {
			const value = model[key];
			if (typeof value === 'number' || value === null || value === undefined) {
				(controls as any)[`${key as string}Control`] = [Validators.required, Validators.min(0)];
			} else {
				(controls as any)[`${key as string}Control`] = [Validators.required];
			}
		}
		return controls;
	}

	public static createFormGroup<T>(model: T, controls: ControlsOf<T>): FormGroup<FormControlsOf<T>> {
		const group: Partial<FormControlsOf<T>> = {};
		for (const key of Object.keys(model) as (keyof T)[]) {
			group[key] = new FormControl(model[key], (controls as any)[`${key as string}Control`]);
		}
		return new FormGroup(group as FormControlsOf<T>);
	}

	public static isFormValid<T>(form: FormGroup<FormControlsOf<T>>): boolean {
		form.updateValueAndValidity({ emitEvent: false });
		return form.valid;
	}
}
