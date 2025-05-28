import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '@core/data.service';
import { IonCol, IonContent, IonFooter, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { ButtonComponent } from '@shared/components/button/button/ie-button.component';
import { IeFormComponent } from '@shared/components/form/ie-form.component';
import { InputComponent } from '@shared/components/form/input/ie-input.component';
import { SelectComponent, SelectOption } from '@shared/components/form/select/ie-select.component';
import { Month } from '@shared/enum';
import { ControlsOf, ValidatorsFactoryHelper } from '@shared/helper';

@Component({
	selector: 'app-tab2',
	templateUrl: './tab2.page.html',
	styleUrls: ['./tab2.page.scss'],
	imports: [
		IonFooter,
		IonRow,
		IonCol,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		InputComponent,
		SelectComponent,
		IeFormComponent,
		ButtonComponent,
	],
})
export class Tab2Page implements OnInit {
	public command = new CreateMonthlyReportCommand();
	public monthOptions: SelectOption<number>[];
	public controls: ControlsOf<CreateMonthlyReportCommand>;
	@ViewChild('form')
	public form: IeFormComponent<CreateMonthlyReportCommand>;

	public constructor(private dataService: DataService) {}

	public ngOnInit(): void {
		this.monthOptions = Month.helper.monthOptions();
		this.command.month = this.getPreviousMonth();
		this.controls = ValidatorsFactoryHelper.createControls(this.command);
		console.log(this.controls);
	}

	private getPreviousMonth(): number {
		const currentMonth = new Date().getMonth();
		return currentMonth === 0 ? 11 : currentMonth - 1;
	}

	public submit(): void {
		console.log(this.command);
		console.log(this.form.isFormValid());
		if (this.form.isFormValid()) {
			console.log(this.command);
		} else {
			console.warn('Formulaire invalide');
		}
	}
}
