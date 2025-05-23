import { Component, signal, effect, output, input } from '@angular/core';
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

	public form = signal<FormGroup>(null);
	public onSubmit = output<void>();

	constructor() {
		effect(() => {
			if (this.model() && this.controls()) {
				this.form.set(ValidatorsFactoryHelper.createFormGroup(this.model(), this.controls()));
			}
		});
	}

	public isFormValid(): boolean {
		return this.form() ? ValidatorsFactoryHelper.isFormValid(this.form()) : false;
	}
}
