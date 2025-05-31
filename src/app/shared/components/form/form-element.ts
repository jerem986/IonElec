import { Directive, effect, ElementRef, input, output } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { validateSync, ValidationError } from 'class-validator';
import 'reflect-metadata';

@Directive()
export class FormElement<T> {
	public label = input<string>('');
	public value = input<T>();
	public validators = input<ValidatorFn[] | [any, string] | null>(null);
	public valueChange = output<T>();

	private _validators: ValidatorFn[] = [];
	private _propertyType: string = 'string';

	public formControl = new FormControl<T>(this.value(), { validators: this._validators });

	public syncValidatorsEffect = effect(() => {
		const target = this.validators();
		if (Array.isArray(target) && target.length === 2 && typeof target[1] === 'string') {
			const [model, prop] = target;
			this._validators = this.getValidatorsFromModel(model, prop);
			this._propertyType = this.getPropertyTypeFromModel(model, prop);
		} else {
			this._validators = (target as ValidatorFn[]) ?? [];
			this._propertyType = typeof this.value();
		}
		this.formControl.setValidators(this._validators);
		this.formControl.updateValueAndValidity({ emitEvent: false });
	});

	public syncInputValueEffect = effect(() => {
		const inputValue = this.value();
		const castedValue = this.castToPropertyType(inputValue);
		if (this.formControl.value !== castedValue) {
			this.formControl.setValue(castedValue, { emitEvent: false });
		}
	});

	public constructor(public elementRef?: ElementRef<HTMLElement>) {
		this.formControl.valueChanges.subscribe((v) => {
			const castedValue = this.castToPropertyType(v);

			const target = this.validators();
			if (Array.isArray(target) && target.length === 2 && typeof target[1] === 'string') {
				const [model, prop] = target;
				if (model[prop] !== castedValue) {
					model[prop] = castedValue;
				}
			}

			if (castedValue !== this.value()) {
				this.valueChange.emit(castedValue);
			}
		});
	}
	public getErrorMessage(): string {
		if (!this.formControl.errors) {
			return '';
		}

		// Récupère la première erreur
		const errorKey = Object.keys(this.formControl.errors)[0];
		const error = this.formControl.errors[errorKey];

		// Si c'est une erreur de class-validator avec message personnalisé
		if (error && error.message) {
			return error.message;
		}

		// Messages par défaut pour les validateurs Angular
		const fieldLabel = this.label() || 'Field';

		switch (errorKey) {
			case 'required':
				return `${fieldLabel} is required`;
			case 'min':
				return `${fieldLabel} must be at least ${error.min}`;
			case 'max':
				return `${fieldLabel} must be at most ${error.max}`;
			case 'email':
				return `${fieldLabel} must be a valid email`;
			case 'isNumber':
				return `${fieldLabel} must be a number`;
			default:
				return `${fieldLabel} is invalid`;
		}
	}

	private getValidatorsFromModel(model: any, prop: string): ValidatorFn[] {
		const classValidatorFn: ValidatorFn = (control) => {
			if (control.value === null || control.value === undefined || control.value === '') {
				return null;
			}

			const testModel = Object.assign(Object.create(Object.getPrototypeOf(model)), model);
			testModel[prop] = control.value;

			const errors: ValidationError[] = validateSync(testModel, {
				skipMissingProperties: false,
				whitelist: false,
				forbidNonWhitelisted: false,
			});

			const propertyErrors = errors.filter((error) => error.property === prop);

			if (propertyErrors.length === 0) {
				return null;
			}

			const errorObj: any = {};
			propertyErrors.forEach((error) => {
				if (error.constraints) {
					Object.keys(error.constraints).forEach((constraintKey) => {
						errorObj[constraintKey] = {
							message: error.constraints![constraintKey],
							actualValue: control.value,
						};
					});
				}
			});

			return errorObj;
		};

		return [classValidatorFn];
	}

	private getPropertyTypeFromModel(model: any, prop: string): string {
		const typeMetadata = Reflect.getMetadata('custom:property-type', model, prop);

		if (typeMetadata === Number) {
			return 'number';
		} else if (typeMetadata === Boolean) {
			return 'boolean';
		} else if (typeMetadata === String) {
			return 'string';
		}

		return 'string';
	}

	private castToPropertyType(val: any): any {
		if (val === '' || val === null || val === undefined) return null;

		switch (this._propertyType) {
			case 'number':
				const num = Number(val);
				return isNaN(num) ? null : num;
			case 'boolean':
				return val === 'true' || val === true;
			case 'string':
				return String(val);
			default:
				return val;
		}
	}
}
