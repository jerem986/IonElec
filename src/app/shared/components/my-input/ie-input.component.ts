import { Component, input, signal, OnInit, Signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'ie-input',
	templateUrl: './ie-input.component.html',
	styleUrls: ['./ie-input.component.scss'],
	imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
})
export class MyInputComponent {
	public label = input<string>('');
	public placeholder = input<string>('');
	public type = input<'text' | 'number'>();

	@Input() public valueSignal?: Signal<string | number>;

	private internalValue = signal<string | number>('');

	public get value(): Signal<string | number> {
		return this.valueSignal ?? this.internalValue;
	}

	public setValue(newValue: string | number): void {
		if (this.valueSignal) {
			(this.valueSignal as any).set(newValue);
		} else {
			this.internalValue.set(newValue);
		}
	}
}
