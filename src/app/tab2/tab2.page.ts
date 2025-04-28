import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InputComponent } from '@shared/components/input/ie-input.component';
import { FormValidators } from '@shared/validators/form-validators';
import { DataService } from '@core/data.service';
import { SelectComponent, SelectOption } from '@shared/components/ie-select/ie-select.component';

@Component({
	selector: 'app-tab2',
	templateUrl: './tab2.page.html',
	styleUrls: ['./tab2.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, InputComponent, FormsModule, SelectComponent],
})
export class Tab2Page implements OnInit {
	public command = new CreateMonthlyReportCommand();
	public monthOptions: SelectOption<number>[];

	public dayCounter = signal<number>(0);
	public nightCounter = signal<number>(0);
	public productionCounter = signal<number>(0);
	public carCounter = signal<number>(0);
	public month = signal<number>(0);
	public year = signal<number>(0);

	public isFormValid = computed(
		() =>
			this.isValid(this.dayCounter) &&
			this.isValid(this.nightCounter) &&
			this.isValid(this.productionCounter) &&
			this.isValid(this.carCounter) &&
			this.isValid(this.month) &&
			this.isValid(this.year),
	);

	public constructor(private dataService: DataService) {}

	public ngOnInit(): void {
		this.monthOptions = [
			{ value: 0, label: 'January' },
			{ value: 1, label: 'February' },
			{ value: 2, label: 'March' },
			{ value: 3, label: 'April' },
			{ value: 4, label: 'May' },
			{ value: 5, label: 'June' },
			{ value: 6, label: 'July' },
			{ value: 7, label: 'August' },
			{ value: 8, label: 'September' },
			{ value: 9, label: 'October' },
			{ value: 10, label: 'November' },
			{ value: 11, label: 'December' },
		];
		this.month.set(this.getPreviousMonth());
	}

	private isValid(value: Signal<number>): boolean {
		return FormValidators.required(value) && FormValidators.min(value, 0);
	}

	private getPreviousMonth(): number {
		const currentMonth = new Date().getMonth();
		return currentMonth === 0 ? 11 : currentMonth - 1;
	}

	public submit(): void {
		if (this.isFormValid()) {
			this.command.dayCounter = this.dayCounter();
			this.command.nightCounter = this.nightCounter();
			this.command.productionCounter = this.productionCounter();
			this.command.carCounter = this.carCounter();
			this.command.month = this.month();
			this.command.year = this.year();
			console.log(this.command);
			// this.dataService.createMonthlyReport(this.command);
		} else {
			console.warn('Formulaire invalide');
		}
	}
}
