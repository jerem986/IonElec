import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { MyInputComponent } from '@shared/components/my-input/my-input.component';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, MyInputComponent, FormsModule],
})
export class Tab2Page {
	public command = new CreateMonthlyReportCommand();

	constructor() {}
}
