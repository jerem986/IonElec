import { Component } from '@angular/core';
import { IonCol, IonContent, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IeToggleComponent } from '@shared/components/form/ie-toggle/ie-toggle.component';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss'],
	imports: [
		IonCol,
		IonRow,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		ExploreContainerComponent,
		IeToggleComponent,
	],
})
export class Tab3Page {
	public darkMode = document.body.classList.contains('dark');

	toggleDarkTheme(isDark: boolean) {
		this.darkMode = isDark;
		document.body.classList.toggle('dark', isDark);
	}
}
