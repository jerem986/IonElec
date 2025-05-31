import { AfterContentInit, Component, ContentChildren, input, QueryList } from '@angular/core';
import { InputComponent } from './input/ie-input.component';
import { SelectComponent } from './select/ie-select.component';

@Component({
	selector: 'ie-form',
	template: `
		<form>
			<ng-content></ng-content>
		</form>
	`,
	standalone: true,
})
export class IeFormComponent<T> implements AfterContentInit {
	public model = input<T>(null);

	@ContentChildren(InputComponent, { descendants: true })
	inputElements!: QueryList<InputComponent>;

	@ContentChildren(SelectComponent, { descendants: true })
	selectElements!: QueryList<SelectComponent>;

	ngAfterContentInit() {
		const totalElements = this.inputElements.length + this.selectElements.length;
	}

	public isFormValid(): boolean {
		const allElements = [...this.inputElements.toArray(), ...this.selectElements.toArray()];

		if (allElements.length === 0) {
			return false;
		}

		const allControls = allElements.map((el) => el.formControl);
		const isValid = allControls.every((control) => control.valid);

		return isValid;
	}

	public markAllAsTouched(): void {
		const allElements = [...this.inputElements.toArray(), ...this.selectElements.toArray()];

		allElements.forEach((el) => {
			el.formControl.markAsTouched();
			el.formControl.updateValueAndValidity();
		});
	}
}
