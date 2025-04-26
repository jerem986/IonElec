import { computed, Signal } from '@angular/core';

export class FormValidators {
	static required(signal: Signal<any>): boolean {
		const value = signal();
		return value !== null && value !== undefined && value !== '';
	}

	static min(signal: Signal<number>, minValue: number): boolean {
		const value = signal();
		return value !== null && value >= minValue;
	}

	static max(signal: Signal<number>, maxValue: number): boolean {
		const value = signal();
		return value !== null && value <= maxValue;
	}

	static between(signal: Signal<number>, minValue: number, maxValue: number): boolean {
		const value = signal();
		return value !== null && value >= minValue && value <= maxValue;
	}

	static isEven(signal: Signal<number>): boolean {
		const value = signal();
		return value !== null && value % 2 === 0;
	}
}
