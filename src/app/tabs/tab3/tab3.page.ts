import { Component } from '@angular/core';
import { DataService } from '@core/data.service';
import { IonCol, IonContent, IonHeader, IonRow, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { ButtonComponent } from '@shared/components/button/button/ie-button.component';
import { IeToggleComponent } from '@shared/components/form/ie-toggle/ie-toggle.component';

const DARK_MODE_KEY = 'dark-mode';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss'],
	imports: [IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, ButtonComponent, IeToggleComponent],
})
export class Tab3Page {
	public darkMode = localStorage.getItem(DARK_MODE_KEY) === 'true';

	public constructor(
		private dataService: DataService,
		private toastController: ToastController,
	) {
		document.body.classList.toggle('dark', this.darkMode);
	}

	public toggleDarkTheme(isDark: boolean): void {
		this.darkMode = isDark;
		localStorage.setItem(DARK_MODE_KEY, String(isDark));
		document.body.classList.toggle('dark', isDark);
	}

	public async exportDb(): Promise<void> {
		try {
			await this.dataService.exportDb();
			await this.showToast('Export réalisé avec succès', 'success');
		} catch {
			await this.showToast("Erreur lors de l'export", 'danger');
		}
	}

	private async showToast(message: string, color: string): Promise<void> {
		const toast = await this.toastController.create({
			message,
			duration: 2500,
			color,
			position: 'top',
		});
		await toast.present();
	}
}
