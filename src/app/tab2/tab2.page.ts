import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { CreateMonthlyReportCommand } from '@shared/commands';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyInputComponent } from '@shared/components/my-input/my-input.component';
import { FormValidators } from '@shared/validators/form-validators';
import { PostService } from 'app/core/post-service';

@Component({
	selector: 'app-tab2',
	templateUrl: './tab2.page.html',
	styleUrls: ['./tab2.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, MyInputComponent, FormsModule],
})
export class Tab2Page implements OnInit {
	public command = new CreateMonthlyReportCommand();

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

	constructor(private postService: PostService) {}

	ngOnInit(): void {
		// ici tu peux hydrater les valeurs si besoin
	}

	private isValid(value: Signal<number>): boolean {
		return FormValidators.required(value) && FormValidators.min(value, 0);
	}

	// pour simuler un submit
	public submit(): void {
		if (this.isFormValid()) {
			this.postService.addMonthlyReport(this.command);
		} else {
			console.warn('Formulaire invalide');
		}
	}
}
