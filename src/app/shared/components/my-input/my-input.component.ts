import { Component, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'ie-input',
	templateUrl: './my-input.component.html',
	styleUrls: ['./my-input.component.scss'],
	imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
})
export class MyInputComponent {
	public label = input<string>('');
	public placeholder = input<string>('');
	public type = input<'text' | 'number'>();

	value = signal<string | number>('');
}
