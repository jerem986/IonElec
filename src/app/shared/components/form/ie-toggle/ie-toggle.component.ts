import { Component, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
	selector: 'ie-toggle',
	imports: [IonicModule],
	templateUrl: './ie-toggle.component.html',
})
export class IeToggleComponent {
	public label = input<string>('');
	public checked = input<boolean>(false);
	public disabled = input<boolean>(false);
	public checkedChange = output<boolean>();
	public color = input<string>('primary');

	onToggle(event: any) {
		this.checkedChange.emit(event.detail.checked);
	}
}
