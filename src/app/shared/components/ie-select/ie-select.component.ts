import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface SelectOption<T> {
	value: T;
	label: string;
}

@Component({
	selector: 'ie-select',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
	templateUrl: './ie-select.component.html',
})
export class SelectComponent<T = unknown> {
	public options = input<SelectOption<T>[]>();
	public selectedOption = model<T>();
	public placeholder = input<string>();
}
