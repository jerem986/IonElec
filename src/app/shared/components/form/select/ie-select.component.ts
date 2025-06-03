import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IonicModule } from '@ionic/angular';
import { FormElement } from '../form-element';

export interface SelectOption<T> {
	value: T;
	label: string;
}

@Component({
	selector: 'ie-select',
	imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, IonicModule],
	templateUrl: './ie-select.component.html',
})
export class SelectComponent<T = unknown> extends FormElement<T> {
	public options = input<SelectOption<T>[]>();
	public selectedOption = model<T>();
	public placeholder = input<string>();
}
