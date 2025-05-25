import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElement } from '../form-element';
import { input } from '@angular/core';

@Component({
	selector: 'ie-input',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
	templateUrl: './ie-input.component.html',
})
export class InputComponent extends FormElement<string | number> {
	public label = input<string>('');
	public placeholder = input<string>('');
	public type = input<'text' | 'number'>('text');
}
