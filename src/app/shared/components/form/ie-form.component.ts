import { Component, effect, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsFactoryHelper } from '@shared/helper/validators-factory.helper';

@Component({
	selector: 'ie-form',
	templateUrl: './ie-form.component.html',
	standalone: true,
	imports: [ReactiveFormsModule],
})
export class IeFormComponent<T> {
	public model = input<T>(null);
	public controls = input<any>(null);

	public formGroup = signal<FormGroup>(null);
	public onSubmit = output<void>();

	constructor() {
		effect(() => {
			if (this.model() && this.controls()) {
				this.formGroup.set(ValidatorsFactoryHelper.createFormGroup(this.model(), this.controls()));
			}
		});
	}

	public isFormValid(): boolean {
		return this.formGroup() ? ValidatorsFactoryHelper.isFormValid(this.formGroup()) : false;
	}
}
