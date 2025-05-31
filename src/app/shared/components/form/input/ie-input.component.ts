import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IonicModule } from '@ionic/angular';
import { FormElement } from '../form-element';

@Component({
	selector: 'ie-input',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, IonicModule],
	templateUrl: './ie-input.component.html',
})
export class InputComponent extends FormElement<string | number> {
	public placeholder = input<string>('');
	public type = input<'text' | 'number'>('text');
}
