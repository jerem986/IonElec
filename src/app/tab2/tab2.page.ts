import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InputComponent } from '@shared/components/input/ie-input.component';
import { DataService } from '@core/data.service';
import { SelectComponent, SelectOption } from '@shared/components/select/ie-select.component';
import { ValidatorsFactoryHelper } from '@shared/helper';
import { IeFormComponent } from '@shared/components/form/ie-form.component';

@Component({
	selector: 'app-tab2',
	templateUrl: './tab2.page.html',
	styleUrls: ['./tab2.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, InputComponent, SelectComponent, IeFormComponent],
})
export class Tab2Page implements OnInit {
	public command = new CreateMonthlyReportCommand();
	public monthOptions: SelectOption<number>[];
	public controls = ValidatorsFactoryHelper.createControls(this.command);
	@ViewChild('form')
	public form: IeFormComponent<CreateMonthlyReportCommand>;

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
		this.command.month = this.getPreviousMonth();
	}

	private getPreviousMonth(): number {
		const currentMonth = new Date().getMonth();
		return currentMonth === 0 ? 11 : currentMonth - 1;
	}

	public submit(): void {
		if (this.form.isFormValid()) {
			console.log(this.command);
		} else {
			console.warn('Formulaire invalide');
		}
	}
}
