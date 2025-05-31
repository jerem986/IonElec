import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { validateSync } from 'class-validator';
import 'reflect-metadata';

export type ControlsOf<T> = {
	[K in keyof T]: ValidatorFn[];
};

type FormControlsOf<T> = {
	[K in keyof T]: FormControl<T[K]>;
};

export class ValidatorsFactoryHelper {
	public static getValidator<T extends object>(target: T, propertyKey: keyof T): ValidatorFn {
		return (control) => {
			const clonedTarget = Object.assign(
				typeof target !== 'function' ? new (target as any).constructor() : new (target as any)(),
				target,
			);

			clonedTarget[propertyKey] = control.value;

			const errors = validateSync(clonedTarget).filter((e) => e.property === propertyKey);

			if (errors.length === 0) {
				return null;
			}

			const error = errors[0];
			const constraintKeys = Object.keys(error.constraints || {});
			const constraintName = constraintKeys[0];

			return {
				[constraintName]: {
					valid: false,
					message: error.constraints?.[constraintName] || 'Validation failed',
					constraints: error.constraints,
				},
			};
		};
	}

	public static createControls<T extends object>(model: T, customValidators?: Partial<ControlsOf<T>>): ControlsOf<T> {
		const controls = {} as ControlsOf<T>;

		const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(model)).filter(
			(k) => k !== 'constructor',
		) as (keyof T)[];

		for (const key of new Set([...keys, ...Object.keys(model)] as (keyof T)[])) {
			if (customValidators?.[key]) {
				controls[key] = customValidators[key];
				continue;
			}

			controls[key] = [this.getValidator(model, key)];
		}

		return controls;
	}

	public static createFormGroup<T extends object>(model: T, controls: ControlsOf<T>): FormGroup<FormControlsOf<T>> {
		const group: Partial<FormControlsOf<T>> = {};

		for (const key of Object.keys(controls) as (keyof T)[]) {
			const initialValue = this.castToPropertyType(model, key, model[key]);
			group[key] = new FormControl(initialValue, controls[key]) as FormControl<T[typeof key]>;
		}

		return new FormGroup(group as FormControlsOf<T>);
	}

	public static isFormValid<T extends object>(form: FormGroup<FormControlsOf<T>>): boolean {
		form.updateValueAndValidity({ emitEvent: false });
		return form.valid;
	}

	private static castToPropertyType<T extends object>(model: T, propertyKey: keyof T, value: any): any {
		if (value === '' || value === null || value === undefined) return null;

		const typeMetadata = Reflect.getMetadata('custom:property-type', model, propertyKey as string);

		if (typeMetadata === Number) {
			const num = Number(value);
			return isNaN(num) ? null : num;
		} else if (typeMetadata === Boolean) {
			return value === 'true' || value === true;
		} else if (typeMetadata === String) {
			return String(value);
		}

		return value;
	}

	public static isValid<T extends object>(target: T): boolean {
		const errors = validateSync(target);
		return errors.length === 0;
	}

	public static syncModelFromForm<T extends object>(model: T, form: FormGroup<FormControlsOf<T>>): void {
		for (const key in model) {
			if (model.hasOwnProperty(key) && form.controls[key]) {
				const control = form.controls[key];
				if (control) {
					(model[key] as any) = this.castToPropertyType(model, key, control.value);
				}
			}
		}
	}
}
