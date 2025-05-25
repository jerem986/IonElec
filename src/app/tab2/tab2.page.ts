import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InputComponent } from '@shared/components/form/input/ie-input.component';
import { DataService } from '@core/data.service';
import { SelectComponent, SelectOption } from '@shared/components/form/select/ie-select.component';
import { ValidatorsFactoryHelper } from '@shared/helper';
import { IeFormComponent } from '@shared/components/form/ie-form.component';
import { Month } from '@shared/enum';
import { ButtonComponent } from '@shared/components/button/button/ie-button.component';

@Component({
	selector: 'app-tab2',
	templateUrl: './tab2.page.html',
	styleUrls: ['./tab2.page.scss'],
	imports: [
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
	public controls = ValidatorsFactoryHelper.createControls(this.command);
	@ViewChild('form')
	public form: IeFormComponent<CreateMonthlyReportCommand>;

	public constructor(private dataService: DataService) {}

	public ngOnInit(): void {
		this.monthOptions = Month.helper.monthOptions();
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
