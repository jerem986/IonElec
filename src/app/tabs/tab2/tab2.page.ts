import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '@core/data.service';
import { IonCol, IonContent, IonFooter, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { ButtonComponent } from '@shared/components/button/button/ie-button.component';
import { IeFormComponent } from '@shared/components/form/ie-form.component';
import { InputComponent } from '@shared/components/form/input/ie-input.component';
import { SelectComponent, SelectOption } from '@shared/components/form/select/ie-select.component';
import { Month } from '@shared/enum';

@Component({
	selector: 'app-tab2',
	templateUrl: './tab2.page.html',
	styleUrls: ['./tab2.page.scss'],
	imports: [
		IeFormComponent,
		IonRow,
		IonCol,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonFooter,
		IonContent,
		InputComponent,
		SelectComponent,
		ButtonComponent,
	],
})
export class Tab2Page implements OnInit {
	public command = new CreateMonthlyReportCommand();
	public monthOptions: SelectOption<number>[];
	@ViewChild('form') form!: IeFormComponent<CreateMonthlyReportCommand>;

	public constructor(private dataService: DataService) {}

	public ngOnInit(): void {
		this.monthOptions = Month.helper.monthOptions();
		this.command.month = this.getPreviousMonth();
	}

	private getPreviousMonth(): number {
		const currentMonth = new Date().getMonth();
		return currentMonth === 0 ? 11 : currentMonth - 1;
	}

	public async submit(): Promise<void> {
		if (this.form.isFormValid()) {
			const valid = await this.dataService.createMonthlyReport(this.command);
		} else {
			this.form.markAllAsTouched();
		}
	}
}
