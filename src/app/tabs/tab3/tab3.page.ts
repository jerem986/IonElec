import { Component } from '@angular/core';
import { DataService } from '@core/data.service';
import { IonCol, IonContent, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ButtonComponent } from '@shared/components/button/button/ie-button.component';
import { IeToggleComponent } from '@shared/components/form/ie-toggle/ie-toggle.component';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss'],
	imports: [IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, ButtonComponent, IeToggleComponent],
})
export class Tab3Page {
	public darkMode = document.body.classList.contains('dark');

	public constructor(private dataService: DataService) {}

	public toggleDarkTheme(isDark: boolean) {
		this.darkMode = isDark;
		document.body.classList.toggle('dark', isDark);
	}

	public async exportDb(): Promise<void> {
		const valid = await this.dataService.exportDb();
	}
}
